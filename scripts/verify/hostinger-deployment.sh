#!/usr/bin/env sh
set -eu

if docker compose version >/dev/null 2>&1; then
  compose="docker compose"
elif docker-compose version >/dev/null 2>&1; then
  compose="docker-compose"
else
  echo "Docker Compose is required to validate the Hostinger deployment contract" >&2
  exit 1
fi

compose_output="${TMPDIR:-/tmp}/sharhan-portfolio-production-compose.json"
$compose -f docker-compose.production.yml config --format json > "$compose_output"

python3 - "$compose_output" <<'PY'
import json
from pathlib import Path
import sys

with open(sys.argv[1], encoding="utf-8") as source:
    compose = json.load(source)

assert compose.get("name") == "sharhan-portfolio"
services = compose["services"]
assert set(services) == {"web"}

web = services["web"]
assert not web.get("ports")
assert web["expose"] == ["3000"]
assert set(web["networks"]) == {"application"}
assert web["build"]["context"] == str(Path.cwd())
assert web["build"]["dockerfile"] == "Dockerfile"
assert web["environment"]["NODE_ENV"] == "production"
assert web["environment"]["PORT"] == "3000"

labels = web["labels"]
assert labels["traefik.enable"] == "true"
assert labels["traefik.http.routers.sharhan-portfolio.rule"] == "Host(`sharhan.dev`)"
assert labels["traefik.http.routers.sharhan-portfolio.entrypoints"] == "websecure"
assert labels["traefik.http.routers.sharhan-portfolio.tls"] == "true"
assert labels["traefik.http.routers.sharhan-portfolio.tls.certresolver"] == "letsencrypt"
assert labels["traefik.http.routers.sharhan-portfolio.service"] == "sharhan-portfolio"
assert labels["traefik.http.routers.sharhan-portfolio-www.rule"] == "Host(`www.sharhan.dev`)"
assert labels["traefik.http.routers.sharhan-portfolio-www.entrypoints"] == "websecure"
assert labels["traefik.http.routers.sharhan-portfolio-www.tls"] == "true"
assert labels["traefik.http.routers.sharhan-portfolio-www.tls.certresolver"] == "letsencrypt"
assert labels["traefik.http.routers.sharhan-portfolio-www.service"] == "sharhan-portfolio"
assert labels["traefik.http.routers.sharhan-portfolio-www.middlewares"] == "sharhan-portfolio-www-redirect"
assert labels["traefik.http.middlewares.sharhan-portfolio-www-redirect.redirectregex.regex"] == r"^https?://www[.]sharhan[.]dev/(.*)"
assert labels["traefik.http.middlewares.sharhan-portfolio-www-redirect.redirectregex.replacement"] == "https://sharhan.dev/$${1}"
assert labels["traefik.http.middlewares.sharhan-portfolio-www-redirect.redirectregex.permanent"] == "true"
assert labels["traefik.http.services.sharhan-portfolio.loadbalancer.server.port"] == "3000"
assert "traefik.docker.network" not in labels

networks = compose["networks"]
assert set(networks) == {"application"}
assert not any(network.get("external") for network in networks.values())
PY

echo "Hostinger deployment contract validated"
