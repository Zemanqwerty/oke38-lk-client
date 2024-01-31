import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

// export const API_URL = 'http://2.60.115.218:5000';
// export const API_URL = 'http://localhost:5010';
export const API_URL = '0.0.0.0:5000';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config._isRety) {
        originalRequest._isRety = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch {
            console.log('unauthorized');
        }
    }
})

export default $api;