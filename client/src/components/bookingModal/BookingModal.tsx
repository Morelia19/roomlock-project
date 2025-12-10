import { type FC, useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import { Button } from '@/components/button';
import { useAuth } from '@/contexts/AuthContext';

export interface BookingFormData {
    fullName: string;
    email: string;
    phone: string;
    university: string;
    studentCode: string;
    moveInDate: string;
}

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    announcementTitle: string;
    onContinue: (formData: BookingFormData) => void;
}

export const BookingModal: FC<BookingModalProps> = ({
    isOpen,
    onClose,
    announcementTitle,
    onContinue
}) => {
    const { user } = useAuth();

    const [formData, setFormData] = useState<BookingFormData>({
        fullName: '',
        email: '',
        phone: '',
        university: '',
        studentCode: '',
        moveInDate: ''
    });

    // Pre-fill name and email from authenticated user
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                fullName: user.name || '',
                email: user.email || ''
            }));
        }
    }, [user]);

    if (!isOpen) return null;

    const handleSubmit = () => {
        // Validate required fields
        if (!formData.fullName || !formData.email || !formData.phone || !formData.moveInDate) {
            alert('Por favor completa todos los campos obligatorios');
            return;
        }

        onContinue(formData);
    };

    const handleChange = (field: keyof BookingFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <>
            {/* Backdrop */}
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    zIndex: 9998,
                    transition: 'opacity 0.2s',
                }}
                onClick={onClose}
            />

            {/* Modal */}
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    maxWidth: '42rem',
                    backgroundColor: 'white',
                    borderRadius: '1.5rem',
                    zIndex: 9999,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    padding: '2rem',
                    margin: '0 1rem',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                }}
            >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--roomlock-text-primary)" }}>
                            Reservar Habitación
                        </h2>
                        <p className="text-base text-gray-500">
                            {announcementTitle}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-4"
                    >
                        <X className="h-6 w-6 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <div className="space-y-6">
                    <h3 className="text-xl font-normal" style={{ color: "var(--roomlock-text-primary)" }}>
                        Información Personal
                    </h3>

                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-normal mb-2" style={{ color: "var(--roomlock-text-primary)" }}>
                            Nombre Completo <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={formData.fullName}
                                readOnly
                                placeholder="Juan Pérez García"
                                style={{
                                    width: '100%',
                                    height: '52px',
                                    paddingLeft: '44px',
                                    paddingRight: '16px',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '12px',
                                    fontSize: '15px',
                                    backgroundColor: '#F9FAFB',
                                    outline: 'none',
                                }}
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Email and Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-normal mb-2" style={{ color: "var(--roomlock-text-primary)" }}>
                                Correo Electrónico <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={formData.email}
                                    readOnly
                                    placeholder="correo@universidad.edu.pe"
                                    style={{
                                        width: '100%',
                                        height: '52px',
                                        paddingLeft: '44px',
                                        paddingRight: '16px',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: '12px',
                                        fontSize: '15px',
                                        backgroundColor: '#F9FAFB',
                                        outline: 'none',
                                    }}
                                />
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-normal mb-2" style={{ color: "var(--roomlock-text-primary)" }}>
                                Teléfono <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    placeholder="+51 999 999 999"
                                    style={{
                                        width: '100%',
                                        height: '52px',
                                        paddingLeft: '44px',
                                        paddingRight: '16px',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: '12px',
                                        fontSize: '15px',
                                        backgroundColor: 'white',
                                        outline: 'none',
                                    }}
                                    onFocus={(e) => e.target.style.border = '1px solid var(--roomlock-primary)'}
                                    onBlur={(e) => e.target.style.border = '1px solid #E5E7EB'}
                                />
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* University and Student Code */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-normal mb-2" style={{ color: "var(--roomlock-text-primary)" }}>
                                Universidad
                            </label>
                            <input
                                type="text"
                                value={formData.university}
                                onChange={(e) => handleChange('university', e.target.value)}
                                placeholder="UNMSM, PUCP, UPC..."
                                style={{
                                    width: '100%',
                                    height: '52px',
                                    paddingLeft: '16px',
                                    paddingRight: '16px',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '12px',
                                    fontSize: '15px',
                                    backgroundColor: 'white',
                                    outline: 'none',
                                }}
                                onFocus={(e) => e.target.style.border = '1px solid var(--roomlock-primary)'}
                                onBlur={(e) => e.target.style.border = '1px solid #E5E7EB'}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-normal mb-2" style={{ color: "var(--roomlock-text-primary)" }}>
                                Código de Estudiante
                            </label>
                            <input
                                type="text"
                                value={formData.studentCode}
                                onChange={(e) => handleChange('studentCode', e.target.value)}
                                placeholder="20180123"
                                style={{
                                    width: '100%',
                                    height: '52px',
                                    paddingLeft: '16px',
                                    paddingRight: '16px',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '12px',
                                    fontSize: '15px',
                                    backgroundColor: 'white',
                                    outline: 'none',
                                }}
                                onFocus={(e) => e.target.style.border = '1px solid var(--roomlock-primary)'}
                                onBlur={(e) => e.target.style.border = '1px solid #E5E7EB'}
                            />
                        </div>
                    </div>

                    {/* Move In Date */}
                    <div>
                        <label className="block text-sm font-normal mb-2" style={{ color: "var(--roomlock-text-primary)" }}>
                            Fecha de Mudanza <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                value={formData.moveInDate}
                                onChange={(e) => handleChange('moveInDate', e.target.value)}
                                placeholder="Selecciona una fecha"
                                style={{
                                    width: '100%',
                                    height: '52px',
                                    paddingLeft: '44px',
                                    paddingRight: '16px',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '12px',
                                    fontSize: '15px',
                                    backgroundColor: 'white',
                                    outline: 'none',
                                }}
                                onFocus={(e) => e.target.style.border = '1px solid var(--roomlock-primary)'}
                                onBlur={(e) => e.target.style.border = '1px solid #E5E7EB'}
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                <Calendar className="h-5 w-5" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-gray-200 flex gap-4">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="flex-1 h-14 text-base font-medium rounded-xl"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className="flex-1 h-14 text-base font-medium rounded-xl"
                        style={{ backgroundColor: "var(--roomlock-cta)", color: "white" }}
                    >
                        Continuar
                    </Button>
                </div>
            </div>
        </>
    );
};
