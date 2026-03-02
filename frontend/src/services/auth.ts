import api from '@/lib/axios';

export interface User {
    id: string;
    email: string;
    full_name?: string;
    is_active: boolean;
    is_superuser: boolean;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
}

export const authService = {
    login: async (username: string, password: string): Promise<LoginResponse> => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        const response = await api.post<LoginResponse>('/auth/login/access-token', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },
    getMe: async (): Promise<User> => {
        const response = await api.get<User>('/auth/me');
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    },
};
