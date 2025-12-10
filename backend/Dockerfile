# Stage 1: base
FROM node:20-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./

# Stage 2: install dependencies
FROM base AS deps
RUN npm ci --omit=dev

# Stage 3: runtime image
FROM node:20-alpine AS runtime
WORKDIR /usr/src/app

# Add curl for healthchecks
RUN apk add --no-cache curl

# Set safe production environment
ENV NODE_ENV=production

# Create non-root user
RUN addgroup -S nodegroup && adduser -S nodeuser -G nodegroup

# Copy dependencies
COPY --from=deps /usr/src/app/node_modules ./node_modules

# Copy package files for metadata
COPY package*.json ./

# Copy source code
COPY . .

USER nodeuser

EXPOSE 3003

HEALTHCHECK --interval=10s --timeout=3s --start-period=20s --retries=5 \
    CMD curl -sS http://localhost:3000/healthcheck || exit 1

CMD ["node", "."]
