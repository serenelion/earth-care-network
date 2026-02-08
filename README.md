# Earth Care Network

**Digital White Pages for the Regenerative Economy**

A comprehensive directory connecting regenerative projects, service providers, and conscious capital sources. Built to grow the regenerative economy ecosystem.

**Powered by [Terralux](https://terra-lux.org)**

![Earth Care Network](https://img.shields.io/badge/Status-Live-success)
![Django](https://img.shields.io/badge/Backend-Django-green)
![React](https://img.shields.io/badge/Frontend-React-blue)

## 🌱 Features

- **81+ Verified Entries** across three categories
- **Land-Based Projects**: Regenerative farms, retreat centers, intentional communities
- **Service Providers**: Consultants, designers, implementers
- **Conscious Capital**: Grants, impact investors, regenerative funds
- **Advanced Search & Filtering** by category, location, and keywords
- **Responsive Design** for mobile and desktop
- **Submission System** for community contributions

## 🚀 Live Demo

- **Frontend**: [Deploy on Netlify]
- **Backend API**: [Deploy on Railway]
- **Admin Panel**: [Railway URL]/admin

## 📊 Directory Stats

- 20 Land-Based Projects
- 31 Service Providers
- 30 Capital Sources
- Global coverage across 6+ countries

## 🛠️ Tech Stack

### Backend
- Django 4.2 + Django REST Framework
- PostgreSQL (Production) / SQLite (Development)
- CORS Headers, Django Filters
- Railway deployment

### Frontend
- React 18 + Vite
- React Router
- Axios for API calls
- Netlify deployment

## 💻 Local Development

### Prerequisites
- Python 3.9+
- Node.js 18+
- Git

### Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Run migrations and load data
python manage.py migrate
python manage.py load_research_data  # Loads 81 entries
python manage.py createsuperuser

# Start server
python manage.py runserver
```

Backend will run at `http://localhost:8000`

### Frontend Setup

```bash
cd frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000/api" > .env

# Start dev server
npm run dev
```

Frontend will run at `http://localhost:5173`

## 🌐 API Endpoints

### Projects
- `GET /api/projects/` - List all land-based projects
- `GET /api/projects/{id}/` - Get project details
- `GET /api/projects/categories/` - List categories
- `GET /api/projects/tags/` - List tags

### Services
- `GET /api/services/` - List all service providers
- `GET /api/services/{id}/` - Get provider details
- `GET /api/services/categories/` - List categories
- `GET /api/services/tags/` - List tags

### Capital
- `GET /api/capital/` - List all capital sources
- `GET /api/capital/{id}/` - Get source details
- `GET /api/capital/categories/` - List categories
- `GET /api/capital/funding_types/` - List funding types

### Submissions
- `POST /api/submissions/` - Submit new entry

**Query Parameters**: `?category=farm&search=regenerative&featured=true`

## 🚢 Deployment

### Railway (Backend)

```bash
railway login
railway init
railway up

# Set environment variables in Railway dashboard:
# SECRET_KEY, DEBUG=False, ALLOWED_HOSTS, DATABASE_URL (auto-provided)

# Run migrations
railway run python manage.py migrate
railway run python manage.py load_research_data
railway run python manage.py createsuperuser
```

### Netlify (Frontend)

```bash
cd frontend
npm run build

netlify login
netlify init
netlify deploy --prod

# Set environment variable in Netlify dashboard:
# VITE_API_URL=https://your-railway-app.railway.app/api
```

## 📖 Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment guide
- [PROJECT-SUMMARY.md](./PROJECT-SUMMARY.md) - Project overview

## 🤝 Contributing

We welcome contributions to grow the regenerative economy directory!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Or submit entries directly through the [submission form](https://your-site.netlify.app/submit).

## 📄 License

MIT License - see LICENSE file for details

## 🌍 About the Project

Earth Care Network was created to connect the regenerative economy ecosystem. We curate and verify organizations, projects, and funding sources actively working to restore ecosystems, build soil health, and create regenerative systems.

Whether you're looking to learn, connect, or invest in the regenerative future, you'll find your community here.

## 💚 Powered By

**[Terralux](https://terra-lux.org)** - Regenerative building and design

## 📧 Contact

- GitHub Issues: [Report bugs or suggest features]
- Email: support@terra-lux.org
- Website: terra-lux.org

---

**Built with ❤️ for the regenerative economy**
