import api from './api';

export interface FavoriteAnnouncement {
    id: number;
    title: string;
    description: string | null;
    price: string;
    district: string;
    latitude: number | null;
    longitude: number | null;
    images: string[];
    services: string[];
    owner: {
        id: number;
        name: string;
    };
    stats: {
        bedrooms: number;
        bathrooms: number;
        rating: number;
    };
    is_favorite: boolean;
    created_at: string;
}

class FavoriteService {
    async getFavorites(): Promise<FavoriteAnnouncement[]> {
        const response = await api.get('/favorites');
        return response.data.data;
    }

    async addFavorite(announcementId: number): Promise<void> {
        await api.post('/favorites', {
            announcement_id: announcementId
        });
    }

    async removeFavorite(announcementId: number): Promise<void> {
        await api.delete(`/favorites/${announcementId}`);
    }
}

export const favoriteService = new FavoriteService();

