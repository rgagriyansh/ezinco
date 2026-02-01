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

// Middleware
app.use(cors());
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
