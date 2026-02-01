import OpenAI from 'openai';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const settingsPath = join(__dirname, '..', 'data', 'settings.json');

// Get OpenAI client with API key from settings
async function getOpenAIClient() {
  const settingsData = await fs.readFile(settingsPath, 'utf-8');
  const settings = JSON.parse(settingsData);
  
  if (!settings.openaiApiKey) {
    throw new Error('OpenAI API key not configured. Please add it in Settings.');
  }
  
  return new OpenAI({ apiKey: settings.openaiApiKey });
}

// Get settings for CTA
async function getSettings() {
  const settingsData = await fs.readFile(settingsPath, 'utf-8');
  return JSON.parse(settingsData);
}

// Generate blog content from keyword
export async function generateBlogContent(keyword, additionalContext = '') {
  const openai = await getOpenAIClient();
  const settings = await getSettings();
  
  const systemPrompt = `You are an expert content writer specializing in Indian business, startups, and company registration. You write informative, engaging, and SEO-optimized blog posts for EZincorporation.in, a company that helps with business registration and compliance in India.

Your writing style:
- Professional yet accessible
- Include practical tips and actionable advice
- Use relevant Indian business regulations and current information (2024-2025)
- Structure content with clear headings (H2, H3)
- Include bullet points and numbered lists where appropriate
- Natural integration of the target keyword
- End with a compelling call-to-action for EZincorporation services`;

  const userPrompt = `Write a comprehensive blog post about "${keyword}" for Indian entrepreneurs and business owners.

${additionalContext ? `Additional context: ${additionalContext}` : ''}

Requirements:
1. Create an engaging title
2. Write 800-1200 words of valuable content
3. Include practical tips specific to India
4. Reference current regulations where applicable
5. End with this CTA: "${settings.defaultCTA}"

Format the content in Markdown with proper headings.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    max_tokens: 2000,
    temperature: 0.7
  });

  return response.choices[0].message.content;
}

// Generate title from keyword
export async function generateTitle(keyword) {
  const openai = await getOpenAIClient();
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'You are an SEO expert. Generate compelling, click-worthy blog titles that rank well on Google.'
      },
      {
        role: 'user',
        content: `Generate a single SEO-optimized blog title for the keyword "${keyword}" targeting Indian entrepreneurs and businesses. The title should be:
- 50-60 characters
- Include the keyword naturally
- Be compelling and click-worthy
- Relevant to Indian business context

Return only the title, nothing else.`
      }
    ],
    max_tokens: 100,
    temperature: 0.8
  });

  return response.choices[0].message.content.trim().replace(/^["']|["']$/g, '');
}

// Generate meta description
export async function generateMetaDescription(title, content) {
  const openai = await getOpenAIClient();
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'You are an SEO expert. Generate compelling meta descriptions that improve click-through rates.'
      },
      {
        role: 'user',
        content: `Generate a meta description for this blog post:
Title: ${title}
Content excerpt: ${content?.substring(0, 500) || ''}

Requirements:
- 150-160 characters
- Include a call-to-action
- Be compelling and informative
- Target Indian business audience

Return only the meta description, nothing else.`
      }
    ],
    max_tokens: 100,
    temperature: 0.7
  });

  return response.choices[0].message.content.trim().replace(/^["']|["']$/g, '');
}

// Generate tags from content
export async function generateTags(content, keyword) {
  const openai = await getOpenAIClient();
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'You are an SEO expert. Generate relevant tags for blog categorization.'
      },
      {
        role: 'user',
        content: `Generate 3-5 relevant tags for this blog content about "${keyword}":

${content?.substring(0, 500) || ''}

Return tags as a JSON array of strings. Example: ["Tag 1", "Tag 2", "Tag 3"]`
      }
    ],
    max_tokens: 100,
    temperature: 0.5
  });

  try {
    return JSON.parse(response.choices[0].message.content);
  } catch {
    return [keyword, 'Business Registration', 'Indian Startups'];
  }
}
