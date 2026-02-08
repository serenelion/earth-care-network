import { Link } from 'react-router-dom';

function About() {
  const creators = [
    {
      name: "Regenerative Farmers",
      icon: "🌾",
      description: "Pioneers restoring soil health and biodiversity through regenerative agriculture practices."
    },
    {
      name: "Permaculture Designers",
      icon: "🌿",
      description: "Visionaries creating resilient systems that work with nature, not against it."
    },
    {
      name: "Community Builders",
      icon: "🏘️",
      description: "Leaders forming intentional communities based on sustainability and cooperation."
    },
    {
      name: "Impact Investors",
      icon: "💚",
      description: "Funders directing capital toward regenerative projects and enterprises."
    },
    {
      name: "Educators & Researchers",
      icon: "📚",
      description: "Scholars advancing knowledge and teaching the next generation of regenerators."
    },
    {
      name: "Restoration Practitioners",
      icon: "🌳",
      description: "Healers repairing damaged ecosystems and rewilding degraded landscapes."
    }
  ];

  return (
    <div className="fade-in">
      <div className="hero">
        <div className="hero-content">
          <h1>About Earth Care Network</h1>
          <p>
            Connecting the regenerative economy. Building the bridge between
            conscious capital, regenerative projects, and service providers
            who are healing the Earth.
          </p>
        </div>
      </div>

      <div className="content-section">
        <h2 className="section-title">Our Mission</h2>
        <p style={{ fontSize: 'var(--font-size-lg)', lineHeight: 'var(--line-height-relaxed)', marginBottom: 'var(--space-xl)' }}>
          Earth Care Network exists to make the regenerative economy visible, accessible, and thriving.
          We believe that the solutions to our ecological crisis already exist in the hands of farmers,
          designers, communities, and visionaries working on the ground. Our role is to connect them
          with each other and with the resources they need to scale their impact.
        </p>

        <div style={{ 
          background: 'var(--bg-accent)', 
          padding: 'var(--space-xl)', 
          borderRadius: 'var(--radius-lg)', 
          borderLeft: '4px solid var(--terralux-gold)',
          marginBottom: 'var(--space-2xl)'
        }}>
          <p style={{ fontSize: 'var(--font-size-lg)', fontStyle: 'italic', color: 'var(--text-primary)' }}>
            "The greatest threat to our planet is the belief that someone else will save it."
            <br />
            <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--text-secondary)' }}>
              — Robert Swan
            </span>
          </p>
        </div>

        <p style={{ fontSize: 'var(--font-size-lg)', lineHeight: 'var(--line-height-relaxed)' }}>
          That's why we spotlight the heroes who are already doing the work—and make it easy
          for others to join them. Whether you're looking to invest, learn, partner, or start
          your own regenerative project, this directory is your starting point.
        </p>
      </div>

      <div className="content-section">
        <h2 className="section-title">The Heroes of the Regenerative Economy</h2>
        <p style={{ marginBottom: 'var(--space-2xl)', fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)' }}>
          These are the change-makers building a regenerative future:
        </p>
        
        <div className="category-grid">
          {creators.map((creator, index) => (
            <div key={index} className="category-card slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="category-icon">{creator.icon}</div>
              <h3>{creator.name}</h3>
              <p>{creator.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="hero" style={{ marginTop: 'var(--space-3xl)' }}>
        <div className="hero-content">
          <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--space-md)' }}>
            Join the Movement
          </h2>
          <p style={{ marginBottom: 'var(--space-xl)' }}>
            Are you part of the regenerative economy? Add your project, claim your profile,
            or support the network as a sponsor.
          </p>
          <div className="hero-actions">
            <Link to="/submit" className="btn btn-primary">
              Add Your Enterprise
            </Link>
            <Link to="/projects" className="btn btn-outline">
              Browse Directory
            </Link>
            <Link to="/sponsors" className="btn btn-outline">
              Become a Sponsor
            </Link>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2 className="section-title">What We Offer</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-xl)' }}>
          <div>
            <h4 style={{ color: 'var(--terralux-gold)', marginBottom: 'var(--space-sm)', fontSize: 'var(--font-size-lg)' }}>
              For Projects & Enterprises
            </h4>
            <ul style={{ lineHeight: 'var(--line-height-relaxed)', color: 'var(--text-secondary)' }}>
              <li>Free directory listing</li>
              <li>Verified profiles</li>
              <li>Connection to funders</li>
              <li>Community visibility</li>
              <li>Partnership opportunities</li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--terralux-gold)', marginBottom: 'var(--space-sm)', fontSize: 'var(--font-size-lg)' }}>
              For Service Providers
            </h4>
            <ul style={{ lineHeight: 'var(--line-height-relaxed)', color: 'var(--text-secondary)' }}>
              <li>Showcase your expertise</li>
              <li>Connect with projects</li>
              <li>Build your network</li>
              <li>Share your services</li>
              <li>Grow your impact</li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--terralux-gold)', marginBottom: 'var(--space-sm)', fontSize: 'var(--font-size-lg)' }}>
              For Funders & Investors
            </h4>
            <ul style={{ lineHeight: 'var(--line-height-relaxed)', color: 'var(--text-secondary)' }}>
              <li>Discover vetted projects</li>
              <li>Connect with founders</li>
              <li>Track your impact</li>
              <li>Build relationships</li>
              <li>Support the movement</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2 className="section-title">How It Works</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'start' }}>
            <div style={{ 
              minWidth: '48px', 
              height: '48px', 
              background: 'var(--terralux-gold)', 
              color: 'white', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontWeight: 'bold',
              fontSize: 'var(--font-size-xl)'
            }}>
              1
            </div>
            <div>
              <h4 style={{ color: 'var(--earth-green)', marginBottom: 'var(--space-sm)' }}>Submit Your Profile</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
                Fill out our simple form with details about your project, service, or funding source.
                We review all submissions to ensure quality and authenticity.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'start' }}>
            <div style={{ 
              minWidth: '48px', 
              height: '48px', 
              background: 'var(--terralux-gold)', 
              color: 'white', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontWeight: 'bold',
              fontSize: 'var(--font-size-xl)'
            }}>
              2
            </div>
            <div>
              <h4 style={{ color: 'var(--earth-green)', marginBottom: 'var(--space-sm)' }}>Get Verified</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
                Our team verifies your submission and adds it to the directory. Verified profiles
                gain trust and visibility within the community.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'start' }}>
            <div style={{ 
              minWidth: '48px', 
              height: '48px', 
              background: 'var(--terralux-gold)', 
              color: 'white', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontWeight: 'bold',
              fontSize: 'var(--font-size-xl)'
            }}>
              3
            </div>
            <div>
              <h4 style={{ color: 'var(--earth-green)', marginBottom: 'var(--space-sm)' }}>Claim Your Enterprise</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
                If your organization is already listed, you can claim it using your company email.
                This gives you control over your profile and enables direct contact.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'start' }}>
            <div style={{ 
              minWidth: '48px', 
              height: '48px', 
              background: 'var(--terralux-gold)', 
              color: 'white', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontWeight: 'bold',
              fontSize: 'var(--font-size-xl)'
            }}>
              4
            </div>
            <div>
              <h4 style={{ color: 'var(--earth-green)', marginBottom: 'var(--space-sm)' }}>Connect & Collaborate</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
                Once you're in the directory, you can be discovered by funders, partners, customers,
                and collaborators from around the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
