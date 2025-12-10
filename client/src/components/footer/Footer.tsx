import { Key } from 'lucide-react';

export function Footer() {
    return (
        <footer
            className="py-6 px-4 border-t"
            style={{ backgroundColor: "white", borderColor: "#e5e7eb" }}
        >
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div
                            className="flex h-10 w-10 items-center justify-center rounded-lg"
                            style={{ backgroundColor: "var(--roomlock-primary)" }}
                        >
                            <Key className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-lg font-semibold" style={{ color: "var(--roomlock-text-primary)" }}>
                            RoomLock
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex items-center gap-6">
                        <a
                            href="#universidades"
                            className="text-sm transition-colors hover:opacity-70"
                            style={{ color: "var(--roomlock-text-secondary)" }}
                        >
                            Universidades
                        </a>
                        <a
                            href="#anuncios"
                            className="text-sm transition-colors hover:opacity-70"
                            style={{ color: "var(--roomlock-text-secondary)" }}
                        >
                            Anuncios
                        </a>
                        <a
                            href="#propietarios"
                            className="text-sm transition-colors hover:opacity-70"
                            style={{ color: "var(--roomlock-text-secondary)" }}
                        >
                            Propietarios
                        </a>
                        <a
                            href="#reclamaciones"
                            className="text-sm transition-colors hover:opacity-70"
                            style={{ color: "var(--roomlock-text-secondary)" }}
                        >
                            Libro de Reclamaciones
                        </a>
                    </nav>

                    {/* Copyright */}
                    <p className="text-sm" style={{ color: "var(--roomlock-text-secondary)" }}>
                        © 2025 RoomLock. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}