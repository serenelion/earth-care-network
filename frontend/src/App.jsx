import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Capital from './pages/Capital';
import CapitalDetail from './pages/CapitalDetail';
import Submit from './pages/Submit';
import About from './pages/About';
import Sponsors from './pages/Sponsors';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="logo-container" onClick={closeMobileMenu}>
              <img src="/leaf-icon.svg" alt="Earth Care Network" className="logo-icon" />
              <div className="logo-text">
                <h1>Earth Care Network</h1>
                <p className="tagline">The Regenerative Economy</p>
              </div>
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {/* Navigation Links */}
            <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
              <NavLink 
                to="/projects" 
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={closeMobileMenu}
              >
                Projects
              </NavLink>
              <NavLink 
                to="/services" 
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={closeMobileMenu}
              >
                Services
              </NavLink>
              <NavLink 
                to="/capital" 
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={closeMobileMenu}
              >
                Capital
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={closeMobileMenu}
              >
                About
              </NavLink>
              <NavLink 
                to="/sponsors" 
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={closeMobileMenu}
              >
                Sponsors
              </NavLink>
              <NavLink 
                to="/submit" 
                className={({ isActive }) => `submit-btn ${isActive ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Submit
              </NavLink>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/capital" element={<Capital />} />
            <Route path="/capital/:id" element={<CapitalDetail />} />
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
              <Link to="/projects" onClick={closeMobileMenu}>Land-Based Projects</Link>
              <Link to="/services" onClick={closeMobileMenu}>Service Providers</Link>
              <Link to="/capital" onClick={closeMobileMenu}>Capital Sources</Link>
              <Link to="/submit" onClick={closeMobileMenu}>Submit Listing</Link>
            </div>
            
            <div className="footer-section">
              <h4>About</h4>
              <Link to="/about" onClick={closeMobileMenu}>Our Mission</Link>
              <Link to="/sponsors" onClick={closeMobileMenu}>Sponsors</Link>
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
