import type { FC, RefObject } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/button';
import { ListingCard } from '@/components/listingCard';

interface Listing {
    id: number;
    title: string;
    location: string;
    price: number;
    beds: number;
    baths: number;
    rating: number;
    images: string[];
}

interface FeaturedListingsSectionProps {
    listings: Listing[];
    scrollRef: RefObject<HTMLDivElement | null>;
    onScroll: (direction: "left" | "right") => void;
    onListingClick: (id: number) => void;
}

export const FeaturedListingsSection: FC<FeaturedListingsSectionProps> = ({
    listings,
    scrollRef,
    onScroll,
    onListingClick
}) => {
    return (
        <section className="py-16 px-4" style={{ backgroundColor: "white" }}>
            <div className="container mx-auto max-w-7xl">
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-xl font-medium" style={{ color: "var(--roomlock-text-primary)" }}>
                        Anuncios destacados
                    </h2>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => onScroll("left")}
                            className="rounded-lg"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => onScroll("right")}
                            className="rounded-lg"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div
                    ref={scrollRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {listings.map((listing) => (
                        <ListingCard
                            key={listing.id}
                            title={listing.title}
                            location={listing.location}
                            price={listing.price}
                            beds={listing.beds}
                            baths={listing.baths}
                            rating={listing.rating}
                            image={listing.images[0]}
                            onClick={() => onListingClick(listing.id)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
