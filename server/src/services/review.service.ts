import { prisma } from '../index.js';

interface AddReviewData {
    userId: number;
    announcementId: number;
    rating: number;
    comment: string;
}

export const getReviewsByAnnouncement = async (announcementId: number) => {
    // Get all reservations for this announcement that have reviews
    const reservationsWithReviews = await prisma.reservation.findMany({
        where: {
            announcement_id: announcementId,
            review: {
                isNot: null
            }
        },
        include: {
            review: true,
            student: {
                select: {
                    id: true,
                    name: true
                }
            }
        },
        orderBy: {
            creation_date: 'desc'
        }
    });

    // Transform to match frontend expectations
    return reservationsWithReviews.map(reservation => ({
        id: reservation.review?.id || 0,
        user: reservation.student.name,
        rating: reservation.review?.stars || 0,
        comment: reservation.review?.comment || '',
        date: reservation.creation_date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }));
};

export const addReview = async (data: AddReviewData) => {
    const { userId, announcementId, rating, comment } = data;

    // Check if announcement exists
    const announcement = await prisma.announcement.findUnique({
        where: { id: announcementId }
    });

    if (!announcement) {
        throw new Error('Anuncio no encontrado');
    }

    // For simplicity, create a new reservation for each review
    // This allows multiple reviews from the same user
    const reservation = await prisma.reservation.create({
        data: {
            announcement_id: announcementId,
            student_id: userId,
            state: 'completado'
        }
    });

    // Create the review
    const review = await prisma.review.create({
        data: {
            reservation_id: reservation.id,
            user_id: userId,
            stars: rating,
            comment
        },
        include: {
            user: {
                select: {
                    name: true
                }
            }
        }
    });

    return {
        id: review.id,
        user: review.user.name,
        rating: review.stars,
        comment: review.comment || '',
        date: new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    };
};
