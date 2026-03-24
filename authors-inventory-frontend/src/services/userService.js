import axiosInstance from '../api/axiosInstance';

export const getAllUsers  = ()      => axiosInstance.get('/user/getAll');
export const updateUser  = (d)     => axiosInstance.put('/user/update', d);
export const deleteUser  = (username) => axiosInstance.delete(`/user/delete?username=${username}`);