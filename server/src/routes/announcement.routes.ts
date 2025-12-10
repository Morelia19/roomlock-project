import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';
import * as reviewController from '../controllers/review.controller.js';
import * as announcementController from '../controllers/announcement.controller.js';

const router = Router();

// Get all announcements (public)
router.get('/', announcementController.getAnnouncements);

// Get my announcements (requires authentication)
router.get('/my-announcements', authenticateToken, announcementController.getMyAnnouncements);

// Get reviews for an announcement
router.get('/:announcementId/reviews', reviewController.getAnnouncementReviews);

// Add a review (requires authentication and handles file upload)
router.post('/:announcementId/reviews', authenticateToken, upload.single('image'), reviewController.addReview);

export default router;
