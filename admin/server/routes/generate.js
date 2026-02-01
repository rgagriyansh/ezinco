import express from 'express';
import { generateBlogContent, generateTitle, generateMetaDescription } from '../services/openai.js';
import { humanizeText } from '../services/humanizer.js';

const router = express.Router();

// POST generate blog content from keyword
router.post('/content', async (req, res) => {
  try {
    const { keyword, additionalContext } = req.body;
    
    if (!keyword) {
      return res.status(400).json({ error: 'Keyword is required' });
    }
    
    const content = await generateBlogContent(keyword, additionalContext);
    res.json({ content });
  } catch (error) {
    console.error('Generate content error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate content' });
  }
});

// POST generate title from keyword
router.post('/title', async (req, res) => {
  try {
    const { keyword } = req.body;
    
    if (!keyword) {
      return res.status(400).json({ error: 'Keyword is required' });
    }
    
    const title = await generateTitle(keyword);
    res.json({ title });
  } catch (error) {
    console.error('Generate title error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate title' });
  }
});

// POST generate meta description
router.post('/meta-description', async (req, res) => {
  try {
    const { title, content } = req.body;
    
    if (!title && !content) {
      return res.status(400).json({ error: 'Title or content is required' });
    }
    
    const metaDescription = await generateMetaDescription(title, content);
    res.json({ metaDescription });
  } catch (error) {
    console.error('Generate meta description error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate meta description' });
  }
});

// POST humanize text
router.post('/humanize', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    const humanizedText = await humanizeText(text);
    res.json({ humanizedText });
  } catch (error) {
    console.error('Humanize text error:', error);
    res.status(500).json({ error: error.message || 'Failed to humanize text' });
  }
});

// POST generate complete blog (content + humanize)
router.post('/complete-blog', async (req, res) => {
  try {
    const { keyword, additionalContext, autoHumanize = true } = req.body;
    
    if (!keyword) {
      return res.status(400).json({ error: 'Keyword is required' });
    }
    
    // Generate title
    const title = await generateTitle(keyword);
    
    // Generate content
    let content = await generateBlogContent(keyword, additionalContext);
    const originalContent = content;
    
    // Humanize if requested
    if (autoHumanize) {
      try {
        content = await humanizeText(content);
      } catch (humanizeError) {
        console.warn('Humanization failed, using original content:', humanizeError);
      }
    }
    
    // Generate meta description
    const metaDescription = await generateMetaDescription(title, content);
    
    // Generate slug
    const slug = generateSlug(keyword);
    
    res.json({
      title,
      slug,
      metaDescription,
      content,
      originalContent,
      keyword
    });
  } catch (error) {
    console.error('Generate complete blog error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate complete blog' });
  }
});

// Helper function to generate slug
function generateSlug(keyword) {
  const baseSlug = keyword
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  return `${baseSlug}-guide-${Date.now().toString(36)}`;
}

export default router;
