export interface RegistroUsuarioDTO {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'owner' | 'admin';
}