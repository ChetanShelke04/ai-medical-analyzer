import { useState, useEffect } from 'react';
import ReportList from './components/ReportList';
import ReportForm from './components/ReportForm';
import { getAllReports, createReport, updateReport, deleteReport } from './api/reportApi';
import './App.css';

function App() {
  const [reports, setReports] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await getAllReports();
      setReports(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch reports. Is the backend running on port 8080?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreate = async (report) => {
    try {
      await createReport(report);
      await fetchReports();
      setShowForm(false);
      showToast('Report created successfully!');
    } catch (err) {
      showToast('Failed to create report.', 'error');
    }
  };

  const handleUpdate = async (report) => {
    try {
      await updateReport(editing.id, report);
      await fetchReports();
      setEditing(null);
      setShowForm(false);
      showToast('Report updated successfully!');
    } catch (err) {
      showToast('Failed to update report.', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this report?')) return;
    try {
      await deleteReport(id);
      await fetchReports();
      showToast('Report deleted.');
    } catch (err) {
      showToast('Failed to delete report.', 'error');
    }
  };

  const handleEdit = (report) => {
    setEditing(report);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditing(null);
    setShowForm(false);
  };

  const handleNewReport = () => {
    setEditing(null);
    setShowForm(true);
  };

  return (
    <div className="app">
      {/* Toast notification */}
      {toast && (
        <div className={`toast toast--${toast.type}`}>
          <span className="toast__icon">
            {toast.type === 'success' ? '✓' : '✕'}
          </span>
          {toast.message}
        </div>
      )}

      {/* Header */}
      <header className="header">
        <div className="header__inner">
          <div className="header__brand">
            <div className="header__logo">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="8" fill="url(#logo-grad)" />
                <path d="M8 14h12M14 8v12M10 10l8 8M18 10l-8 8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                <circle cx="14" cy="14" r="4" stroke="#fff" strokeWidth="1.5" fill="none" />
                <defs>
                  <linearGradient id="logo-grad" x1="0" y1="0" x2="28" y2="28">
                    <stop stopColor="#6366f1" />
                    <stop offset="1" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div>
              <h1 className="header__title">Medical Report Analyzer</h1>
              <p className="header__subtitle">Manage and track medical reports</p>
            </div>
          </div>
          <button className="btn btn--primary" onClick={handleNewReport} id="new-report-btn">
            <span className="btn__icon">+</span>
            New Report
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="main">
        {/* Stats bar */}
        <div className="stats">
          <div className="stat-card">
            <span className="stat-card__number">{reports.length}</span>
            <span className="stat-card__label">Total Reports</span>
          </div>
          <div className="stat-card stat-card--pending">
            <span className="stat-card__number">
              {reports.filter(r => r.status === 'PENDING').length}
            </span>
            <span className="stat-card__label">Pending</span>
          </div>
          <div className="stat-card stat-card--progress">
            <span className="stat-card__number">
              {reports.filter(r => r.status === 'IN_PROGRESS').length}
            </span>
            <span className="stat-card__label">In Progress</span>
          </div>
          <div className="stat-card stat-card--completed">
            <span className="stat-card__number">
              {reports.filter(r => r.status === 'COMPLETED').length}
            </span>
            <span className="stat-card__label">Completed</span>
          </div>
        </div>

        {/* Form overlay */}
        {showForm && (
          <div className="overlay" onClick={handleCancel}>
            <div className="overlay__content" onClick={(e) => e.stopPropagation()}>
              <ReportForm
                report={editing}
                onSubmit={editing ? handleUpdate : handleCreate}
                onCancel={handleCancel}
              />
            </div>
          </div>
        )}

        {/* Report list */}
        {error && (
          <div className="error-banner">
            <span className="error-banner__icon">⚠</span>
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading">
            <div className="loading__spinner"></div>
            <p>Loading reports...</p>
          </div>
        ) : (
          <ReportList
            reports={reports}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}

export default App;
