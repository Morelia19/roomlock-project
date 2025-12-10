import { Home, User, Heart, Key, Shield, LogOut, Menu, MessageCircle, ChevronDown } from 'lucide-react';
import { Button } from "../button/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { type MockUser } from "@/mockData/mockUsers";

interface HeaderProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
  userRole?: "student" | "owner" | "admin" | null;
  currentUser?: MockUser | null;
  onLogout?: () => void;
}

export function Header({
  currentPage = "home",
  onNavigate = () => { },
  userRole = null,
  currentUser = null,
  onLogout = () => { }
}: HeaderProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = () => {
    const items: Array<{ label: string; page: string; icon: any; show: boolean }> = [
      { label: "Inicio", page: "home", icon: Home, show: true }
    ];

    if (userRole === "student") {
      items.push(
        { label: "Favoritos", page: "favorites", icon: Heart, show: true },
        { label: "Mensajes", page: "chat", icon: MessageCircle, show: true }
      );
    } else if (userRole === "owner") {
      items.push(
        { label: "Mis Anuncios", page: "owner-dashboard", icon: Key, show: true },
        { label: "Mensajes", page: "chat", icon: MessageCircle, show: true }
      );
    } else if (userRole === "admin") {
      items.push({ label: "Panel Admin", page: "admin-panel", icon: Shield, show: true });
    }

    return items;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 opacity-100">
        <Link
          to="/"
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: "var(--roomlock-primary)" }}>
            <Key className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-semibold" style={{ color: "var(--roomlock-text-primary)" }}>
            RoomLock
          </span>
        </Link>

        {userRole && (
          <nav className="hidden md:flex items-center gap-6">
            {navigationItems().filter(item => item.show).map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className="flex items-center gap-2 transition-colors hover:opacity-80"
                style={{ color: currentPage === item.page ? "var(--roomlock-primary)" : "var(--roomlock-text-secondary)" }}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-4">
          {!userRole ? (
            <>
              <Link to="/login">
                <Button
                  variant="ghost"
                  style={{ color: "var(--roomlock-text-primary)" }}
                >
                  Iniciar Sesión
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  style={{ backgroundColor: "var(--roomlock-cta)", color: "white" }}
                >
                  Registrarse
                </Button>
              </Link>
            </>
          ) : (
            <>
              <div className="hidden md:flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-gray-100">
                      <div className="text-right">
                        <div style={{ color: "var(--roomlock-text-primary)" }} className="text-sm font-medium">
                          Hola, {currentUser?.name.split(" ")[0]}
                        </div>
                        <div style={{ color: "var(--roomlock-text-secondary)" }} className="text-xs">
                          {userRole === "student" ? "Estudiante" : userRole === "owner" ? "Propietario" : "Administrador"}
                        </div>
                      </div>
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full text-white font-semibold"
                        style={{ backgroundColor: "var(--roomlock-accent)" }}
                      >
                        {currentUser?.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <ChevronDown className="h-4 w-4" style={{ color: "var(--roomlock-cta)" }} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => onNavigate("profile")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Mi Perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onLogout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Cerrar Sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      </div>

      {userRole && mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navigationItems().filter(item => item.show).map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 rounded-lg px-4 py-2 transition-colors"
                style={{
                  color: "var(--roomlock-text-primary)",
                  backgroundColor: currentPage === item.page ? "var(--roomlock-bg-light)" : "transparent"
                }}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
            <div className="border-t pt-3 mt-3">
              <button
                onClick={() => {
                  onNavigate("profile");
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 rounded-lg px-4 py-2 transition-colors hover:bg-gray-100"
                style={{ color: "var(--roomlock-text-primary)" }}
              >
                <User className="h-5 w-5" />
                <span>Mi Perfil</span>
              </button>
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 rounded-lg px-4 py-2 transition-colors hover:bg-red-50 text-red-600 mt-2"
              >
                <LogOut className="h-5 w-5" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
