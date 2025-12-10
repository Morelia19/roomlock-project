import { authService } from './auth.service';

const API_URL = 'https://roomlock-api.onrender.com/api';

export interface Message {
    id: number;
    reservation_id: number;
    sender_id: number;
    sender_name: string;
    content: string;
    sent_date: string;
}

export interface Conversation {
    reservation_id: number;
    announcement_title: string;
    announcement_id: number;
    participant: {
        id: number;
        name: string;
        role: string;
    };
    last_message: {
        content: string;
        sent_date: string;
    } | null;
    unread_count: number;
}

export interface ConversationMessages {
    reservation_id: number;
    announcement: {
        id: number;
        title: string;
    };
    participant: {
        id: number;
        name: string;
        role: string;
    };
    messages: Message[];
}

class MessageService {
    private getAuthHeaders() {
        const token = authService.getToken();
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    }

    async getConversations(): Promise<Conversation[]> {
        const response = await fetch(`${API_URL}/messages/conversations`, {
            method: 'GET',
            headers: this.getAuthHeaders()
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al obtener conversaciones');
        }

        return data.data;
    }

    async getConversationMessages(reservationId: number): Promise<ConversationMessages> {
        const response = await fetch(`${API_URL}/messages/conversation/${reservationId}`, {
            method: 'GET',
            headers: this.getAuthHeaders()
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al obtener mensajes');
        }

        return data.data;
    }

    async sendMessage(reservationId: number, content: string): Promise<Message> {
        const response = await fetch(`${API_URL}/messages/send`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify({
                reservation_id: reservationId,
                content
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al enviar mensaje');
        }

        return data.data;
    }
}

export const messageService = new MessageService();
