import { X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../button';

interface FilterSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onApplyFilters: (filters: FilterState) => void;
}

export interface FilterState {
    minPrice: number;
    services: string[];
}

const AVAILABLE_SERVICES = [
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

export const FilterSidebar = ({ isOpen, onClose, onApplyFilters }: FilterSidebarProps) => {
    const [minPrice, setMinPrice] = useState(700);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const handleServiceToggle = (service: string) => {
        setSelectedServices(prev =>
            prev.includes(service)
                ? prev.filter(s => s !== service)
                : [...prev, service]
        );
    };

    const handleApply = () => {
        onApplyFilters({
            minPrice,
            services: selectedServices
        });
        onClose();
    };

    const handleClear = () => {
        setMinPrice(700);
        setSelectedServices([]);
        onApplyFilters({
            minPrice: 0,
            services: []
        });
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={onClose}
            />

            {/* Sidebar */}
            <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Filtro de Búsqueda</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-sm text-gray-600 mb-6">
                        Personaliza tu búsqueda de alojamiento
                    </p>

                    {/* Price Range */}
                    <div className="mb-8">
                        <label className="block text-sm font-semibold mb-3">
                            Precio Mínimo: S/.{minPrice}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="2000"
                            step="50"
                            value={minPrice}
                            onChange={(e) => setMinPrice(Number(e.target.value))}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, var(--roomlock-primary) 0%, var(--roomlock-primary) ${(minPrice / 2000) * 100}%, #e5e7eb ${(minPrice / 2000) * 100}%, #e5e7eb 100%)`
                            }}
                        />
                    </div>

                    {/* Services */}
                    <div>
                        <label className="block text-sm font-semibold mb-3">
                            Servicios Incluidos
                        </label>
                        <div className="space-y-3">
                            {AVAILABLE_SERVICES.map((service) => (
                                <label
                                    key={service}
                                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedServices.includes(service)}
                                        onChange={() => handleServiceToggle(service)}
                                        className="w-5 h-5 rounded border-gray-300 cursor-pointer"
                                        style={{
                                            accentColor: 'var(--roomlock-primary)'
                                        }}
                                    />
                                    <span className="text-sm">{service}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex gap-3">
                        <Button
                            onClick={handleClear}
                            variant="ghost"
                            className="flex-1"
                        >
                            Limpiar
                        </Button>
                        <Button
                            onClick={handleApply}
                            style={{ backgroundColor: 'var(--roomlock-cta)', color: 'white' }}
                            className="flex-1"
                        >
                            Aplicar
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
