export interface RegistroUsuarioDTO {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'owner' | 'admin';
  phone?: string;
  university?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}