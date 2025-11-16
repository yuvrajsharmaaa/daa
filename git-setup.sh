#!/bin/bash

# Quick Git Setup for Vercel Deployment
# Run this script to prepare your repository for deployment

echo "╔════════════════════════════════════════════════╗"
echo "║   Git Setup for Vercel Deployment             ║"
echo "╚════════════════════════════════════════════════╝"
echo ""

# Navigate to project directory
cd /home/yuvrajs/Desktop/daa

# Check if git is already initialized
if [ -d ".git" ]; then
    echo "✓ Git repository already initialized"
else
    echo "→ Initializing Git repository..."
    git init
    echo "✓ Git initialized"
fi

# Add all files
echo ""
echo "→ Adding files to git..."
git add .

# Show status
echo ""
echo "→ Current status:"
git status

# Instructions
echo ""
echo "╔════════════════════════════════════════════════╗"
echo "║   Next Steps:                                  ║"
echo "╚════════════════════════════════════════════════╝"
echo ""
echo "1️⃣  Commit your changes:"
echo "   git commit -m 'Ready for Vercel deployment'"
echo ""
echo "2️⃣  Create a GitHub repository at:"
echo "   https://github.com/new"
echo ""
echo "3️⃣  Add the remote (replace with your repo URL):"
echo "   git remote add origin https://github.com/YOUR_USERNAME/disaster-relief-app.git"
echo ""
echo "4️⃣  Push to GitHub:"
echo "   git branch -M master"
echo "   git push -u origin master"
echo ""
echo "5️⃣  Deploy on Vercel:"
echo "   https://vercel.com/new"
echo ""
echo "════════════════════════════════════════════════"
