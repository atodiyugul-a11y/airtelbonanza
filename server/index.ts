import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import authRouter from './routes/auth.js';
import campaignRouter from './routes/campaign.js';
import rewardsRouter from './routes/rewards.js';
import winnersRouter from './routes/winners.js';
import faqsRouter from './routes/faqs.js';
import contentRouter from './routes/content.js';
import entryRouter from './routes/entry.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    campaign: 'AIRTEL DECEMBER CASH BONANZA 2026',
    time: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/campaign', campaignRouter);
app.use('/api/rewards', rewardsRouter);
app.use('/api/winners', winnersRouter);
app.use('/api/faqs', faqsRouter);
app.use('/api/content', contentRouter);
app.use('/api/entry', entryRouter);

// Serve static assets in production
const distPath = path.resolve(process.cwd(), 'dist');
app.use(express.static(distPath));

// Fallback to index.html for client-side routing
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      // In development when dist isn't built yet, return helpful JSON
      res.status(200).send('API Server running on port ' + PORT + '. Run Vite client dev server or npm run build.');
    }
  });
});

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`✨ Airtel December Cash Bonanza 2026 API Server listening on http://localhost:${PORT}`);
});

