import { Router, Response } from 'express';
import { db } from '../db.js';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

// Public: get campaign configuration
router.get('/', (_req, res: Response) => {
  const campaign = db.getCampaign();
  return res.json({ success: true, campaign });
});

// Admin: update campaign configuration
router.put('/', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const updates = req.body;
    
    // Basic validations
    if (updates.startDate && updates.closingDate) {
      if (new Date(updates.startDate) > new Date(updates.closingDate)) {
        return res.status(400).json({ success: false, message: 'Campaign start date cannot be later than closing date.' });
      }
    }

    const updated = db.updateCampaign(updates);
    return res.json({ success: true, message: 'Campaign configuration updated successfully.', campaign: updated });
  } catch (error) {
    console.error('Update campaign error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update campaign configuration.' });
  }
});

// Admin: get dashboard statistics
router.get('/stats', requireAuth, (_req: AuthenticatedRequest, res: Response) => {
  const campaign = db.getCampaign();
  const rewards = db.getRewards();
  const winners = db.getWinners();
  const faqs = db.getFAQs();
  const subscribers = db.getSubscribers();

  // Calculate total prize pool
  const totalPrizePoolMax = rewards.filter(r => r.enabled).reduce((acc, r) => acc + r.maxAmount, 0);
  const totalPrizesAwardedUSD = winners.reduce((acc, w) => acc + w.prizeAmount, 0);
  
  // Calculate days left
  const closingDate = new Date(campaign.closingDate);
  const now = new Date();
  const diffTime = closingDate.getTime() - now.getTime();
  const daysLeft = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  return res.json({
    success: true,
    stats: {
      isPublished: campaign.isPublished,
      activeCategories: rewards.filter(r => r.enabled).length,
      totalCategories: rewards.length,
      verifiedWinnersCount: winners.length,
      totalPrizesAwardedUSD,
      totalPrizePoolMax,
      daysLeft,
      hasEnded: diffTime <= 0,
      faqCount: faqs.length,
      subscribersCount: subscribers.length,
      lastUpdated: campaign.lastUpdated
    }
  });
});

// Admin: reset demo data
router.post('/reset', requireAuth, (_req: AuthenticatedRequest, res: Response) => {
  try {
    db.resetDemoData();
    return res.json({ success: true, message: 'Demonstration dataset reset to initial baseline values.' });
  } catch (error) {
    console.error('Reset demo data error:', error);
    return res.status(500).json({ success: false, message: 'Failed to reset demonstration dataset.' });
  }
});

export default router;

