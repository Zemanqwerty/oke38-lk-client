import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

// export const API_URL = 'http://2.60.115.218:5000';
export const API_URL = 'http://localhost:5010';
// export const API_URL = 'http://192.168.0.105:5010';
// export const API_URL = 'http://90.188.229.86:5010';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$api.interceptors.response.use((config) => {
    console.log('config');
    return config;
}, async (error) => {
    console.log('try to get');
    const originalRequest = error.config;

    if (error.response.data.status === 401 && error.config && !error.config._isRety) {
        originalRequest._isRety = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch {
            console.log('unauthorized 100%');
        }
    }
})

export default $api;