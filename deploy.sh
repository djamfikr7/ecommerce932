#!/bin/bash
# ============================================================
# Ecommerce932 — Deployment Setup Script
# ============================================================
# Run this script after filling in your credentials below.
#
# Usage:
#   chmod +x deploy.sh
#   ./deploy.sh
# ============================================================

set -e

# ==================== CONFIGURE THESE ====================
GITHUB_USERNAME="YOUR_GITHUB_USERNAME"
SANITY_PROJECT_ID="YOUR_SANITY_PROJECT_ID"
SANITY_API_TOKEN="YOUR_SANITY_API_TOKEN"
SANITY_DATASET="production"
# ==========================================================

PROJECT_DIR="/media/fi/NewVolume8/project01/E-commerce932/ecommerce932"
cd "$PROJECT_DIR"

echo ""
echo "============================================"
echo "  Ecommerce932 — Deployment Setup"
echo "============================================"
echo ""

# --- 1. GitHub Setup ---
echo "[1/5] Setting up GitHub remote..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/${GITHUB_USERNAME}/ecommerce932.git"
echo "  ✓ Remote: https://github.com/${GITHUB_USERNAME}/ecommerce932.git"
echo ""

# --- 2. Create .env.local with real credentials ---
echo "[2/5] Writing .env.local..."
cat > .env.local << EOF
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=${SANITY_PROJECT_ID}
NEXT_PUBLIC_SANITY_DATASET=${SANITY_DATASET}
SANITY_API_TOKEN=${SANITY_API_TOKEN}
SANITY_API_READ_TOKEN=${SANITY_API_TOKEN}

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
EOF
echo "  ✓ .env.local written"
echo ""

# --- 3. Seed Sanity with sample data ---
echo "[3/5] Seeding Sanity with sample data..."
SANITY_PROJECT_ID=${SANITY_PROJECT_ID} SANITY_API_TOKEN=${SANITY_API_TOKEN} \
  node --experimental-specifier-resolution=node --loader ts-node/esm src/scripts/seed.ts 2>/dev/null || {
    echo "  ⚠ Seed script needs ts-node. Using npx..."
    npx ts-node --esm src/scripts/seed.ts 2>/dev/null || {
      echo "  ⚠ Seed skipped — run manually later:"
      echo "    SANITY_PROJECT_ID=${SANITY_PROJECT_ID} SANITY_API_TOKEN=${SANITY_API_TOKEN} npx ts-node --esm src/scripts/seed.ts"
    }
  }
echo ""

# --- 4. Push to GitHub ---
echo "[4/5] Pushing to GitHub..."
echo "  ⚠ Make sure you've created the repo at: https://github.com/new"
echo "    Repository name: ecommerce932"
echo ""
read -p "  Press Enter to push (or Ctrl+C to skip)..."

git push -u origin main
echo "  ✓ Pushed to GitHub"
echo ""

# --- 5. Vercel Deployment ---
echo "[5/5] Vercel Deployment"
echo "  Option A: Deploy via Vercel Dashboard"
echo "    1. Go to https://vercel.com/new"
echo "    2. Import: ${GITHUB_USERNAME}/ecommerce932"
echo "    3. Add environment variables:"
echo "       NEXT_PUBLIC_SANITY_PROJECT_ID = ${SANITY_PROJECT_ID}"
echo "       NEXT_PUBLIC_SANITY_DATASET = ${SANITY_DATASET}"
echo "       SANITY_API_TOKEN = ${SANITY_API_TOKEN}"
echo "       SANITY_API_READ_TOKEN = ${SANITY_API_TOKEN}"
echo "       NEXT_PUBLIC_BASE_URL = https://ecommerce932.vercel.app"
echo "    4. Click Deploy"
echo ""
echo "  Option B: Deploy via CLI"
echo "    npm install -g vercel"
echo "    vercel login"
echo "    vercel --prod"
echo ""

echo "============================================"
echo "  Setup complete! Your app is ready."
echo "============================================"
echo ""
echo "  Local:   http://localhost:3000"
echo "  Dev:     npm run dev"
echo "  Build:   npm run build"
echo ""
