import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import * as messageController from '../controllers/message.controller';

const router = Router();

// All message routes require authentication
router.get('/conversations', authenticateToken, messageController.getConversations);
router.get('/conversation/:reservationId', authenticateToken, messageController.getConversationMessages);
router.post('/send', authenticateToken, messageController.sendMessage);

export default router;
