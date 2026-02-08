# 🚀 Deployment Instructions

## ✅ Current Status

- ✅ Code pushed to GitHub: https://github.com/serenelion/earth-care-network
- ✅ Backend tested locally (port 8001)
- ✅ Frontend tested locally (port 5173)
- ✅ 81 directory entries ready to load

## 🚂 Deploy Backend to Railway

### Option 1: Railway Dashboard (Recommended)

1. **Go to [railway.app](https://railway.app)**
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose `serenelion/earth-care-network`
5. Railway will auto-detect the Django app

### Configure Environment Variables

In Railway dashboard, add these variables:

```
SECRET_KEY=<generate-new-key>
DEBUG=False
ALLOWED_HOSTS=*.railway.app
DATABASE_URL=<auto-provided-by-railway>
CORS_ALLOWED_ORIGINS=https://your-netlify-app.netlify.app
```

**To generate SECRET_KEY:**
```bash
python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```

### After Deployment

Run these commands in Railway CLI or dashboard:

```bash
# Run migrations
python backend/manage.py migrate

# Load directory data (81 entries)
python backend/manage.py load_research_data

# Create admin user
python backend/manage.py createsuperuser
```

Your backend will be live at: `https://your-app-name.railway.app`

### Option 2: Railway CLI

```bash
cd earth-care-network
railway login
railway init
railway up

# Set environment variables
railway variables set SECRET_KEY=<your-key>
railway variables set DEBUG=False
railway variables set ALLOWED_HOSTS="*.railway.app"

# Run migrations
railway run python backend/manage.py migrate
railway run python backend/manage.py load_research_data
railway run python backend/manage.py createsuperuser
```

## 🌐 Deploy Frontend to Netlify

### Option 1: Netlify Dashboard (Recommended)

1. **Go to [netlify.com](https://www.netlify.com)**
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select `serenelion/earth-care-network`
4. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

### Configure Environment Variable

In Netlify dashboard → Site settings → Environment variables:

```
VITE_API_URL=https://your-railway-app.railway.app/api
```

**⚠️ Important**: Update Railway CORS settings with your Netlify URL!

### Option 2: Netlify CLI

```bash
cd earth-care-network/frontend
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod

# Or one command:
netlify deploy --prod --build --dir=dist
```

## 🔄 Update CORS After Frontend Deployment

Once you have your Netlify URL (e.g., `https://earth-care-network.netlify.app`):

1. Go to Railway dashboard
2. Update `CORS_ALLOWED_ORIGINS` variable:
   ```
   CORS_ALLOWED_ORIGINS=https://earth-care-network.netlify.app,https://www.your-custom-domain.com
   ```
3. Redeploy backend

## 📋 Post-Deployment Checklist

### Backend (Railway)
- [ ] Migrations applied
- [ ] 81 directory entries loaded
- [ ] Admin user created
- [ ] Admin panel accessible at `/admin`
- [ ] API endpoints working (`/api/projects/`, `/api/services/`, `/api/capital/`)
- [ ] CORS configured with frontend URL

### Frontend (Netlify)
- [ ] `VITE_API_URL` environment variable set
- [ ] Site building successfully
- [ ] All pages accessible (Home, Projects, Services, Capital, Submit)
- [ ] API calls working (check browser console)
- [ ] Search and filters working

## 🧪 Test Your Deployment

### Test Backend API

```bash
# List projects
curl https://your-railway-app.railway.app/api/projects/

# List services
curl https://your-railway-app.railway.app/api/services/

# List capital sources
curl https://your-railway-app.railway.app/api/capital/
```

### Test Frontend

1. Visit your Netlify URL
2. Check all navigation links work
3. Test search functionality
4. Test category filters
5. Try submitting an entry
6. Verify data loads from backend

## 🐛 Troubleshooting

### Backend Issues

**Problem**: Migrations fail
```bash
railway run python backend/manage.py migrate --run-syncdb
```

**Problem**: Static files not serving
```bash
railway run python backend/manage.py collectstatic --noinput
```

**Problem**: CORS errors
- Check `CORS_ALLOWED_ORIGINS` includes your Netlify URL
- Ensure no trailing slashes
- Redeploy after changing environment variables

### Frontend Issues

**Problem**: API calls failing
- Check browser console for CORS errors
- Verify `VITE_API_URL` is set correctly
- Ensure Railway backend is running

**Problem**: 404 on page refresh
- Netlify should auto-configure redirects from `netlify.toml`
- If not, add manual redirect rule: `/* /index.html 200`

**Problem**: Environment variable not working
- Netlify requires rebuild after env var changes
- Trigger new deploy after setting variables

## 🔒 Security Checklist

- [ ] Change `DEBUG=False` in production
- [ ] Generate strong `SECRET_KEY`
- [ ] Set proper `ALLOWED_HOSTS`
- [ ] Configure CORS carefully
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS (automatic on Railway/Netlify)
- [ ] Set up rate limiting (future enhancement)

## 📊 Admin Panel

Access at: `https://your-railway-app.railway.app/admin`

**Features:**
- Manage all directory entries
- Review submissions
- Feature listings
- Verify entries
- View statistics

## 🔄 Continuous Deployment

Both Railway and Netlify support automatic deployments:

- **Push to `main` branch** → Automatic deployment
- **Create `staging` branch** for testing before production
- **Use PR previews** on Netlify for review

## 🎉 Success!

Once deployed, your site will be live at:

- **Frontend**: https://your-site.netlify.app
- **Backend API**: https://your-backend.railway.app/api
- **Admin Panel**: https://your-backend.railway.app/admin

Share your regenerative economy directory with the world! 🌱

## 📧 Need Help?

- Railway docs: https://docs.railway.app
- Netlify docs: https://docs.netlify.com
- GitHub repo: https://github.com/serenelion/earth-care-network
- Email: support@terra-lux.org

---

**Powered by Terralux** - terra-lux.org
