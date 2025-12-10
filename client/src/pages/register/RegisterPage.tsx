import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Key, Phone, Building2 } from "lucide-react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { toast } from "sonner";
import { authService } from "@/services/auth.service";

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [studentData, setStudentData] = useState({
        name: "",
        email: "",
        password: "",
        university: ""
    });

    const [ownerData, setOwnerData] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    });

    // Manejar cambio de teléfono para propietarios
    const handleOwnerPhoneChange = (value: string) => {
        // Solo permitir números y espacios
        const cleaned = value.replace(/[^\d\s]/g, "");
        setOwnerData({ ...ownerData, phone: cleaned });
    };

    const handleStudentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validar email .edu.pe
        if (!authService.validateStudentEmail(studentData.email)) {
            setError("El correo debe terminar en .edu.pe para estudiantes");
            toast.error("El correo debe terminar en .edu.pe para estudiantes");
            return;
        }

        setIsLoading(true);

        try {
            await authService.register({
                name: studentData.name,
                email: studentData.email,
                university: studentData.university,
                password: studentData.password,
                role: "student",
            });

            toast.success("¡Cuenta creada exitosamente!");
            navigate("/login");
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Error al registrar usuario";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOwnerSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            await authService.register({
                name: ownerData.name,
                email: ownerData.email,
                phone: ownerData.phone,
                password: ownerData.password,
                role: "owner",
            });

            toast.success("¡Cuenta creada exitosamente!");
            navigate("/login");
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Error al registrar usuario";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12"
            style={{ backgroundColor: "var(--roomlock-bg-lighter)" }}
        >
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <div
                        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                        style={{ backgroundColor: "var(--roomlock-primary)" }}
                    >
                        <Key className="h-8 w-8 text-white" />
                    </div>
                    <h1 style={{ color: "var(--roomlock-text-primary)" }}>
                        Únete a RoomLock
                    </h1>
                    <p style={{ color: "var(--roomlock-text-secondary)" }}>
                        Crea tu cuenta en segundos
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Crear Cuenta</CardTitle>
                        <CardDescription>
                            Selecciona el tipo de cuenta que necesitas
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="student" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="student">Estudiante</TabsTrigger>
                                <TabsTrigger value="owner">Propietario</TabsTrigger>
                            </TabsList>

                            <TabsContent value="student" className="mt-6">
                                <form onSubmit={handleStudentSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="student-name">Nombre Completo</Label>
                                        <div className="relative">
                                            <User
                                                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2"
                                                style={{ color: "var(--roomlock-text-secondary)" }}
                                            />
                                            <Input
                                                id="student-name"
                                                placeholder="Juan Pérez"
                                                value={studentData.name}
                                                onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="student-email">Correo Institucional</Label>
                                        <div className="relative">
                                            <Mail
                                                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2"
                                                style={{ color: "var(--roomlock-text-secondary)" }}
                                            />
                                            <Input
                                                id="student-email"
                                                type="email"
                                                placeholder="estudiante@universidad.edu.pe"
                                                value={studentData.email}
                                                onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                        <p className="text-sm" style={{ color: "var(--roomlock-text-secondary)" }}>
                                            Debe ser un correo universitario válido
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="student-university">Universidad</Label>
                                        <div className="relative">
                                            <Building2
                                                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2"
                                                style={{ color: "var(--roomlock-text-secondary)" }}
                                            />
                                            <Input
                                                id="student-university"
                                                placeholder="Universidad Tecnológica del Perú"
                                                value={studentData.university}
                                                onChange={(e) => setStudentData({ ...studentData, university: e.target.value })}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="student-password">Contraseña</Label>
                                        <div className="relative">
                                            <Lock
                                                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2"
                                                style={{ color: "var(--roomlock-text-secondary)" }}
                                            />
                                            <Input
                                                id="student-password"
                                                type="password"
                                                placeholder="••••••••"
                                                value={studentData.password}
                                                onChange={(e) => setStudentData({ ...studentData, password: e.target.value })}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {error && (
                                        <div
                                            className="rounded-md p-3 text-sm"
                                            style={{
                                                backgroundColor: "rgba(239, 68, 68, 0.1)",
                                                color: "rgb(239, 68, 68)",
                                            }}
                                        >
                                            {error}
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        style={{ backgroundColor: "var(--roomlock-cta)", color: "white" }}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Creando cuenta..." : "Crear Cuenta de Estudiante"}
                                    </Button>
                                </form>
                            </TabsContent>

                            <TabsContent value="owner" className="mt-6">
                                <form onSubmit={handleOwnerSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="owner-name">Nombre Completo</Label>
                                        <div className="relative">
                                            <User
                                                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2"
                                                style={{ color: "var(--roomlock-text-secondary)" }}
                                            />
                                            <Input
                                                id="owner-name"
                                                placeholder="María García"
                                                value={ownerData.name}
                                                onChange={(e) => setOwnerData({ ...ownerData, name: e.target.value })}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="owner-email">Correo Electrónico</Label>
                                        <div className="relative">
                                            <Mail
                                                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2"
                                                style={{ color: "var(--roomlock-text-secondary)" }}
                                            />
                                            <Input
                                                id="owner-email"
                                                type="email"
                                                placeholder="propietario@email.com"
                                                value={ownerData.email}
                                                onChange={(e) => setOwnerData({ ...ownerData, email: e.target.value })}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="owner-phone">Teléfono</Label>
                                        <div className="relative">
                                            <Phone
                                                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2"
                                                style={{ color: "var(--roomlock-text-secondary)" }}
                                            />
                                            <div className="flex items-center">
                                                <span
                                                    className="absolute left-10 text-sm"
                                                    style={{ color: "var(--roomlock-text-secondary)" }}
                                                >
                                                    +51
                                                </span>
                                                <Input
                                                    id="owner-phone"
                                                    placeholder="987 654 321"
                                                    value={ownerData.phone}
                                                    onChange={(e) => handleOwnerPhoneChange(e.target.value)}
                                                    className="pl-20"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="owner-password">Contraseña</Label>
                                        <div className="relative">
                                            <Lock
                                                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2"
                                                style={{ color: "var(--roomlock-text-secondary)" }}
                                            />
                                            <Input
                                                id="owner-password"
                                                type="password"
                                                placeholder="••••••••"
                                                value={ownerData.password}
                                                onChange={(e) => setOwnerData({ ...ownerData, password: e.target.value })}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {error && (
                                        <div
                                            className="rounded-md p-3 text-sm"
                                            style={{
                                                backgroundColor: "rgba(239, 68, 68, 0.1)",
                                                color: "rgb(239, 68, 68)",
                                            }}
                                        >
                                            {error}
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        style={{ backgroundColor: "var(--roomlock-cta)", color: "white" }}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Creando cuenta..." : "Crear Cuenta de Propietario"}
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>

                        <div className="mt-6 text-center">
                            <p style={{ color: "var(--roomlock-text-secondary)" }}>
                                ¿Ya tienes una cuenta?{" "}
                                <button
                                    onClick={() => navigate("/login")}
                                    className="hover:underline"
                                    style={{ color: "var(--roomlock-primary)" }}
                                >
                                    Inicia sesión aquí
                                </button>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
