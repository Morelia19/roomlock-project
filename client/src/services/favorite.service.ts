import { authService } from './auth.service';

const API_URL = 'https://roomlock-api.onrender.com/api';

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
    private getAuthHeaders() {
        const token = authService.getToken();
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    }

    async getFavorites(): Promise<FavoriteAnnouncement[]> {
        const response = await fetch(`${API_URL}/favorites`, {
            method: 'GET',
            headers: this.getAuthHeaders()
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al obtener favoritos');
        }

        return data.data;
    }

    async addFavorite(announcementId: number): Promise<void> {
        const response = await fetch(`${API_URL}/favorites`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify({
                announcement_id: announcementId
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al agregar a favoritos');
        }
    }

    async removeFavorite(announcementId: number): Promise<void> {
        const response = await fetch(`${API_URL}/favorites/${announcementId}`, {
            method: 'DELETE',
            headers: this.getAuthHeaders()
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al eliminar de favoritos');
        }
    }
}

export const favoriteService = new FavoriteService();
