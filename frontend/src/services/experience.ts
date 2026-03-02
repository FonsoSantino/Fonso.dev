import api from '@/lib/axios';

export interface Experience {
    id: string;
    company: string;
    position: string;
    start_date: string;
    end_date?: string;
    description?: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}

export interface ExperienceCreate {
    company: string;
    position: string;
    start_date: string;
    end_date?: string;
    description?: string;
}

export const experienceService = {
    getAll: async (): Promise<Experience[]> => {
        const response = await api.get<Experience[]>('/experiences/');
        return response.data;
    },
    create: async (data: ExperienceCreate): Promise<Experience> => {
        const response = await api.post<Experience>('/experiences/', data);
        return response.data;
    },
    update: async (id: string, data: Partial<ExperienceCreate>): Promise<Experience> => {
        const response = await api.put<Experience>(`/experiences/${id}`, data);
        return response.data;
    },
    delete: async (id: string): Promise<void> => {
        await api.delete(`/experiences/${id}`);
    },
};
