import { prisma } from '../index.js';
import type { AnnouncementListResponse } from '../DTO/announcement.dto.js';

export const getAllAnnouncements = async (): Promise<AnnouncementListResponse[]> => {
    const announcements = await prisma.announcement.findMany({
        include: {
            owner: {
                select: {
                    id: true,
                    name: true
                }
            },
            image: true,
            services: true
        },
        orderBy: {
            creation_date: 'desc'
        }
    });

    return announcements.map(announcement => ({
        id: announcement.id,
        title: announcement.title,
        description: announcement.description,
        price: announcement.price.toString(),
        location: announcement.district,
        district: announcement.district,
        images: announcement.image.map(img => img.url),
        beds: 1, // TODO: Add to schema
        baths: 1, // TODO: Add to schema
        amenities: announcement.services.map(s => s.service),
        rating: 4.5, // TODO: Calculate from reviews
        owner: {
            id: announcement.owner.id,
            name: announcement.owner.name
        }
    }));
};

export const getFeaturedAnnouncements = async (limit: number = 4): Promise<AnnouncementListResponse[]> => {
    const announcements = await prisma.announcement.findMany({
        take: limit,
        include: {
            owner: {
                select: {
                    id: true,
                    name: true
                }
            },
            image: true,
            services: true
        },
        orderBy: {
            creation_date: 'desc'
        }
    });

    return announcements.map(announcement => ({
        id: announcement.id,
        title: announcement.title,
        description: announcement.description,
        price: announcement.price.toString(),
        location: announcement.district,
        district: announcement.district,
        images: announcement.image.map(img => img.url),
        beds: 1, // TODO: Add to schema
        baths: 1, // TODO: Add to schema
        amenities: announcement.services.map(s => s.service),
        rating: 4.5, // TODO: Calculate from reviews
        owner: {
            id: announcement.owner.id,
            name: announcement.owner.name
        }
    }));
};
