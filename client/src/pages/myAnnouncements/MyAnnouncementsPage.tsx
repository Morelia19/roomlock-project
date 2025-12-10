import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Edit, Trash2, MapPin } from 'lucide-react';
import { Button } from '@/components/button';
import { announcementService } from '@/services/announcement.service';
import { toast } from 'sonner';

interface OwnerAnnouncement {
    id: number;
    title: string;
    description: string | null;
    price: string;
    district: string;
    images: string[];
    services: string[];
    state: string;
    views: number;
    inquiries: number;
    creationDate: Date;
}

interface Statistics {
    total: number;
    active: number;
    views: number;
    inquiries: number;
}

export const MyAnnouncementsPage = () => {
    const navigate = useNavigate();
    const [announcements, setAnnouncements] = useState<OwnerAnnouncement[]>([]);
    const [statistics, setStatistics] = useState<Statistics>({
        total: 0,
        active: 0,
        views: 0,
        inquiries: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadAnnouncements();
    }, []);

    const loadAnnouncements = async () => {
        try {
            setIsLoading(true);
            const data = await announcementService.getMyAnnouncements();
            setAnnouncements(data.announcements);
            setStatistics(data.statistics);
        } catch (error) {
            console.error('Error loading announcements:', error);
            toast.error('Error al cargar anuncios');
        } finally {
            setIsLoading(false);
        }
    };

    const handleView = (id: number) => {
        navigate(`/announcement/${id}`);
    };

    const handleEdit = (id: number) => {
        // TODO: Navigate to edit page when implemented
        toast.info('Función de editar próximamente');
    };

    const handleDelete = async (id: number) => {
        if (!confirm('¿Estás seguro de eliminar este anuncio?')) return;

        // TODO: Implement delete API when ready
        toast.info('Función de eliminar próximamente');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-900">Cargando...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-10 px-4" style={{ backgroundColor: "var(--roomlock-bg-lighter)" }}>
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold" style={{ color: "var(--roomlock-text-primary)" }}>
                            Mis Anuncios
                        </h1>
                        <p className="text-gray-600 mt-1">Gestiona y monitorea tus publicaciones.</p>
                    </div>
                    <Button
                        className="flex items-center gap-2"
                        style={{ backgroundColor: "var(--roomlock-cta)", color: "white" }}
                        onClick={() => toast.info('Función próximamente')}
                    >
                        <Plus className="h-5 w-5" />
                        Nuevo Anuncio
                    </Button>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl">
                        <p className="text-sm text-gray-500 mb-1">Total Anuncios</p>
                        <p className="text-3xl font-bold" style={{ color: "var(--roomlock-primary)" }}>
                            {statistics.total}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl">
                        <p className="text-sm text-gray-500 mb-1">Activos</p>
                        <p className="text-3xl font-bold" style={{ color: "var(--roomlock-success)" }}>
                            {statistics.active}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl">
                        <p className="text-sm text-gray-500 mb-1">Vistas Totales</p>
                        <p className="text-3xl font-bold" style={{ color: "var(--roomlock-accent)" }}>
                            {statistics.views}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl">
                        <p className="text-sm text-gray-500 mb-1">Consultas</p>
                        <p className="text-3xl font-bold" style={{ color: "var(--roomlock-warning)" }}>
                            {statistics.inquiries}
                        </p>
                    </div>
                </div>

                {/* Announcements List */}
                <div className="bg-white p-6 rounded-xl">
                    <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--roomlock-text-primary)" }}>
                        Tus Publicaciones
                    </h2>

                    {announcements.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No tienes anuncios publicados</p>
                            <Button
                                className="mt-4"
                                style={{ backgroundColor: "var(--roomlock-cta)", color: "white" }}
                                onClick={() => toast.info('Función próximamente')}
                            >
                                Crear mi primer anuncio
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {announcements.map((announcement) => (
                                <div
                                    key={announcement.id}
                                    className="flex items-center gap-6 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
                                >
                                    {/* Image */}
                                    <div className="flex-shrink-0">
                                        <img
                                            src={announcement.images[0] || '/placeholder.jpg'}
                                            alt={announcement.title}
                                            className="w-32 h-24 object-cover rounded-lg"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="text-lg font-semibold" style={{ color: "var(--roomlock-text-primary)" }}>
                                                    {announcement.title}
                                                </h3>
                                                <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>{announcement.district}</span>
                                                </div>
                                            </div>
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${announcement.state === 'activo'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-yellow-100 text-yellow-700'
                                                    }`}
                                            >
                                                {announcement.state === 'activo' ? 'Activo' : 'Pendiente'}
                                            </span>
                                        </div>

                                        {/* Stats */}
                                        <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                                            <div className="flex items-center gap-1">
                                                <Eye className="h-4 w-4" />
                                                <span>{announcement.views} vistas</span>
                                            </div>
                                            <div>
                                                S/. {announcement.price} por mes
                                            </div>
                                            <div>
                                                {announcement.inquiries} consultas
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-3">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleView(announcement.id)}
                                                className="flex items-center gap-2"
                                            >
                                                <Eye className="h-4 w-4" />
                                                Ver
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleEdit(announcement.id)}
                                                className="flex items-center gap-2"
                                            >
                                                <Edit className="h-4 w-4" />
                                                Editar
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDelete(announcement.id)}
                                                className="flex items-center gap-2 text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                Eliminar
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
