# Hostinger VPS deployment

This repository is prepared for automated deployment to `https://sharhan.dev` through
GitHub Actions and Hostinger's official VPS deployment action. Repository preparation does
not connect to the VPS, change the existing Traefik project, or manage Cloudflare DNS.

The implementation intentionally follows the established LedgerLens deployment pattern:

```text
GitHub push to main
  → GitHub Actions verification
  → Hostinger deploy-on-vps action
  → dedicated Docker Compose project
  → existing host-networked Traefik
  → https://sharhan.dev
```

## Runtime contract

`docker-compose.production.yml` defines one service:

| Service | Build | Internal port | Health | Public exposure |
| --- | --- | ---: | --- | --- |
| `web` | Multi-stage Next.js standalone image | 3000 | `GET /health/ready` | Through Traefik only |

The container runs as an unprivileged user. The production image contains the Next.js
standalone server, `public` assets, and `.next/static`; development dependencies and the
source repository are not copied into the runtime layer.

The Compose project is named `sharhan-portfolio`. It has no host `ports` mapping and uses
one private Compose network named `application`. The service's `expose: 3000` documents the
container port for Traefik without publishing it on the VPS host.

## Existing Traefik contract

The existing Hostinger Traefik project remains independently managed. This repository does
not modify `/docker/traefik/docker-compose.yml` or any Traefik static configuration.

As established by LedgerLens, Traefik runs with `network_mode: host`, watches the same
Docker Engine, and has Docker-provider discovery enabled with `exposedByDefault=false`.
Therefore, the portfolio intentionally does not create or join an external Traefik network.
Traefik discovers the container labels and reaches the container's bridge address on port
3000.

The labels configure:

- canonical router: `sharhan-portfolio` with rule ``Host(`sharhan.dev`)``;
- alias router: `sharhan-portfolio-www` with rule ``Host(`www.sharhan.dev`)``;
- a permanent redirect from `www.sharhan.dev` to the equivalent path on `sharhan.dev`;
- entrypoint: `websecure`;
- TLS: enabled with the existing `letsencrypt` resolver;
- upstream: the Next.js container on port 3000.

Traefik continues to own host ports 80 and 443. The portfolio binds neither port.

## GitHub configuration

Configure these Actions secrets in the portfolio GitHub repository or its `production`
environment:

| Secret | Required | Purpose |
| --- | --- | --- |
| `HOSTINGER_API_KEY` | Yes | Authenticates `hostinger/deploy-on-vps@v2` |
| `HOSTINGER_VM_ID` | Yes | Identifies the existing Hostinger VPS |

No GitHub Actions variables are required. The application has no production runtime secret
or database. Create a protected GitHub environment named `production` only if deployment
approval gates or environment-scoped secrets are desired.

For a private repository, complete the repository-access/deploy-key setup required by the
Hostinger action. Never commit a private key or `.env` file.

## One-time VPS preparation

These are operator checks, not actions performed by this repository:

1. Confirm Docker and Docker Compose are installed and working on the target VPS.
2. Confirm the existing Traefik Compose project is running and leave it unchanged.
3. Confirm Traefik's Docker provider watches the same Docker Engine and uses
   `exposedByDefault=false`.
4. Confirm the existing entrypoint is named `websecure` and the certificate resolver is
   named `letsencrypt`, matching the labels in `docker-compose.production.yml`.
5. Confirm ports 80 and 443 remain assigned only to Traefik.
6. Confirm no existing Traefik router already claims ``Host(`sharhan.dev`)`` or
   ``Host(`www.sharhan.dev`)``.
7. Confirm host-to-Docker-bridge traffic is allowed so host-networked Traefik can reach the
   portfolio container on port 3000. The working LedgerLens route is evidence that this is
   likely already configured.
8. Add `HOSTINGER_API_KEY` and `HOSTINGER_VM_ID` to the portfolio GitHub repository.
9. If the repository is private, configure the Hostinger action's required repository
   access/deploy key.

No manual clone, application directory, environment file, shared Traefik network, or host
port mapping is required by this deployment definition. Cloudflare DNS is outside this
repository and is not configured by the workflow. Create an apex `A` record for
`sharhan.dev` pointing to the VPS IPv4 address and a `CNAME` record for `www` targeting
`sharhan.dev`. The `www` hostname is an alias only and redirects to the apex.

## Deployment workflow

`.github/workflows/deploy-hostinger.yml` runs on every push to `main` and can also be
started manually with `workflow_dispatch`.

The `verify` job:

1. installs Node.js 22 dependencies with `npm ci`;
2. runs ESLint and the Next.js production build;
3. builds the production Docker image;
4. starts the image locally and requires `/health/ready` to succeed;
5. validates the rendered Compose model and all Traefik routing invariants.

Only after verification succeeds does the `deploy` job call
`hostinger/deploy-on-vps@v2`. The action creates or updates the independent
`sharhan-portfolio` Compose project on the selected VPS. Docker rebuilds the image, the
container starts on its private network, and the existing Traefik Docker provider discovers
the labels for `sharhan.dev` and its `www` redirect alias.

The concurrency group prevents two production deployments from running simultaneously.
`cancel-in-progress` is disabled so a newer push does not terminate an active deployment.

## Post-deployment checks

After the first deployment, verify through Hostinger Docker Manager or the VPS:

1. the `sharhan-portfolio` project exists independently from LedgerLens and Traefik;
2. its `web` container reports healthy;
3. `https://sharhan.dev/health/ready` returns JSON containing `"status":"ok"`;
4. `https://sharhan.dev` loads the portfolio and its optimized portrait;
5. `https://www.sharhan.dev/some-path` permanently redirects to
   `https://sharhan.dev/some-path`;
6. Traefik logs show both portfolio routers without conflicts.

If Traefik discovers the router but receives connection failures, verify host-to-bridge
access on container port 3000. Do not publish port 3000 and do not add a guessed external
Traefik network without deliberately changing the existing infrastructure contract.

## Updates and rollback

Future updates require only a push to `main`. The same verification and deployment sequence
runs automatically. To roll back, revert the faulty commit on `main` and push the revert;
the workflow rebuilds and redeploys that repository state.

The portfolio has no persistent volumes or database. Recreating its container does not
delete application data because all content is versioned in Git.
