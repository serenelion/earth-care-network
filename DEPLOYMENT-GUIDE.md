# Earth Care Network - Deployment Guide

## ✅ Local Testing Complete!

Your application is fully functional locally with:
- ✅ Backend API running on port 8080 with 81 verified entries
- ✅ Frontend React app running on port 5173
- ✅ Murmurations integration ready
- ✅ Responsive design with coherent brand identity
- ✅ Search, filtering, and category browsing working perfectly

## 🚀 Deployment Steps

### 1. Push to GitHub

**Sign in to GitHub at https://github.com/login**

Then create a new repository:
1. Go to https://github.com/new
2. Repository name: `earth-care-network`
3. Description: "Digital White Pages for the Regenerative Economy - Powered by Terralux"
4. Choose: Public or Private
5. **Do NOT** initialize with README (we already have one)
6. Click "Create repository"

Then push your code:
```bash
cd /Users/arye/.openclaw/workspace/earth-care-network

# Replace YOUR_GITHUB_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/earth-care-network.git
git branch -M main
git push -u origin main
```

### 2. Deploy Backend to Railway

**Go to https://railway.app/**

1. Sign in with GitHub
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your `earth-care-network` repository
5. Railway will detect Django automatically

**Add Environment Variables:**
```
DEBUG=False
SECRET_KEY=[generate a secure random key]
ALLOWED_HOSTS=your-app.railway.app
DATABASE_URL=[Railway will provide this automatically]
CORS_ALLOWED_ORIGINS=https://your-app.netlify.app
SITE_URL=https://your-app.railway.app
```

**Set Root Directory:** `backend`

**Run Migrations:**
After deployment, go to Railway dashboard → Your service → Settings → Deploy
Add this to the deploy command:
```
python manage.py migrate && python manage.py load_research_data && gunicorn earthcare.wsgi
```

**Get your Railway URL:** e.g., `https://earth-care-network-production.up.railway.app`

### 3. Deploy Frontend to Netlify

**Go to https://app.netlify.com/**

1. Sign in with GitHub
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub and select your `earth-care-network` repository
4. **Build settings:**
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`

**Add Environment Variable:**
```
VITE_API_URL=https://your-app.railway.app/api
```
(Use your Railway URL from step 2)

5. Click "Deploy site"

**Custom Domain (Optional):**
- Go to Domain settings
- Add your custom domain (e.g., `earthcare.terralux.org`)

### 4. Create Admin User

SSH into Railway or use the Railway CLI:
```bash
railway login
railway link
railway run python manage.py createsuperuser
```

Access admin at: `https://your-railway-url/admin/`

### 5. Submit to Murmurations Network

For each entry in your directory, you can submit the Murmurations profile to the network:

1. Get the profile URL: `https://your-railway-url/api/murmurations/projects/1.json`
2. Go to https://murmurmaps.murmurations.network/index-updater
3. Paste the URL and click "Post to Index"

Repeat for services and capital sources.

## 🔍 Verification

**Test your deployment:**
- ✅ Frontend loads at your Netlify URL
- ✅ All 20 projects display correctly
- ✅ All 31 service providers display
- ✅ All 30 capital sources display
- ✅ Search and filters work
- ✅ Admin interface accessible
- ✅ Murmurations profiles are accessible

## 📊 What's Deployed

### Backend (Django REST API)
- **Models:** LandBasedProject, ServiceProvider, CapitalSource, DirectorySubmission
- **API Endpoints:**
  - `/api/projects/` - List/search land-based projects
  - `/api/services/` - List/search service providers
  - `/api/capital/` - List/search capital sources
  - `/api/submissions/` - Submit new entries
  - `/api/murmurations/projects/{id}.json` - Murmurations profiles
- **Features:**
  - Full-text search
  - Category filtering
  - Pagination
  - Admin interface for moderation
  - Management command to load research data

### Frontend (React + Vite)
- **Pages:**
  - Home - Overview and navigation
  - Projects - Browse 20 land-based projects
  - Services - Browse 31 service providers
  - Capital - Browse 30 capital sources
  - Submit - Form for new entries
- **Features:**
  - Responsive design
  - Search functionality
  - Category filters
  - Tag system
  - Clean, professional UI with earth-tone branding

### Murmurations Integration
- JSON profile generation for all entries
- Compatible with organizations_schema-v1.0.0
- Timestamped updates
- Ready for network submission

## 🎯 Next Steps

1. **Content Moderation:** Review and approve submissions through Django admin
2. **SEO Optimization:** Add meta tags, sitemap, robots.txt
3. **Analytics:** Add Google Analytics or Plausible
4. **Newsletter:** Integrate email signup (Mailchimp/ConvertKit)
5. **Social Sharing:** Add Open Graph tags
6. **Search Enhancement:** Consider Algolia for advanced search
7. **Murmurations Automation:** Auto-submit new entries to the network

## 📚 Useful Resources

- **Django Documentation:** https://docs.djangoproject.com/
- **Railway Documentation:** https://docs.railway.app/
- **Netlify Documentation:** https://docs.netlify.com/
- **Murmurations Documentation:** https://docs.murmurations.network/
- **Terra-lux.org:** https://terra-lux.org

## 🆘 Troubleshooting

**Frontend not loading data:**
- Check CORS settings in backend
- Verify VITE_API_URL environment variable in Netlify
- Check browser console for errors

**Backend 500 errors:**
- Check Railway logs
- Verify all environment variables are set
- Ensure migrations have run
- Check SECRET_KEY is set

**Database empty:**
- Run: `railway run python manage.py load_research_data`
- Verify research JSON files are in the repository

---

**Built with ❤️ for the regenerative economy**
