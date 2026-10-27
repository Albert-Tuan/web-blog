import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5080/api',
  timeout: 10000,
});

export function apiError(error) {
  const problem = error.response?.data;
  if (problem?.errors) return Object.values(problem.errors).flat().join(' ');
  if (error.response?.status === 404) return 'Không tìm thấy bài viết.';
  if (error.response?.status === 403) return 'Chức năng ghi chỉ bật khi API chạy ở Development.';
  if (!error.response) return 'Không kết nối được API. Kiểm tra backend và VITE_API_BASE_URL.';
  return problem?.detail || problem?.title || 'Yêu cầu thất bại. Vui lòng thử lại.';
}
