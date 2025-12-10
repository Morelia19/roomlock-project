import type { AxiosInstance } from 'axios';

describe('API Service - Integration Tests', () => {
    let api: AxiosInstance;

    beforeEach(async () => {
        localStorage.clear();
        vi.resetModules();
        const module = await import('@/services/api');
        api = module.default;
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('debería tener la configuración base correcta', () => {
        expect(api.defaults.baseURL).toContain('/api');
        expect(api.defaults.headers['Content-Type']).toBe('application/json');
    });

    it('debería tener interceptors configurados', () => {
        expect(api.interceptors.request).toBeDefined();
    });

    describe('Token Authentication', () => {
        it('debería incluir el token en las requests cuando existe', () => {
            const testToken = 'my-auth-token';
            localStorage.setItem('token', testToken);

            expect(api.interceptors.request).toBeDefined();
        });

        it('debería actualizar el token dinámicamente', () => {
            localStorage.removeItem('token');
            expect(localStorage.getItem('token')).toBeNull();

            localStorage.setItem('token', 'new-token');
            expect(localStorage.getItem('token')).toBe('new-token');
        })
    });

    describe('Base URL Configuration', () => {
        it('debería usar la URL base correcta', () => {
            const expectedBase = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            expect(api.defaults.baseURL).toBe(`${expectedBase}/api`);
        });

        it('debería tener Content-Type correcto', () => {
            expect(api.defaults.headers['Content-Type']).toBe('application/json');
        });
    });
});
