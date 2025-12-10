import type { Request, Response } from 'express';
import { getReviewsByAnnouncement as getReviewsByAnnouncementService, addReview as addReviewService } from '../services/review.service.js';

export const getAnnouncementReviews = async (req: Request, res: Response) => {
    try {
        const announcementIdParam = req.params.announcementId;

        if (!announcementIdParam) {
            return res.status(400).json({
                error: 'ID de anuncio no proporcionado'
            });
        }

        const announcementId = Number.parseInt(announcementIdParam, 10);

        if (Number.isNaN(announcementId)) {
            return res.status(400).json({
                error: 'ID de anuncio inválido'
            });
        }

        const reviews = await getReviewsByAnnouncementService(announcementId);

        res.status(200).json({
            message: 'Reviews obtenidos exitosamente',
            data: reviews
        });
    } catch (error: any) {
        res.status(500).json({
            error: error.message || 'Error al obtener reviews'
        });
    }
};

export const addReview = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const announcementIdParam = req.params.announcementId;
        const { rating, comment } = req.body;

        if (!userId) {
            return res.status(401).json({
                error: 'No autenticado'
            });
        }

        if (!announcementIdParam) {
            return res.status(400).json({
                error: 'ID de anuncio no proporcionado'
            });
        }

        const announcementId = Number.parseInt(announcementIdParam, 10);

        if (Number.isNaN(announcementId)) {
            return res.status(400).json({
                error: 'ID de anuncio inválido'
            });
        }

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({
                error: 'Calificación debe estar entre 1 y 5'
            });
        }

        if (!comment || comment.trim() === '') {
            return res.status(400).json({
                error: 'Comentario es requerido'
            });
        }

        const review = await addReviewService({
            userId,
            announcementId,
            rating,
            comment
        });

        res.status(201).json({
            message: 'Review agregado exitosamente',
            data: review
        });
    } catch (error: any) {
        const statusCode = error.message.includes('Ya has') ? 409 : 500;

        res.status(statusCode).json({
            error: error.message || 'Error al agregar review'
        });
    }
};
