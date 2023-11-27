FROM node:20-alpine as base
WORKDIR /app

# Install production dependencies.
FROM base as deps
COPY package*.json .
RUN npm ci

FROM deps as builder
COPY . .
RUN npm run build

FROM lipanski/docker-static-website:latest
COPY --chown=static:static httpd.conf .
COPY --chown=static:static --from=builder /app/dist .
CMD ["/busybox", "httpd", "-f", "-v", "-p", "3000", "-c", "httpd.conf"]