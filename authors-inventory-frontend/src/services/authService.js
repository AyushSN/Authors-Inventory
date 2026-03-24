import axiosInstance from '../api/axiosInstance';

export const loginUser    = (d) => axiosInstance.post('/auth/login', d);
export const registerUser = (d) => axiosInstance.post('/user/register', d);