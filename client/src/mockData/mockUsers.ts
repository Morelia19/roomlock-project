export interface MockUser {
  id: string;
  email: string;
  password: string;
  role: "student" | "owner" | "admin";
  name: string;
  phone?: string;
  university?: string;
  verified?: boolean;
  verificationStatus?: "unverified" | "pending" | "verified";
}

export const mockUsers: MockUser[] = [
  {
    id: "student-1",
    email: "juan.perez@unmsm.edu.pe",
    password: "estudiante123",
    role: "student",
    name: "Juan Pérez",
    phone: "+51 999 123 456",
    university: "Universidad Nacional Mayor de San Marcos",
    verified: true,
    verificationStatus: "verified"
  },
  {
    id: "student-2",
    email: "carlos.lopez@pucp.edu.pe",
    password: "estudiante123",
    role: "student",
    name: "Carlos López",
    phone: "+51 999 234 567",
    university: "Pontificia Universidad Católica del Perú",
    verified: false,
    verificationStatus: "unverified" // Added unverified student user
  },
  {
    id: "owner-1",
    email: "maria.garcia@gmail.com",
    password: "propietario123",
    role: "owner",
    name: "María García",
    phone: "+51 999 987 654",
    verified: true
  },
  {
    id: "admin-1",
    email: "admin@roomlock.com",
    password: "admin123",
    role: "admin",
    name: "Carlos Administrador",
    phone: "+51 999 555 666",
    verified: true
  }
];

export const getMockUserByEmail = (email: string): MockUser | undefined => {
  return mockUsers.find(user => user.email === email);
};

export const validateMockUser = (email: string, password: string): MockUser | null => {
  const user = mockUsers.find(user => user.email === email && user.password === password);
  return user || null;
};
