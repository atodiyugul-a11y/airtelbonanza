import { Router, Response } from 'express';
import { db } from '../db.js';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

// Public: get content page
router.get('/:type', (req, res: Response) => {
  const { type } = req.params;
  if (type !== 'terms' && type !== 'privacy') {
    return res.status(404).json({ success: false, message: 'Content type not found. Use "terms" or "privacy".' });
  }

  const page = db.getContent(type);
  return res.json({ success: true, page });
});

// Admin: update content page
router.put('/:type', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { type } = req.params;
    if (type !== 'terms' && type !== 'privacy') {
      return res.status(400).json({ success: false, message: 'Invalid content type.' });
    }

    const { content, title } = req.body;
    if (!content) {
      return res.status(400).json({ success: false, message: 'Content cannot be empty.' });
    }

    const updated = db.updateContent(type, content, title);
    return res.json({ success: true, message: `${type === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'} updated successfully.`, page: updated });
  } catch (error) {
    console.error('Update content error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update content page.' });
  }
});

export default router;

