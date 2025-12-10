import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware.js';
import * as reservationController from '../controllers/reservation.controller.js';

const router = Router();

// Create or get reservation (requires authentication)
router.post('/', authenticateToken, reservationController.createOrGetReservation);

export default router;
