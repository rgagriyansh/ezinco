import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

// Import routes
import blogRoutes from './routes/blogs.js';
import generateRoutes from './routes/generate.js';
import settingsRoutes from './routes/settings.js';
import keywordsRoutes from './routes/keywords.js';
import schedulerRoutes from './routes/scheduler.js';

// Import services
import { runScheduledPost } from './services/scheduler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration for production
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc)
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(allowed => origin.startsWith(allowed.replace(/\/$/, '')))) {
      return callback(null, true);
    }
    // Allow all vercel.app and railway.app domains
    if (origin.includes('.vercel.app') || origin.includes('.railway.app')) {
      return callback(null, true);
    }
    callback(null, true); // Allow all for now, restrict in production
  },
  credentials: true
}));
app.use(express.json());

// API Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/generate', generateRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/keywords', keywordsRoutes);
app.use('/api/scheduler', schedulerRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Initialize scheduler
let schedulerJob = null;

async function initializeScheduler() {
  try {
    const settingsPath = join(__dirname, 'data', 'settings.json');
    const settingsData = await fs.readFile(settingsPath, 'utf-8');
    const settings = JSON.parse(settingsData);
    
    if (settings.autoPostEnabled) {
      const interval = settings.postIntervalMinutes || 30;
      // Run every X minutes
      schedulerJob = cron.schedule(`*/${interval} * * * *`, async () => {
        console.log(`[Scheduler] Running scheduled post at ${new Date().toISOString()}`);
        await runScheduledPost();
      });
      console.log(`[Scheduler] Auto-posting enabled every ${interval} minutes`);
    }
  } catch (error) {
    console.error('[Scheduler] Failed to initialize:', error);
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`Admin server running on http://localhost:${PORT}`);
  initializeScheduler();
});

export { schedulerJob };
