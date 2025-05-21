import axios from "axios";

const API_BASE = "http://localhost:5005";

export const getApplications = () => axios.get(`${API_BASE}/applications`);
export const getApplicationById = (id) =>
  axios.get(`${API_BASE}/applications/${id}`);
export const createApplication = (data) =>
  axios.post(`${API_BASE}/applications`, data);
export const updateApplication = (id, data) =>
  axios.put(`${API_BASE}/applications/${id}`, data);
export const deleteApplication = (id) =>
  axios.delete(`${API_BASE}/applications/${id}`);
