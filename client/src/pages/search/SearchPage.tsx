import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Grid3x3, List } from 'lucide-react';
import { featuredListings, districts } from '@/mockData/mocklisting';
import { ListingCard } from '@/components/listingCard';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { useAuth } from '@/contexts/AuthContext';
import { favoriteService } from '@/services/favorite.service';
import { toast } from 'sonner';
import { FilterDrawer } from '@/components/filterDrawer';



export const SearchPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const [query, setQuery] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [showFilterDrawer, setShowFilterDrawer] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [favorites, setFavorites] = useState<Set<number>>(new Set());


    useEffect(() => {
        if (location.state?.query) {
            const initialQuery = location.state.query;
            const isDistrict = districts.some(d => d.name.toLowerCase() === initialQuery.toLowerCase());

            if (isDistrict) {
                setSelectedDistrict(initialQuery);
            } else {
                setQuery(initialQuery);
            }
        }
    }, [location.state]);

    // Load favorites when user is authenticated as student
    useEffect(() => {
        const loadFavorites = async () => {
            if (isAuthenticated && user?.role === 'student') {
                try {
                    const favoritesData = await favoriteService.getFavorites();
                    const favoriteIds = new Set(favoritesData.map(fav => fav.id));
                    setFavorites(favoriteIds);
                } catch (error) {
                    console.error('Error loading favorites:', error);
                }
            }
        };

        loadFavorites();
    }, [isAuthenticated, user?.role]);

    const filteredListings = featuredListings.filter(listing => {
        const matchesQuery = query === '' ||
            listing.title.toLowerCase().includes(query.toLowerCase()) ||
            listing.description.toLowerCase().includes(query.toLowerCase()) ||
            listing.location.toLowerCase().includes(query.toLowerCase());

        const matchesDistrict = selectedDistrict === '' ||
            listing.district === selectedDistrict ||
            listing.location.includes(selectedDistrict);

        const matchesPrice = listing.price >= minPrice;

        const matchesServices = selectedServices.length === 0 ||
            selectedServices.every(service => listing.amenities.includes(service));

        return matchesQuery && matchesDistrict && matchesPrice && matchesServices;
    });

    const handleToggleFavorite = async (listingId: number, e: React.MouseEvent) => {
        e.stopPropagation();

        if (!isAuthenticated) {
            toast.error('Debes iniciar sesión para agregar favoritos');
            navigate('/login');
            return;
        }

        if (user?.role !== 'student') {
            toast.error('Solo los estudiantes pueden agregar favoritos');
            return;
        }

        const isFavorite = favorites.has(listingId);

        // Optimistic update
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (isFavorite) {
                newFavorites.delete(listingId);
            } else {
                newFavorites.add(listingId);
            }
            return newFavorites;
        });

        try {
            if (isFavorite) {
                await favoriteService.removeFavorite(listingId);
                toast.success('Eliminado de favoritos');
            } else {
                await favoriteService.addFavorite(listingId);
                toast.success('Agregado a favoritos');
            }
        } catch (error) {
            setFavorites(prev => {
                const newFavorites = new Set(prev);
                if (isFavorite) {
                    newFavorites.add(listingId);
                } else {
                    newFavorites.delete(listingId);
                }
                return newFavorites;
            });
            console.error('Error toggling favorite:', error);
            toast.error('Error al actualizar favoritos');
        }
    };

    const clearFilters = () => {
        setQuery('');
        setSelectedDistrict('');
        setMinPrice(0);
        setSelectedServices([]);
    };

    const handleServiceToggle = (service: string) => {
        setSelectedServices(prev =>
            prev.includes(service)
                ? prev.filter(s => s !== service)
                : [...prev, service]
        );
    };

    const handleApplyFilters = () => {
        // Filters are already applied via state
        // This is called when user clicks "Aplicar Filtros" in drawer
    };

    return (
        <div className="min-h-screen pt-20 pb-10 px-4" style={{ backgroundColor: "var(--roomlock-bg-lighter)" }}>
            <div className="container mx-auto max-w-7xl">

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="flex gap-3 items-center">
                        {/* Search Input */}
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                                placeholder="San Isidro"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="pl-12 h-12 rounded-lg border-gray-200"
                            />
                        </div>

                        {/* Filtros Button */}
                        <Button
                            variant="outline"
                            onClick={() => setShowFilterDrawer(true)}
                            className="h-12 px-4 flex items-center gap-2 border-gray-200"
                        >
                            <SlidersHorizontal className="h-4 w-4" />
                            <span>Filtros</span>
                        </Button>

                        {/* View Toggle Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`h-12 w-12 flex items-center justify-center rounded-lg border transition-colors ${viewMode === 'grid'
                                    ? 'bg-[var(--roomlock-primary)] text-white border-[var(--roomlock-primary)]'
                                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <Grid3x3 className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`h-12 w-12 flex items-center justify-center rounded-lg border transition-colors ${viewMode === 'list'
                                    ? 'bg-[var(--roomlock-primary)] text-white border-[var(--roomlock-primary)]'
                                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <List className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6 text-sm text-gray-500">
                    {filteredListings.length} resultados encontrados
                </div>

                {/* Results Grid */}
                {filteredListings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredListings.map(listing => (
                            <ListingCard
                                key={listing.id}
                                title={listing.title}
                                location={listing.location}
                                price={listing.price}
                                beds={listing.beds}
                                baths={listing.baths}
                                rating={listing.rating}
                                image={listing.images[0]}
                                onClick={() => navigate(`/listing/${listing.id}`)}
                                showFavoriteButton={isAuthenticated && user?.role === 'student'}
                                isFavorite={favorites.has(listing.id)}
                                onToggleFavorite={(e) => handleToggleFavorite(listing.id, e)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-gray-100 border-dashed">
                        <Search className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No se encontraron resultados</h3>
                        <p className="text-gray-500 mt-1">Intenta ajustar tu búsqueda o filtros</p>
                        <Button
                            variant="link"
                            onClick={clearFilters}
                            className="mt-4 text-[var(--roomlock-primary)]"
                        >
                            Ver todas las propiedades
                        </Button>
                    </div>
                )}
            </div>

            {/* Filter Drawer */}
            <FilterDrawer
                isOpen={showFilterDrawer}
                onClose={() => setShowFilterDrawer(false)}
                minPrice={minPrice}
                onMinPriceChange={setMinPrice}
                selectedServices={selectedServices}
                onServiceToggle={handleServiceToggle}
                onApply={handleApplyFilters}
                onClear={clearFilters}
            />
        </div>
    );
};
