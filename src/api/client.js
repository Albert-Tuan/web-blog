import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5080/api',
  timeout: 10000,
  withCredentials: true,
});

// Fetch a token for the current cookie identity before every state-changing request.
// Do not cache it across login/logout: antiforgery tokens are identity-bound.
api.interceptors.request.use(async config => {
  if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase())) {
    const { data } = await api.get('/auth/csrf', { signal: config.signal });
    config.headers.set('X-CSRF-TOKEN', data.token);
  }
  return config;
});

api.interceptors.response.use(response => response, error => {
  if (error.response?.status === 401 && !error.config?.url?.startsWith('/auth/')) {
    window.dispatchEvent(new Event('webblog:unauthorized'));
  }
  return Promise.reject(error);
});

export function apiError(error) {
  const problem = error.response?.data;
  if (problem?.errors) return Object.values(problem.errors).flat().join(' ');
  if (error.response?.status === 429) return 'Bạn thử quá nhiều lần. Vui lòng chờ một phút rồi thử lại.';
  if (error.response?.status === 401) return problem?.title || 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
  if (error.response?.status === 404) return 'Không tìm thấy bài viết.';
  if (error.response?.status === 403) return 'Bạn không có quyền sửa hoặc xóa bài viết này.';
  if (!error.response) return 'Không kết nối được API. Kiểm tra backend và VITE_API_BASE_URL.';
  return problem?.detail || problem?.title || 'Yêu cầu thất bại. Vui lòng thử lại.';
}
