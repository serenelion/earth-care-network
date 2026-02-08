import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Services from './pages/Services';
import Capital from './pages/Capital';
import Submit from './pages/Submit';
import About from './pages/About';
import Sponsors from './pages/Sponsors';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="logo-container">
              <img src="/leaf-icon.svg" alt="Earth Care Network" className="logo-icon" />
              <div className="logo-text">
                <h1>Earth Care Network</h1>
                <p className="tagline">The Regenerative Economy</p>
              </div>
            </Link>
            <div className="nav-links">
              <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''}>
                Projects
              </NavLink>
              <NavLink to="/services" className={({ isActive }) => isActive ? 'active' : ''}>
                Services
              </NavLink>
              <NavLink to="/capital" className={({ isActive }) => isActive ? 'active' : ''}>
                Capital
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
                About
              </NavLink>
              <NavLink to="/sponsors" className={({ isActive }) => isActive ? 'active' : ''}>
                Sponsors
              </NavLink>
              <NavLink to="/submit" className={({ isActive }) => isActive ? 'active' : ''}>
                Submit
              </NavLink>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/capital" element={<Capital />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/about" element={<About />} />
            <Route path="/sponsors" element={<Sponsors />} />
          </Routes>
        </main>

        <footer>
          <div className="footer-container">
            <div className="footer-section">
              <img src="/terralux-logo.svg" alt="TerraLux" className="footer-logo" />
              <p>
                Earth Care Network is powered by TerraLux, supporting the regenerative
                economy through technology and community.
              </p>
            </div>
            
            <div className="footer-section">
              <h4>Directory</h4>
              <Link to="/projects">Land-Based Projects</Link>
              <Link to="/services">Service Providers</Link>
              <Link to="/capital">Capital Sources</Link>
              <Link to="/submit">Submit Listing</Link>
            </div>
            
            <div className="footer-section">
              <h4>About</h4>
              <Link to="/about">Our Mission</Link>
              <Link to="/sponsors">Sponsors</Link>
              <a href="https://terra-lux.org" target="_blank" rel="noopener noreferrer">
                TerraLux
              </a>
              <a href="https://murmurations.network" target="_blank" rel="noopener noreferrer">
                Murmurations Network
              </a>
            </div>
            
            <div className="footer-section">
              <h4>Connect</h4>
              <p>
                Join the regenerative economy movement. Connect with projects,
                service providers, and funders building a better future.
              </p>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2026 Earth Care Network - Powered by <a href="https://terra-lux.org" target="_blank" rel="noopener noreferrer">TerraLux</a></p>
            <p style={{ marginTop: 'var(--space-sm)', fontSize: 'var(--font-size-sm)', opacity: 0.8 }}>
              Connecting the Regenerative Economy
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
