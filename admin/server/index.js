import express from 'express';
import cors from 'cors';
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

// Scheduler using setInterval (easier to manage dynamically)
let schedulerInterval = null;
let currentIntervalMs = null;

async function getSchedulerSettings() {
  // Read from environment variables first (for Railway persistence)
  const envAutoPost = process.env.AUTO_POST_ENABLED === 'true' || process.env.AUTO_POST_ENABLED === '1';
  const envInterval = parseInt(process.env.POST_INTERVAL_MINUTES) || null;
  
  // Read from settings file
  let settings = { autoPostEnabled: false, postIntervalMinutes: 30 };
  try {
    const settingsPath = join(__dirname, 'data', 'settings.json');
    const settingsData = await fs.readFile(settingsPath, 'utf-8');
    settings = JSON.parse(settingsData);
  } catch (e) {
    // Use defaults if file read fails
  }
  
  return {
    autoPostEnabled: envAutoPost || settings.autoPostEnabled,
    postIntervalMinutes: envInterval || settings.postIntervalMinutes || 30
  };
}

async function startScheduler() {
  // Stop existing scheduler if running
  if (schedulerInterval) {
    clearInterval(schedulerInterval);
    schedulerInterval = null;
    console.log('[Scheduler] Stopped existing scheduler');
  }
  
  const { autoPostEnabled, postIntervalMinutes } = await getSchedulerSettings();
  
  if (!autoPostEnabled) {
    console.log('[Scheduler] Auto-posting is disabled');
    return;
  }
  
  const intervalMs = postIntervalMinutes * 60 * 1000;
  currentIntervalMs = intervalMs;
  
  console.log(`[Scheduler] Starting auto-posting every ${postIntervalMinutes} minutes`);
  
  // Run immediately on start, then every interval
  schedulerInterval = setInterval(async () => {
    console.log(`[Scheduler] Running scheduled post at ${new Date().toISOString()}`);
    try {
      await runScheduledPost();
    } catch (error) {
      console.error('[Scheduler] Error during scheduled post:', error);
    }
  }, intervalMs);
  
  // Also run one immediately after a short delay
  setTimeout(async () => {
    console.log(`[Scheduler] Running initial post at ${new Date().toISOString()}`);
    try {
      await runScheduledPost();
    } catch (error) {
      console.error('[Scheduler] Error during initial post:', error);
    }
  }, 5000); // 5 second delay for initial post
}

// Restart scheduler (called when settings change)
async function restartScheduler() {
  console.log('[Scheduler] Restarting scheduler with new settings...');
  await startScheduler();
}

// Make restart function available to routes
app.set('restartScheduler', restartScheduler);

// Start server
app.listen(PORT, () => {
  console.log(`Admin server running on http://localhost:${PORT}`);
  startScheduler();
});

export { schedulerInterval, restartScheduler };
