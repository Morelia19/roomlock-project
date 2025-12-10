import type { FC } from "react";
import { MapPin, Star, Bed, Bath, Heart } from 'lucide-react';
import { ImageWithFallback } from '@/components/imageWithFallback';

interface ListingCardProps {
    title: string;
    location: string;
    price: number;
    beds: number;
    baths: number;
    rating: number;
    image: string;
    onClick: () => void;
    isFavorite?: boolean;
    onToggleFavorite?: (e: React.MouseEvent) => void;
    showFavoriteButton?: boolean;
}

export const ListingCard: FC<ListingCardProps> = ({
    title,
    location,
    price,
    beds,
    baths,
    rating,
    image,
    onClick,
    isFavorite = false,
    onToggleFavorite,
    showFavoriteButton = false
}) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
        }
    };

    return (
        <div
            onClick={onClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            className="text-left transition-transform hover:scale-105 group h-full cursor-pointer"
        >
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="relative h-56 flex-shrink-0">
                    <ImageWithFallback
                        src={image || "/placeholder.svg"}
                        alt={title}
                        className="h-full w-full object-cover"
                    />
                    {showFavoriteButton && onToggleFavorite && (
                        <button
                            onClick={onToggleFavorite}
                            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform z-10"
                            aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                        >
                            <Heart
                                className="h-5 w-5"
                                fill={isFavorite ? "#EF4444" : "none"}
                                stroke="#EF4444"
                            />
                        </button>
                    )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-medium mb-2 line-clamp-1" style={{ color: "var(--roomlock-text-primary)" }}>
                        {title}
                    </h3>
                    <div className="flex items-center gap-1 mb-3 text-sm" style={{ color: "var(--roomlock-text-secondary)" }}>
                        <MapPin className="h-4 w-4" />
                        <span>{location}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3 text-sm" style={{ color: "var(--roomlock-text-secondary)" }}>
                        <div className="flex items-center gap-1">
                            <Bed className="h-4 w-4" />
                            <span>{beds}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Bath className="h-4 w-4" />
                            <span>{baths}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-current" style={{ color: "var(--roomlock-highlight)" }} />
                            <span>{rating}</span>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2 mt-auto">
                        <span className="text-xl font-semibold" style={{ color: "var(--roomlock-primary)" }}>
                            S/.{price}
                        </span>
                        <span className="text-sm" style={{ color: "var(--roomlock-text-secondary)" }}>
                            por mes
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
