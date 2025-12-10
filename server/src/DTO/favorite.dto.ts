export interface AddFavoriteDTO {
    announcement_id: number;
}

export interface FavoriteAnnouncementResponse {
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
