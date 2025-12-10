import { prisma } from '../index.js';
import type { RegistroUsuarioDTO, LoginDTO } from '../DTO/auth.dto.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
            phone: data.phone || null,
            university: data.university || null,
            password: claveEncriptada,
            role: data.role,
        },
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
};

export const loginUser = async (data: LoginDTO) => {
    const user = await prisma.user.findUnique({
        where: { email: data.email },
    });

    if (!user) {
        throw new Error('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
        throw new Error('Credenciales inválidas');
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'secret-key',
        { expiresIn: '7d' }
    );

    const { password: _, ...userWithoutPassword } = user;

    return {
        token,
        user: userWithoutPassword,
    };
};