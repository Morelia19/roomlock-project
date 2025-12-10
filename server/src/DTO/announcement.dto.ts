export interface AnnouncementListResponse {
    id: number;
    title: string;
    description: string | null;
    price: string;
    location: string; // same as district
    district: string;
    images: string[];
    beds: number; // default for now
    baths: number; // default for now
    amenities: string[];
    rating: number; // default for now, will calculate from reviews later
    owner: {
        id: number;
        name: string;
    };
}
