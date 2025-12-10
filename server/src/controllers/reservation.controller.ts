import type { Request, Response } from 'express';
import * as reservationService from '../services/reservation.service.js';

export const createOrGetReservation = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const { announcement_id } = req.body;

        if (!userId) {
            return res.status(401).json({
                error: 'No autenticado'
            });
        }

        if (!announcement_id) {
            return res.status(400).json({
                error: 'ID de anuncio es requerido'
            });
        }

        const reservation = await reservationService.createOrGetReservation({
            studentId: userId,
            announcementId: announcement_id
        });

        res.status(200).json({
            message: 'Reserva creada/obtenida exitosamente',
            data: reservation
        });
    } catch (error: any) {
        console.error('Error creating/getting reservation:', error);

        const statusCode = error.message.includes('no encontrado') ? 404 :
            error.message.includes('propio anuncio') ? 400 : 500;

        res.status(statusCode).json({
            error: error.message || 'Error al crear/obtener reserva'
        });
    }
};
