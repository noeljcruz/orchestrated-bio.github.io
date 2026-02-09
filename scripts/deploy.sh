#!/usr/bin/env bash
# Deploy orchestrated.bio to Cloudflare Pages
# Usage: ./scripts/deploy.sh
#
# Prerequisites:
#   1. npm install -g wrangler  (or npx wrangler)
#   2. wrangler login           (authenticate with Cloudflare)
#
# First-time setup:
#   1. Run: wrangler pages project create orchestrated-bio
#   2. Add custom domain in Cloudflare Pages dashboard:
#      - Go to: dash.cloudflare.com > Pages > orchestrated-bio > Custom domains
#      - Add: orchestrated.bio
#      - Add: www.orchestrated.bio
#   3. Update DNS at Porkbun (Option A - recommended):
#      - Change nameservers to Cloudflare's (shown in dashboard)
#      OR (Option B - CNAME only):
#      - Add CNAME: orchestrated.bio -> orchestrated-bio.pages.dev
#      - Add CNAME: www -> orchestrated-bio.pages.dev

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
SITE_DIR="$PROJECT_DIR/site"
PROJECT_NAME="orchestrated-bio"

echo "Deploying orchestrated.bio to Cloudflare Pages..."
echo "Source directory: $SITE_DIR"
echo ""

# Deploy
npx wrangler pages deploy "$SITE_DIR" \
    --project-name="$PROJECT_NAME" \
    --branch=main \
    --commit-dirty=true

echo ""
echo "Deploy complete!"
echo "Site: https://orchestrated.bio"
echo "Preview: https://orchestrated-bio.pages.dev"
