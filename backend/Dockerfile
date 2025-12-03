FROM node:18-alpine

WORKDIR /app

# Needed for healthcheck
RUN apk add --no-cache curl

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

ENV NODE_ENV=production

# Copy code
COPY . .

EXPOSE ${PORT}

# Health check (optional but recommended)
HEALTHCHECK --interval=10s --timeout=3s --start-period=20s --retries=5 \
  CMD curl -fsS http://localhost:${PORT}/healthcheck || exit 1

CMD ["node", "src/index.js"]