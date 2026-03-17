# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY pnpm-lock.yaml pnpm-workspace.yaml ./  
COPY apps/web/package.json ./apps/web/
RUN pnpm install --frozen-lockfile

COPY apps/web ./apps/web
WORKDIR /app/apps/web
RUN pnpm run build

# Run Stage
FROM node:20-alpine AS runner
WORKDIR /app/apps/web
ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/apps/web ./

EXPOSE 3000

CMD pnpm start -p 3000 -H 0.0.0.0