import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { authRouter } from './routes/auth.js';
import { profileRouter } from './routes/profile.js';
import { learningRouter } from './routes/learning.js';
import { inventoryRouter } from './routes/inventory.js';
import { shopRouter } from './routes/shop.js';
import { leaderboardRouter } from './routes/leaderboard.js';
import { socialRouter } from './routes/social.js';
import { guildsRouter } from './routes/guilds.js';
import { pvpRouter } from './routes/pvp.js';
const app = express();
const PORT = parseInt(env.PORT, 10) || 8000;
// Middlewares
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Request Logger Middleware
app.use((req, res, next) => {
    console.log(`🌐 [${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
// Health Checks
app.get('/', (req, res) => {
    res.json({
        status: 'online',
        app: 'Hexafalls KnowledgeVerse Backend',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        documentation: `http://127.0.0.1:${PORT}/api/health`,
    });
});
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});
// Mount Routes
app.use('/api/auth', authRouter);
app.use('/api/intro', profileRouter);
app.use('/api/profile', profileRouter);
app.use('/api/learning', learningRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/shop', shopRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/social', socialRouter);
app.use('/api/guilds', guildsRouter);
app.use('/api/pvp', pvpRouter);
// Global Error Handler
app.use((err, req, res, next) => {
    console.error('❌ [Server Error]:', err);
    res.status(500).json({
        success: false,
        error: err.message || 'Internal Server Error',
    });
});
export { app };
export default app;
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`=======================================================`);
        console.log(`🚀 Hexafalls Supabase Node.js Backend is live on port ${PORT}`);
        console.log(`🔗 Local URL: http://127.0.0.1:${PORT}`);
        console.log(`💚 Health Check: http://127.0.0.1:${PORT}/api/health`);
        console.log(`=======================================================`);
    });
}
