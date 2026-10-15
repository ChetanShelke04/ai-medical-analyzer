import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/reports';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllReports = () => api.get('/');
export const getReportById = (id) => api.get(`/${id}`);
export const createReport = (report) => api.post('/', report);
export const updateReport = (id, report) => api.put(`/${id}`, report);
export const deleteReport = (id) => api.delete(`/${id}`);

export default api;
