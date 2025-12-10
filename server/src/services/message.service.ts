import { prisma } from '../index';
import type { SendMessageDTO, ConversationResponse, ConversationMessagesResponse, MessageResponse } from '../DTO/message.dto';

export const getUserConversations = async (userId: number): Promise<ConversationResponse[]> => {
    // Get all reservations where user is either student or owner
    const reservations = await prisma.reservation.findMany({
        where: {
            OR: [
                { student_id: userId },
                {
                    announcement: {
                        owner_id: userId
                    }
                }
            ]
        },
        include: {
            announcement: {
                include: {
                    owner: true
                }
            },
            student: true,
            messages: {
                orderBy: {
                    sent_date: 'desc'
                },
                take: 1,
                include: {
                    sender: true
                }
            }
        },
        orderBy: {
            creation_date: 'desc'
        }
    });

    // Transform to conversation format
    const conversations: ConversationResponse[] = reservations.map(reservation => {
        // Determine who the other participant is
        const isStudent = reservation.student_id === userId;
        const participant = isStudent ? reservation.announcement.owner : reservation.student;

        // Get last message
        const lastMessage = reservation.messages[0];

        return {
            reservation_id: reservation.id,
            announcement_title: reservation.announcement.title,
            announcement_id: reservation.announcement.id,
            participant: {
                id: participant.id,
                name: participant.name,
                role: participant.role
            },
            last_message: lastMessage ? {
                content: lastMessage.content || '',
                sent_date: lastMessage.sent_date
            } : null,
            unread_count: 0 // TODO: Implement unread count logic
        };
    });

    return conversations;
};

export const getConversationMessages = async (
    reservationId: number,
    userId: number
): Promise<ConversationMessagesResponse> => {
    // Get reservation with messages
    const reservation = await prisma.reservation.findUnique({
        where: { id: reservationId },
        include: {
            announcement: {
                include: {
                    owner: true
                }
            },
            student: true,
            messages: {
                include: {
                    sender: true
                },
                orderBy: {
                    sent_date: 'asc'
                }
            }
        }
    });

    if (!reservation) {
        throw new Error('Conversación no encontrada');
    }

    // Verify user has access to this conversation
    const hasAccess = reservation.student_id === userId || reservation.announcement.owner_id === userId;
    if (!hasAccess) {
        throw new Error('No tienes acceso a esta conversación');
    }

    // Determine the other participant
    const isStudent = reservation.student_id === userId;
    const participant = isStudent ? reservation.announcement.owner : reservation.student;

    // Transform messages
    const messages: MessageResponse[] = reservation.messages.map(msg => ({
        id: msg.id,
        reservation_id: msg.reservation_id,
        sender_id: msg.sender_id,
        sender_name: msg.sender.name,
        content: msg.content || '',
        sent_date: msg.sent_date
    }));

    return {
        reservation_id: reservation.id,
        announcement: {
            id: reservation.announcement.id,
            title: reservation.announcement.title
        },
        participant: {
            id: participant.id,
            name: participant.name,
            role: participant.role
        },
        messages
    };
};

export const sendMessage = async (data: SendMessageDTO, senderId: number): Promise<MessageResponse> => {
    // Verify reservation exists and user has access
    const reservation = await prisma.reservation.findUnique({
        where: { id: data.reservation_id },
        include: {
            announcement: true,
            student: true
        }
    });

    if (!reservation) {
        throw new Error('Reserva no encontrada');
    }

    const hasAccess = reservation.student_id === senderId || reservation.announcement.owner_id === senderId;
    if (!hasAccess) {
        throw new Error('No tienes acceso a esta conversación');
    }

    // Create message
    const message = await prisma.message.create({
        data: {
            reservation_id: data.reservation_id,
            sender_id: senderId,
            content: data.content
        },
        include: {
            sender: true
        }
    });

    return {
        id: message.id,
        reservation_id: message.reservation_id,
        sender_id: message.sender_id,
        sender_name: message.sender.name,
        content: message.content || '',
        sent_date: message.sent_date
    };
};
