import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, User as UserIcon } from 'lucide-react';
import { messageService, type Conversation, type ConversationMessages } from '@/services/message.service';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/button';
import { toast } from 'sonner';

export const MessagesPage = () => {
    const { user } = useAuth();
    const [searchParams] = useSearchParams();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<ConversationMessages | null>(null);
    const [isLoadingConversations, setIsLoadingConversations] = useState(true);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        loadConversations();
    }, []);

    useEffect(() => {
        const reservationParam = searchParams.get('reservation');
        if (reservationParam && conversations.length > 0) {
            const reservationId = parseInt(reservationParam, 10);
            if (!isNaN(reservationId)) {
                const conversationExists = conversations.some(
                    conv => conv.reservation_id === reservationId
                );

                if (conversationExists) {
                    loadConversationMessages(reservationId);
                } else {
                    loadConversations().then(() => {
                        loadConversationMessages(reservationId);
                    });
                }
            }
        }
    }, [searchParams, conversations.length]);

    useEffect(() => {
        scrollToBottom();
    }, [selectedConversation?.messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const loadConversations = async () => {
        try {
            setIsLoadingConversations(true);
            const data = await messageService.getConversations();
            setConversations(data);
            return data;
        } catch (error) {
            console.error('Error loading conversations:', error);
            toast.error('Error al cargar conversaciones');
            return [];
        } finally {
            setIsLoadingConversations(false);
        }
    };

    const loadConversationMessages = async (reservationId: number) => {
        try {
            setIsLoadingMessages(true);
            const data = await messageService.getConversationMessages(reservationId);
            setSelectedConversation(data);
        } catch (error) {
            console.error('Error loading messages:', error);
            toast.error('Error al cargar mensajes');
        } finally {
            setIsLoadingMessages(false);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newMessage.trim() || !selectedConversation) return;

        const messageText = newMessage.trim();
        setNewMessage('');

        try {
            setIsSending(true);

            const message = await messageService.sendMessage(
                selectedConversation.reservation_id,
                messageText
            );

            setSelectedConversation({
                ...selectedConversation,
                messages: [
                    ...selectedConversation.messages,
                    message
                ]
            });

            toast.success('Mensaje enviado');
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Error al enviar mensaje');
            setNewMessage(messageText);
        } finally {
            setIsSending(false);
        }
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Hoy';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Ayer';
        } else {
            const daysAgo = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
            if (daysAgo < 7) {
                return `Hace ${daysAgo} días`;
            }
            return date.toLocaleDateString('es-PE', { day: 'numeric', month: 'short' });
        }
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <div className="min-h-screen pt-24 pb-4 px-4" style={{ backgroundColor: "var(--roomlock-bg-lighter)" }}>
            <div className="container mx-auto">
                <div className="flex gap-6" style={{ height: 'calc(100vh - 140px)' }}>
                    <div className="w-80 bg-white rounded-lg border overflow-hidden flex flex-col">
                        <div className="p-4 border-b">
                            <h2 className="text-xl font-semibold flex items-center justify-between">
                                Mensajes
                                {conversations.length > 0 && (
                                    <span className="text-sm font-normal bg-gray-100 px-2 py-1 rounded-full">
                                        {conversations.length}
                                    </span>
                                )}
                            </h2>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            {isLoadingConversations ? (
                                <div className="p-4 text-center text-gray-500">
                                    Cargando conversaciones...
                                </div>
                            ) : conversations.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    <UserIcon className="h-12 w-12 mx-auto mb-2 opacity-30" />
                                    <p>No tienes conversaciones aún</p>
                                </div>
                            ) : (
                                conversations.map((conv) => (
                                    <button
                                        key={conv.reservation_id}
                                        onClick={() => loadConversationMessages(conv.reservation_id)}
                                        className={`w-full p-4 border-b hover:bg-gray-50 transition-colors text-left ${selectedConversation?.reservation_id === conv.reservation_id
                                            ? 'bg-blue-50 border-l-4 border-l-blue-500'
                                            : ''
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div
                                                className="flex h-12 w-12 items-center justify-center rounded-full text-white font-semibold flex-shrink-0"
                                                style={{ backgroundColor: 'var(--roomlock-accent)' }}
                                            >
                                                {getInitials(conv.participant.name)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h3 className="font-semibold text-sm truncate">
                                                        {conv.participant.name}
                                                    </h3>
                                                    {conv.last_message && (
                                                        <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                                                            {formatDate(conv.last_message.sent_date)}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-blue-600 mb-1 truncate">
                                                    {conv.announcement_title}
                                                </p>
                                                {conv.last_message && (
                                                    <p className="text-sm text-gray-600 truncate">
                                                        {conv.last_message.content}
                                                    </p>
                                                )}
                                            </div>
                                            {conv.unread_count > 0 && (
                                                <div className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">
                                                    {conv.unread_count}
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="flex-1 bg-white rounded-lg border overflow-hidden flex flex-col">
                        {!selectedConversation ? (
                            <div className="flex-1 flex items-center justify-center text-gray-500">
                                <div className="text-center">
                                    <UserIcon className="h-16 w-16 mx-auto mb-4 opacity-20" />
                                    <p>Selecciona una conversación para comenzar</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="p-4 border-b">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="flex h-10 w-10 items-center justify-center rounded-full text-white font-semibold"
                                            style={{ backgroundColor: 'var(--roomlock-accent)' }}
                                        >
                                            {getInitials(selectedConversation.participant.name)}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{selectedConversation.participant.name}</h3>
                                            <p className="text-sm text-gray-600">{selectedConversation.announcement.title}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {isLoadingMessages ? (
                                        <div className="text-center text-gray-500">
                                            Cargando mensajes...
                                        </div>
                                    ) : selectedConversation.messages.length === 0 ? (
                                        <div className="text-center text-gray-500 py-8">
                                            No hay mensajes aún. ¡Envía el primero!
                                        </div>
                                    ) : (
                                        selectedConversation.messages.map((message, index) => {
                                            const isOwnMessage = message.sender_id === user?.id;
                                            return (
                                                <div
                                                    key={`${message.id}-${index}`}
                                                    className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    <div
                                                        className="max-w-[70%] rounded-lg px-4 py-2"
                                                        style={{
                                                            backgroundColor: isOwnMessage ? 'var(--roomlock-cta)' : '#F3F4F6',
                                                            color: isOwnMessage ? 'white' : '#1F2937'
                                                        }}
                                                    >
                                                        <p className="text-sm">{message.content}</p>
                                                        <p
                                                            className="text-xs mt-1"
                                                            style={{
                                                                color: isOwnMessage ? 'rgba(255, 255, 255, 0.8)' : '#6B7280'
                                                            }}
                                                        >
                                                            {formatTime(message.sent_date)}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                <form onSubmit={handleSendMessage} className="p-4 border-t">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder="Escribe un mensaje..."
                                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            disabled={isSending}
                                        />
                                        <Button
                                            type="submit"
                                            disabled={!newMessage.trim() || isSending}
                                            style={{ backgroundColor: 'var(--roomlock-cta)', color: 'white' }}
                                            className="px-4"
                                        >
                                            <Send className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

