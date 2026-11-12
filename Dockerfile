# Build the same Vite production output used by the existing deployment.
FROM node:24-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY index.html tsconfig*.json vite.config.ts playwright.config.ts ./
COPY public ./public
COPY src ./src
RUN npm run build

# Local/CI static server; not the Vercel production runtime.
# Official stable tag follows upstream updates; not an immutable digest.
FROM nginx:stable-alpine AS runtime
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/ /usr/share/nginx/html/
USER nginx
EXPOSE 8080
HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD ["wget", "-q", "-O", "/dev/null", "http://127.0.0.1:8080/"]
# Bypass root-oriented image startup scripts; writable state stays under /tmp.
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
