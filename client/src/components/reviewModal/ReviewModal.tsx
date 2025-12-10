import { type FC, useState } from 'react';
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
    const [isDragging, setIsDragging] = useState(false);

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

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('image/')) {
                setImage(file);
            }
        }
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
                onClick={onClose}
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
                < div className="flex items-start justify-between mb-6" >
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--roomlock-text-primary)" }}>
                            Deja tu valoración y comentario
                        </h2>
                        <p className="text-base text-gray-500">
                            Comparte tu experiencia en {announcementTitle}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-4"
                        disabled={isSubmitting}
                    >
                        <X className="h-6 w-6 text-gray-500" />
                    </button>
                </div >

                {/* Content */}
                < div className="space-y-6" >
                    {/* Rating */}
                    < div >
                        <label className="block text-base font-semibold mb-4" style={{ color: "var(--roomlock-text-primary)" }}>
                            Calificación General <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => {
                                const isActive = star <= (hoverRating || rating);
                                return (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            padding: 0,
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s',
                                        }}
                                        onMouseDown={(e) => {
                                            e.currentTarget.style.transform = 'scale(0.95)';
                                        }}
                                        onMouseUp={(e) => {
                                            e.currentTarget.style.transform = 'scale(1.1)';
                                        }}
                                        disabled={isSubmitting}
                                    >
                                        <Star
                                            style={{
                                                width: '48px',
                                                height: '48px',
                                                fill: isActive ? '#FBBF24' : 'none',
                                                stroke: isActive ? '#F59E0B' : '#9CA3AF',
                                                strokeWidth: 2,
                                                transition: 'all 0.2s',
                                            }}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div >

                    {/* Comment */}
                    < div >
                        <label className="block text-base font-semibold mb-3" style={{ color: "var(--roomlock-text-primary)" }}>
                            Tu comentario <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value.slice(0, 75))}
                            placeholder="Comparte tu experiencia en Departamento compartido Miraflores..."
                            className="w-full h-32 px-4 py-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[var(--roomlock-primary)] focus:border-transparent text-base bg-gray-50"
                            style={{ backgroundColor: '#F3F4F6' }}
                            maxLength={75}
                            disabled={isSubmitting}
                        />
                        <div className="flex justify-end mt-2">
                            <span className="text-sm font-medium text-gray-500">
                                {comment.length}/75
                            </span>
                        </div>
                    </div >

                    < div className='mb-6'>
                        <label className="block text-base font-semibold mb-3" style={{ color: "var(--roomlock-text-primary)" }}>
                            Añadir foto (opcional)
                        </label>
                        <label
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all ${isDragging
                                ? 'border-[var(--roomlock-primary)] bg-[var(--roomlock-primary)]/5'
                                : 'border-[var(--roomlock-primary)] hover:bg-gray-50'
                                }`}
                            style={{ borderColor: 'var(--roomlock-primary)' }}
                        >
                            <div className="flex flex-col items-center justify-center py-6">
                                <Upload
                                    className="h-10 w-10 mb-3"
                                    style={{ color: 'var(--roomlock-primary)' }}
                                />
                                <p className="text-base font-medium" style={{ color: 'var(--roomlock-primary)' }}>
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
                    </div >
                </div >

                {/* Footer */}
                < div className="mt-8" >
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting || rating === 0 || !comment.trim()}
                        className="w-full h-14 text-lg font-semibold rounded-xl"
                        style={{ backgroundColor: "var(--roomlock-cta)", color: "white" }}
                    >
                        {isSubmitting ? 'Publicando...' : 'Publicar Valoración'}
                    </Button>
                </div >
            </div >
        </>
    );
};
