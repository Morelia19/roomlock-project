import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware.js';
import * as reviewController from '../controllers/review.controller.js';
import * as announcementController from '../controllers/announcement.controller.js';

const router = Router();

// Get all announcements (public)
router.get('/', announcementController.getAnnouncements);

// Get reviews for an announcement
router.get('/:announcementId/reviews', reviewController.getAnnouncementReviews);

// Add a review (requires authentication)
router.post('/:announcementId/reviews', authenticateToken, reviewController.addReview);

export default router;
