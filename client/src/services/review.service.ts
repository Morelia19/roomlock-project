import api from './api';

export interface Review {
    id: number;
    user: string;
    rating: number;
    comment: string;
    date: string;
    image?: string;
}

class ReviewService {
    async getReviews(announcementId: number): Promise<Review[]> {
        const response = await api.get(`/announcements/${announcementId}/reviews`);
        return response.data.data;
    }

    async addReview(
        announcementId: number,
        rating: number,
        comment: string,
        image?: File
    ): Promise<Review> {
        const formData = new FormData();
        formData.append('rating', rating.toString());
        formData.append('comment', comment);
        if (image) {
            formData.append('image', image);
        }

        const response = await api.post(`/announcements/${announcementId}/reviews`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.data;
    }
}

export const reviewService = new ReviewService();
