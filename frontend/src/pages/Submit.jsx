import { useState } from 'react';
import { submitEntry } from '../api';

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
    <div>
      <h2 style={{ marginBottom: '2rem', color: '#2d5016' }}>Submit a New Entry</h2>

      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <p style={{ marginBottom: '2rem', color: '#666', lineHeight: '1.6' }}>
          Help us grow the regenerative economy directory! Submit a land-based project, 
          service provider, or capital source for review. All submissions are verified 
          before being added to the directory.
        </p>

        {success && (
          <div style={{ 
            background: '#d4edda', 
            border: '2px solid #28a745',
            borderRadius: '6px',
            padding: '1rem',
            marginBottom: '2rem',
            color: '#155724'
          }}>
            Thank you! Your submission has been received and will be reviewed soon.
          </div>
        )}

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Entry Type *</label>
            <select
              name="entry_type"
              value={formData.entry_type}
              onChange={handleChange}
              required
            >
              <option value="project">Land-Based Project</option>
              <option value="service">Service Provider</option>
              <option value="capital">Capital Source</option>
            </select>
          </div>

          <div className="form-group">
            <label>Your Email *</label>
            <input
              type="email"
              name="submitter_email"
              value={formData.submitter_email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Organization Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter organization name"
              required
            />
          </div>

          <div className="form-group">
            <label>Website URL *</label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, State/Country"
              required
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Regenerative Farm, Design Consulting, Impact Investment"
              required
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a detailed description of the organization, its mission, and services..."
              required
            />
          </div>

          <div className="form-group">
            <label>Additional Notes</label>
            <textarea
              name="submitter_notes"
              value={formData.submitter_notes}
              onChange={handleChange}
              placeholder="Any additional information you'd like to share..."
              style={{ minHeight: '100px' }}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={submitting}
            style={{ width: '100%', fontSize: '1.1rem' }}
          >
            {submitting ? 'Submitting...' : 'Submit Entry'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Submit;
