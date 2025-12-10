import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Home, Shield, CheckCircle, Loader2 } from 'lucide-react';
import { HeroSection } from '@/components/heroSection';
import { FeaturedListingsSection } from '@/components/featuredListingsSection';
import { FeaturesSection } from '@/components/featuresSection';
import { CommunitySection } from '@/components/communitySection';
import { districts } from "@/mockData/mocklisting";
import { headerBg } from '@/assets';
import { useAuth } from '@/contexts/AuthContext';
import { favoriteService } from '@/services/favorite.service';
import { announcementService } from '@/services/announcement.service';
import { toast } from 'sonner';

export const HomePage = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const listingsScrollRef = useRef<HTMLDivElement>(null);
    const [favorites, setFavorites] = useState<Set<number>>(new Set());

    // New state for announcements
    const [listings, setListings] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate("/search", { state: { query: searchQuery } });
        }
    };

    const handleDistrictClick = (district: string) => {
        navigate("/search", { state: { query: district } });
    };

    const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
        if (ref.current) {
            const scrollAmount = 300;
            ref.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    // Load announcements from API
    useEffect(() => {
        const loadAnnouncements = async () => {
            try {
                setIsLoading(true);
                const data = await announcementService.getFeaturedAnnouncements();
                setListings(data);
                setError(null);
            } catch (err) {
                console.error('Error loading announcements:', err);
                setError('Error al cargar anuncios');
                toast.error('No se pudieron cargar los anuncios');
            } finally {
                setIsLoading(false);
            }
        };

        loadAnnouncements();
    }, []);

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
            // Revert on error
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

    const popularDistricts = districts.map(d => d.name).slice(0, 8);

    const features = [
        { icon: Home, title: "Habitaciones Verificadas", desc: "Todos los anuncios son revisados" },
        { icon: MapPin, title: "Ubicaciones Cercanas", desc: "Encuentra alojamiento cerca de tu universidad" },
        { icon: Shield, title: "Pago Seguro", desc: "Sistema de pagos en custodia" },
        { icon: CheckCircle, title: "Servicios Incluidos", desc: "Filtra por servicios que necesitas" }
    ];

    return (
        <div className="min-h-screen" style={{ backgroundColor: "var(--roomlock-bg-lighter)" }}>
            <HeroSection
                backgroundImage={headerBg}
                title="Encuentra tu hogar ideal cerca de tu universidad"
                subtitle="Conectamos estudiantes con propietarios verificados. Seguro, transparente y confiable."
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                onSearch={handleSearch}
                districts={popularDistricts}
                onDistrictClick={handleDistrictClick}
            />

            {isLoading ? (
                <div className="py-16 px-4 flex justify-center items-center">
                    <div className="text-center">
                        <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" style={{ color: "var(--roomlock-primary)" }} />
                        <p style={{ color: "var(--roomlock-text-secondary)" }}>Cargando anuncios...</p>
                    </div>
                </div>
            ) : error ? (
                <div className="py-16 px-4 flex justify-center items-center">
                    <div className="text-center">
                        <p className="text-red-600 mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 rounded-lg"
                            style={{ backgroundColor: "var(--roomlock-primary)", color: "white" }}
                        >
                            Reintentar
                        </button>
                    </div>
                </div>
            ) : (
                <FeaturedListingsSection
                    listings={listings}
                    scrollRef={listingsScrollRef}
                    onScroll={(direction) => scroll(listingsScrollRef, direction)}
                    onListingClick={(id) => navigate(`/listing/${id}`)}
                    showFavoriteButton={isAuthenticated && user?.role === 'student'}
                    favorites={favorites}
                    onToggleFavorite={handleToggleFavorite}
                />
            )}

            <FeaturesSection features={features} />

            <CommunitySection
                onOwnerClick={() => navigate("/register")}
                onStudentClick={() => navigate("/search")}
            />
        </div>
    );
};
