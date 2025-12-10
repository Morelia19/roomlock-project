import api from '@/services/api'

const mockInterceptorsRequest = {
    use: vi.fn(),
};

const mockAxiosInstance = {
    interceptors: {
        request: mockInterceptorsRequest,
    },
};

const mockAxiosCreate = vi.fn(() => mockAxiosInstance);

vi.mock('axios', () => ({
    default: {
        create: mockAxiosCreate,
    },
}));


describe('API Service', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        vi.clearAllMocks();

        // Clear localStorage
        localStorage.clear();

        // Reset the mock implementation
        mockAxiosCreate.mockReturnValue(mockAxiosInstance);
    });

    it('debería crear una instancia de axios con la configuración correcta', () => {
        // Re-import to trigger axios.create
        vi.resetModules();


        expect(mockAxiosCreate).toHaveBeenCalledWith({
            baseURL: expect.stringContaining('/api'),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    });

    it('debería usar VITE_API_URL si está definida', async () => {
        // This test verifies the baseURL construction
        const expectedBaseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

        vi.resetModules();
        await import('@/services/api');

        expect(mockAxiosCreate).toHaveBeenCalledWith(
            expect.objectContaining({
                baseURL: `${expectedBaseURL}/api`,
            })
        );
    });

    it('debería configurar un interceptor de request', async () => {
        vi.resetModules();
        await import('@/services/api');

        expect(mockInterceptorsRequest.use).toHaveBeenCalled();
    });

    describe('Request Interceptor', () => {
        it('debería agregar el token de Authorization si existe en localStorage', async () => {
            const mockToken = 'test-token-123';
            localStorage.setItem('token', mockToken);

            // Get the interceptor function
            vi.resetModules();
            await import('@/services/api');

            const interceptorFn = mockInterceptorsRequest.use.mock.calls[0][0];

            const mockConfig = {
                headers: {},
            };

            const result = interceptorFn(mockConfig);

            expect(result.headers.Authorization).toBe(`Bearer ${mockToken}`);
        });

        it('no debería agregar Authorization si no hay token en localStorage', async () => {
            // Ensure no token in localStorage
            localStorage.removeItem('token');

            vi.resetModules();
            await import('@/services/api');

            const interceptorFn = mockInterceptorsRequest.use.mock.calls[0][0];

            const mockConfig = {
                headers: {},
            };

            const result = interceptorFn(mockConfig);

            expect(result.headers.Authorization).toBeUndefined();
        });

        it('debería retornar el config modificado', async () => {
            vi.resetModules();
            await import('@/services/api');

            const interceptorFn = mockInterceptorsRequest.use.mock.calls[0][0];

            const mockConfig = {
                headers: {},
                url: '/test',
            };

            const result = interceptorFn(mockConfig);

            expect(result).toEqual(expect.objectContaining({
                headers: expect.any(Object),
                url: '/test',
            }));
        });
    });

    describe('API Instance Export', () => {
        it('debería exportar la instancia de axios', () => {
            expect(api).toBeDefined();
        });
    });
});
