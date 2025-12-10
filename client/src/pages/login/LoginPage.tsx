import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Key } from "lucide-react";
import { Button } from "@/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { FormField } from "@/components/form";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState<'student' | 'owner' | 'admin'>("student");

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            await login(loginData.email, loginData.password, activeTab);

            toast.success("¡Inicio de sesión exitoso!");
            navigate("/"); // Redirect to home or dashboard
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Error al iniciar sesión";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const getEmailPlaceholder = () => {
        switch (activeTab) {
            case "student":
                return "estudiante@universidad.edu.pe";
            case "owner":
                return "propietario@email.com";
            case "admin":
                return "admin@email.edu.pe";
            default:
                return "correo@email.com";
        }
    };

    const getEmailLabel = () => {
        return activeTab === "student" || activeTab === "admin"
            ? "Correo Institucional"
            : "Correo Electrónico";
    };

    const getHelperText = () => {
        return activeTab === "student" || activeTab === "admin"
            ? "Ingresa con tu correo institucional."
            : "Ingresa con tu correo registrado.";
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
                        Bienvenido a RoomLock
                    </h1>
                    <p style={{ color: "var(--roomlock-text-secondary)" }}>
                        Inicia sesión para continuar
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Iniciar Sesión</CardTitle>
                        <CardDescription>
                            {getHelperText()}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs
                            defaultValue="student"
                            className="w-full"
                            onValueChange={(value) => setActiveTab(value as 'student' | 'owner' | 'admin')}
                        >
                            <TabsList className="w-full">
                                <TabsTrigger value="student">Estudiante</TabsTrigger>
                                <TabsTrigger value="owner">Propietario</TabsTrigger>
                                <TabsTrigger value="admin">Administrador</TabsTrigger>
                            </TabsList>

                            <TabsContent value={activeTab} className="mt-6">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <FormField
                                        id="email"
                                        label={getEmailLabel()}
                                        type="email"
                                        placeholder={getEmailPlaceholder()}
                                        value={loginData.email}
                                        onChange={(value) => setLoginData({ ...loginData, email: value })}
                                        icon={Mail}
                                        required
                                    />

                                    <FormField
                                        id="password"
                                        label="Contraseña"
                                        type="password"
                                        placeholder="••••••••"
                                        value={loginData.password}
                                        onChange={(value) => setLoginData({ ...loginData, password: value })}
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
                                        {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>

                        <div className="mt-6 text-center">
                            <p style={{ color: "var(--roomlock-text-secondary)" }}>
                                ¿No tienes una cuenta?{" "}
                                <button
                                    onClick={() => navigate("/register")}
                                    className="hover:underline"
                                    style={{ color: "var(--roomlock-primary)" }}
                                >
                                    Regístrate aquí
                                </button>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
