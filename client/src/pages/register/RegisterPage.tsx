import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Key, Building2 } from "lucide-react";
import { Button } from "@/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { FormField, PhoneField } from "@/components/form";
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
                            <TabsList className="w-full">
                                <TabsTrigger value="student">Estudiante</TabsTrigger>
                                <TabsTrigger value="owner">Propietario</TabsTrigger>
                            </TabsList>

                            <TabsContent value="student" className="mt-6">
                                <form onSubmit={handleStudentSubmit} className="space-y-4">
                                    <FormField
                                        id="student-name"
                                        label="Nombre Completo"
                                        placeholder="Juan Pérez"
                                        value={studentData.name}
                                        onChange={(value) => setStudentData({ ...studentData, name: value })}
                                        icon={User}
                                        required
                                    />

                                    <FormField
                                        id="student-email"
                                        label="Correo Institucional"
                                        type="email"
                                        placeholder="estudiante@universidad.edu.pe"
                                        value={studentData.email}
                                        onChange={(value) => setStudentData({ ...studentData, email: value })}
                                        icon={Mail}
                                        helperText="Debe ser un correo universitario válido"
                                        required
                                    />

                                    <FormField
                                        id="student-university"
                                        label="Universidad"
                                        placeholder="Universidad Tecnológica del Perú"
                                        value={studentData.university}
                                        onChange={(value) => setStudentData({ ...studentData, university: value })}
                                        icon={Building2}
                                        required
                                    />

                                    <FormField
                                        id="student-password"
                                        label="Contraseña"
                                        type="password"
                                        placeholder="••••••••"
                                        value={studentData.password}
                                        onChange={(value) => setStudentData({ ...studentData, password: value })}
                                        icon={Lock}
                                        required
                                    />

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
                                    <FormField
                                        id="owner-name"
                                        label="Nombre Completo"
                                        placeholder="María García"
                                        value={ownerData.name}
                                        onChange={(value) => setOwnerData({ ...ownerData, name: value })}
                                        icon={User}
                                        required
                                    />

                                    <FormField
                                        id="owner-email"
                                        label="Correo Electrónico"
                                        type="email"
                                        placeholder="propietario@email.com"
                                        value={ownerData.email}
                                        onChange={(value) => setOwnerData({ ...ownerData, email: value })}
                                        icon={Mail}
                                        required
                                    />

                                    <PhoneField
                                        id="owner-phone"
                                        label="Teléfono"
                                        placeholder="987 654 321"
                                        value={ownerData.phone}
                                        onChange={(value) => setOwnerData({ ...ownerData, phone: value })}
                                        required
                                    />

                                    <FormField
                                        id="owner-password"
                                        label="Contraseña"
                                        type="password"
                                        placeholder="••••••••"
                                        value={ownerData.password}
                                        onChange={(value) => setOwnerData({ ...ownerData, password: value })}
                                        icon={Lock}
                                        required
                                    />

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
