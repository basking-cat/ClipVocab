"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchVideos = void 0;
var functions = require("firebase-functions");
var googleapis_1 = require("googleapis");
var params_1 = require("firebase-functions/params");
// Secret 定義
var youtubeApiKey = (0, params_1.defineSecret)("YOUTUBE_API_KEY");
exports.searchVideos = functions
    .runWith({ secrets: ["YOUTUBE_API_KEY"] })
    .region("asia-northeast1")
    .https.onRequest(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var youtube, kw, max, caption, resp, videos, err_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                youtube = googleapis_1.google.youtube({
                    version: "v3",
                    auth: youtubeApiKey.value(),
                });
                kw = (req.query.kw || "").trim().toLowerCase();
                if (!kw) {
                    res.status(400).json({ error: "kw (keyword) is required" });
                    return [2 /*return*/];
                }
                max = Math.min(Number(req.query.max) || 25, 50);
                caption = req.query.caption || "any";
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, youtube.search.list({
                        part: ["id", "snippet"],
                        q: kw,
                        type: ["video"],
                        videoCaption: caption,
                        maxResults: max,
                        fields: "items(id/videoId,snippet/title,snippet/channelTitle,snippet/thumbnails/default/url)",
                    })];
            case 2:
                resp = _c.sent();
                videos = (_b = (_a = resp.data.items) === null || _a === void 0 ? void 0 : _a.map(function (it) {
                    var _a, _b, _c, _d, _e, _f;
                    return ({
                        videoId: (_a = it.id) === null || _a === void 0 ? void 0 : _a.videoId,
                        title: (_b = it.snippet) === null || _b === void 0 ? void 0 : _b.title,
                        channel: (_c = it.snippet) === null || _c === void 0 ? void 0 : _c.channelTitle,
                        thumb: (_f = (_e = (_d = it.snippet) === null || _d === void 0 ? void 0 : _d.thumbnails) === null || _e === void 0 ? void 0 : _e.default) === null || _f === void 0 ? void 0 : _f.url,
                    });
                })) !== null && _b !== void 0 ? _b : [];
                res.set("Cache-Control", "public, max-age=300, s-maxage=600");
                res.json({ kw: kw, videos: videos });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _c.sent();
                console.error(err_1);
                res.status(500).json({ error: "YouTube API error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
