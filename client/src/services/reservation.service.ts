import api from './api';

export const createOrGetReservation = async (announcementId: number) => {
    const response = await api.post('/reservations', {
        announcement_id: announcementId
    });
    return response.data;
};
