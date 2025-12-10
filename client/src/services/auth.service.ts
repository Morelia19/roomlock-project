export interface RegisterData {
    name: string;
    email: string;
    password: string;
    role: 'student' | 'owner';
    phone?: string;
    university?: string;
}

export interface LoginData {
    email: string;
    password: string;
    role: 'student' | 'owner' | 'admin';
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    phone?: string | null;
    university?: string | null;
}

export interface AuthResponse {
    message: string;
    data: {
        user: User;
        token?: string;
    };
}

class AuthService {
    private readonly API_URL = 'https://roomlock-api.onrender.com/api';
    private authListeners: Array<() => void> = [];

    // Subscribe to auth state changes
    onAuthChange(callback: () => void) {
        console.log('📝 New subscriber added, total:', this.authListeners.length + 1);
        this.authListeners.push(callback);
        // Return unsubscribe function
        return () => {
            this.authListeners = this.authListeners.filter(cb => cb !== callback);
            console.log('📝 Subscriber removed, total:', this.authListeners.length);
        };
    }

    private notifyAuthChange() {
        console.log('📢 Notifying', this.authListeners.length, 'listeners of auth change');
        this.authListeners.forEach(callback => callback());
    }

    async register(data: RegisterData): Promise<AuthResponse> {
        const payload: any = {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
        };

        if (data.phone) {
            payload.phone = this.formatPhoneNumber(data.phone);
        }

        if (data.university) {
            payload.university = data.university;
        }

        const response = await fetch(`${this.API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.error || 'Error al registrar usuario');
        }

        return responseData;
    }

    async login(data: LoginData): Promise<AuthResponse> {
        const response = await fetch(`${this.API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.error || 'Error al iniciar sesión');
        }

        // Store token and user in localStorage
        if (responseData.data?.token) {
            localStorage.setItem('token', responseData.data.token);
            localStorage.setItem('user', JSON.stringify(responseData.data.user));
            this.notifyAuthChange(); // Notify listeners
        }

        return responseData;
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Use setTimeout to ensure localStorage operations complete
        setTimeout(() => {
            this.notifyAuthChange(); // Notify listeners
        }, 0);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getCurrentUser(): User | null {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    private formatPhoneNumber(phone: string): string {
        const cleaned = phone.replaceAll(/\D/g, '');
        return `+51 ${cleaned}`;
    }

    validateStudentEmail(email: string): boolean {
        return email.toLowerCase().endsWith('.edu.pe');
    }
}

export const authService = new AuthService();

