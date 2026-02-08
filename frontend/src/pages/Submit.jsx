import BrandButton from '../components/brand/BrandButton';
import BrandInput from '../components/brand/BrandInput';
import BrandSelect from '../components/brand/BrandSelect';
import BrandTextarea from '../components/brand/BrandTextarea';
import BrandFormField from '../components/brand/BrandFormField';

function Submit() {
  const [formData, setFormData] = useState({
    entry_type: 'project',
    submitter_email: '',
    submitter_notes: '',
    name: '',
    url: '',
    location: '',
    description: '',
    category: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Package the data properly
      const submissionData = {
        entry_type: formData.entry_type,
        submitter_email: formData.submitter_email,
        submitter_notes: formData.submitter_notes,
        data: {
          name: formData.name,
          url: formData.url,
          location: formData.location,
          description: formData.description,
          category: formData.category,
        }
      };

      await submitEntry(submissionData);
      setSuccess(true);
      setFormData({
        entry_type: 'project',
        submitter_email: '',
        submitter_notes: '',
        name: '',
        url: '',
        location: '',
        description: '',
        category: '',
      });
    } catch (err) {
      setError('Failed to submit entry. Please try again.');
      console.error('Error submitting:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fade-in">
      <h2 style={{ marginBottom: '2rem', color: 'var(--earth-green)', fontSize: 'var(--font-size-3xl)' }}>Submit a New Entry</h2>

      <div className="content-section">
        <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
          Help us grow the regenerative economy directory! Submit a land-based project,
          service provider, or capital source for review. All submissions are verified
          before being added to the directory.
        </p>

        {success && (
          <div style={{
            background: 'var(--success)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-lg)',
            marginBottom: 'var(--space-xl)',
            textAlign: 'center'
          }}>
            ✓ Thank you! Your submission has been received and will be reviewed soon.
          </div>
        )}

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <BrandFormField label="Entry Type" required>
            <BrandSelect
              name="entry_type"
              value={formData.entry_type}
              onChange={handleChange}
              required
              options={[
                { value: 'project', label: 'Land-Based Project' },
                { value: 'service', label: 'Service Provider' },
                { value: 'capital', label: 'Capital Source' },
              ]}
            />
          </BrandFormField>

          <BrandFormField label="Your Email" required>
            <BrandInput
              type="email"
              name="submitter_email"
              value={formData.submitter_email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </BrandFormField>

          <BrandFormField label="Organization Name" required>
            <BrandInput
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter organization name"
              required
            />
          </BrandFormField>

          <BrandFormField label="Website URL" required>
            <BrandInput
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://example.com"
              required
            />
          </BrandFormField>

          <BrandFormField label="Location" required>
            <BrandInput
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, State/Country"
              required
            />
          </BrandFormField>

          <BrandFormField label="Category" required>
            <BrandInput
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Regenerative Farm, Design Consulting, Impact Investment"
              required
            />
          </BrandFormField>

          <BrandFormField label="Description" required>
            <BrandTextarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a detailed description of the organization, its mission, and services..."
              required
            />
          </BrandFormField>

          <BrandFormField label="Additional Notes">
            <BrandTextarea
              name="submitter_notes"
              value={formData.submitter_notes}
              onChange={handleChange}
              placeholder="Any additional information you'd like to share..."
              rows={3}
              style={{ minHeight: '100px' }}
            />
          </BrandFormField>

          <BrandButton
            type="submit"
            variant="primary"
            disabled={submitting}
            style={{ width: '100%', fontSize: '1.1rem', marginTop: 'var(--space-lg)' }}
          >
            {submitting ? 'Submitting...' : 'Submit Entry'}
          </BrandButton>
        </form>
      </div>
    </div>
  );
}

export default Submit;
