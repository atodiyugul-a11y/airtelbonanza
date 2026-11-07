import { Router, Response } from 'express';
import { db } from '../db.js';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.js';
import { FAQItem } from '../types.js';

const router = Router();

// Public: get FAQs
router.get('/', (_req, res: Response) => {
  const faqs = db.getFAQs().sort((a, b) => a.displayOrder - b.displayOrder);
  return res.json({ success: true, count: faqs.length, faqs });
});

// Admin: add FAQ
router.post('/', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { question, answer, category, displayOrder } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ success: false, message: 'Question and answer are required.' });
    }

    const newFaqData: Omit<FAQItem, 'id'> = {
      question: question.trim(),
      answer: answer.trim(),
      category: category || 'general',
      displayOrder: displayOrder !== undefined ? Number(displayOrder) : db.getFAQs().length + 1
    };

    const newFaq = db.addFAQ(newFaqData);
    return res.status(201).json({ success: true, message: 'FAQ item added successfully.', faq: newFaq });
  } catch (error) {
    console.error('Add FAQ error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create FAQ item.' });
  }
});

// Admin: update FAQ
router.put('/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const updates = req.body;

    const updated = db.updateFAQ(id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'FAQ item not found.' });
    }

    return res.json({ success: true, message: 'FAQ item updated successfully.', faq: updated });
  } catch (error) {
    console.error('Update FAQ error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update FAQ item.' });
  }
});

// Admin: delete FAQ
router.delete('/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const deleted = db.deleteFAQ(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'FAQ item not found.' });
    }

    return res.json({ success: true, message: 'FAQ item removed successfully.' });
  } catch (error) {
    console.error('Delete FAQ error:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete FAQ item.' });
  }
});

export default router;
