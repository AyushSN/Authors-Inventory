import axios from 'axios';
import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from '../utils/tokenUtils';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

// ─── REQUEST INTERCEPTOR ──────────────────────────────────────
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config; // ← THIS LINE WAS MISSING
    },
    (error) => Promise.reject(error)
);

// ─── RESPONSE INTERCEPTOR ─────────────────────────────────────
let isRefreshing = false;
let failedQueue  = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(p => error ? p.reject(error) : p.resolve(token));
    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const orig = error.config;

        if (error.response?.status === 401 && !orig._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => failedQueue.push({ resolve, reject }))
                    .then(token => {
                        orig.headers.Authorization = `Bearer ${token}`;
                        return axiosInstance(orig);
                    });
            }

            orig._retry   = true;
            isRefreshing  = true;

            try {
                const refreshToken = getRefreshToken();

                const { data } = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
                    { refreshToken }
                );
                saveTokens(data.accessToken, data.refreshToken);
                axiosInstance.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
                processQueue(null, data.accessToken);
                orig.headers.Authorization = `Bearer ${data.accessToken}`;
                return axiosInstance(orig);
            } catch (refreshError) {
                processQueue(refreshError, null);
                clearTokens();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;