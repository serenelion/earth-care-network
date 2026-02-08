import { useState, useEffect } from 'react';
import { getSponsors, applyAsSponsor } from '../api';
import BrandButton from '../components/brand/BrandButton';
import BrandInput from '../components/brand/BrandInput';
import BrandSelect from '../components/brand/BrandSelect';
import BrandTextarea from '../components/brand/BrandTextarea';
import BrandFormField from '../components/brand/BrandFormField';

function Sponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showApplication, setShowApplication] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    website_url: '',
    logo_url: '',
    description: '',
    commitment: '',
    contact_name: '',
    contact_email: '',
    tier: 'community'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSponsors();
  }, []);

  const loadSponsors = async () => {
    try {
      setLoading(true);
      const data = await getSponsors();
      setSponsors(data.results || data);
    } catch (err) {
      console.error('Error loading sponsors:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      // Combine description and commitment for the backend description field
      const fullDescription = `Organization Bio: ${formData.description}\n\nCommitment to Earth Care Network: ${formData.commitment}`;

      const payload = {
        name: formData.name,
        website_url: formData.website_url,
        logo_url: formData.logo_url,
        description: fullDescription,
        contact_name: formData.contact_name,
        contact_email: formData.contact_email,
        tier: formData.tier
      };

      await applyAsSponsor(payload);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        website_url: '',
        logo_url: '',
        description: '',
        commitment: '',
        contact_name: '',
        contact_email: '',
        tier: 'community'
      });
      setTimeout(() => {
        setShowApplication(false);
        setSubmitSuccess(false);
      }, 5000);
    } catch (err) {
      setError('Failed to submit application. Please check your inputs and try again.');
      console.error('Error submitting application:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const tierInfo = {
    founding: {
      title: 'Founding Sponsor',
      tagline: 'Strategic visionaries shaping the future of the network.',
      benefits: ['Prominent logo placement', 'Dedicated feature page', 'Priority support', 'Advisory board seat', 'Co-branding opportunities']
    },
    platinum: {
      title: 'Platinum Sponsor',
      tagline: 'High-impact partners driving regenerative growth.',
      benefits: ['Large logo placement', 'Featured in newsletters', 'Priority support', 'Quarterly meetings', 'Social media recognition']
    },
    gold: {
      title: 'Gold Sponsor',
      tagline: 'Dedicated supporters of ecosystem restoration.',
      benefits: ['Medium logo placement', 'Mentioned in updates', 'Standard support', 'Annual meeting', 'Community recognition']
    },
    silver: {
      title: 'Silver Sponsor',
      tagline: 'Committed contributors to the regenerative economy.',
      benefits: ['Logo listing', 'Newsletter mentions', 'Community access', 'Annual report feature']
    },
    community: {
      title: 'Community Supporter',
      tagline: 'Foundational members of our thriving ecosystem.',
      benefits: ['Name listing', 'Community recognition', 'Newsletter updates']
    }
  };

  const terraluxSponsor = {
    id: 'terralux',
    name: 'TerraLux',
    tier: 'founding',
    logo_url: '/terralux-logo.svg',
    website_url: 'https://terra-lux.org',
    description: 'TerraLux is the founding sponsor of Earth Care Network. We support regenerative projects, communities, and enterprises through technology, funding, and strategic partnerships. Our mission is to accelerate the transition to a regenerative economy.',
    featured: true
  };

  return (
    <div className="fade-in">
      <div className="hero">
        <div className="hero-content">
          <h1>Our Sponsors</h1>
          <p>
            Earth Care Network is powered by organizations committed to ethical business
            development and the transition to a regenerative economy.
          </p>
        </div>
      </div>

      {/* Founding Sponsor - TerraLux */}
      <div className="content-section" style={{ background: 'linear-gradient(135deg, var(--cream) 0%, white 100%)', border: '2px solid var(--terralux-gold)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xl)', marginBottom: 'var(--space-xl)', flexWrap: 'wrap' }}>
          <img
            src={terraluxSponsor.logo_url}
            alt="TerraLux"
            style={{ width: '180px', height: 'auto' }}
          />
          <div style={{ flex: 1 }}>
            <div style={{
              display: 'inline-block',
              background: 'var(--terralux-gold)',
              color: 'white',
              padding: 'var(--space-xs) var(--space-md)',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'bold',
              marginBottom: 'var(--space-sm)'
            }}>
              ⭐ FOUNDING SPONSOR
            </div>
            <h2 style={{ color: 'var(--earth-green)', fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--space-md)' }}>
              TerraLux
            </h2>
          </div>
        </div>

        <p style={{
          fontSize: 'var(--font-size-lg)',
          lineHeight: 'var(--line-height-relaxed)',
          color: 'var(--text-primary)',
          marginBottom: 'var(--space-lg)'
        }}>
          {terraluxSponsor.description}
        </p>

        <a
          href={terraluxSponsor.website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Visit TerraLux →
        </a>
      </div>

      {/* Other Sponsors */}
      {!loading && sponsors.length > 0 && (
        <div className="content-section">
          <h2 className="section-title">A Network of Value & Purpose</h2>
          <div className="directory-grid">
            {sponsors.map(sponsor => (
              <div key={sponsor.id} className={`directory-card ${sponsor.featured ? 'featured' : ''}`}>
                <div style={{ marginBottom: 'var(--space-md)', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={sponsor.logo_url}
                    alt={sponsor.name}
                    style={{ maxWidth: '100%', maxHeight: '80px', objectFit: 'contain' }}
                  />
                </div>
                <h3>{sponsor.name}</h3>
                <div style={{
                  display: 'inline-block',
                  background: 'var(--bg-accent)',
                  color: 'var(--earth-green)',
                  padding: 'var(--space-xs) var(--space-md)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'bold',
                  marginBottom: 'var(--space-md)'
                }}>
                  {tierInfo[sponsor.tier]?.title || sponsor.tier}
                </div>
                <p className="description" style={{ fontSize: 'var(--font-size-sm)' }}>
                  {sponsor.description.split('\n\nCommitment')[0].replace('Organization Bio: ', '')}
                </p>
                <a
                  href={sponsor.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ marginTop: 'auto' }}
                >
                  Visit Website
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sponsorship Opportunities (No Prices) */}
      <div className="content-section">
        <h2 className="section-title">Support the Movement</h2>
        <p style={{ marginBottom: 'var(--space-2xl)', fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)' }}>
          Join the ecosystem of visionary organizations leading the regenerative revolution.
          We focus on value alignment and shared purpose.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-xl)' }}>
          {Object.entries(tierInfo).map(([key, tier]) => (
            <div
              key={key}
              style={{
                background: key === 'founding' ? 'linear-gradient(135deg, var(--terralux-gold-light), var(--terralux-gold))' : 'white',
                border: key === 'founding' ? '2px solid var(--terralux-gold-dark)' : '1px solid var(--border-light)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-xl)',
                boxShadow: key === 'founding' ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                color: key === 'founding' ? 'white' : 'inherit',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <h3 style={{
                marginBottom: 'var(--space-sm)',
                fontSize: 'var(--font-size-xl)',
                color: key === 'founding' ? 'white' : 'var(--earth-green)'
              }}>
                {tier.title}
              </h3>
              <p style={{
                fontSize: 'var(--font-size-sm)',
                marginBottom: 'var(--space-lg)',
                opacity: 0.9,
                fontStyle: 'italic'
              }}>
                {tier.tagline}
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                lineHeight: 'var(--line-height-relaxed)',
                color: key === 'founding' ? 'rgba(255,255,255,0.95)' : 'var(--text-secondary)',
                marginTop: 'auto'
              }}>
                {tier.benefits.map((benefit, index) => (
                  <li key={index} style={{ marginBottom: 'var(--space-sm)', display: 'flex', alignItems: 'start', gap: 'var(--space-sm)' }}>
                    <span style={{ color: key === 'founding' ? 'white' : 'var(--terralux-gold)' }}>✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Application Section */}
      <div className="hero" style={{ marginTop: 'var(--space-3xl)' }}>
        <div className="hero-content">
          <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--space-md)' }}>
            Start Your Sponsorship Journey
          </h2>
          <p style={{ marginBottom: 'var(--space-xl)' }}>
            Are you an enterprise committed to ethical business development?
            Partner with us to grow the regenerative economy.
          </p>
          {!showApplication && (
            <BrandButton
              onClick={() => setShowApplication(true)}
              variant="primary"
              style={{ fontSize: 'var(--font-size-lg)' }}
            >
              Explore Sponsorship Alignment
            </BrandButton>
          )}
        </div>
      </div>

      {showApplication && (
        <div className="content-section" id="application-form">
          <h2 className="section-title">Alignment Application</h2>
          <p style={{ marginBottom: 'var(--space-xl)', color: 'var(--text-secondary)' }}>
            Tell us about your organization and your commitment to regenerative practices.
            Our team will reach out to discuss the best way to align our goals.
          </p>

          {submitSuccess && (
            <div style={{
              background: 'var(--success)',
              color: 'white',
              padding: 'var(--space-lg)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-xl)',
              textAlign: 'center'
            }}>
              ✓ Application submitted successfully! We'll be in touch soon to discuss alignment.
            </div>
          )}

          {error && (
            <div className="error" style={{ marginBottom: 'var(--space-xl)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <BrandFormField label="Organization Name" required>
              <BrandInput
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enterprise Name"
              />
            </BrandFormField>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
              <BrandFormField label="Website URL" required>
                <BrandInput
                  type="url"
                  required
                  value={formData.website_url}
                  onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                  placeholder="https://..."
                />
              </BrandFormField>
              <BrandFormField label="Logo URL (Icon/Avatar)" required>
                <BrandInput
                  type="url"
                  required
                  placeholder="https://.../logo.png"
                  value={formData.logo_url}
                  onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                />
              </BrandFormField>
            </div>

            <BrandFormField label="Organization Bio" required>
              <BrandTextarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Tell us about your organization's mission..."
                rows={3}
              />
            </BrandFormField>

            <BrandFormField label="Why are you committed to sponsoring Earth Care Network?" required>
              <BrandTextarea
                required
                value={formData.commitment}
                onChange={(e) => setFormData({ ...formData, commitment: e.target.value })}
                placeholder="Explain your alignment with the regenerative economy and ethical business development..."
                rows={5}
              />
            </BrandFormField>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 'var(--space-md)' }}>
              <BrandFormField label="Primary Contact" required>
                <BrandInput
                  required
                  value={formData.contact_name}
                  onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                  placeholder="Contact Name"
                />
              </BrandFormField>

              <BrandFormField label="Contact Email" required>
                <BrandInput
                  type="email"
                  required
                  value={formData.contact_email}
                  onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                  placeholder="email@organization.com"
                />
              </BrandFormField>
            </div>

            <BrandFormField label="Desired Alignment Level" required>
              <BrandSelect
                required
                value={formData.tier}
                onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                options={[
                  { value: 'community', label: 'Community Supporter' },
                  { value: 'silver', label: 'Silver Sponsor' },
                  { value: 'gold', label: 'Gold Sponsor' },
                  { value: 'platinum', label: 'Platinum Sponsor' },
                  { value: 'founding', label: 'Founding Partner' },
                ]}
              />
            </BrandFormField>

            <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-xl)' }}>
              <BrandButton
                type="submit"
                variant="primary"
                disabled={submitting}
                className="btn-premium"
              >
                {submitting ? 'Sending...' : 'Submit Alignment Application'}
              </BrandButton>
              <BrandButton
                type="button"
                onClick={() => setShowApplication(false)}
                variant="secondary"
              >
                Cancel
              </BrandButton>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Sponsors;
