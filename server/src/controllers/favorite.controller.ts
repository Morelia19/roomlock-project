import type { Request, Response } from 'express';
import * as favoriteService from '../services/favorite.service.js';
import type { AddFavoriteDTO } from '../DTO/favorite.dto.js';

export const getFavorites = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                error: 'No autenticado'
            });
        }

        const favorites = await favoriteService.getUserFavorites(userId);

        res.status(200).json({
            message: 'Favoritos obtenidos exitosamente',
            data: favorites
        });
    } catch (error: any) {
        res.status(500).json({
            error: error.message || 'Error al obtener favoritos'
        });
    }
};

export const addFavorite = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const data: AddFavoriteDTO = req.body;

        if (!userId) {
            return res.status(401).json({
                error: 'No autenticado'
            });
        }

        if (!data.announcement_id) {
            return res.status(400).json({
                error: 'ID de anuncio requerido'
            });
        }

        const favorite = await favoriteService.addFavorite(userId, data.announcement_id);

        res.status(201).json({
            message: 'Agregado a favoritos',
            data: favorite
        });
    } catch (error: any) {
        const statusCode = error.message.includes('no encontrado') ? 404 :
            error.message.includes('Ya está') ? 409 : 500;

        res.status(statusCode).json({
            error: error.message || 'Error al agregar a favoritos'
        });
    }
};

export const removeFavorite = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const announcementIdParam = req.params.announcementId;

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

        await favoriteService.removeFavorite(userId, announcementId);

        res.status(200).json({
            message: 'Eliminado de favoritos'
        });
    } catch (error: any) {
        const statusCode = error.message.includes('No está') ? 404 : 500;

        res.status(statusCode).json({
            error: error.message || 'Error al eliminar de favoritos'
        });
    }
};
