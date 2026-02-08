#!/bin/bash
# Earth Care Network - Railway Deployment Script
# Run this script after manually logging in to Railway

set -e  # Exit on error

echo "🚀 Earth Care Network - Railway Deployment"
echo "==========================================="
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Install with:"
    echo "   npm install -g @railway/cli"
    exit 1
fi

# Step 1: Login to Railway (if not already logged in)
echo "📝 Step 1: Checking Railway login status..."
if ! railway whoami &> /dev/null; then
    echo "⚠️  Not logged in to Railway. Please run:"
    echo "   railway login"
    echo ""
    echo "Then run this script again."
    exit 1
fi

echo "✅ Logged in to Railway"
echo ""

# Step 2: Link or create project
echo "📝 Step 2: Setting up Railway project..."
if ! railway status &> /dev/null; then
    echo "Creating new Railway project..."
    railway init
else
    echo "✅ Already linked to Railway project"
fi
echo ""

# Step 3: Add PostgreSQL if not already added
echo "📝 Step 3: Checking for PostgreSQL database..."
echo "ℹ️  If PostgreSQL is not added, run:"
echo "   railway add"
echo "   Then select PostgreSQL"
echo ""

# Step 4: Set environment variables
echo "📝 Step 4: Setting environment variables..."

# Generate a new SECRET_KEY
echo "Generating SECRET_KEY..."
SECRET_KEY=$(python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')

railway variables set SECRET_KEY="$SECRET_KEY"
railway variables set DEBUG=False
railway variables set ALLOWED_HOSTS="*.railway.app"
railway variables set CORS_ALLOWED_ORIGINS="https://*.railway.app,http://localhost:5173"

echo "✅ Environment variables set"
echo ""

# Step 5: Deploy
echo "📝 Step 5: Deploying to Railway..."
railway up

echo ""
echo "✅ Deployment initiated!"
echo ""

# Step 6: Post-deployment instructions
echo "📝 Step 6: Post-Deployment Steps"
echo "================================"
echo ""
echo "After deployment completes, run these commands:"
echo ""
echo "1. Run migrations:"
echo "   railway run python backend/manage.py migrate"
echo ""
echo "2. Load data:"
echo "   railway run python backend/manage.py loaddata backend/directory/fixtures/projects.json"
echo "   railway run python backend/manage.py loaddata backend/directory/fixtures/services.json"
echo "   railway run python backend/manage.py loaddata backend/directory/fixtures/capital.json"
echo ""
echo "3. Create superuser:"
echo "   railway run python backend/manage.py createsuperuser"
echo ""
echo "4. Get your Railway URL:"
echo "   railway open"
echo ""
echo "🎉 Deployment complete!"
