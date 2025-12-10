import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware.js';
import * as messageController from '../controllers/message.controller.js';

const router = Router();

router.get('/conversations', authenticateToken, messageController.getConversations);
router.get('/conversation/:reservationId', authenticateToken, messageController.getConversationMessages);
router.post('/send', authenticateToken, messageController.sendMessage);

export default router;
