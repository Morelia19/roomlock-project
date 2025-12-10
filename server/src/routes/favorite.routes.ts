import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import * as favoriteController from '../controllers/favorite.controller';

const router = Router();

// All favorite routes require authentication
router.get('/', authenticateToken, favoriteController.getFavorites);
router.post('/', authenticateToken, favoriteController.addFavorite);
router.delete('/:announcementId', authenticateToken, favoriteController.removeFavorite);

export default router;
