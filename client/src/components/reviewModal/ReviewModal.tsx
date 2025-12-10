import { FC, useState } from 'react';
import { X, Star, Upload } from 'lucide-react';
import { Button } from '@/components/button';

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    announcementTitle: string;
    onSubmit: (rating: number, comment: string, image?: File) => Promise<void>;
}

export const ReviewModal: FC<ReviewModalProps> = ({
    isOpen,
    onClose,
    announcementTitle,
    onSubmit
}) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (rating === 0) {
            alert('Por favor selecciona una calificación');
            return;
        }

        if (!comment.trim()) {
            alert('Por favor escribe un comentario');
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(rating, comment, image || undefined);
            // Reset form
            setRating(0);
            setComment('');
            setImage(null);
            onClose();
        } catch (error) {
            console.error('Error submitting review:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl z-50 shadow-2xl p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-semibold" style={{ color: "var(--roomlock-text-primary)" }}>
                            Deja tu valoración y comentario
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Comparte tu experiencia en {announcementTitle}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        disabled={isSubmitting}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="space-y-6">
                    {/* Rating */}
                    <div>
                        <label className="block text-sm font-medium mb-3" style={{ color: "var(--roomlock-text-primary)" }}>
                            Calificación General <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="transition-transform hover:scale-110"
                                >
                                    <Star
                                        className={`h-8 w-8 ${star <= (hoverRating || rating)
                                                ? 'fill-yellow-400 stroke-yellow-400'
                                                : 'fill-gray-200 stroke-gray-300'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Comment */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: "var(--roomlock-text-primary)" }}>
                            Tu comentario <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value.slice(0, 75))}
                            placeholder="Comparte tu experiencia en Departamento compartido Miraflores..."
                            className="w-full h-24 px-4 py-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[var(--roomlock-primary)] focus:border-transparent"
                            maxLength={75}
                            disabled={isSubmitting}
                        />
                        <div className="flex justify-end mt-1">
                            <span className="text-sm text-gray-400">
                                {comment.length}/75
                            </span>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: "var(--roomlock-text-primary)" }}>
                            Añadir foto (opcional)
                        </label>
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[var(--roomlock-primary)] rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="h-8 w-8 mb-2" style={{ color: "var(--roomlock-primary)" }} />
                                <p className="text-sm" style={{ color: "var(--roomlock-primary)" }}>
                                    {image ? image.name : 'Arrastra una imagen o haz clic aquí'}
                                </p>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                                disabled={isSubmitting}
                            />
                        </label>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6">
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting || rating === 0 || !comment.trim()}
                        className="w-full h-12 text-base"
                        style={{ backgroundColor: "var(--roomlock-cta)", color: "white" }}
                    >
                        {isSubmitting ? 'Publicando...' : 'Publicar Valoración'}
                    </Button>
                </div>
            </div>
        </>
    );
};
