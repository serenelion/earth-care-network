# Deployment Checklist - Earth Care Network
**Date:** February 8, 2026

## ✅ Admin Credentials

### Local Development
- **Admin URL**: http://localhost:8080/admin/
- **Username**: `admin`
- **Password**: `admin123`
- **Email**: admin@earthcarenetwork.org

### Production (After Deployment)
- **Admin URL**: https://[your-railway-domain]/admin/
- **Username**: `admin` (create via Railway CLI after deployment)
- **Password**: Set securely in production

---

## ✅ Backend Testing - Local

### API Endpoints Verified
- ✅ `/api/projects/` - 20 projects
- ✅ `/api/services/` - 31 services
- ✅ `/api/capital/` - 30 capital sources
- ✅ `/api/projects/categories/` - 7 categories
- ✅ `/api/services/categories/` - Working
- ✅ `/api/capital/categories/` - Working
- ✅ `/admin/` - Django admin accessible

### Database Status
- ✅ SQLite database with all data loaded
- ✅ Migrations applied
- ✅ Superuser created

### Server Status
- ✅ Running on: http://localhost:8080
- ✅ Process ID: 95481, 95480
- ✅ No errors in console

---

## 📋 Pre-Deployment Checklist

### Code Repository
- ✅ All changes committed to git
- ✅ Remote repository: https://github.com/serenelion/earth-care-network.git
- ✅ Latest UX optimizations committed
- ✅ All dependencies listed in requirements.txt

### Configuration Files
- ✅ `backend/Procfile` - Gunicorn & migration commands
- ✅ `backend/runtime.txt` - Python 3.9.21
- ✅ `railway.json` - Railway deployment config
- ✅ `backend/requirements.txt` - All dependencies

### Environment Variables Needed
```bash
# Required for Railway:
DATABASE_URL=postgresql://... (provided by Railway)
SECRET_KEY=your-secret-key-here (generate new for production)
DEBUG=False
ALLOWED_HOSTS=*.railway.app,earthcarenetwork.org
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
```

---

## 🚀 Railway Deployment Steps

### 1. Push Latest Code to GitHub
```bash
cd ~/Projects/earth-care-network
git add -A
git commit -m "Ready for Railway deployment"
git push origin main
```

### 2. Link Railway Project (if not already linked)
```bash
railway login
railway link
# Or create new project:
railway init
```

### 3. Set Environment Variables
```bash
railway variables set SECRET_KEY="$(python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')"
railway variables set DEBUG=False
railway variables set ALLOWED_HOSTS="*.railway.app,earthcarenetwork.org"
railway variables set CORS_ALLOWED_ORIGINS="https://earthcarenetwork.org,https://*.railway.app"
```

### 4. Add PostgreSQL Database
```bash
railway add postgresql
# Railway will automatically set DATABASE_URL
```

### 5. Deploy
```bash
railway up
# Or deploy from GitHub:
railway link [project-id]
railway up
```

### 6. Run Migrations & Load Data
```bash
# After deployment, run:
railway run python backend/manage.py migrate
railway run python backend/manage.py loaddata backend/directory/fixtures/projects.json
railway run python backend/manage.py loaddata backend/directory/fixtures/services.json
railway run python backend/manage.py loaddata backend/directory/fixtures/capital.json
```

### 7. Create Production Superuser
```bash
railway run python backend/manage.py createsuperuser
# Enter username, email, password when prompted
```

---

## 🧪 Post-Deployment Testing

### Test These Endpoints
```bash
# Replace YOUR_DOMAIN with your Railway domain
export DOMAIN="https://your-app.railway.app"

# Test API endpoints
curl $DOMAIN/api/projects/
curl $DOMAIN/api/services/
curl $DOMAIN/api/capital/
curl $DOMAIN/api/projects/categories/

# Test admin
open $DOMAIN/admin/
```

### Verify in Browser
1. **Admin Panel**: https://[domain]/admin/
   - Login with production credentials
   - Verify all models visible
   - Check data loaded correctly

