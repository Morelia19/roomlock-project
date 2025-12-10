import type { Request, Response } from 'express';
import * as messageService from '../services/message.service';
import type { SendMessageDTO } from '../DTO/message.dto';

export const getConversations = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id; // Assuming auth middleware adds user to request

        if (!userId) {
            return res.status(401).json({
                error: 'No autenticado'
            });
        }

        const conversations = await messageService.getUserConversations(userId);

        res.status(200).json({
            message: 'Conversaciones obtenidas exitosamente',
            data: conversations
        });
    } catch (error: any) {
        res.status(500).json({
            error: error.message || 'Error al obtener conversaciones'
        });
    }
};

export const getConversationMessages = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const reservationIdParam = req.params.reservationId;

        if (!userId) {
            return res.status(401).json({
                error: 'No autenticado'
            });
        }

        if (!reservationIdParam) {
            return res.status(400).json({
                error: 'ID de reserva no proporcionado'
            });
        }

        const reservationId = Number.parseInt(reservationIdParam, 10);

        if (Number.isNaN(reservationId)) {
            return res.status(400).json({
                error: 'ID de reserva inválido'
            });
        }

        const conversation = await messageService.getConversationMessages(reservationId, userId);

        res.status(200).json({
            message: 'Mensajes obtenidos exitosamente',
            data: conversation
        });
    } catch (error: any) {
        const statusCode = error.message.includes('No tienes acceso') ? 403 :
            error.message.includes('no encontrada') ? 404 : 500;

        res.status(statusCode).json({
            error: error.message || 'Error al obtener mensajes'
        });
    }
};

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const data: SendMessageDTO = req.body;

        if (!userId) {
            return res.status(401).json({
                error: 'No autenticado'
            });
        }

        if (!data.reservation_id || !data.content) {
            return res.status(400).json({
                error: 'Datos incompletos'
            });
        }

        const message = await messageService.sendMessage(data, userId);

        res.status(201).json({
            message: 'Mensaje enviado exitosamente',
            data: message
        });
    } catch (error: any) {
        const statusCode = error.message.includes('No tienes acceso') ? 403 :
            error.message.includes('no encontrada') ? 404 : 500;

        res.status(statusCode).json({
            error: error.message || 'Error al enviar mensaje'
        });
    }
};
