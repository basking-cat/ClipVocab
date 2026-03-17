## clip-vocab

**clip-vocab** is a monorepo for a vocabulary/learning app, consisting of:

- **`apps/web`**: Next.js 15 React 19 frontend
- **`apps/server`**: Go backend (built with `go build`)

Package management and task running are handled with **pnpm** and **turbo**.

---

### Prerequisites

- **Node.js** (LTS recommended)
- **pnpm** (`npm install -g pnpm`)
- **Go** (for `apps/server`)

Install dependencies from the repo root:

```bash
pnpm install
```

---

### Development

From the repo root, run both apps via Turbo:

```bash
pnpm dev
```

This will start:

- `apps/web`: Next.js dev server (usually at `http://localhost:3000`)
- `apps/server`: Go server via `air` (see `apps/server` for config)

You can also run each app directly:

```bash
# Web app
cd apps/web
pnpm dev

# Server
cd apps/server
pnpm dev   # or run `air` directly if configured globally
```

---

### Scripts

From the repo root:

- **`pnpm dev`**: Run all dev processes with Turbo
- **`pnpm build`**: Build all apps/packages
- **`pnpm lint`**: Run lint across the monorepo

In `apps/web`:

- **`pnpm dev`**: Next.js dev server
- **`pnpm build`**: Next.js production build
- **`pnpm start`**: Start Next.js in production mode
- **`pnpm lint`**: Run ESLint
- **`pnpm typecheck`**: TypeScript type check
- **`pnpm test`**: Run tests with Vitest
- **`pnpm storybook`** / **`pnpm build-storybook`**: Storybook dev/build

In `apps/server`:

- **`pnpm dev`**: Run server with `air` (if wired through a local `package.json`)
- **`pnpm build`**: Build Go server binary (`go build -o server main.go`)

---

### Project Structure

- `apps/web` – Next.js frontend
- `apps/server` – Go backend
- `packages/*` – Shared libraries
