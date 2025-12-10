export interface RegistroUsuarioDTO {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'student' | 'owner' | 'admin';
}