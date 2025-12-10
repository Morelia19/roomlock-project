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

export const getMyAnnouncements = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                error: 'No autenticado'
            });
        }

        const announcements = await announcementService.getOwnerAnnouncements(userId);

        // Calculate statistics
        const totalAnnouncements = announcements.length;
        const activeAnnouncements = announcements.filter((a: any) => a.state === 'activo').length;
        const totalViews = announcements.reduce((sum: number, a: any) => sum + a.views, 0);
        const totalInquiries = announcements.reduce((sum: number, a: any) => sum + a.inquiries, 0);

        res.status(200).json({
            message: 'Anuncios del propietario obtenidos exitosamente',
            data: {
                announcements,
                statistics: {
                    total: totalAnnouncements,
                    active: activeAnnouncements,
                    views: totalViews,
                    inquiries: totalInquiries
                }
            }
        });
    } catch (error: any) {
        console.error('Error fetching owner announcements:', error);
        res.status(500).json({
            error: error.message || 'Error al obtener anuncios del propietario'
        });
    }
};
