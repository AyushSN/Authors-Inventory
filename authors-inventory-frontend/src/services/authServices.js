import axiosInstance from "../api/axiosInstance";

export const loginUser = (credentials) => axiosInstance.post("/auth/login", credentials);

export const registerUser = (userData) => axiosInstance.post("/auth/register", userData);

export const refreshAccessToken = (token) => axiosInstance.post("/auth/refresh", token);