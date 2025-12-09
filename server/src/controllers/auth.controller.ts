import type { Request, Response } from 'express';
import { registerUser } from '../services/auth.service.js';
import type { RegistroUsuarioDTO } from '../DTO/auth.dto.js';

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