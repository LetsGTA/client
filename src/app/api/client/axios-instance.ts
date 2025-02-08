import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // API 서버 기본 URL
  timeout: 5000, // 타임아웃 설정 (5초)
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    // 토큰이 필요하다면 추가
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 에러 처리
    console.error('Axios Error:', error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default axiosInstance;
