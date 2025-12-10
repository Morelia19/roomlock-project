import type { Request, Response } from 'express';
import * as announcementService from '../services/announcement.service.js';

export const getAnnouncements = async (req: Request, res: Response) => {
    try {
        const limit = req.query.limit ? Number.parseInt(req.query.limit as string, 10) : undefined;

        const announcements = limit
            ? await announcementService.getFeaturedAnnouncements(limit)
            : await announcementService.getAllAnnouncements();

        res.status(200).json({
            message: 'Anuncios obtenidos exitosamente',
            data: announcements
        });
    } catch (error: any) {
        console.error('Error fetching announcements:', error);
        res.status(500).json({
            error: error.message || 'Error al obtener anuncios'
        });
    }
};
