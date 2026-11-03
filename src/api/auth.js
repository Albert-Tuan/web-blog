import { api } from './client';

export const authApi = {
  register: credentials => api.post('/auth/register', credentials).then(response => response.data),
  login: credentials => api.post('/auth/login', credentials).then(response => response.data),
  me: () => api.get('/auth/me').then(response => response.data),
  logout: () => api.post('/auth/logout'),
};
