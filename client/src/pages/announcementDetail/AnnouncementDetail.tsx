import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Star, Share2, Bookmark, Phone } from 'lucide-react';
import { Button } from '@/components/button';
import { getListingById, type Listing } from '@/mockData/mocklisting';
import { useAuth } from '@/contexts/AuthContext';
import { favoriteService } from '@/services/favorite.service';
import { toast } from 'sonner';

export const AnnouncementDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const [listing, setListing] = useState<Listing | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

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
                {/* Image Gallery */}
                <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Main Image */}
                        <div className="relative h-96 rounded-xl overflow-hidden">
                            <img
                                src={listing.images[selectedImage]}
                                alt={listing.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Thumbnail Grid */}
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
                    {/* Left Column - Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title and Location */}
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

                        {/* Stats */}
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

                        {/* Description */}
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
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`h-4 w-4 ${i < review.rating
                                                                            ? 'fill-yellow-400 stroke-yellow-400'
                                                                            : 'fill-gray-200 stroke-gray-200'
                                                                        }`}
                                                                />
                                                            ))}
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
                            {isAuthenticated && user?.role === 'student' && (
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <h3 className="font-medium mb-3">Deja tu valoración y comentario</h3>
                                    <p className="text-sm text-gray-500">
                                        Inicia sesión como estudiante para dejar una valoración.
                                    </p>
                                </div>
                            )}
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
                                    className="w-full h-12 text-base"
                                    style={{ backgroundColor: "var(--roomlock-cta)", color: "white" }}
                                >
                                    Reservar Ahora
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full h-12 text-base flex items-center justify-center gap-2"
                                >
                                    <Phone className="h-5 w-5" />
                                    Contactar
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
        </div>
    );
};