2. **API Endpoints**:
   - `/api/projects/` - Returns 20 projects
   - `/api/services/` - Returns 31 services
   - `/api/capital/` - Returns 30 capital sources

3. **CORS**: Verify frontend can access API

---

## 📊 Current Status Summary

### Local Backend
- ✅ **Running**: http://localhost:8080
- ✅ **Admin**: http://localhost:8080/admin/ (admin/admin123)
- ✅ **API**: All endpoints working
- ✅ **Data**: 81 entries loaded
- ✅ **Database**: SQLite with all migrations

### Local Frontend
- ✅ **Running**: http://localhost:5173
- ✅ **Connected**: Talking to backend on port 8080
- ✅ **UX**: All optimizations complete
- ✅ **Responsive**: Mobile-first design working

### Repository
- ✅ **GitHub**: https://github.com/serenelion/earth-care-network.git
- ✅ **Latest**: All UX optimizations committed
- ✅ **Clean**: No uncommitted changes

---

## 🔐 Security Checklist for Production

### Before Going Live
- [ ] Generate new SECRET_KEY for production
- [ ] Set DEBUG=False
- [ ] Configure ALLOWED_HOSTS properly
- [ ] Set up proper CORS_ALLOWED_ORIGINS
- [ ] Use PostgreSQL (not SQLite)
- [ ] Enable HTTPS only
- [ ] Set secure session cookies
- [ ] Configure static files properly
- [ ] Set up environment variable management
- [ ] Create strong admin password

### Django Settings to Update
```python
# backend/earthcare/settings.py
DEBUG = False
SECRET_KEY = os.environ.get('SECRET_KEY')
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '').split(',')
DATABASES = {
    'default': dj_database_url.config(conn_max_age=600)
}
CORS_ALLOWED_ORIGINS = os.environ.get('CORS_ALLOWED_ORIGINS', '').split(',')
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
```

---

## 📝 Railway Project Configuration

### Project Name
- `earth-care-network` or `earthcarenetwork`

### Services
1. **Backend API** (Django)
   - Port: 8000 (internal)
   - Public URL: https://[project].railway.app
   - Database: PostgreSQL (Railway plugin)

2. **Frontend** (Optional - can deploy to Vercel/Netlify instead)
   - Static site or Vite build
   - Environment: `VITE_API_URL=https://[backend].railway.app/api`

### Environment Variables
```
SECRET_KEY=<generated-key>
DEBUG=False
ALLOWED_HOSTS=*.railway.app,earthcarenetwork.org
CORS_ALLOWED_ORIGINS=https://earthcarenetwork.org,https://*.railway.app
DATABASE_URL=<auto-set-by-railway>
```

---

## 🎯 Success Criteria

### Backend Deployment Successful When:
- [ ] Railway build completes without errors
- [ ] Database migrations run successfully
- [ ] All 81 directory entries loaded
- [ ] Admin panel accessible
- [ ] API endpoints return correct data
- [ ] CORS allows frontend access
- [ ] No 500 errors in logs
- [ ] Static files served correctly

---

## 🐛 Common Issues & Solutions

### Issue: Build Fails
**Solution**: Check requirements.txt, ensure all dependencies listed

### Issue: Migration Errors
**Solution**: Run migrations manually via Railway CLI

### Issue: Static Files Not Loading
**Solution**: Check STATIC_ROOT, STATIC_URL, run collectstatic

### Issue: CORS Errors
**Solution**: Verify CORS_ALLOWED_ORIGINS includes frontend domain

### Issue: Database Connection Error
**Solution**: Ensure DATABASE_URL is set by Railway PostgreSQL plugin

---

## 📞 Support Resources

- **Railway Docs**: https://docs.railway.app/
- **Django Deployment**: https://docs.djangoproject.com/en/stable/howto/deployment/
- **Project Repo**: https://github.com/serenelion/earth-care-network

---

**Ready to Deploy:** ✅ YES  
**Next Command:** `railway up` or `railway link` then `railway up`
