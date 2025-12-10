import type { FC } from "react";
import { X } from 'lucide-react';
import { Button } from '@/components/button';


interface FilterDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    minPrice: number;
    onMinPriceChange: (value: number) => void;
    selectedServices: string[];
    onServiceToggle: (service: string) => void;
    onApply: () => void;
    onClear: () => void;
}

const availableServices = [
    'WiFi',
    'Lavadora',
    'Microondas',
    'Closet',
    'Seguridad 24/7',
    'Terraza',
    'Aire acondicionado',
    'Cocina equipada',
    'TV',
    'Baño privado',
    'Ascensor',
    'Mascotas permitidas',
    'Calefacción',
    'Refrigerador',
    'Escritorio',
    'Estacionamiento',
    'Gym'
];

export const FilterDrawer: FC<FilterDrawerProps> = ({
    isOpen,
    onClose,
    minPrice,
    onMinPriceChange,
    selectedServices,
    onServiceToggle,
    onApply,
    onClear
}) => {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold" style={{ color: "var(--roomlock-text-primary)" }}>
                            Filtro de Búsqueda
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Personaliza tu búsqueda de alojamiento
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-8">
                    {/* Price Range */}
                    <div>
                        <label className="block text-sm font-medium mb-4" style={{ color: "var(--roomlock-text-primary)" }}>
                            Precio Mínimo: S/.{minPrice}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="2000"
                            step="50"
                            value={minPrice}
                            onChange={(e) => onMinPriceChange(Number(e.target.value))}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, var(--roomlock-primary) 0%, var(--roomlock-primary) ${(minPrice / 2000) * 100}%, #e5e7eb ${(minPrice / 2000) * 100}%, #e5e7eb 100%)`
                            }}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>S/.0</span>
                            <span>S/.2000</span>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <label className="block text-sm font-medium mb-4" style={{ color: "var(--roomlock-text-primary)" }}>
                            Servicios Incluidos
                        </label>
                        <div className="space-y-3">
                            {availableServices.map((service) => (
                                <label
                                    key={service}
                                    className="flex items-center gap-3 cursor-pointer group"
                                >
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={selectedServices.includes(service)}
                                            onChange={() => onServiceToggle(service)}
                                            className="sr-only"
                                        />
                                        <div
                                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedServices.includes(service)
                                                ? 'border-[var(--roomlock-primary)] bg-[var(--roomlock-primary)]'
                                                : 'border-gray-300 group-hover:border-[var(--roomlock-primary)]'
                                                }`}
                                        >
                                            {selectedServices.includes(service) && (
                                                <svg
                                                    className="w-3 h-3 text-white"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="3"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                        {service}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
                    <Button
                        variant="outline"
                        onClick={onClear}
                        className="flex-1"
                    >
                        Limpiar
                    </Button>
                    <Button
                        onClick={() => {
                            onApply();
                            onClose();
                        }}
                        className="flex-1"
                        style={{ backgroundColor: "var(--roomlock-primary)", color: "white" }}
                    >
                        Aplicar Filtros
                    </Button>
                </div>
            </div>
        </>
    );
};
