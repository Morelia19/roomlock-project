import { Home, User, Heart, Key, Shield, LogOut, Menu, MessageCircle, ChevronDown } from 'lucide-react';
import { Button } from "../button/Button";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { useAuth } from "../../contexts/AuthContext";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    // Use setTimeout to ensure state update completes before navigation
    setTimeout(() => {
      navigate('/');
    }, 0);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const navigationItems = () => {
    const items: Array<{ label: string; path: string; icon: any }> = [
      { label: "Inicio", path: "/", icon: Home }
    ];

    if (user?.role === "student") {
      items.push(
        { label: "Favoritos", path: "/favorites", icon: Heart },
        { label: "Mensajes", path: "/messages", icon: MessageCircle }
      );
    } else if (user?.role === "owner") {
      items.push(
        { label: "Mis Anuncios", path: "/my-listings", icon: Key },
        { label: "Mensajes", path: "/messages", icon: MessageCircle }
      );
    } else if (user?.role === "admin") {
      items.push({ label: "Panel Admin", path: "/admin", icon: Shield });
    }

    return items;
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'student': return 'Estudiante';
      case 'owner': return 'Propietario';
      case 'admin': return 'Administrador';
      default: return '';
    }
  };

  const getUserInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
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

        {isAuthenticated && user && (
          <nav className="hidden md:flex items-center gap-6">
            {navigationItems().map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-2 transition-colors hover:opacity-80"
                  style={{
                    color: isActive ? "var(--roomlock-primary)" : "var(--roomlock-text-secondary)"
                  }}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        )}

        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
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
                          Hola, {user?.name.split(" ")[0]}
                        </div>
                        <div style={{ color: "var(--roomlock-text-secondary)" }} className="text-xs">
                          {getRoleLabel(user?.role || '')}
                        </div>
                      </div>
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full text-white font-semibold"
                        style={{ backgroundColor: "var(--roomlock-accent)" }}
                      >
                        {getUserInitials(user?.name || '')}
                      </div>
                      <ChevronDown className="h-4 w-4" style={{ color: "var(--roomlock-cta)" }} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => handleNavigate("/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Mi Perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
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

      {isAuthenticated && user && mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navigationItems().map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center gap-3 rounded-lg px-4 py-2 transition-colors"
                style={{ color: "var(--roomlock-text-primary)" }}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="border-t pt-3 mt-3">
              <button
                onClick={() => {
                  handleNavigate("/profile");
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
                  handleLogout();
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
