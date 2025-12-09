import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/api/status', (req, res) => {
    res.json({ mensaje: 'Servidor RoomLock activo 🚀' });
});

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    console.log(`✅ Base de datos conectada correctamente`);
});