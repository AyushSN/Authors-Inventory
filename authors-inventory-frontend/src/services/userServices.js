import axiosInstance from '../api/axiosInstance';

export const getCurrentUser = () =>
    axiosInstance.get('/users/me');

export const getAllUsers = () =>
    axiosInstance.get('/users');

export const updateUser = (userId, data) =>
    axiosInstance.put(`/users/${userId}`, data);

export const deleteUser = (userId) =>
    axiosInstance.delete(`/users/${userId}`);