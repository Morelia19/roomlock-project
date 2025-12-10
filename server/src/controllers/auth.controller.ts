import type { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service.js';
import type { RegistroUsuarioDTO, LoginDTO } from '../DTO/auth.dto.js';

export const register = async (req: Request, res: Response) => {
    try {
        const data: RegistroUsuarioDTO = req.body;

        const user = await registerUser(data);

        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            data: user,
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message || 'Error inesperado al registrar usuario',
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const data: LoginDTO = req.body;

        const result = await loginUser(data);

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            data: result,
        });
    } catch (error: any) {
        res.status(401).json({
            error: error.message || 'Error al iniciar sesión',
        });
    }
};