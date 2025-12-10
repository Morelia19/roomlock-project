import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Star, Share2, Bookmark, MessageCircle } from 'lucide-react';
import { Button } from '@/components/button';
import { getListingById, type Listing } from '@/mockData/mocklisting';
import { useAuth } from '@/contexts/AuthContext';
import { favoriteService } from '@/services/favorite.service';
import { reviewService } from '@/services/review.service';
import { createOrGetReservation } from '@/services/reservation.service';
import { ReviewModal } from '@/components/reviewModal';
import { BookingModal, BookingSummaryModal, type BookingFormData } from '@/components/bookingModal';
import { toast } from 'sonner';

export const AnnouncementDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const [listing, setListing] = useState<Listing | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showSummaryModal, setShowSummaryModal] = useState(false);
    const [bookingFormData, setBookingFormData] = useState<BookingFormData | null>(null);
    const [isContacting, setIsContacting] = useState(false);
    const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

    useEffect(() => {
        if (id) {
            const foundListing = getListingById(Number(id));
            if (foundListing) {
                setListing(foundListing);
                setIsFavorite(foundListing.isFavorite || false);
            } else {
                navigate('/search');
            }
        }
    }, [id, navigate]);

    useEffect(() => {
        const loadReviews = async () => {
            if (!listing) return;

            try {
                const reviews = await reviewService.getReviews(listing.id);
                setListing(prev => prev ? { ...prev, reviews } : null);
            } catch (error) {
                console.error('Error loading reviews:', error);
            }
        };

        loadReviews();
    }, [listing?.id]);

    const handleToggleFavorite = async () => {
        if (!isAuthenticated) {
            toast.error('Debes iniciar sesión para agregar favoritos');
            navigate('/login');
            return;
        }

        if (user?.role !== 'student') {
            toast.error('Solo los estudiantes pueden agregar favoritos');
            return;
        }

        if (!listing) return;

        const wasFavorite = isFavorite;
        setIsFavorite(!wasFavorite);

        try {
            if (wasFavorite) {
                await favoriteService.removeFavorite(listing.id);
                toast.success('Eliminado de favoritos');
            } else {
                await favoriteService.addFavorite(listing.id);
                toast.success('Agregado a favoritos');
            }
        } catch (error) {
            setIsFavorite(wasFavorite);
            console.error('Error toggling favorite:', error);
            toast.error('Error al actualizar favoritos');
        }
    };

    const handleSubmitReview = async (rating: number, comment: string, image?: File) => {
        if (!listing) return;

        try {
            // Call API to save review
            const newReview = await reviewService.addReview(listing.id, rating, comment, image);

            // Add to local state for immediate display
            setListing({
                ...listing,
                reviews: [newReview, ...listing.reviews]
            });

            toast.success('Valoración publicada exitosamente');
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Error al publicar valoración');
        }
    };

    const handleContact = async () => {
        if (!isAuthenticated) {
            toast.error('Debes iniciar sesión para contactar al propietario');
            navigate('/login');
            return;
        }

        if (user?.role !== 'student') {
            toast.error('Solo los estudiantes pueden contactar propietarios');
            return;
        }

        if (!listing) return;

        setIsContacting(true);
        try {
            const result = await createOrGetReservation(listing.id);
            toast.success('Redirigiendo a mensajes...');
            // Navigate to messages page with the reservation ID
            navigate(`/messages?reservation=${result.data.id}`);
        } catch (error: any) {
            console.error('Error creating reservation:', error);
            toast.error(error.response?.data?.error || 'Error al contactar propietario');
        } finally {
            setIsContacting(false);
        }
    };

    const handleStartBooking = () => {
        if (!isAuthenticated) {
            toast.error('Debes iniciar sesión para reservar');
            navigate('/login');
            return;
        }

        if (user?.role !== 'student') {
            toast.error('Solo los estudiantes pueden reservar habitaciones');
            return;
        }

        setShowBookingModal(true);
    };

    const handleBookingContinue = (formData: BookingFormData) => {
        setBookingFormData(formData);
        setShowBookingModal(false);
        setShowSummaryModal(true);
    };

    const handleBookingConfirm = async () => {
        if (!listing || !bookingFormData) return;

        setIsSubmittingBooking(true);
        try {
            await createOrGetReservation(listing.id);

            toast.success('¡Solicitud enviada! El propietario recibirá tu solicitud.');
            setShowSummaryModal(false);
            setBookingFormData(null);
        } catch (error: any) {
            console.error('Error submitting booking:', error);
            toast.error(error.response?.data?.error || 'Error al enviar solicitud');
        } finally {
            setIsSubmittingBooking(false);
        }
    };

    if (!listing) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-900">Cargando...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-10 px-4" style={{ backgroundColor: "var(--roomlock-bg-lighter)" }}>
            <div className="container mx-auto max-w-6xl">
                <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative h-96 rounded-xl overflow-hidden">
                            <img
                                src={listing.images[selectedImage]}
                                alt={listing.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {listing.images.slice(0, 4).map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative h-44 rounded-xl overflow-hidden transition-all ${selectedImage === index
                                        ? 'ring-4 ring-[var(--roomlock-primary)]'
                                        : 'hover:opacity-80'
                                        }`}
                                >
                                    <img
                                        src={image}
                                        alt={`${listing.title} - ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <div className="flex items-start justify-between mb-2">
                                <h1 className="text-3xl font-bold" style={{ color: "var(--roomlock-text-primary)" }}>
                                    {listing.title}
                                </h1>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleToggleFavorite}
                                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                    >
                                        <Bookmark
                                            className="h-6 w-6"
                                            fill={isFavorite ? "#EF4444" : "none"}
                                            stroke={isFavorite ? "#EF4444" : "currentColor"}
                                        />
                                    </button>
                                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                                        <Share2 className="h-6 w-6" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="h-5 w-5" />
                                <span>{listing.address}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 py-4 border-y border-gray-200">
                            <div className="flex items-center gap-2">
                                <Bed className="h-5 w-5 text-gray-600" />
                                <span className="font-medium">{listing.beds} Habitación</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Bath className="h-5 w-5 text-gray-600" />
                                <span className="font-medium">{listing.baths} Baño</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl">
                            <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--roomlock-text-primary)" }}>
                                Descripción
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                {listing.description}
                            </p>
                        </div>

                        {/* Services */}
                        <div className="bg-white p-6 rounded-xl">
                            <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--roomlock-text-primary)" }}>
                                Servicios incluidos
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {listing.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--roomlock-primary)" }} />
                                        <span className="text-gray-700">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="bg-white p-6 rounded-xl">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold" style={{ color: "var(--roomlock-text-primary)" }}>
                                    <Star className="inline h-5 w-5 fill-yellow-400 stroke-yellow-400 mr-2" />
                                    Valoraciones ({listing.reviews.length})
                                </h2>
                            </div>

                            {listing.reviews.length > 0 ? (
                                <div className="space-y-6">
                                    {listing.reviews.map((review) => (
                                        <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
                                                    {review.user.charAt(0)}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div>
                                                            <p className="font-medium">{review.user}</p>
                                                            <p className="text-sm text-gray-500">{review.date}</p>
                                                        </div>
                                                        <div className="flex gap-1">
                                                            {[1, 2, 3, 4, 5].map((starNum) => {
                                                                const isFilled = starNum <= review.rating;
                                                                return (
                                                                    <Star
                                                                        key={starNum}
                                                                        style={{
                                                                            width: '16px',
                                                                            height: '16px',
                                                                            fill: isFilled ? '#FBBF24' : 'none',
                                                                            stroke: isFilled ? '#F59E0B' : '#E5E7EB',
                                                                            strokeWidth: 2,
                                                                        }}
                                                                    />
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-700">{review.comment}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">No hay valoraciones aún</p>
                            )}

                            {/* Review Input */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                {isAuthenticated && user?.role === 'student' ? (
                                    <div>
                                        <h3 className="font-medium mb-3">Deja tu valoración y comentario</h3>
                                        <Button
                                            onClick={() => setShowReviewModal(true)}
                                            className="w-full flex items-center justify-center gap-2"
                                            style={{ backgroundColor: "var(--roomlock-cta)", color: "white" }}
                                        >
                                            <Star className="h-5 w-5" />
                                            Agregar Valoración
                                        </Button>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 text-center">
                                        Inicia sesión como estudiante para dejar una valoración.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-lg sticky top-24">
                            {/* Price */}
                            <div className="mb-6">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold" style={{ color: "var(--roomlock-primary)" }}>
                                        S/.{listing.price}
                                    </span>
                                    <span className="text-gray-500">por mes</span>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="space-y-3 mb-6">
                                <Button
                                    onClick={handleStartBooking}
                                    className="w-full h-12 text-base"
                                    style={{ backgroundColor: "var(--roomlock-cta)", color: "white" }}
                                >
                                    Reservar Ahora
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full h-12 text-base flex items-center justify-center gap-2"
                                    onClick={handleContact}
                                    disabled={isContacting}
                                >
                                    <MessageCircle className="h-5 w-5" />
                                    {isContacting ? 'Contactando...' : 'Contactar'}
                                </Button>
                            </div>

                            {/* Owner Info */}
                            <div className="pt-6 border-t border-gray-200">
                                <h3 className="font-semibold mb-4">Propietario</h3>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-lg">
                                        {listing.owner.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium">{listing.owner.name}</p>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                                            <span className="text-sm text-gray-600">{listing.owner.rating}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Tiempo de respuesta: {listing.owner.responseTime}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Modal */}
            <ReviewModal
                isOpen={showReviewModal}
                onClose={() => setShowReviewModal(false)}
                announcementTitle={listing.title}
                onSubmit={handleSubmitReview}
            />

            {/* Booking Modals */}
            <BookingModal
                isOpen={showBookingModal}
                onClose={() => setShowBookingModal(false)}
                announcementTitle={listing.title}
                onContinue={handleBookingContinue}
            />

            <BookingSummaryModal
                isOpen={showSummaryModal}
                onClose={() => setShowSummaryModal(false)}
                onConfirm={handleBookingConfirm}
                announcementTitle={listing.title}
                ownerName={listing.owner.name}
                price={listing.price}
                formData={bookingFormData || { fullName: '', email: '', phone: '', university: '', studentCode: '', moveInDate: '' }}
                isSubmitting={isSubmittingBooking}
            />
        </div>
    );
};
