import axios from 'axios';
import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from '../utils/tokenUtils';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const Token = getAccessToken();
        if (Token) {
            config.headers['Authorization'] = `Bearer ${Token}`;
        }
    },
    (error) => Promise.reject(error)
)

let isRfreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRfreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    return axiosInstance(originalRequest);
                }).catch(err => Promise.reject(err));
            }
    }
        originalRequest._retry = true;
        isRfreshing = true;

        try{
            const refreshToken = getRefreshToken();
            const {data} = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`, { refreshToken });
            saveTokens(data.accessToken, data.refreshToken);
            axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;
            processQueue(null, data.accessToken);

            originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken;
            return axiosInstance(originalRequest);
        }catch(refreshError){
            processQueue(null, refreshError);{
                clearTokens();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            };
        }finally{
            isRfreshing = false;
        }
    }
);

export default axiosInstance;