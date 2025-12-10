import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { favoriteService, type FavoriteAnnouncement } from '@/services/favorite.service';
import { ListingCard } from '@/components/listingCard';
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

    const handleToggleFavorite = async (e: React.MouseEvent, announcementId: number) => {
        e.stopPropagation(); // Prevent card click event

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
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold mb-2" style={{ color: 'var(--roomlock-text-primary)' }}>
                        Mis Favoritos
                    </h1>
                    <p className="text-sm" style={{ color: 'var(--roomlock-text-secondary)' }}>
                        {favorites.length} anuncio{favorites.length !== 1 ? 's' : ''} guardado{favorites.length !== 1 ? 's' : ''}
                    </p>
                </div>

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
                            <ListingCard
                                key={property.id}
                                title={property.title}
                                location={property.district}
                                price={parseFloat(property.price)}
                                beds={property.stats.bedrooms}
                                baths={property.stats.bathrooms}
                                rating={property.stats.rating}
                                image={property.images[0] || '/placeholder.svg'}
                                onClick={() => handleListingClick(property.id)}
                                isFavorite={true}
                                onToggleFavorite={(e) => handleToggleFavorite(e, property.id)}
                                showFavoriteButton={true}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
