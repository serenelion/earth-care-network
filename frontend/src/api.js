import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Projects API
export const getProjects = async (params = {}) => {
  const response = await api.get('/projects/', { params });
  return response.data;
};

export const getProject = async (id) => {
  const response = await api.get(`/projects/${id}/`);
  return response.data;
};

export const getProjectCategories = async () => {
  const response = await api.get('/projects/categories/');
  return response.data;
};

export const getProjectTags = async () => {
  const response = await api.get('/projects/tags/');
  return response.data;
};

export const claimProject = async (id, email) => {
  const response = await api.post(`/projects/${id}/claim/`, { email });
  return response.data;
};

// Services API
export const getServices = async (params = {}) => {
  const response = await api.get('/services/', { params });
  return response.data;
};

export const getService = async (id) => {
  const response = await api.get(`/services/${id}/`);
  return response.data;
};

export const getServiceCategories = async () => {
  const response = await api.get('/services/categories/');
  return response.data;
};

export const getServiceTags = async () => {
  const response = await api.get('/services/tags/');
  return response.data;
};

export const claimService = async (id, email) => {
  const response = await api.post(`/services/${id}/claim/`, { email });
  return response.data;
};

// Capital API
export const getCapitalSources = async (params = {}) => {
  const response = await api.get('/capital/', { params });
  return response.data;
};

export const getCapitalSource = async (id) => {
  const response = await api.get(`/capital/${id}/`);
  return response.data;
};

export const getCapitalCategories = async () => {
  const response = await api.get('/capital/categories/');
  return response.data;
};

export const getFundingTypes = async () => {
  const response = await api.get('/capital/funding_types/');
  return response.data;
};

export const claimCapital = async (id, email) => {
  const response = await api.post(`/capital/${id}/claim/`, { email });
  return response.data;
};

// Submissions API
export const submitEntry = async (data) => {
  const response = await api.post('/submissions/', data);
  return response.data;
};

// Sponsors API
export const getSponsors = async (params = {}) => {
  const response = await api.get('/sponsors/', { params });
  return response.data;
};

export const applyAsSponsor = async (data) => {
  const response = await api.post('/sponsors/apply/', data);
  return response.data;
};

export default api;
