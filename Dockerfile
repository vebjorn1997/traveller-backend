FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Optional: pass DATABASE_URL at build time so we can run migrations
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Run migrations against the database (requires DATABASE_URL at build time)
RUN npx drizzle-kit migrate

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy the built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port
EXPOSE 3001

# Start the server
CMD ["node", "dist/server.js"]