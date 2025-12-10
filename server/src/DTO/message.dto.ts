export interface SendMessageDTO {
    reservation_id: number;
    content: string;
}

export interface MessageResponse {
    id: number;
    reservation_id: number;
    sender_id: number;
    sender_name: string;
    content: string;
    sent_date: Date;
}

export interface ConversationResponse {
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
        sent_date: Date;
    } | null;
    unread_count: number;
}

export interface ConversationMessagesResponse {
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
    messages: MessageResponse[];
}
