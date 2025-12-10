import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Home, Shield, CheckCircle } from 'lucide-react';
import { HeroSection } from '@/components/heroSection';
import { FeaturedListingsSection } from '@/components/featuredListingsSection';
import { FeaturesSection } from '@/components/featuresSection';
import { CommunitySection } from '@/components/communitySection';
import { featuredListings, districts } from "@/mockData/mocklisting";
import { headerBg } from '@/assets';

export const HomePage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const listingsScrollRef = useRef<HTMLDivElement>(null);

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

            <FeaturedListingsSection
                listings={featuredListings.slice(0, 4)}
                scrollRef={listingsScrollRef}
                onScroll={(direction) => scroll(listingsScrollRef, direction)}
                onListingClick={(id) => navigate(`/listing/${id}`)}
            />

            <FeaturesSection features={features} />

            <CommunitySection
                onOwnerClick={() => navigate("/register")}
                onStudentClick={() => navigate("/search")}
            />
        </div>
    );
};
