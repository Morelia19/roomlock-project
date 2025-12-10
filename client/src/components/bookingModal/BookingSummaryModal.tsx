import { type FC } from 'react';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/button';
import { type BookingFormData } from './BookingModal';

interface BookingSummaryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    announcementTitle: string;
    ownerName: string;
    price: number;
    formData: BookingFormData;
    isSubmitting?: boolean;
}

export const BookingSummaryModal: FC<BookingSummaryModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    announcementTitle,
    ownerName,
    price,
    formData,
    isSubmitting = false
}) => {
    if (!isOpen) return null;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-PE', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <>
            {/* Backdrop */}
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    zIndex: 9998,
                    transition: 'opacity 0.2s',
                }}
                onClick={isSubmitting ? undefined : onClose}
            />

            {/* Modal */}
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    maxWidth: '42rem',
                    backgroundColor: 'white',
                    borderRadius: '1.5rem',
                    zIndex: 9999,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    padding: '2rem',
                    margin: '0 1rem',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                }}
            >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--roomlock-text-primary)" }}>
                            Reservar Habitación
                        </h2>
                        <p className="text-base text-gray-500">
                            {announcementTitle}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-4"
                        disabled={isSubmitting}
                    >
                        <X className="h-6 w-6 text-gray-500" />
                    </button>
                </div>

                {/* Summary */}
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold" style={{ color: "var(--roomlock-text-primary)" }}>
                        Resumen de Reserva
                    </h3>

                    {/* Booking Details */}
                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Habitación:</span>
                            <span className="font-semibold text-right" style={{ color: "var(--roomlock-text-primary)" }}>
                                {announcementTitle}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Propietario:</span>
                            <span className="font-semibold" style={{ color: "var(--roomlock-text-primary)" }}>
                                {ownerName}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Fecha de mudanza:</span>
                            <span className="font-semibold" style={{ color: "var(--roomlock-text-primary)" }}>
                                {formatDate(formData.moveInDate)}
                            </span>
                        </div>
                        <div className="pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-baseline">
                                <span className="text-gray-600">Precio mensual:</span>
                                <span className="text-2xl font-bold" style={{ color: "var(--roomlock-primary)" }}>
                                    S/. {price}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-teal-50 rounded-xl p-6">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                                <Check className="h-5 w-5 text-white" />
                            </div>
                            <h4 className="text-lg font-semibold" style={{ color: "var(--roomlock-text-primary)" }}>
                                Próximos pasos
                            </h4>
                        </div>
                        <ol className="space-y-3 ml-11 text-gray-700">
                            <li>1. Tu solicitud será enviada al propietario</li>
                            <li>2. El propietario revisará tu perfil y te contactará</li>
                            <li>3. Podrán coordinar una visita o videollamada</li>
                            <li>4. Una vez acordado,podrás proceder con el pago del depósito</li>
                        </ol>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 flex gap-4">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="flex-1 h-14 text-lg font-semibold rounded-xl"
                    >
                        Volver
                    </Button>
                    <Button
                        onClick={onConfirm}
                        disabled={isSubmitting}
                        className="flex-1 h-14 text-lg font-semibold rounded-xl"
                        style={{ backgroundColor: "var(--roomlock-cta)", color: "white" }}
                    >
                        {isSubmitting ? 'Enviando...' : 'Confirmar Solicitud'}
                    </Button>
                </div>
            </div>
        </>
    );
};
