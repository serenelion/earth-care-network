# Manual Frontend Setup

Due to npm cache permission issues, here's how to set up the frontend manually:

## Fix npm permissions first:

```bash
# Fix npm cache permissions
sudo chown -R $(whoami) ~/.npm

# Or use a different npm cache
npm config set cache /tmp/npm-cache --global

# Then install
cd earth-care-network/frontend
npm install
npm install react-router-dom axios
```

## Or use the pre-created Vite structure:

The frontend directory already has the basic Vite + React structure created.

Just run:

```bash
cd earth-care-network/frontend
npm install
npm install react-router-dom axios
npm run dev
```

## Package.json is already created with:

```json
{
  "name": "earth-care-network",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.2"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.8"
  }
}
```

The Vite configuration and basic React structure are already in place!
