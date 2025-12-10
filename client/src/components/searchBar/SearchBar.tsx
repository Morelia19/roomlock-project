import type { FC, KeyboardEvent } from "react";
import { Search } from 'lucide-react';
import { Button } from '@/components/button';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
    placeholder?: string;
}

export const SearchBar: FC<SearchBarProps> = ({
    value,
    onChange,
    onSearch,
    placeholder = "Buscar por distrito..."
}) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSearch();
        }
    };

    return (
        <div className="mb-6">
            <div
                className="flex flex-row items-center bg-white rounded-full shadow-lg gap-4"
                style={{ padding: '10px 18px', width: '670px' }}
            >
                <Search
                    className="h-[20px] w-[20px] flex-shrink-0"
                    style={{ color: "var(--roomlock-text-secondary)" }}
                />
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent !h-auto text-[#757575] outline-none"
                />
                <Button
                    onClick={onSearch}
                    className="rounded-full px-8 py-3 cursor-pointer"
                    style={{ backgroundColor: "var(--roomlock-cta)", color: "white", padding: '10px 20px' }}
                >
                    Buscar
                </Button>
            </div>
        </div>
    );
};
