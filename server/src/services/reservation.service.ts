import { prisma } from '../index.js';

interface CreateReservationData {
    studentId: number;
    announcementId: number;
}

export const createOrGetReservation = async (data: CreateReservationData) => {
    const { studentId, announcementId } = data;

    // Check if announcement exists
    const announcement = await prisma.announcement.findUnique({
        where: { id: announcementId },
        include: {
            owner: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true
                }
            }
        }
    });

    if (!announcement) {
        throw new Error('Anuncio no encontrado');
    }

    // Check if student is trying to contact their own announcement
    if (announcement.owner_id === studentId) {
        throw new Error('No puedes contactar tu propio anuncio');
    }

    // Check if reservation already exists
    const existingReservation = await prisma.reservation.findFirst({
        where: {
            student_id: studentId,
            announcement_id: announcementId
        },
        include: {
            announcement: {
                include: {
                    owner: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            phone: true
                        }
                    },
                    image: {
                        take: 1
                    }
                }
            }
        }
    });

    if (existingReservation) {
        return existingReservation;
    }

    // Create new reservation
    const newReservation = await prisma.reservation.create({
        data: {
            student_id: studentId,
            announcement_id: announcementId,
            state: 'pendiente'
        },
        include: {
            announcement: {
                include: {
                    owner: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            phone: true
                        }
                    },
                    image: {
                        take: 1
                    }
                }
            }
        }
    });

    return newReservation;
};
