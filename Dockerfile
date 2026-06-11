FROM node:24-alpine AS build
WORKDIR /app

# Install production dependencies.
COPY package*.json .
RUN npm ci --ignore-scripts

# Copy source
COPY . .
RUN npm run build

FROM lipanski/docker-static-website:2.2.0
USER static
COPY httpd.conf .
COPY --from=build /app/dist .
CMD ["/busybox", "httpd", "-f", "-v", "-p", "3000", "-c", "httpd.conf"]