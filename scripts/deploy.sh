#!/usr/bin/env bash
# Deploy orchestrated.bio via GitHub Pages
# Usage: ./scripts/deploy.sh
#
# This site is deployed automatically by GitHub Pages from the root
# of the main branch. Simply push to main and the site updates.
#
# Repo: github.com/orchestrated-bio/orchestrated-bio.github.io
#
# First-time DNS setup at Porkbun:
#   1. Add A records for orchestrated.bio pointing to GitHub Pages:
#      185.199.108.153
#      185.199.109.153
#      185.199.110.153
#      185.199.111.153
#   2. Add CNAME record: www -> orchestrated-bio.github.io
#   3. In GitHub repo Settings > Pages:
#      - Source: Deploy from a branch
#      - Branch: main, / (root)
#      - Custom domain: orchestrated.bio
#      - Enforce HTTPS: checked
#
# After DNS propagates (up to 24h, usually minutes), the site
# will be live at https://orchestrated.bio

set -euo pipefail

echo "Deploying orchestrated.bio..."
echo ""

# Just push to main — GitHub Pages auto-deploys from root
git push origin main

echo ""
echo "Push complete! GitHub Pages will deploy automatically."
echo "Site: https://orchestrated.bio"
echo "GitHub Pages: https://orchestrated-bio.github.io"
