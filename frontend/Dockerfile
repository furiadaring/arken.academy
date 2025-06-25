# ---------------- Dependencies Stage ----------------
FROM node:20-alpine AS deps

WORKDIR /app

RUN apk add --no-cache libc6-compat python3 make g++ vips-dev
RUN corepack enable && corepack prepare pnpm@latest --activate


COPY package.json pnpm-lock.yaml pnpm.allowedBuildScripts.json ./
COPY pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

# ---------------- Build Stage ----------------
FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache \
    build-base \
    cairo-dev \
    giflib-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    libwebp-dev \
    vips-dev \
    zlib-dev

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY . .

RUN pnpm build

# ---------------- Runtime Stage ----------------
FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["node", "server.js"]

