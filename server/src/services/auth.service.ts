import { prisma } from '../index.js';
import type { RegistroUsuarioDTO } from '../DTO/auth.dto.js';
import bcrypt from 'bcryptjs';

export const registerUser = async (data: RegistroUsuarioDTO) => {
    const userExist = await prisma.user.findUnique({
        where: { email: data.email },
    });

    if (userExist) {
        throw new Error('El correo ya está registrado');
    }

    const salt = await bcrypt.genSalt(10);
    const claveEncriptada = await bcrypt.hash(data.password, salt);

    const newUser = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: claveEncriptada,
            role: data.role,
        },
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
};