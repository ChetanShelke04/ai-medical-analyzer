function ReportList({ reports, onEdit, onDelete }) {
  if (reports.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <rect x="12" y="8" width="40" height="48" rx="4" stroke="#475569" strokeWidth="2" fill="none" />
            <line x1="20" y1="20" x2="44" y2="20" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
            <line x1="20" y1="28" x2="38" y2="28" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
            <line x1="20" y1="36" x2="34" y2="36" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <h3 className="empty-state__title">No reports yet</h3>
        <p className="empty-state__text">
          Create your first medical report to get started.
        </p>
      </div>
    );
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'PENDING': return 'badge--pending';
      case 'IN_PROGRESS': return 'badge--progress';
      case 'COMPLETED': return 'badge--completed';
      case 'CANCELLED': return 'badge--cancelled';
      default: return '';
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="report-list">
      {reports.map((report) => (
        <div className="report-card" key={report.id} id={`report-${report.id}`}>
          <div className="report-card__header">
            <h3 className="report-card__title">{report.title}</h3>
            <span className={`badge ${getStatusClass(report.status)}`}>
              {report.status.replace('_', ' ')}
            </span>
          </div>

          {report.description && (
            <p className="report-card__desc">{report.description}</p>
          )}

          <div className="report-card__footer">
            <span className="report-card__date">
              Created {formatDate(report.createdAt)}
            </span>
            <div className="report-card__actions">
              <button
                className="btn btn--sm btn--ghost"
                onClick={() => onEdit(report)}
                id={`edit-${report.id}`}
              >
                ✎ Edit
              </button>
              <button
                className="btn btn--sm btn--danger"
                onClick={() => onDelete(report.id)}
                id={`delete-${report.id}`}
              >
                ✕ Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReportList;
