import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const settingsPath = join(__dirname, '..', 'data', 'settings.json');

// Helper to read settings
async function readSettings() {
  try {
    const data = await fs.readFile(settingsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return {
      autoPostEnabled: false,
      postIntervalMinutes: 30,
      maxPostsPerDay: 48,
      defaultCTA: 'Ready to start your business? Visit EZincorporation.in for expert assistance!',
      websiteUrl: 'https://ezincorporation.in',
      openaiApiKey: '',
      humanizerApiKey: '',
      humanizerApiUrl: ''
    };
  }
}

// Helper to write settings
async function writeSettings(data) {
  await fs.writeFile(settingsPath, JSON.stringify(data, null, 2));
}

// GET settings
router.get('/', async (req, res) => {
  try {
    const settings = await readSettings();
    // Don't expose full API keys, just show if they're set
    res.json({
      ...settings,
      openaiApiKey: settings.openaiApiKey ? '****' + settings.openaiApiKey.slice(-4) : '',
      humanizerApiKey: settings.humanizerApiKey ? '****' + settings.humanizerApiKey.slice(-4) : ''
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// PUT update settings
router.put('/', async (req, res) => {
  try {
    const currentSettings = await readSettings();
    const newSettings = {
      ...currentSettings,
      ...req.body
    };
    
    // Don't overwrite API keys if placeholder is sent
    if (req.body.openaiApiKey && req.body.openaiApiKey.startsWith('****')) {
      newSettings.openaiApiKey = currentSettings.openaiApiKey;
    }
    if (req.body.humanizerApiKey && req.body.humanizerApiKey.startsWith('****')) {
      newSettings.humanizerApiKey = currentSettings.humanizerApiKey;
    }
    
    await writeSettings(newSettings);
    
    // Return masked version
    res.json({
      ...newSettings,
      openaiApiKey: newSettings.openaiApiKey ? '****' + newSettings.openaiApiKey.slice(-4) : '',
      humanizerApiKey: newSettings.humanizerApiKey ? '****' + newSettings.humanizerApiKey.slice(-4) : ''
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// POST update API keys specifically
router.post('/api-keys', async (req, res) => {
  try {
    const currentSettings = await readSettings();
    const { openaiApiKey, humanizerApiKey, humanizerApiUrl } = req.body;
    
    if (openaiApiKey) {
      currentSettings.openaiApiKey = openaiApiKey;
    }
    if (humanizerApiKey) {
      currentSettings.humanizerApiKey = humanizerApiKey;
    }
    if (humanizerApiUrl) {
      currentSettings.humanizerApiUrl = humanizerApiUrl;
    }
    
    await writeSettings(currentSettings);
    res.json({ message: 'API keys updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update API keys' });
  }
});

// GET check API key status
router.get('/api-status', async (req, res) => {
  try {
    const settings = await readSettings();
    res.json({
      openaiConfigured: !!settings.openaiApiKey,
      humanizerConfigured: !!settings.humanizerApiKey && !!settings.humanizerApiUrl
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check API status' });
  }
});

export default router;
