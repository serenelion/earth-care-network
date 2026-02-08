import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Services from './pages/Services';
import Capital from './pages/Capital';
import Submit from './pages/Submit';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="container">
            <Link to="/" className="logo">
              <h1>Earth Care Network</h1>
              <p className="tagline">Digital White Pages for the Regenerative Economy</p>
            </Link>
            <div className="nav-links">
              <Link to="/projects">Land Projects</Link>
              <Link to="/services">Services</Link>
              <Link to="/capital">Capital</Link>
              <Link to="/submit">Submit</Link>
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
          </Routes>
        </main>

        <footer>
          <div className="container">
            <p>Powered by <a href="https://terra-lux.org" target="_blank" rel="noopener noreferrer">Terralux</a></p>
            <p>© 2026 Earth Care Network - Connecting the Regenerative Economy</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
