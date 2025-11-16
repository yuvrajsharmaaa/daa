#!/bin/bash

# Vercel Deployment Quick Setup Script

echo "=================================================="
echo "  Disaster Relief App - Vercel Deployment Setup"
echo "=================================================="
echo ""

# Step 1: Install dependencies
echo "Step 1: Installing dependencies..."
if [ -f "package.json" ]; then
    npm install
    echo "✅ Root dependencies installed"
else
    echo "❌ package.json not found!"
    exit 1
fi

# Step 2: Check if git is initialized
echo ""
echo "Step 2: Checking Git repository..."
if [ -d ".git" ]; then
    echo "✅ Git repository found"
else
    echo "Initializing Git repository..."
    git init
    echo "✅ Git initialized"
fi

# Step 3: Add and commit files
echo ""
echo "Step 3: Preparing files for deployment..."
git add .
git status

echo ""
echo "=================================================="
echo "  Setup Complete! Next Steps:"
echo "=================================================="
echo ""
echo "1. Commit your changes:"
echo "   git commit -m 'Ready for Vercel deployment'"
echo ""
echo "2. Add your GitHub remote:"
echo "   git remote add origin https://github.com/yourusername/disaster-relief-app.git"
echo ""
echo "3. Push to GitHub:"
echo "   git push -u origin master"
echo ""
echo "4. Deploy to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import your GitHub repository"
echo "   - Click Deploy!"
echo ""
echo "OR use Vercel CLI:"
echo "   npm install -g vercel"
echo "   vercel login"
echo "   vercel --prod"
echo ""
echo "=================================================="
