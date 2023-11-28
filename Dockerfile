FROM node:20-alpine AS base
WORKDIR /app

# Install production dependencies.
FROM base AS deps
COPY package*.json .
RUN npm ci --ignore-scripts

FROM deps AS builder
COPY . .
RUN npm run build

FROM lipanski/docker-static-website:2.2.0
USER static
COPY --chown=static:static --chmod=644 httpd.conf .
COPY --chown=static:static --chmod=644 --from=builder /app/dist .
CMD ["/busybox", "httpd", "-f", "-v", "-p", "3000", "-c", "httpd.conf"]