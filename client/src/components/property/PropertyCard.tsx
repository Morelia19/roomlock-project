import { Heart, MapPin, Bed, Bath, Star } from 'lucide-react';
import { useState } from 'react';
import type { FavoriteAnnouncement } from '@/services/favorite.service';

interface PropertyCardProps {
    property: FavoriteAnnouncement;
    onToggleFavorite: (id: number) => void;
    onPropertyClick?: (id: number) => void;
}

export const PropertyCard = ({ property, onToggleFavorite, onPropertyClick }: PropertyCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleCardClick = () => {
        if (onPropertyClick) {
            onPropertyClick(property.id);
        }
    };

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleFavorite(property.id);
    };

    return (
        <div
            className="bg-white rounded-lg border overflow-hidden cursor-pointer transition-shadow hover:shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCardClick}
        >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={property.images[0] || '/placeholder-property.jpg'}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-300"
                    style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
                />
                <button
                    onClick={handleFavoriteClick}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                    <Heart
                        className="h-5 w-5"
                        fill={property.is_favorite ? 'var(--roomlock-cta)' : 'none'}
                        stroke={property.is_favorite ? 'var(--roomlock-cta)' : 'currentColor'}
                    />
                </button>
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Title */}
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{property.title}</h3>

                {/* Location */}
                <div className="flex items-center gap-1 text-gray-600 text-sm mb-3">
                    <MapPin className="h-4 w-4" />
                    <span>{property.district}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        <span>{property.stats.bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        <span>{property.stats.bathrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                        <span>{property.stats.rating.toFixed(1)}</span>
                    </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold" style={{ color: 'var(--roomlock-primary)' }}>
                        S/.{property.price}
                    </span>
                    <span className="text-sm text-gray-500">por mes</span>
                </div>
            </div>
        </div>
    );
};
