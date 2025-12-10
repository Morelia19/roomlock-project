import { useState, useEffect } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { favoriteService, type FavoriteAnnouncement } from '@/services/favorite.service';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const FavoritesPage = () => {
    const [favorites, setFavorites] = useState<FavoriteAnnouncement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            setIsLoading(true);
            const data = await favoriteService.getFavorites();
            setFavorites(data);
        } catch (error) {
            console.error('Error loading favorites:', error);
            toast.error('Error al cargar favoritos');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveFavorite = async (announcementId: number) => {
        try {
            await favoriteService.removeFavorite(announcementId);
            setFavorites(prev => prev.filter(fav => fav.id !== announcementId));
            toast.success('Eliminado de favoritos');
        } catch (error) {
            console.error('Error removing favorite:', error);
            toast.error('Error al eliminar de favoritos');
        }
    };

    const handleListingClick = (id: number) => {
        navigate(`/listing/${id}`);
    };

    return (
        <div className="min-h-screen py-8 px-4" style={{ backgroundColor: 'var(--roomlock-bg-lighter)' }}>
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold mb-2" style={{ color: 'var(--roomlock-text-primary)' }}>
                        Mis Favoritos
                    </h1>
                    <p className="text-sm" style={{ color: 'var(--roomlock-text-secondary)' }}>
                        {favorites.length} anuncio{favorites.length !== 1 ? 's' : ''} guardado{favorites.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: 'var(--roomlock-primary)' }}></div>
                        <p className="mt-4" style={{ color: 'var(--roomlock-text-secondary)' }}>Cargando favoritos...</p>
                    </div>
                ) : favorites.length === 0 ? (
                    <div className="text-center py-12">
                        <Heart className="h-16 w-16 mx-auto mb-4" style={{ color: 'var(--roomlock-text-secondary)', opacity: 0.3 }} />
                        <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--roomlock-text-primary)' }}>
                            No tienes favoritos aún
                        </h3>
                        <p style={{ color: 'var(--roomlock-text-secondary)' }}>
                            Empieza a guardar tus propiedades favoritas
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favorites.map((property) => (
                            <div key={property.id} className="relative">
                                <button
                                    onClick={() => handleListingClick(property.id)}
                                    className="text-left transition-transform hover:scale-105 group h-full w-full"
                                >
                                    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow h-full flex flex-col">
                                        {/* Image with Heart */}
                                        <div className="relative h-56 flex-shrink-0">
                                            <img
                                                src={property.images[0] || '/placeholder.svg'}
                                                alt={property.title}
                                                className="h-full w-full object-cover"
                                            />
                                            {/* Heart Icon */}
                                            <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                                                <Heart
                                                    className="h-5 w-5"
                                                    fill="var(--roomlock-cta)"
                                                    stroke="var(--roomlock-cta)"
                                                />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-4 flex-1 flex flex-col">
                                            <h3 className="font-medium mb-2 line-clamp-1" style={{ color: 'var(--roomlock-text-primary)' }}>
                                                {property.title}
                                            </h3>
                                            <div className="flex items-center gap-1 mb-3 text-sm" style={{ color: 'var(--roomlock-text-secondary)' }}>
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span>{property.district}</span>
                                            </div>
                                            <div className="flex items-center gap-3 mb-3 text-sm" style={{ color: 'var(--roomlock-text-secondary)' }}>
                                                <div className="flex items-center gap-1">
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                    </svg>
                                                    <span>{property.stats.bedrooms}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                                    </svg>
                                                    <span>{property.stats.bathrooms}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <svg className="h-4 w-4 fill-current" style={{ color: 'var(--roomlock-highlight)' }} viewBox="0 0 24 24">
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                    </svg>
                                                    <span>{property.stats.rating}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-baseline gap-2 mt-auto">
                                                <span className="text-xl font-semibold" style={{ color: 'var(--roomlock-primary)' }}>
                                                    S/.{property.price}
                                                </span>
                                                <span className="text-sm" style={{ color: 'var(--roomlock-text-secondary)' }}>
                                                    /mes
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </button>

                                {/* Delete Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveFavorite(property.id);
                                    }}
                                    className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors z-10"
                                    title="Eliminar de favoritos"
                                >
                                    <Trash2 className="h-4 w-4" style={{ color: 'var(--roomlock-cta)' }} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
