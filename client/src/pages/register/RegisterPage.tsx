import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Key, Building2 } from "lucide-react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";

export const RegisterPage = () => {
    const navigate = useNavigate();
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

        // TODO: Conectar con la API de registro
        console.log("Registrando estudiante:", { ...studentData, role: "student" });

        // Por ahora, simplemente navegar al login
        // Cuando conectes la API, aquí harías el POST request
        navigate("/login");
    };

    const handleOwnerSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // TODO: Conectar con la API de registro
        console.log("Registrando propietario:", { ...ownerData, role: "owner" });

        // Por ahora, simplemente navegar al login
        navigate("/login");
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
                                                placeholder="Universidad Nacional..."
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

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        style={{ backgroundColor: "var(--roomlock-cta)", color: "white" }}
                                    >
                                        Crear Cuenta de Estudiante
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
                                        <Input
                                            id="owner-phone"
                                            placeholder="+51 999 999 999"
                                            value={ownerData.phone}
                                            onChange={(e) => setOwnerData({ ...ownerData, phone: e.target.value })}
                                            required
                                        />
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

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        style={{ backgroundColor: "var(--roomlock-cta)", color: "white" }}
                                    >
                                        Crear Cuenta de Propietario
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
