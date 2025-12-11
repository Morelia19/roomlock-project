import api from './api';

export interface AnnouncementResponse {
    id: number;
    title: string;
    description: string | null;
    price: string;
    location: string;
    district: string;
    images: string[];
    beds: number;
    baths: number;
    amenities: string[];
    rating: number;
    owner: {
        id: number;
        name: string;
    };
}

class AnnouncementService {
    async getAnnouncements(limit?: number): Promise<AnnouncementResponse[]> {
        const params = limit ? { limit: limit.toString() } : {};
        const response = await api.get('/announcements', { params });
        return response.data.data;
    }

    async getFeaturedAnnouncements(): Promise<AnnouncementResponse[]> {
        return this.getAnnouncements(4);
    }

    async getMyAnnouncements(): Promise<any> {
        const response = await api.get('/announcements/my-announcements');
        return response.data.data;
    }

    async getAnnouncementById(id: number): Promise<AnnouncementResponse> {
        const response = await api.get(`/announcements/${id}`);
        return response.data.data;
    }
}

export const announcementService = new AnnouncementService();
