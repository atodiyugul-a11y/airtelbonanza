import { Router, Response } from 'express';
import { db } from '../db.js';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

// Public: get rewards
router.get('/', (req, res: Response) => {
  const showAll = req.query.all === 'true';
  const rewards = db.getRewards();
  const filtered = showAll ? rewards : rewards.filter(r => r.enabled);
  return res.json({ success: true, rewards: filtered });
});

// Admin: update reward
router.put('/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const updates = req.body;

    if (updates.minAmount !== undefined && updates.maxAmount !== undefined) {
      if (Number(updates.minAmount) > Number(updates.maxAmount)) {
        return res.status(400).json({ success: false, message: 'Minimum prize amount cannot exceed maximum prize amount.' });
      }
      if (Number(updates.minAmount) < 100) {
        return res.status(400).json({ success: false, message: 'All prizes must start from at least $100 USD.' });
      }
      updates.prizeRangeDisplay = `$${Number(updates.minAmount).toLocaleString()} – $${Number(updates.maxAmount).toLocaleString()}`;
    }

    const updated = db.updateReward(id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Reward category not found.' });
    }

    return res.json({ success: true, message: 'Reward category updated successfully.', reward: updated });
  } catch (error) {
    console.error('Update reward error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update reward category.' });
  }
});

export default router;
