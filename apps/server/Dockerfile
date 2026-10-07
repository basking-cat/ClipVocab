FROM --platform=$BUILDPLATFORM golang:1.25-alpine AS builder
ARG TARGETOS
ARG TARGETARCH
WORKDIR /app

COPY apps/server/go.mod apps/server/go.sum* ./apps/server/
WORKDIR /app/apps/server
RUN go mod download

WORKDIR /app
COPY apps/server ./apps/server

WORKDIR /app/apps/server
ENV CGO_ENABLED=0
RUN GOOS=${TARGETOS} GOARCH=${TARGETARCH} go build -o /app/worker ./cmd/worker

FROM alpine:latest
RUN apk add --no-cache ca-certificates python3 py3-pip \
 && pip3 install --break-system-packages --no-cache-dir youtube-transcript-api
WORKDIR /app
COPY --from=builder /app/worker .
COPY --from=builder /app/apps/server/internal/transcript/python/fetcher.py ./fetcher.py
ENV TRANSCRIPT_SCRIPT=/app/fetcher.py
CMD ["./worker"]