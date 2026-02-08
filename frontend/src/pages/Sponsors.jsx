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
    contact_name: '',
    contact_email: '',
    tier: 'community',
    contribution_amount: ''
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
    try {
      await applyAsSponsor(formData);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        website_url: '',
        logo_url: '',
        description: '',
        contact_name: '',
        contact_email: '',
        tier: 'community',
        contribution_amount: ''
      });
      setTimeout(() => {
        setShowApplication(false);
        setSubmitSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Error submitting application:', err);
    }
  };

  const tierInfo = {
    founding: {
      title: 'Founding Sponsor',
      amount: '$50,000+',
      benefits: ['Prominent logo placement', 'Dedicated feature page', 'Priority support', 'Advisory board seat', 'Co-branding opportunities']
    },
    platinum: {
      title: 'Platinum Sponsor',
      amount: '$25,000+',
      benefits: ['Large logo placement', 'Featured in newsletters', 'Priority support', 'Quarterly meetings', 'Social media recognition']
    },
    gold: {
      title: 'Gold Sponsor',
      amount: '$10,000+',
      benefits: ['Medium logo placement', 'Mentioned in updates', 'Standard support', 'Annual meeting', 'Community recognition']
    },
    silver: {
      title: 'Silver Sponsor',
      amount: '$5,000+',
      benefits: ['Logo listing', 'Newsletter mentions', 'Community access', 'Annual report feature']
    },
    community: {
      title: 'Community Supporter',
      amount: '$1,000+',
      benefits: ['Name listing', 'Community recognition', 'Newsletter updates']
    }
  };

  // Mock TerraLux as founding sponsor if not in actual data
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
            Supporting the regenerative economy through partnerships,
            funding, and community building.
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
          <h2 className="section-title">Our Community of Supporters</h2>
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
                <p className="description">{sponsor.description}</p>
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

      {/* Sponsorship Tiers */}
      <div className="content-section">
        <h2 className="section-title">Sponsorship Opportunities</h2>
        <p style={{ marginBottom: 'var(--space-2xl)', fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)' }}>
          Join TerraLux and other visionary organizations in supporting the regenerative economy.
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
                color: key === 'founding' ? 'white' : 'inherit'
              }}
            >
              <h3 style={{
                marginBottom: 'var(--space-md)',
                fontSize: 'var(--font-size-xl)',
                color: key === 'founding' ? 'white' : 'var(--earth-green)'
              }}>
                {tier.title}
              </h3>
              <div style={{
                fontSize: 'var(--font-size-2xl)',
                fontWeight: 'bold',
                marginBottom: 'var(--space-lg)',
                color: key === 'founding' ? 'white' : 'var(--terralux-gold)'
              }}>
                {tier.amount}
              </div>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                lineHeight: 'var(--line-height-relaxed)',
                color: key === 'founding' ? 'rgba(255,255,255,0.95)' : 'var(--text-secondary)'
              }}>
                {tier.benefits.map((benefit, index) => (
                  <li key={index} style={{ marginBottom: 'var(--space-sm)', display: 'flex', alignItems: 'start', gap: 'var(--space-sm)' }}>
                    <span>✓</span>
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
            Become a Sponsor
          </h2>
          <p style={{ marginBottom: 'var(--space-xl)' }}>
            Support the regenerative economy and gain visibility within a growing community
            of changemakers, projects, and conscious investors.
          </p>
          {!showApplication && (
            <BrandButton
              onClick={() => setShowApplication(true)}
              variant="primary"
              style={{ fontSize: 'var(--font-size-lg)' }}
            >
              Apply to Sponsor
            </BrandButton>
          )}
        </div>
      </div>

      {showApplication && (
        <div className="content-section">
          <h2 className="section-title">Sponsorship Application</h2>

          {submitSuccess && (
            <div style={{
              background: 'var(--success)',
              color: 'white',
              padding: 'var(--space-lg)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-xl)',
              textAlign: 'center'
            }}>
              ✓ Application submitted successfully! We'll be in touch soon.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <BrandFormField label="Organization Name" required>
              <BrandInput
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </BrandFormField>

            <BrandFormField label="Website URL" required>
              <BrandInput
                type="url"
                required
                value={formData.website_url}
                onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
              />
            </BrandFormField>

            <BrandFormField label="Logo URL" required>
              <BrandInput
                type="url"
                required
                placeholder="https://example.com/logo.png"
                value={formData.logo_url}
                onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
              />
            </BrandFormField>

            <BrandFormField label="Description" required>
              <BrandTextarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Tell us about your organization..."
              />
            </BrandFormField>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 'var(--space-md)' }}>
              <BrandFormField label="Contact Name" required>
                <BrandInput
                  required
                  value={formData.contact_name}
                  onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                />
              </BrandFormField>

              <BrandFormField label="Contact Email" required>
                <BrandInput
                  type="email"
                  required
                  value={formData.contact_email}
                  onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                />
              </BrandFormField>
            </div>

            <BrandFormField label="Sponsorship Tier" required>
              <BrandSelect
                required
                value={formData.tier}
                onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                options={[
                  { value: 'community', label: 'Community Supporter ($1,000+)' },
                  { value: 'silver', label: 'Silver Sponsor ($5,000+)' },
                  { value: 'gold', label: 'Gold Sponsor ($10,000+)' },
                  { value: 'platinum', label: 'Platinum Sponsor ($25,000+)' },
                  { value: 'founding', label: 'Founding Sponsor ($50,000+)' },
                ]}
              />
            </BrandFormField>

            <BrandFormField label="Contribution Amount (optional)">
              <BrandInput
                type="number"
                value={formData.contribution_amount}
                onChange={(e) => setFormData({ ...formData, contribution_amount: e.target.value })}
                placeholder="USD"
              />
            </BrandFormField>

            <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-lg)' }}>
              <BrandButton type="submit" variant="primary">
                Submit Application
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
