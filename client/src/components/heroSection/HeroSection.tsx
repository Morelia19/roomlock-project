import type { FC } from "react";
import { SearchBar } from '@/components/searchBar';
import { DistrictChips } from '@/components/districtChips';

interface HeroSectionProps {
    backgroundImage: string;
    title: string;
    subtitle: string;
    searchValue: string;
    onSearchChange: (value: string) => void;
    onSearch: () => void;
    districts: string[];
    onDistrictClick: (district: string) => void;
}

export const HeroSection: FC<HeroSectionProps> = ({
    backgroundImage,
    title,
    subtitle,
    searchValue,
    onSearchChange,
    onSearch,
    districts,
    onDistrictClick
}) => {
    return (
        <section
            className="relative py-20 px-4"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '400px'
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />

            <div className="flex flex-col items-center mx-auto max-w-4xl relative z-10">
                <h1 className="mb-3 text-white text-2xl md:text-3xl text-center font-medium">
                    {title}
                </h1>
                <p className="text-white/90 text-center mb-8 text-sm">
                    {subtitle}
                </p>

                <SearchBar
                    value={searchValue}
                    onChange={onSearchChange}
                    onSearch={onSearch}
                    placeholder="Buscar por distrito..."
                />

                <DistrictChips
                    districts={districts}
                    onDistrictClick={onDistrictClick}
                />
            </div>
        </section>
    );
};
