import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import { authService, type User } from '../services/auth.service';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string, role: 'student' | 'owner' | 'admin') => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check auth on mount
    useEffect(() => {
        const checkAuth = () => {
            const currentUser = authService.getCurrentUser();
            const authenticated = authService.isAuthenticated();

            console.log('🔍 AuthContext checkAuth:', { currentUser, authenticated });

            setUser(currentUser);
            setIsAuthenticated(authenticated);
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string, role: 'student' | 'owner' | 'admin') => {
        const response = await authService.login({ email, password, role });

        if (response.data?.user) {
            console.log('✅ Login successful, updating context');
            setUser(response.data.user);
            setIsAuthenticated(true);
        }
    };

    const logout = () => {
        console.log('👋 Logout called from AuthContext');
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
    };

    const value = useMemo(
        () => ({ user, isAuthenticated, isLoading, login, logout }),
        [user, isAuthenticated, isLoading]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
