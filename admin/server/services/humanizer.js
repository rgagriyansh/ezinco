import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const settingsPath = join(__dirname, '..', 'data', 'settings.json');

// Rephrasy AI API endpoint
const REPHRASY_API_URL = 'https://v2-humanizer.rephrasy.ai/api';

// Get humanizer settings from environment or settings file
async function getHumanizerSettings() {
  // First check environment variables (for Railway deployment)
  let apiKey = process.env.HUMANIZER_API_KEY;
  let apiUrl = process.env.HUMANIZER_API_URL;
  
  // Fallback to settings file (for local development)
  if (!apiKey) {
    try {
      const settingsData = await fs.readFile(settingsPath, 'utf-8');
      const settings = JSON.parse(settingsData);
      apiKey = apiKey || settings.humanizerApiKey;
      apiUrl = apiUrl || settings.humanizerApiUrl;
    } catch (error) {
      // Settings file might not exist
    }
  }
  
  return {
    apiKey: apiKey || '',
    apiUrl: apiUrl || REPHRASY_API_URL
  };
}

/**
 * Humanize AI-generated text using Rephrasy AI API
 * 
 * API: https://v2-humanizer.rephrasy.ai/api
 * Models: v3 (recommended), Undetectable Model v2, Undetectable Model, SEO Model
 * 
 * Configure the API key in settings
 */
export async function humanizeText(text) {
  const { apiKey, apiUrl } = await getHumanizerSettings();
  
  // If no humanizer API key configured, apply basic transformations
  if (!apiKey) {
    console.log('[Humanizer] No API key configured, applying basic transformations');
    return applyBasicHumanization(text);
  }
  
  try {
    console.log('[Humanizer] Calling Rephrasy AI API...');
    
    const response = await fetch(apiUrl || REPHRASY_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text,
        model: 'v3', // Recommended model
        style: 'professional', // professional, creative, or journalistic
        words: true, // Word-based pricing
        costs: true, // Return cost info
        language: 'English'
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 401) {
        throw new Error('Invalid Rephrasy API key. Please check your settings.');
      } else if (response.status === 422) {
        throw new Error('Invalid request parameters for Rephrasy API.');
      }
      throw new Error(`Humanizer API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    
    console.log('[Humanizer] Success! Flesch score:', data.new_flesch_score);
    if (data.costs) {
      console.log('[Humanizer] Cost:', data.costs);
    }
    
    // Rephrasy returns humanized text in 'output' field
    return data.output || text;
           
  } catch (error) {
    console.error('[Humanizer] API call failed:', error.message);
    // Fallback to basic humanization
    console.log('[Humanizer] Falling back to basic transformations');
    return applyBasicHumanization(text);
  }
}

/**
 * Basic text humanization without external API
 * Applies subtle variations to make text seem more natural
 */
function applyBasicHumanization(text) {
  let humanized = text;
  
  // Variation mappings for common AI patterns
  const replacements = [
    // Formal to casual transitions
    [/\bHowever,/g, () => pickRandom(['But', 'That said,', 'Still,', 'However,'])],
    [/\bFurthermore,/g, () => pickRandom(['Also,', 'Plus,', 'What\'s more,', 'Additionally,'])],
    [/\bAdditionally,/g, () => pickRandom(['Also,', 'On top of that,', 'Besides this,', 'Plus,'])],
    [/\bMoreover,/g, () => pickRandom(['Also,', 'What\'s more,', 'On top of that,', 'Plus,'])],
    [/\bTherefore,/g, () => pickRandom(['So,', 'This means', 'Because of this,', 'As a result,'])],
    [/\bConsequently,/g, () => pickRandom(['So,', 'As a result,', 'This leads to', 'Because of this,'])],
    [/\bNevertheless,/g, () => pickRandom(['Still,', 'Even so,', 'That said,', 'But still,'])],
    
    // Reduce AI-typical phrases
    [/\bIt is important to note that/gi, () => pickRandom(['Keep in mind that', 'Remember that', 'Note that', 'Just know that'])],
    [/\bIt is worth mentioning/gi, () => pickRandom(['It\'s worth noting', 'You should know', 'Here\'s something important:', 'Worth mentioning:'])],
    [/\bIn conclusion,/gi, () => pickRandom(['To wrap up,', 'All in all,', 'At the end of the day,', 'So,'])],
    [/\bTo summarize,/gi, () => pickRandom(['In short,', 'Basically,', 'The bottom line is', 'To sum it up,'])],
    [/\bIn summary,/gi, () => pickRandom(['To wrap up,', 'Long story short,', 'Basically,', 'So,'])],
    
    // More natural phrasing
    [/\butilize\b/gi, 'use'],
    [/\bcommence\b/gi, 'start'],
    [/\bterminate\b/gi, 'end'],
    [/\bfacilitate\b/gi, 'help'],
    [/\bimplement\b/gi, () => pickRandom(['set up', 'put in place', 'use', 'apply'])],
    [/\bleverage\b/gi, () => pickRandom(['use', 'take advantage of', 'make the most of'])],
    
    // Add contractions randomly
    [/\bdo not\b/gi, () => Math.random() > 0.3 ? 'don\'t' : 'do not'],
    [/\bcannot\b/gi, () => Math.random() > 0.3 ? 'can\'t' : 'cannot'],
    [/\bwill not\b/gi, () => Math.random() > 0.3 ? 'won\'t' : 'will not'],
    [/\bit is\b/gi, () => Math.random() > 0.4 ? 'it\'s' : 'it is'],
    [/\bthat is\b/gi, () => Math.random() > 0.4 ? 'that\'s' : 'that is'],
    [/\bwe have\b/gi, () => Math.random() > 0.4 ? 'we\'ve' : 'we have'],
    [/\byou will\b/gi, () => Math.random() > 0.4 ? 'you\'ll' : 'you will'],
  ];
  
  // Apply replacements
  for (const [pattern, replacement] of replacements) {
    if (typeof replacement === 'function') {
      humanized = humanized.replace(pattern, replacement);
    } else {
      humanized = humanized.replace(pattern, replacement);
    }
  }
  
  return humanized;
}

/**
 * Pick a random item from array
 */
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Check if humanizer is configured
 */
export async function isHumanizerConfigured() {
  const { apiKey, apiUrl } = await getHumanizerSettings();
  return !!(apiKey && apiUrl);
}
