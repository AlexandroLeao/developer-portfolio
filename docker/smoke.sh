#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
image="developer-portfolio:smoke-$$"
container=""
tmp="$(mktemp -d)"
cleanup() {
  if [[ -n "$container" ]]; then
    docker rm -f "$container" >/dev/null 2>&1 || true
  fi
  docker image rm "$image" >/dev/null 2>&1 || true
  rm -rf "$tmp"
}
trap cleanup EXIT

docker build --tag "$image" .
container="$(docker run -d --publish 127.0.0.1::8080 "$image")"
address="$(docker port "$container" 8080/tcp)"
[[ "$address" == 127.0.0.1:* ]]
base="http://$address"
healthy=false
for ((attempt=1; attempt<=35; attempt++)); do
  status="$(docker inspect --format '{{.State.Health.Status}}' "$container")"
  if [[ "$status" == healthy ]]; then healthy=true; break; fi
  if [[ "$status" == unhealthy ]]; then break; fi
  sleep 2
done
if [[ "$healthy" != true ]]; then
  docker logs "$container" >&2
  exit 1
fi

uid="$(docker exec "$container" id -u)"
[[ "$uid" != 0 ]]
docker exec "$container" sh -ec 'nginx -v; if command -v node || command -v npm; then exit 1; fi; test ! -e /app/src; test ! -e /app/node_modules; test ! -e /usr/share/nginx/html/.env'
echo "Runtime: non-root UID $uid; Nginx and built static output only"

get() {
  local path="$1" expected="$2" name="$3" status
  status="$(curl --silent --show-error --max-time 10 --dump-header "$tmp/$name.headers" --output "$tmp/$name.body" --write-out '%{http_code}' "$base$path")"
  [[ "$status" == "$expected" ]] || { echo "$path: expected $expected, got $status" >&2; return 1; }
}
get / 200 home
grep -q 'Software Developer' "$tmp/home.body"
grep -iq '^content-type:.*text/html' "$tmp/home.headers"
grep -iq '^cache-control:.*no-cache' "$tmp/home.headers"
js="$(grep -oE 'src="/assets/[^"]+\.js"' "$tmp/home.body" | head -n1 | cut -d'"' -f2)"
css="$(grep -oE 'href="/assets/[^"]+\.css"' "$tmp/home.body" | head -n1 | cut -d'"' -f2)"
[[ -n "$js" && -n "$css" ]]
get "$js" 200 javascript
grep -iq '^content-type:.*javascript' "$tmp/javascript.headers"
get "$css" 200 stylesheet
grep -iq '^content-type:.*text/css' "$tmp/stylesheet.headers"
get /images/hero-illustration-1024.webp 200 hero
grep -iq '^content-type:.*image/webp' "$tmp/hero.headers"
get /favicon.svg 200 favicon
grep -iq '^content-type:.*image/svg+xml' "$tmp/favicon.headers"
get /resumes/alexandro-leao-curriculo-pt.pdf 200 resume_pt
get /resumes/alexandro-leao-resume-en.pdf 200 resume_en
for name in resume_pt resume_en; do
  grep -iq '^content-type:.*application/pdf' "$tmp/$name.headers"
  [[ "$(head -c 5 "$tmp/$name.body")" == '%PDF-' ]]
done
get /missing-portfolio-route 404 missing_route
get /assets/missing.js 404 missing_asset
get /.env 404 missing_secret
echo "HTTP smoke: home, JS, CSS, WebP, SVG and both PDFs 200; missing paths 404"
docker image inspect --format 'Image size (bytes): {{.Size}}' "$image"
echo "Portfolio Docker smoke passed"
