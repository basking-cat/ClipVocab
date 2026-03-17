# Build Stage
FROM golang:1.22-alpine AS builder
WORKDIR /app

COPY apps/server/go.mod apps/server/go.sum* ./apps/server/
WORKDIR /app/apps/server
RUN go mod download

WORKDIR /app
COPY . .

WORKDIR /app/apps/server
RUN go build -o /app/main .

# Run Stage
FROM alpine:latest
WORKDIR /app

COPY --from=builder /app/main .

EXPOSE 8080
CMD ["./main"]