# Earth Care Network - Deployment Guide

## Project Overview

A full-stack directory application for the regenerative economy with 81 verified entries across three categories:
- **20 Land-Based Projects** (farms, retreats, communities)
- **31 Service Providers** (consultants, designers, implementers)  
- **30 Capital Sources** (grants, investors, funds)

**Powered by Terralux** (terra-lux.org)

## Tech Stack

### Backend
- Django 4.2.28 + Django REST Framework
- PostgreSQL (Railway production) / SQLite (development)
- CORS Headers for cross-origin requests
- Whitenoise for static file serving

### Frontend
- React 18 + Vite
- React Router for navigation
- Axios for API requests
- Modern, responsive UI

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Environment Configuration

Create `.env` file in backend directory:

```bash
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### 3. Database Setup

```bash
python manage.py migrate
python manage.py load_research_data  # Load 81 directory entries
python manage.py createsuperuser  # Create admin user
```

### 4. Run Development Server

```bash
python manage.py runserver
```

API will be available at: `http://localhost:8000/api/`

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Environment Configuration

Create `.env` file in frontend directory:

```bash
VITE_API_URL=http://localhost:8000/api
```

### 3. Run Development Server

```bash
npm run dev
```

Frontend will be available at: `http://localhost:3000`

## API Endpoints

### Land-Based Projects
- `GET /api/projects/` - List all projects
- `GET /api/projects/{id}/` - Project detail
- `GET /api/projects/categories/` - List categories
- `GET /api/projects/tags/` - List all tags

**Filters:** `?category=farm&featured=true&search=regenerative`

### Service Providers
- `GET /api/services/` - List all providers
- `GET /api/services/{id}/` - Provider detail
- `GET /api/services/categories/` - List categories
- `GET /api/services/services/` - List all services
- `GET /api/services/tags/` - List all tags

**Filters:** `?category=design&search=permaculture`

### Capital Sources
- `GET /api/capital/` - List all sources
- `GET /api/capital/{id}/` - Source detail
- `GET /api/capital/categories/` - List categories
- `GET /api/capital/funding_types/` - List funding types
- `GET /api/capital/focus_areas/` - List focus areas

**Filters:** `?funding_type=grants&search=agriculture`

### Submissions
- `POST /api/submissions/` - Submit new entry
- `GET /api/submissions/` - List submissions (admin only)

## Railway Deployment (Backend)

### 1. Prepare for Deployment

```bash
# Generate secret key
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```

### 2. Railway Configuration

Create `railway.json`:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### 3. Environment Variables (Railway Dashboard)

```
SECRET_KEY=<generated-secret-key>
DEBUG=False
ALLOWED_HOSTS=*.railway.app
DATABASE_URL=<railway-postgres-url>  # Auto-provided
CORS_ALLOWED_ORIGINS=https://your-netlify-app.netlify.app
```

### 4. Deploy

```bash
railway login
railway init
railway up
```

### 5. Run Migrations

```bash
railway run python manage.py migrate
railway run python manage.py load_research_data
railway run python manage.py createsuperuser
```

## Netlify Deployment (Frontend)

### 1. Build Configuration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. Environment Variables (Netlify Dashboard)

```
VITE_API_URL=https://your-railway-app.railway.app/api
```

### 3. Deploy

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login and deploy
netlify login
netlify init
netlify deploy --prod
```

## Admin Interface

Access Django admin at: `http://localhost:8000/admin/`

**Features:**
- Manage directory entries
- Review submissions
- Feature entries
- Verify listings

## Database Schema

### BaseDirectoryEntry (Abstract)
- `name` - Organization name
- `url` - Website URL
- `description` - Full description
- `location` - Geographic location
- `tags` - Array of tags
- `created_at` - Creation timestamp
- `updated_at` - Last update
- `is_verified` - Verification status
- `featured` - Featured status

### LandBasedProject
Inherits BaseDirectoryEntry, adds:
- `category` - Project type (farm, retreat, community, etc.)
- `contact_email` - Email address
- `contact_phone` - Phone number
- `size_acres` - Land size in acres

### ServiceProvider
Inherits BaseDirectoryEntry, adds:
- `category` - Service type (design, implementation, education, etc.)
- `services` - Array of services offered
- `service_area` - Geographic service area
- `contact_email` - Email address
- `contact_phone` - Phone number

### CapitalSource
Inherits BaseDirectoryEntry, adds:
- `category` - Source type (grants, VC, impact, etc.)
- `funding_type` - Type of funding
- `focus_areas` - Array of focus areas
- `typical_investment_range` - Investment range
- `application_url` - Application URL
- `contact_email` - Email address

### DirectorySubmission
- `entry_type` - Type of submission
- `status` - pending/approved/rejected
- `data` - JSON data of submission
- `submitter_email` - Submitter email
- `submitter_notes` - Notes from submitter
- `admin_notes` - Notes from admin
- `created_at` - Submission timestamp
- `reviewed_at` - Review timestamp

## Performance Optimization

### Backend
- Database indexes on frequently queried fields
- Django query optimization (select_related, prefetch_related)
- Page size: 20 entries per page
- Caching headers configured

### Frontend
- Code splitting by route
- Lazy loading of components
- Image optimization
- CDN delivery via Netlify

## SEO Optimization

- Semantic HTML structure
- Meta tags for social sharing
- Structured data (JSON-LD) for organizations
- Sitemap generation
- Mobile-responsive design

## Security

- CORS configured for specific origins
- CSRF protection enabled
- Environment variables for secrets
- HTTPS enforced in production
- Input validation on all endpoints
- Rate limiting (to be implemented)

## Monitoring

### Backend
- Railway logs for errors
- Django admin for data monitoring
- Database metrics via Railway dashboard

### Frontend
- Netlify analytics
- Console error tracking
- Performance monitoring

## Future Enhancements

1. **User Authentication**
   - Member accounts
   - Saved favorites
   - Reviews and ratings

2. **Advanced Search**
   - Geographic search with maps
   - Multi-filter combinations
   - Search autocomplete

3. **Community Features**
   - Discussion forums
   - Event calendar
   - Project collaboration tools

4. **API Enhancements**
   - GraphQL endpoint
   - Webhooks for integrations
   - Mobile API optimization

5. **Content Management**
   - Automated verification workflows
   - Content moderation tools
   - Analytics dashboard

## Support

For issues or questions:
- GitHub Issues: [repository-url]
- Email: support@terra-lux.org
- Powered by Terralux: terra-lux.org

## License

MIT License - See LICENSE file for details

---

**Built with ❤️ for the regenerative economy**
