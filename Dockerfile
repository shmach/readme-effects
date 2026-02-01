FROM oven/bun:latest

WORKDIR /app

COPY package.json package-lock.json* bun.lockb* ./
RUN bun install --production || true

COPY . .

EXPOSE 3000

CMD ["bun", "src/server/index.ts"]
