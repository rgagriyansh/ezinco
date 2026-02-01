import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const keywordsPath = join(__dirname, '..', 'data', 'keywords.json');

// Helper to read keywords data
async function readKeywordsData() {
  try {
    const data = await fs.readFile(keywordsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { keywords: [], sentences: [] };
  }
}

// Helper to write keywords data
async function writeKeywordsData(data) {
  await fs.writeFile(keywordsPath, JSON.stringify(data, null, 2));
}

// GET all keywords and sentences
router.get('/', async (req, res) => {
  try {
    const data = await readKeywordsData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch keywords' });
  }
});

// POST add keyword
router.post('/keyword', async (req, res) => {
  try {
    const { keyword } = req.body;
    if (!keyword) {
      return res.status(400).json({ error: 'Keyword is required' });
    }
    
    const data = await readKeywordsData();
    if (!data.keywords.includes(keyword)) {
      data.keywords.push(keyword);
      await writeKeywordsData(data);
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add keyword' });
  }
});

// DELETE keyword
router.delete('/keyword/:keyword', async (req, res) => {
  try {
    const keyword = decodeURIComponent(req.params.keyword);
    const data = await readKeywordsData();
    data.keywords = data.keywords.filter(k => k !== keyword);
    await writeKeywordsData(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete keyword' });
  }
});

// POST add sentence
router.post('/sentence', async (req, res) => {
  try {
    const { sentence } = req.body;
    if (!sentence) {
      return res.status(400).json({ error: 'Sentence is required' });
    }
    
    const data = await readKeywordsData();
    if (!data.sentences.includes(sentence)) {
      data.sentences.push(sentence);
      await writeKeywordsData(data);
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add sentence' });
  }
});

// DELETE sentence
router.delete('/sentence/:index', async (req, res) => {
  try {
    const index = parseInt(req.params.index);
    const data = await readKeywordsData();
    if (index >= 0 && index < data.sentences.length) {
      data.sentences.splice(index, 1);
      await writeKeywordsData(data);
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete sentence' });
  }
});

// PUT update all keywords and sentences
router.put('/', async (req, res) => {
  try {
    const { keywords, sentences } = req.body;
    const data = await readKeywordsData();
    
    if (keywords) data.keywords = keywords;
    if (sentences) data.sentences = sentences;
    
    await writeKeywordsData(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update keywords' });
  }
});

// GET random keyword (for auto-posting)
router.get('/random', async (req, res) => {
  try {
    const data = await readKeywordsData();
    if (data.keywords.length === 0) {
      return res.status(404).json({ error: 'No keywords available' });
    }
    const randomKeyword = data.keywords[Math.floor(Math.random() * data.keywords.length)];
    res.json({ keyword: randomKeyword });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get random keyword' });
  }
});

export default router;
