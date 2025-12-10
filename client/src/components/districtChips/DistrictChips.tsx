import type { FC } from "react";

interface DistrictChipsProps {
    districts: string[];
    onDistrictClick: (district: string) => void;
}

export const DistrictChips: FC<DistrictChipsProps> = ({ districts, onDistrictClick }) => {
    return (
        <div className="flex flex-wrap gap-3 justify-center">
            {districts.map((district) => (
                <button
                    key={district}
                    onClick={() => onDistrictClick(district)}
                    className="rounded-full text-sm transition-all border-0 cursor-pointer"
                    style={{
                        padding: '8px 20px',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        fontWeight: '500'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    }}
                >
                    {district}
                </button>
            ))}
        </div>
    );
};
