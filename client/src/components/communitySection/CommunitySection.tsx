import type { FC } from "react";
import { Home, Users } from 'lucide-react';
import { CommunityCard } from '@/components/communityCard';

interface CommunitySectionProps {
    onOwnerClick: () => void;
    onStudentClick: () => void;
}

export const CommunitySection: FC<CommunitySectionProps> = ({
    onOwnerClick,
    onStudentClick
}) => {
    const ownerBenefits = [
        "Únete a la comunidad más grande de Perú",
        "Publicamos tu anuncio en nuestras redes",
        "Exclusivamente para roommates y alquileres de habitación"
    ];

    const studentBenefits = [
        "Compara entre las habitaciones y elige la mejor",
        "Contacta directamente con los propietarios",
        "Te ayudamos a buscar un sitio"
    ];

    return (
        <section className="py-16 px-4" style={{ backgroundColor: "white" }}>
            <div className="container mx-auto max-w-6xl">
                <h2 className="mb-3 text-center text-xl font-medium" style={{ color: "var(--roomlock-cta)" }}>
                    ¿Por qué unirse a esta comunidad RoomLock en Lima?
                </h2>
                <p className="mb-12 text-center text-sm" style={{ color: "var(--roomlock-text-secondary)" }}>
                    Conectamos estudiantes con propietarios de manera segura y confiable
                </p>

                <div className="grid gap-8 md:grid-cols-2">
                    <CommunityCard
                        icon={Home}
                        title="¿Eres propietario y quieres compartir tu departamento?"
                        benefits={ownerBenefits}
                        buttonText="Publicar habitación gratis"
                        onButtonClick={onOwnerClick}
                    />

                    <CommunityCard
                        icon={Users}
                        title="¿Estás buscando alquilar una habitación en Lima?"
                        benefits={studentBenefits}
                        buttonText="Buscar habitaciones"
                        onButtonClick={onStudentClick}
                    />
                </div>
            </div>
        </section>
    );
};
