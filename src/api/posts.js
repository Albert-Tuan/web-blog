import { api } from './client';

export const postsApi = {
  list: (signal) => api.get('/posts', { signal }).then(response => response.data),
  get: (id, signal) => api.get(`/posts/${id}`, { signal }).then(response => response.data),
  create: (post) => api.post('/posts', post).then(response => response.data),
  update: (id, post) => api.put(`/posts/${id}`, post).then(response => response.data),
  remove: (id) => api.delete(`/posts/${id}`),
};

export const getTags = (signal) => api.get('/tags', { signal }).then(response => response.data);

export function formatPostDate(value) {
  return new Date(value).toLocaleDateString('vi-VN');
}
