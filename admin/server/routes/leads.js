import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const leadsPath = join(__dirname, '..', 'data', 'leads.json');

// Helper to read leads
async function readLeads() {
  try {
    const data = await fs.readFile(leadsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { leads: [] };
  }
}

// Helper to write leads
async function writeLeads(data) {
  await fs.writeFile(leadsPath, JSON.stringify(data, null, 2));
}

// POST submit lead
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    // Validate required fields
    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }

    const data = await readLeads();
    
    const newLead = {
      id: uuidv4(),
      name,
      email: email || '',
      phone,
      service: service || 'General Inquiry',
      message: message || '',
      source: req.body.source || 'contact-form',
      status: 'new',
      createdAt: new Date().toISOString(),
      notes: ''
    };

    data.leads.unshift(newLead);
    await writeLeads(data);

    res.status(201).json({ 
      success: true, 
      message: 'Thank you! We will contact you shortly.',
      leadId: newLead.id 
    });
  } catch (error) {
    console.error('Lead submission error:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

// GET all leads (for admin)
router.get('/', async (req, res) => {
  try {
    const data = await readLeads();
    res.json(data.leads);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// PUT update lead status
router.put('/:id', async (req, res) => {
  try {
    const data = await readLeads();
    const index = data.leads.findIndex(l => l.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    data.leads[index] = {
      ...data.leads[index],
      ...req.body,
      id: data.leads[index].id,
      createdAt: data.leads[index].createdAt,
      updatedAt: new Date().toISOString()
    };

    await writeLeads(data);
    res.json(data.leads[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update lead' });
  }
});

// DELETE lead
router.delete('/:id', async (req, res) => {
  try {
    const data = await readLeads();
    const index = data.leads.findIndex(l => l.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    data.leads.splice(index, 1);
    await writeLeads(data);
    res.json({ message: 'Lead deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete lead' });
  }
});

export default router;
