import { prisma } from '../index.js';
import type { RegistroUsuarioDTO } from '../DTO/auth.dto.js';
import bcrypt from 'bcryptjs';

export const registerUser = async (data: RegistroUsuarioDTO) => {
    const usuarioExistente = await prisma.user.findUnique({
        where: { email: data.email },
    });

    if (usuarioExistente) {
        throw new Error('El correo ya está registrado');
    }

    const salt = await bcrypt.genSalt(10);
    const claveEncriptada = await bcrypt.hash(data.password, salt);

    const nuevoUsuario = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: claveEncriptada,
            role: data.role,
        },
    });

    const { password: _, ...usuarioSinClave } = nuevoUsuario;
    return usuarioSinClave;
};