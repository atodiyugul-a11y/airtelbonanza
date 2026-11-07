import { Router, Response } from 'express';
import { db } from '../db.js';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.js';
import { Winner } from '../types.js';

const router = Router();

// Public: get winners with optional category and search query
router.get('/', (req, res: Response) => {
  const { category, search } = req.query;
  let winners = db.getWinners();

  if (category && category !== 'all') {
    winners = winners.filter(w => w.prizeCategory.toLowerCase() === String(category).toLowerCase());
  }

  if (search) {
    const q = String(search).toLowerCase();
    winners = winners.filter(w =>
      w.name.toLowerCase().includes(q) ||
      w.country.toLowerCase().includes(q) ||
      w.ticketOrRefNumber.toLowerCase().includes(q)
    );
  }

  return res.json({ success: true, count: winners.length, winners });
});

// Admin: add winner
router.post('/', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, country, countryCode, prizeCategory, prizeAmount, dateAnnounced, ticketOrRefNumber, isDemo, verified } = req.body;

    if (!name || !country || !prizeCategory || prizeAmount === undefined) {
      return res.status(400).json({ success: false, message: 'Winner name, country, prize category, and prize amount are required.' });
    }

    if (Number(prizeAmount) < 100) {
      return res.status(400).json({ success: false, message: 'Prize amount must be at least $100 USD.' });
    }

    const winnerData: Omit<Winner, 'id'> = {
      name: name.trim(),
      country: country.trim(),
      countryCode: countryCode ? countryCode.trim().toUpperCase() : 'GL',
      prizeCategory,
      prizeAmount: Number(prizeAmount),
      dateAnnounced: dateAnnounced || new Date().toISOString().split('T')[0],
      ticketOrRefNumber: ticketOrRefNumber ? ticketOrRefNumber.trim() : `BONANZA-${Math.floor(1000 + Math.random() * 9000)}`,
      isDemo: isDemo !== undefined ? Boolean(isDemo) : true,
      verified: verified !== undefined ? Boolean(verified) : true
    };

    const newWinner = db.addWinner(winnerData);
    return res.status(201).json({ success: true, message: 'Verified winner entry recorded successfully.', winner: newWinner });
  } catch (error) {
    console.error('Add winner error:', error);
    return res.status(500).json({ success: false, message: 'Failed to record winner entry.' });
  }
});

// Admin: update winner
router.put('/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const updates = req.body;

    if (updates.prizeAmount !== undefined && Number(updates.prizeAmount) < 100) {
      return res.status(400).json({ success: false, message: 'Prize amount must be at least $100 USD.' });
    }

    const updated = db.updateWinner(id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Winner entry not found.' });
    }

    return res.json({ success: true, message: 'Winner record updated successfully.', winner: updated });
  } catch (error) {
    console.error('Update winner error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update winner record.' });
  }
});

// Admin: delete winner
router.delete('/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const deleted = db.deleteWinner(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Winner entry not found.' });
    }

    return res.json({ success: true, message: 'Winner entry removed successfully.' });
  } catch (error) {
    console.error('Delete winner error:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete winner entry.' });
  }
});

export default router;
