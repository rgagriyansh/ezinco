import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const blogsPath = join(__dirname, '..', 'data', 'blogs.json');

// GET dynamic sitemap
router.get('/', async (req, res) => {
  try {
    const websiteUrl = process.env.WEBSITE_URL || 'https://ezincorporate.in';
    
    // Read published blogs
    let blogs = [];
    try {
      const data = await fs.readFile(blogsPath, 'utf-8');
      const blogsData = JSON.parse(data);
      blogs = blogsData.blogs.filter(b => b.status === 'published');
    } catch (e) {
      // No blogs yet
    }

    const today = new Date().toISOString().split('T')[0];

    // Build sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main Pages -->
  <url>
    <loc>${websiteUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${websiteUrl}/how-it-works</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${websiteUrl}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${websiteUrl}/pricing</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${websiteUrl}/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;

    // Add blog posts
    for (const blog of blogs) {
      const publishDate = blog.publishedAt ? blog.publishedAt.split('T')[0] : today;
      sitemap += `  <url>
    <loc>${websiteUrl}/blog/${blog.slug}</loc>
    <lastmod>${publishDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    }

    sitemap += '</urlset>';

    res.set('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).send('Error generating sitemap');
  }
});

export default router;
