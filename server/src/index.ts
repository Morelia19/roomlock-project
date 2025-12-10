import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import favoriteRoutes from './routes/favorite.routes.js';
import announcementRoutes from './routes/announcement.routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/announcements', announcementRoutes);

app.get('/api/status', (req, res) => {
    res.json({ mensaje: 'Servidor RoomLock activo 🚀' });
});

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    console.log(`✅ Base de datos conectada correctamente`);
});