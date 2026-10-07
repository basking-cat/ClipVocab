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
RUN apk add --no-cache ca-certificates
WORKDIR /app
COPY --from=builder /app/worker .
CMD ["./worker"]