# 🚀 Vercel Deployment Guide

## Disaster Relief Resources Distributer - Deployment Instructions

---

## Prerequisites

Before deploying, ensure you have:

1. ✅ **GitHub Account** (or GitLab/Bitbucket)
2. ✅ **Vercel Account** (free tier available at https://vercel.com)
3. ✅ **Git installed** on your local machine
4. ✅ **Project pushed to GitHub** repository

---

## Step-by-Step Deployment

### Option 1: Deploy via Vercel Dashboard (Recommended)

#### Step 1: Push Code to GitHub

```bash
# Navigate to project directory
cd /home/yuvrajs/Desktop/daa

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - Disaster Relief App ready for deployment"

# Add remote repository (replace with your GitHub repo URL)
git remote add origin https://github.com/yourusername/disaster-relief-app.git

# Push to GitHub
git push -u origin master
```

#### Step 2: Import to Vercel

1. Go to https://vercel.com/login
2. Sign in with your GitHub account
3. Click **"Add New Project"** or **"Import Project"**
4. Select your **disaster-relief-app** repository
5. Vercel will auto-detect the project settings

#### Step 3: Configure Project Settings

Vercel should automatically detect the configuration from `vercel.json`, but verify:

- **Framework Preset:** Other
- **Build Command:** (leave empty)
- **Output Directory:** (leave empty)
- **Install Command:** `npm install`

#### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for deployment to complete (usually 1-2 minutes)
3. You'll receive a live URL like: `https://your-project-name.vercel.app`

---

### Option 2: Deploy via Vercel CLI

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

#### Step 3: Deploy from Project Directory

```bash
cd /home/yuvrajs/Desktop/daa
vercel
```

Follow the CLI prompts:
- **Set up and deploy?** Yes
- **Which scope?** Select your account
- **Link to existing project?** No
- **What's your project's name?** disaster-relief-app
- **In which directory is your code located?** ./

#### Step 4: Deploy to Production

```bash
vercel --prod
```

Your app will be live at: `https://disaster-relief-app.vercel.app`

---

## Post-Deployment Verification

### 1. Test the Live Application

Open your Vercel URL in a browser and verify:

- ✅ Frontend loads correctly
- ✅ Disaster types are selectable
- ✅ Resources load for each disaster type
- ✅ Calculations work when modifying resources
- ✅ Results display properly

### 2. Test API Endpoints

Use curl or browser to test:

```bash
# Replace with your actual Vercel URL
curl https://your-project-name.vercel.app/api/disasters

curl -X POST https://your-project-name.vercel.app/api/knapsack/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {"name": "Test Item", "value": 100, "weight": 10}
    ],
    "capacity": 50
  }'
```

### 3. Check Browser Console

Open Developer Tools (F12) and check:
- No CORS errors
- API calls returning 200 status
- No JavaScript errors

---

## Troubleshooting Common Issues

### Issue 1: API Routes Not Working

**Symptom:** 404 errors on `/api/*` routes

**Solution:**
- Ensure `vercel.json` is in the root directory
- Check that backend routes match the configuration
- Redeploy: `vercel --prod`

### Issue 2: CORS Errors

**Symptom:** "Access to fetch blocked by CORS policy"

**Solution:**
- Backend already has CORS enabled
- Clear browser cache
- Verify API URL in `frontend/app.js` uses relative path

### Issue 3: Module Not Found

**Symptom:** "Cannot find module 'express'"

**Solution:**
```bash
# Ensure package.json is in root
# Redeploy
vercel --prod
```

### Issue 4: Build Fails

**Symptom:** Deployment fails during build

**Solution:**
- Check Vercel deployment logs
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

---

## Environment Variables (Optional)

If you need environment variables:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add variables like:
   - `NODE_ENV=production`
   - Custom API keys if needed

---

## Custom Domain (Optional)

### Add Your Own Domain

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Click **"Add Domain"**
3. Enter your domain name
4. Follow DNS configuration instructions
5. Wait for SSL certificate (automatic)

Example: `disaster-relief.yourdomain.com`

---

## Automatic Deployments

Once connected to GitHub:

- ✅ **Every push to `master`** triggers automatic deployment
- ✅ **Preview deployments** for pull requests
- ✅ **Rollback** to previous deployments anytime

---

## Monitoring and Analytics

### View Deployment Logs

1. Go to Vercel Dashboard
2. Select your project
3. Click on a deployment
4. View **"Build Logs"** and **"Function Logs"**

### Analytics (Free Tier)

- Page views
- Top pages
- Visitor locations
- Performance metrics

---

## Performance Optimization

### 1. Enable Compression

Already enabled by default on Vercel.

### 2. Caching

Static files are automatically cached.

### 3. CDN

Vercel's Edge Network serves your app globally.

---

## Updating Your Deployment

### Method 1: Git Push (Recommended)

```bash
# Make changes to your code
git add .
git commit -m "Update feature"
git push origin master
```

Vercel automatically deploys the changes.

### Method 2: Manual Redeploy

```bash
vercel --prod
```

---

## Project Structure for Vercel

```
daa/                              (root)
├── vercel.json                   ← Vercel configuration
├── package.json                  ← Root dependencies
├── .gitignore                    ← Git ignore rules
├── README.md                     ← Documentation
│
├── backend/                      ← Backend API
│   ├── server.js                 ← Express server (exports app)
│   ├── package.json              ← Backend dependencies
│   ├── routes/                   ← API routes
│   └── controllers/              ← Business logic
│
└── frontend/                     ← Static frontend
    ├── index.html                ← Main page
    ├── styles.css                ← Styling
    └── app.js                    ← Frontend logic
```

---

## Important Files for Deployment

### 1. vercel.json
Configures builds and routes for Vercel.

### 2. package.json (root)
Defines dependencies for serverless functions.

### 3. backend/server.js
Must export the Express app for Vercel:
```javascript
module.exports = app;
```

### 4. frontend/app.js
Uses environment-aware API URL:
```javascript
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api' 
    : '/api';
```

---

## Support and Resources

### Vercel Documentation
- https://vercel.com/docs
- https://vercel.com/docs/concepts/functions/serverless-functions

### GitHub Integration
- https://vercel.com/docs/git/vercel-for-github

### Troubleshooting
- https://vercel.com/support

---

## Quick Reference Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs [deployment-url]

# List deployments
vercel ls

# Remove deployment
vercel rm [deployment-name]

# Set environment variable
vercel env add [KEY]
```

---

## Success Checklist

Before considering deployment complete:

- ✅ Application loads on Vercel URL
- ✅ All disaster types work
- ✅ Resources can be added/edited/deleted
- ✅ Calculations return correct results
- ✅ No console errors
- ✅ Mobile responsive (test on phone)
- ✅ API endpoints respond correctly
- ✅ HTTPS enabled (automatic)
- ✅ Fast load times (< 2 seconds)

---

## Next Steps After Deployment

1. **Share Your Link:**
   - Add to your resume/portfolio
   - Share with faculty/classmates
   - Include in project documentation

2. **Monitor Performance:**
   - Check Vercel Analytics
   - Review function execution times
   - Monitor error rates

3. **Continuous Improvement:**
   - Gather user feedback
   - Implement new features
   - Optimize performance

---

**Your application is now ready for production! 🎉**

**Live URL:** `https://your-project-name.vercel.app`

---

*Last Updated: November 16, 2025*  
*Deployment Platform: Vercel*  
*Academic Year: 2025-2026*
