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
}

export interface AuthResponse {
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
        phone: string;
    };
    token?: string;
}

class AuthService {
    private readonly API_URL = 'https://roomlock-api.onrender.com/api';

    async register(data: RegisterData): Promise<AuthResponse> {
        // Formatear el teléfono solo si existe (para propietarios)
        const payload: any = {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
        };

        // Agregar phone solo si existe (owners)
        if (data.phone) {
            payload.phone = this.formatPhoneNumber(data.phone);
        }

        // Agregar university solo si existe (students)
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

        if (responseData.token) {
            localStorage.setItem('token', responseData.token);
        }

        return responseData;
    }

    logout(): void {
        localStorage.removeItem('token');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    private formatPhoneNumber(phone: string): string {
        const cleaned = phone.replace(/\D/g, '');
        return `+51 ${cleaned}`;
    }

    validateStudentEmail(email: string): boolean {
        return email.toLowerCase().endsWith('.edu.pe');
    }
}

export const authService = new AuthService();
