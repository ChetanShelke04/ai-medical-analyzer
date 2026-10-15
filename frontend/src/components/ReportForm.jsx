import { useState, useEffect } from 'react';

const STATUS_OPTIONS = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

function ReportForm({ report, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'PENDING',
  });

  useEffect(() => {
    if (report) {
      setForm({
        title: report.title || '',
        description: report.description || '',
        status: report.status || 'PENDING',
      });
    }
  }, [report]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit(form);
  };

  const isEditing = !!report;

  return (
    <form className="report-form" onSubmit={handleSubmit} id="report-form">
      <div className="report-form__header">
        <h2 className="report-form__title">
          {isEditing ? 'Edit Report' : 'Create New Report'}
        </h2>
        <button type="button" className="report-form__close" onClick={onCancel}>
          ✕
        </button>
      </div>

      <div className="report-form__body">
        <div className="form-group">
          <label htmlFor="title" className="form-group__label">Title *</label>
          <input
            id="title"
            name="title"
            type="text"
            className="form-group__input"
            placeholder="Enter report title..."
            value={form.title}
            onChange={handleChange}
            required
            autoFocus
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-group__label">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-group__textarea"
            placeholder="Enter report description..."
            value={form.description}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status" className="form-group__label">Status *</label>
          <select
            id="status"
            name="status"
            className="form-group__select"
            value={form.status}
            onChange={handleChange}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="report-form__actions">
        <button type="button" className="btn btn--ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn--primary" id="submit-report-btn">
          {isEditing ? 'Update Report' : 'Create Report'}
        </button>
      </div>
    </form>
  );
}

export default ReportForm;
