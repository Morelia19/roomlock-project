import { useState, useEffect } from 'react';
import { authService, type User } from '../services/auth.service';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is authenticated on mount
        const checkAuth = () => {
            const currentUser = authService.getCurrentUser();
            const authenticated = authService.isAuthenticated();

            console.log('🔍 useAuth checkAuth:', { currentUser, authenticated });

            setUser(currentUser);
            setIsAuthenticated(authenticated);
            setIsLoading(false);
        };

        // Initial check
        checkAuth();

        // Subscribe to auth changes
        const unsubscribe = authService.onAuthChange(() => {
            console.log('🔔 Auth state changed, rechecking...');
            checkAuth();
        });

        // Cleanup subscription on unmount
        return () => {
            unsubscribe();
        };
    }, []);

    const logout = () => {
        console.log('👋 Logout called from useAuth');
        authService.logout();
        // No need to manually update state here - the authService will notify
    };

    return {
        user,
        isAuthenticated,
        isLoading,
        logout,
    };
};
