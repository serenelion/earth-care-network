import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="fade-in">
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome to Earth Care Network</h1>
          <p>
            The digital white pages for the regenerative economy. Discover and connect
            with land-based projects, service providers, and conscious capital sources
            building a thriving, regenerative future.
          </p>
          <div className="hero-actions">
            <Link to="/projects" className="btn btn-primary">
              Explore Directory
            </Link>
            <Link to="/about" className="btn btn-outline">
              Learn More
            </Link>
            <Link to="/submit" className="btn btn-outline">
              Submit Listing
            </Link>
          </div>
        </div>
      </div>

      <div className="category-grid">
        <div className="category-card">
          <div className="category-icon">🌱</div>
          <h3>Land-Based Projects</h3>
          <p>
            Regenerative farms, retreat centers, intentional communities,
            and educational centers pioneering sustainable living and
            ecosystem restoration.
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
            design, permaculture, holistic management, and restoration services.
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
            regenerative agriculture, conservation, and environmental restoration.
          </p>
          <Link to="/capital" className="btn btn-primary">
            View Capital (30)
          </Link>
        </div>
      </div>

      <div className="content-section" style={{ marginTop: 'var(--space-3xl)' }}>
        <h2 className="section-title">Why Earth Care Network?</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: 'var(--space-2xl)',
          marginTop: 'var(--space-xl)'
        }}>
          <div>
            <h4 style={{ color: 'var(--terralux-gold)', marginBottom: 'var(--space-sm)', fontSize: 'var(--font-size-lg)' }}>
              🔍 Discover
            </h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
              Find regenerative projects, expert service providers, and funding sources
              all in one curated directory.
            </p>
          </div>

          <div>
            <h4 style={{ color: 'var(--terralux-gold)', marginBottom: 'var(--space-sm)', fontSize: 'var(--font-size-lg)' }}>
              🤝 Connect
            </h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
              Build relationships with like-minded organizations and individuals
              working toward regenerative solutions.
            </p>
          </div>

          <div>
            <h4 style={{ color: 'var(--terralux-gold)', marginBottom: 'var(--space-sm)', fontSize: 'var(--font-size-lg)' }}>
              🌍 Collaborate
            </h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
              Partner on projects, share resources, and accelerate the transition
              to a regenerative economy.
            </p>
          </div>

          <div>
            <h4 style={{ color: 'var(--terralux-gold)', marginBottom: 'var(--space-sm)', fontSize: 'var(--font-size-lg)' }}>
              ✅ Verified
            </h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
              All listings are verified to ensure quality, authenticity,
              and alignment with regenerative principles.
            </p>
          </div>
        </div>
      </div>

      <div className="hero" style={{ marginTop: 'var(--space-3xl)' }}>
        <div className="hero-content">
          <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--space-md)' }}>
            Join the Regenerative Economy
          </h2>
          <p style={{ marginBottom: 'var(--space-xl)' }}>
            Are you part of a regenerative project, service provider, or funding organization?
            Add your listing to connect with our growing community.
          </p>
          <div className="hero-actions">
            <Link to="/submit" className="btn btn-primary">
              Add Your Enterprise
            </Link>
            <Link to="/about" className="btn btn-outline">
              Learn About Us
            </Link>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2 className="section-title">About Earth Care Network</h2>
        <p style={{ 
          fontSize: 'var(--font-size-lg)', 
          lineHeight: 'var(--line-height-relaxed)', 
          color: 'var(--text-secondary)',
          maxWidth: 'var(--container-md)',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          Earth Care Network is a comprehensive directory connecting the regenerative economy.
          We curate and verify organizations, projects, and funding sources that are actively
          working to restore ecosystems, build soil health, and create regenerative systems.
          Whether you're looking to learn, connect, invest, or partner in the regenerative future,
          you'll find your community here.
        </p>
        <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
          <Link to="/about" className="btn btn-secondary">
            Read More About Our Mission
          </Link>
        </div>
      </div>

      <div style={{ 
        background: 'var(--bg-accent)', 
        borderRadius: 'var(--radius-xl)', 
        padding: 'var(--space-2xl)', 
        textAlign: 'center',
        marginTop: 'var(--space-3xl)'
      }}>
        <img 
          src="/terralux-logo.svg" 
          alt="TerraLux" 
          style={{ width: '160px', margin: '0 auto var(--space-lg)', opacity: 0.9 }}
        />
        <h3 style={{ color: 'var(--earth-green)', marginBottom: 'var(--space-md)' }}>
          Powered by TerraLux
        </h3>
        <p style={{ 
          color: 'var(--text-secondary)', 
          maxWidth: 'var(--container-sm)', 
          margin: '0 auto var(--space-lg)',
          lineHeight: 'var(--line-height-relaxed)'
        }}>
          TerraLux is the founding sponsor of Earth Care Network, supporting the regenerative
          economy through technology, funding, and strategic partnerships.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://terra-lux.org" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Visit TerraLux
          </a>
          <Link to="/sponsors" className="btn btn-secondary">
            View All Sponsors
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
