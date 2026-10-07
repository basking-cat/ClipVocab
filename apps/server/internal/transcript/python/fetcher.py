import sys
import json
from youtube_transcript_api import YouTubeTranscriptApi

def get_transcript(video_id: str):
    try:
        api = YouTubeTranscriptApi()
        fetched = api.fetch(video_id)
        items = [
            {"text": x.text, "start": x.start, "duration": x.duration}
            for x in fetched
        ]
        print(json.dumps(items, ensure_ascii=False))
    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        get_transcript(sys.argv[1])
    else:
        print(json.dumps({"error": "video_id is required"}), file=sys.stderr)
        sys.exit(1)