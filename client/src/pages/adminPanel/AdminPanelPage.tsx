import { useState } from 'react';
import {
    Users,
    CheckCircle,
    Home,
    Eye,
    CheckCircle2,
    XCircle,
    AlertCircle
} from 'lucide-react';
import { Button } from '@/components/button';

type TabType = 'reportes' | 'verificaciones' | 'usuarios' | 'anuncios';

interface Report {
    id: number;
    type: string;
    reportedBy: string;
    reason: string;
    dateTime: string;
    status: 'pendiente' | 'resuelto';
}

interface Verification {
    id: string;
    userName: string;
    documentsCount: number;
}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    registerDate: string;
    status: string;
}

export const AdminPanelPage = () => {
    const [activeTab, setActiveTab] = useState<TabType>('reportes');

    // Mock data
    const stats = {
        totalUsers: 1248,
        totalAnnouncements: 456,
        pendingReports: 2,
        verifications: 8
    };

    const reports: Report[] = [
        {
            id: 1,
            type: 'Anuncio',
            reportedBy: 'Carlos M.',
            reason: 'Información falsa en el anuncio "Habitación amplia en..."',
            dateTime: '2024-11-14 14:30:45',
            status: 'pendiente'
        },
        {
            id: 2,
            type: 'Usuario',
            reportedBy: 'Ana P.',
            reason: 'Perfil Sospechoso - User N.',
            dateTime: '2024-11-13 09:15:20',
            status: 'pendiente'
        },
        {
            id: 3,
            type: 'Anuncio',
            reportedBy: 'María G.',
            reason: 'Fotos que no corresponden - Departamento en Miraflores',
            dateTime: '2024-11-12 16:45:30',
            status: 'resuelto'
        }
    ];

    const verifications: Verification[] = [
        { id: 'U1', userName: 'Usuario 1', documentsCount: 2 },
        { id: 'U2', userName: 'Usuario 2', documentsCount: 2 },
        { id: 'U3', userName: 'Usuario 3', documentsCount: 2 }
    ];

    const users: User[] = [
        {
            id: 1,
            name: 'Juan Pérez',
            email: 'juan.perez@unmsm.edu.pe',
            role: 'Estudiante',
            registerDate: '2024-11-14 14:30:45',
            status: 'Verificado'
        },
        {
            id: 2,
            name: 'María García',
            email: 'maria.garcia@gmail.com',
            role: 'Propietario',
            registerDate: '2024-11-13 09:15:20',
            status: 'Verificado'
        },
        {
            id: 3,
            name: 'Carlos López',
            email: 'carlos.lopez@pucp.edu.pe',
            role: 'Estudiante',
            registerDate: '2024-11-12 16:45:30',
            status: 'No Verificado'
        }
    ];

    const tabs = [
        { id: 'reportes' as TabType, label: 'Reportes', icon: AlertCircle },
        { id: 'verificaciones' as TabType, label: 'Verificaciones', icon: CheckCircle },
        { id: 'usuarios' as TabType, label: 'Usuarios', icon: Users },
        { id: 'anuncios' as TabType, label: 'Anuncios', icon: Home }
    ];

    return (
        <div className="min-h-screen pt-24 pb-10 px-4" style={{ backgroundColor: "var(--roomlock-bg-lighter)" }}>
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--roomlock-text-primary)" }}>
                        Panel de Administración
                    </h1>
                    <p className="text-gray-600">Gestiona la plataforma y modera el contenido.</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl border border-gray-100">
                        <p className="text-sm text-gray-500 mb-1">Total Usuarios</p>
                        <p className="text-3xl font-bold" style={{ color: "var(--roomlock-accent)" }}>
                            {stats.totalUsers}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100">
                        <p className="text-sm text-gray-500 mb-1">Total Anuncios</p>
                        <p className="text-3xl font-bold" style={{ color: "var(--roomlock-success)" }}>
                            {stats.totalAnnouncements}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100">
                        <p className="text-sm text-gray-500 mb-1">Reportes pendientes</p>
                        <p className="text-3xl font-bold text-red-600">
                            {stats.pendingReports}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100">
                        <p className="text-sm text-gray-500 mb-1">Verificaciones</p>
                        <p className="text-3xl font-bold" style={{ color: "var(--roomlock-warning)" }}>
                            {stats.verifications}
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    {/* Tab Headers */}
                    <div className="border-b border-gray-200">
                        <div className="flex overflow-x-auto">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-colors ${activeTab === tab.id
                                                ? 'border-b-2'
                                                : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                        style={
                                            activeTab === tab.id
                                                ? {
                                                    color: 'var(--roomlock-primary)',
                                                    borderColor: 'var(--roomlock-primary)'
                                                }
                                                : {}
                                        }
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span>{tab.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {/* Reportes Tab */}
                        {activeTab === 'reportes' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--roomlock-text-primary)" }}>
                                    Reportes Recibidos
                                </h2>
                                <p className="text-gray-600 mb-6">Revisa y gestiona los reportes de la comunidad.</p>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Tipo</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Reportado Por</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Motivo</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Fecha y Hora</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Estado</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {reports.map((report) => (
                                                <tr key={report.id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-4">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                            {report.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-900">
                                                        <span className="font-medium">{report.reportedBy.charAt(0)}</span>
                                                        <span className="ml-2">{report.reportedBy}</span>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-700 max-w-xs truncate">
                                                        {report.reason}
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-600">{report.dateTime}</td>
                                                    <td className="px-4 py-4">
                                                        <span
                                                            className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${report.status === 'pendiente'
                                                                    ? 'bg-yellow-100 text-yellow-700'
                                                                    : 'bg-green-100 text-green-700'
                                                                }`}
                                                        >
                                                            {report.status === 'pendiente' ? 'Pendiente' : 'Resuelto'}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <div className="flex gap-2">
                                                            <button className="text-blue-600 hover:text-blue-700">
                                                                <Eye className="h-5 w-5" />
                                                            </button>
                                                            <button className="text-green-600 hover:text-green-700">
                                                                <CheckCircle2 className="h-5 w-5" />
                                                            </button>
                                                            <button className="text-red-600 hover:text-red-700">
                                                                <XCircle className="h-5 w-5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Verificaciones Tab */}
                        {activeTab === 'verificaciones' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--roomlock-text-primary)" }}>
                                    Verificaciones Pendientes
                                </h2>
                                <p className="text-gray-600 mb-6">Revisa y aprueba las verificaciones de identidad.</p>

                                <div className="space-y-4">
                                    {verifications.map((verification) => (
                                        <div
                                            key={verification.id}
                                            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-700">
                                                    {verification.id}
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-900">{verification.userName}</h3>
                                                    <p className="text-sm text-gray-500">
                                                        Documentos subidos: {verification.documentsCount}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm">
                                                    Ver Documentos
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    style={{ backgroundColor: 'var(--roomlock-success)', color: 'white' }}
                                                >
                                                    Aprobar
                                                </Button>
                                                <Button variant="outline" size="sm" className="text-red-600 hover:border-red-300">
                                                    Rechazar
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Usuarios Tab */}
                        {activeTab === 'usuarios' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--roomlock-text-primary)" }}>
                                    Gestión de Usuarios
                                </h2>
                                <p className="text-gray-600 mb-6">Administra los usuarios de la plataforma</p>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Nombre</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Rol</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Fecha Registro</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {users.map((user) => (
                                                <tr key={user.id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                                                    <td className="px-4 py-4 text-sm text-gray-600">{user.email}</td>
                                                    <td className="px-4 py-4 text-sm text-gray-700">{user.role}</td>
                                                    <td className="px-4 py-4 text-sm text-gray-600">{user.registerDate}</td>
                                                    <td className="px-4 py-4">
                                                        <span
                                                            className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'Verificado'
                                                                    ? 'bg-green-100 text-green-700'
                                                                    : 'bg-yellow-100 text-yellow-700'
                                                                }`}
                                                        >
                                                            {user.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Anuncios Tab */}
                        {activeTab === 'anuncios' && (
                            <div className="text-center py-12">
                                <Home className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                                <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--roomlock-text-primary)" }}>
                                    Gestión de Anuncios
                                </h3>
                                <p className="text-gray-600">Funcionalidad en desarrollo</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
