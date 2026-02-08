import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <div className="hero">
        <h2>Welcome to Earth Care Network</h2>
        <p>
          Discover and connect with the regenerative economy ecosystem. 
          Find land-based projects, service providers, and conscious capital 
          sources all in one place.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/projects" className="btn btn-primary">
            Explore Directory
          </Link>
          <Link to="/submit" className="btn btn-secondary">
            Submit Listing
          </Link>
        </div>
      </div>

      <div className="category-cards">
        <div className="category-card">
          <div className="category-icon">🌱</div>
          <h3>Land-Based Projects</h3>
          <p>
            Regenerative farms, retreat centers, intentional communities, 
            and educational centers pioneering sustainable living.
          </p>
          <Link to="/projects" className="btn btn-primary">
            View Projects (20)
          </Link>
        </div>

        <div className="category-card">
          <div className="category-icon">🛠️</div>
          <h3>Service Providers</h3>
          <p>
            Consultants, designers, and implementers offering regenerative 
            design, permaculture, and holistic management services.
          </p>
          <Link to="/services" className="btn btn-primary">
            View Services (31)
          </Link>
        </div>

        <div className="category-card">
          <div className="category-icon">💚</div>
          <h3>Conscious Capital</h3>
          <p>
            Impact investors, grant programs, and funding sources supporting 
            regenerative agriculture and environmental restoration.
          </p>
          <Link to="/capital" className="btn btn-primary">
            View Capital (30)
          </Link>
        </div>
      </div>

      <div style={{ marginTop: '4rem', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem', color: '#2d5016' }}>About Earth Care Network</h2>
        <p style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.8', color: '#666' }}>
          Earth Care Network is a comprehensive directory connecting the regenerative economy. 
          We curate and verify organizations, projects, and funding sources that are actively 
          working to restore ecosystems, build soil health, and create regenerative systems. 
          Whether you're looking to learn, connect, or invest in the regenerative future, 
          you'll find your community here.
        </p>
      </div>
    </div>
  );
}

export default Home;
