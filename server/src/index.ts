import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/api/status', (req: Request, res: Response) => {
    res.json({
        mensaje: 'Servidor RoomLock activo',
        fecha: new Date().toISOString()
    });
});

app.get('/api/usuarios', async (req: Request, res: Response) => {
    try {
        const usuarios = await prisma.usuario.findMany();
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Base de datos conectada correctamente`);
});