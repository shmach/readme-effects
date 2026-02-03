FROM oven/bun:latest

WORKDIR /app

# Copy package files and install dependencies
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# Copy source files
COPY . .

# Build the application
RUN bun run build
EXPOSE 3000

CMD ["bun", "dist/index.js"]
