import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE
});


// قبل از هر درخواست، توکن رو به هدر اضافه کن
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // توکن رو موقع لاگین گذاشتی
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // هدر استاندارد
  }
  return config;
});

// (اختیاری) اگر 401 برگشت، می‌تونی اتومات به لاگین برگردی
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem('token');
      // مثلا:
      // window.location.href = '/admin/login';
    }
    return Promise.reject(err);
  }
);

export default api;