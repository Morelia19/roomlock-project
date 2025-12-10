import { prisma } from '../index';
import type { FavoriteAnnouncementResponse } from '../DTO/favorite.dto';

export const getUserFavorites = async (userId: number): Promise<FavoriteAnnouncementResponse[]> => {
    const favorites = await prisma.favorite.findMany({
        where: { user_id: userId },
        include: {
            announcement: {
                include: {
                    owner: true,
                    image: true,
                    services: true
                }
            }
        },
        orderBy: {
            created_at: 'desc'
        }
    });

    return favorites.map(fav => ({
        id: fav.announcement.id,
        title: fav.announcement.title,
        description: fav.announcement.description,
        price: fav.announcement.price.toString(),
        district: fav.announcement.district,
        latitude: fav.announcement.latitude,
        longitude: fav.announcement.longitude,
        images: fav.announcement.image.map(img => img.url),
        services: fav.announcement.services.map(s => s.service),
        owner: {
            id: fav.announcement.owner.id,
            name: fav.announcement.owner.name
        },
        stats: {
            bedrooms: 1, // TODO: Add bedrooms field to Announcement model
            bathrooms: 1, // TODO: Add bathrooms field to Announcement model
            rating: 4.5 // TODO: Calculate from reviews
        },
        is_favorite: true,
        created_at: fav.created_at.toISOString()
    }));
};

export const addFavorite = async (userId: number, announcementId: number) => {
    // Check if announcement exists
    const announcement = await prisma.announcement.findUnique({
        where: { id: announcementId }
    });

    if (!announcement) {
        throw new Error('Anuncio no encontrado');
    }

    // Check if already favorited
    const existing = await prisma.favorite.findUnique({
        where: {
            user_id_announcement_id: {
                user_id: userId,
                announcement_id: announcementId
            }
        }
    });

    if (existing) {
        throw new Error('Ya está en favoritos');
    }

    // Create favorite
    const favorite = await prisma.favorite.create({
        data: {
            user_id: userId,
            announcement_id: announcementId
        }
    });

    return {
        id: favorite.id,
        announcement_id: favorite.announcement_id,
        created_at: favorite.created_at
    };
};

export const removeFavorite = async (userId: number, announcementId: number) => {
    const favorite = await prisma.favorite.findUnique({
        where: {
            user_id_announcement_id: {
                user_id: userId,
                announcement_id: announcementId
            }
        }
    });

    if (!favorite) {
        throw new Error('No está en favoritos');
    }

    await prisma.favorite.delete({
        where: {
            user_id_announcement_id: {
                user_id: userId,
                announcement_id: announcementId
            }
        }
    });

    return { success: true };
};

export const isFavorite = async (userId: number, announcementId: number): Promise<boolean> => {
    const favorite = await prisma.favorite.findUnique({
        where: {
            user_id_announcement_id: {
                user_id: userId,
                announcement_id: announcementId
            }
        }
    });

    return !!favorite;
};
