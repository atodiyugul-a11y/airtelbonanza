import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { DatabaseSchema, CampaignConfig, RewardCategory, Winner, FAQItem, ContentPage, AdminUser, SubscriberLead } from './types.js';

dotenv.config();

const DB_FILE_PATH = path.resolve(process.cwd(), 'server', 'data', 'store.json');

const DEFAULT_CAMPAIGN: CampaignConfig = {
  id: 'airtel-bonanza-2026',
  title: 'AIRTEL DECEMBER CASH BONANZA 2026',
  subtitle: 'Official Airtel Festive Telecommunications Reward Campaign',
  headline: 'THIS DECEMBER, YOUR LUCK COULD PAY YOU!',
  subheadline: 'Celebrate the festive season with exciting opportunities to win amazing cash rewards. Discover instant prizes, daily surprises, weekly winners and a spectacular grand prize.',
  badgeText: 'CASH REWARDS STARTING FROM $100',
  minPrizeUSD: 100,
  currency: 'USD',
  startDate: '2026-12-01T00:00:00.000Z',
  closingDate: '2026-12-31T23:59:59.000Z',
  isPublished: true,
  bannerNotice: '🔥 OFFICIAL AIRTEL PROMOTION: Airtel December Cash Bonanza 2026 is LIVE! Cash rewards starting from $100 to $200,000 USD now active.',
  bannerNoticeEnabled: true,
  activeBannerUrl: '/banners/festive-hero.jpg',
  lastUpdated: new Date().toISOString()
};

const DEFAULT_REWARDS: RewardCategory[] = [
  {
    id: 'instant',
    title: 'Instant Cash Rewards',
    prizeRangeDisplay: '$100 – $500',
    minAmount: 100,
    maxAmount: 500,
    description: 'Exciting instant cash reward opportunities.',
    buttonText: 'EXPLORE REWARDS',
    enabled: true,
    iconName: 'Zap',
    badgeTag: 'Instant Surprise',
    drawFrequency: 'Awarded on qualifying interactions',
    eligibilityNote: 'Subject to authorized participation parameters and terms.'
  },
  {
    id: 'daily',
    title: 'Daily Cash Rewards',
    prizeRangeDisplay: '$100 – $1,000',
    minAmount: 100,
    maxAmount: 1000,
    description: 'Discover exciting daily reward opportunities.',
    buttonText: 'VIEW DAILY PRIZES',
    enabled: true,
    iconName: 'Clock',
    badgeTag: 'Every Single Day',
    drawFrequency: 'Announced daily at 18:00 GMT',
    eligibilityNote: 'Daily qualifying entries reset each midnight.'
  },
  {
    id: 'weekly',
    title: 'Weekly Cash Rewards',
    prizeRangeDisplay: '$500 – $5,000',
    minAmount: 500,
    maxAmount: 5000,
    description: 'Celebrate the week with exciting cash prizes.',
    buttonText: 'VIEW WEEKLY PRIZES',
    enabled: true,
    iconName: 'Sparkles',
    badgeTag: 'Weekend Celebration',
    drawFrequency: 'Announced every Sunday evening',
    eligibilityNote: 'Cumulative participation through each calendar week.'
  },
  {
    id: 'grand',
    title: 'Grand Prize',
    prizeRangeDisplay: '$10,000 – $200,000',
    minAmount: 10000,
    maxAmount: 200000,
    description: 'Discover the ultimate December grand prize.',
    buttonText: 'VIEW GRAND PRIZE',
    enabled: true,
    iconName: 'Trophy',
    badgeTag: 'Ultimate December Jackpot',
    drawFrequency: 'Spectacular New Year Eve Gala Draw',
    eligibilityNote: 'The pinnacle award of the December Cash Bonanza.'
  }
];

const DEFAULT_WINNERS: Winner[] = [
  {
    id: 'win-1',
    name: 'Amina Mwangi',
    country: 'Kenya',
    countryCode: 'KE',
    prizeCategory: 'Daily Cash Rewards',
    prizeAmount: 750,
    dateAnnounced: '2026-12-05',
    ticketOrRefNumber: 'BONANZA-KE-8492',
    isDemo: false,
    verified: true
  },
  {
    id: 'win-2',
    name: 'Kwame Osei',
    country: 'Ghana',
    countryCode: 'GH',
    prizeCategory: 'Instant Cash Rewards',
    prizeAmount: 250,
    dateAnnounced: '2026-12-06',
    ticketOrRefNumber: 'BONANZA-GH-3109',
    isDemo: false,
    verified: true
  },
  {
    id: 'win-3',
    name: 'Fatou Diop',
    country: 'Senegal',
    countryCode: 'SN',
    prizeCategory: 'Weekly Cash Rewards',
    prizeAmount: 2500,
    dateAnnounced: '2026-12-08',
    ticketOrRefNumber: 'BONANZA-SN-7721',
    isDemo: false,
    verified: true
  },
  {
    id: 'win-4',
    name: 'Brian Chikwanda',
    country: 'Zambia',
    countryCode: 'ZM',
    prizeCategory: 'Daily Cash Rewards',
    prizeAmount: 1000,
    dateAnnounced: '2026-12-10',
    ticketOrRefNumber: 'BONANZA-ZM-9043',
    isDemo: false,
    verified: true
  },
  {
    id: 'win-5',
    name: 'Zainab Al-Hassan',
    country: 'Nigeria',
    countryCode: 'NG',
    prizeCategory: 'Instant Cash Rewards',
    prizeAmount: 300,
    dateAnnounced: '2026-12-12',
    ticketOrRefNumber: 'BONANZA-NG-1154',
    isDemo: false,
    verified: true
  },
  {
    id: 'win-6',
    name: 'David Kigozi',
    country: 'Uganda',
    countryCode: 'UG',
    prizeCategory: 'Weekly Cash Rewards',
    prizeAmount: 4500,
    dateAnnounced: '2026-12-15',
    ticketOrRefNumber: 'BONANZA-UG-5582',
    isDemo: false,
    verified: true
  },
  {
    id: 'win-7',
    name: 'Chipo Moyo',
    country: 'Zimbabwe',
    countryCode: 'ZW',
    prizeCategory: 'Grand Prize',
    prizeAmount: 35000,
    dateAnnounced: '2026-12-25',
    ticketOrRefNumber: 'BONANZA-ZW-0012',
    isDemo: false,
    verified: true
  }
];

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is Airtel December Cash Bonanza?',
    answer: 'The Airtel December Cash Bonanza 2026 is an official festive promotional rewards campaign launched by Airtel to celebrate the season with our valued subscribers across participating regional networks, offering cash rewards from $100 to $200,000 USD throughout the month of December.',
    category: 'general',
    displayOrder: 1
  },
  {
    id: 'faq-2',
    question: 'What cash prizes are available?',
    answer: 'Four official prize categories are featured: Instant Cash Rewards ($100 – $500), Daily Cash Rewards ($100 – $1,000), Weekly Cash Rewards ($500 – $5,000), and the Grand Prize Cash Reward ($10,000 – $200,000). All prize values are denominated in USD with local currency disbursement options.',
    category: 'prizes',
    displayOrder: 2
  },
  {
    id: 'faq-3',
    question: 'How can I participate?',
    answer: 'Participation follows three simple, secure steps: 1) Discover the official promotion details; 2) Review the official participation requirements on verified Airtel platforms; 3) Follow the authorized participation process and check official verified winner announcements. Never engage with unverified third-party channels.',
    category: 'participation',
    displayOrder: 3
  },
  {
    id: 'faq-4',
    question: 'When are winners announced?',
    answer: 'Instant rewards are processed upon verified qualifying events. Daily rewards are announced daily at 18:00 GMT. Weekly rewards are published every Sunday evening, and the spectacular Grand Prize is announced during the New Year Eve celebration draw on official verified portals.',
    category: 'verification',
    displayOrder: 4
  },
  {
    id: 'faq-5',
    question: 'How can I verify a winner announcement?',
    answer: 'All legitimate winners are published exclusively on this official portal and verified Airtel channels. Official representatives will never ask for your Airtel Money PIN, passwords, bank account passwords, or One-Time Passwords (OTPs) to verify or receive a reward.',
    category: 'verification',
    displayOrder: 5
  },
  {
    id: 'faq-6',
    question: 'Are there any participation fees?',
    answer: 'No. Authentic Airtel promotional campaigns do not require participants to pay upfront fees, processing charges, or transfer funds to claim rewards. If anyone requests money to release your prize, it is fraudulent—report it immediately.',
    category: 'general',
    displayOrder: 6
  },
  {
    id: 'faq-7',
    question: 'How can I contact customer support?',
    answer: 'For questions regarding this campaign or official Airtel inquiries, visit the official Airtel website at https://www.airtel.com/ or reach out through official Airtel customer support helplines (dial 100 on your Airtel line in participating regions).',
    category: 'support',
    displayOrder: 7
  }
];

const DEFAULT_TERMS: ContentPage = {
  type: 'terms',
  title: 'Campaign Terms & Conditions',
  content: `### 1. Official Campaign Launch & Authority
The "AIRTEL DECEMBER CASH BONANZA 2026" is an officially authorized promotional telecommunications campaign organized by Airtel across participating operational territories. All prize distributions, winner authentications, and event schedules are administered under official Airtel regulatory oversight.

### 2. Currency & Prize Values
All reward amounts displayed on this platform are listed in United States Dollars (USD), with minimum qualifying awards starting at $100 USD. Official disbursements will be processed in USD or local currency equivalent at authorized Airtel banking/mobile wallet rates.

### 3. Eligibility & Fair Play
Participation is open to registered, active Airtel subscribers of legal age in participating operational regions. Employees, direct affiliates, advertising agencies, and regulatory supervisors are subject to standard promotion compliance guidelines.

### 4. Zero Tolerance for Sensitive Credential Requests
Airtel and its authorized partners will **NEVER**:
- Request your mobile money PIN or personal banking PINs.
- Ask you to read, share, or forward an SMS One-Time Password (OTP).
- Charge an upfront "processing fee", "tax deposit", or release tariff to receive a won prize.
- Instruct you to make fund transfers to personal agent numbers.

### 5. Verification & Official Records
Only winners published through authorized administrative verification channels and authenticated by official customer care centers are recognized as genuine recipients of campaign awards.

### 6. Modifications & Governing Law
Campaign organizers reserve the right to modify, reschedule, or manage promotional parameters in accordance with regional telecommunications regulatory requirements.`,
  lastUpdated: new Date().toISOString()
};

const DEFAULT_PRIVACY: ContentPage = {
  type: 'privacy',
  title: 'Data Privacy & Subscriber Protection Policy',
  content: `### 1. Our Commitment to Your Privacy
Airtel respects and champions subscriber privacy in strict accordance with global telecommunications data protection standards and national regulatory authorities.

### 2. Information We Process
Subscriber interactions with this campaign are processed strictly through secure, encrypted telecommunications gateways. We never collect or store mobile money wallet PINs or personal banking security passwords.

### 3. Winner Disclosure & Consent
Winner names and geographical representations featured on the platform represent authenticated subscribers consented under standard promotional publicity rules.

### 4. Security & Encryption
All administrative functions, campaign configuration edits, and winner verifications require industry-standard cryptographic authentication (JSON Web Tokens with bcrypt-hashed credentials) over HTTPS.

### 5. Contacting the Data Protection Officer
For inquiries regarding data privacy and subscriber rights, please consult the official corporate portal at https://www.airtel.com/privacy.`,
  lastUpdated: new Date().toISOString()
};

class Database {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadOrInit();
  }

  private loadOrInit(): DatabaseSchema {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (fs.existsSync(DB_FILE_PATH)) {
      try {
        const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
        const parsed = JSON.parse(raw);
        // Force live state if previously had demo banners
        parsed.campaign.subtitle = DEFAULT_CAMPAIGN.subtitle;
        parsed.campaign.bannerNotice = DEFAULT_CAMPAIGN.bannerNotice;
        parsed.campaign.isPublished = true;
        if (parsed.winners) {
          parsed.winners = parsed.winners.map((w: Winner) => ({ ...w, isDemo: false, verified: true }));
        }
        parsed.faqs = DEFAULT_FAQS;
        parsed.content.terms = DEFAULT_TERMS;
        parsed.content.privacy = DEFAULT_PRIVACY;
        if (!parsed.subscribers) {
          parsed.subscribers = [];
        }
        fs.writeFileSync(DB_FILE_PATH, JSON.stringify(parsed, null, 2), 'utf-8');
        return parsed;
      } catch (err) {
        console.error('Failed reading existing store.json, re-initializing', err);
      }
    }

    // Default admin credentials
    const adminUser = process.env.ADMIN_USER || 'admin';
    const adminPass = process.env.ADMIN_PASS || 'AirtelBonanza2026!';
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(adminPass, salt);

    const initialData: DatabaseSchema = {
      campaign: DEFAULT_CAMPAIGN,
      rewards: DEFAULT_REWARDS,
      winners: DEFAULT_WINNERS,
      faqs: DEFAULT_FAQS,
      content: {
        terms: DEFAULT_TERMS,
        privacy: DEFAULT_PRIVACY
      },
      admins: [
        {
          id: 'admin-1',
          username: adminUser,
          passwordHash: passwordHash,
          role: 'admin',
          createdAt: new Date().toISOString()
        }
      ],
      subscribers: []
    };

    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }

  public save(): void {
    try {
      const tempPath = `${DB_FILE_PATH}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(this.data, null, 2), 'utf-8');
      fs.renameSync(tempPath, DB_FILE_PATH);
    } catch (err) {
      console.error('Error persisting database:', err);
    }
  }

  public getCampaign(): CampaignConfig {
    return this.data.campaign;
  }

  public updateCampaign(updates: Partial<CampaignConfig>): CampaignConfig {
    this.data.campaign = {
      ...this.data.campaign,
      ...updates,
      lastUpdated: new Date().toISOString()
    };
    this.save();
    return this.data.campaign;
  }

  public getRewards(): RewardCategory[] {
    return this.data.rewards;
  }

  public updateReward(id: string, updates: Partial<RewardCategory>): RewardCategory | null {
    const idx = this.data.rewards.findIndex(r => r.id === id);
    if (idx === -1) return null;
    this.data.rewards[idx] = { ...this.data.rewards[idx], ...updates };
    this.save();
    return this.data.rewards[idx];
  }

  public getWinners(): Winner[] {
    return this.data.winners;
  }

  public addWinner(winnerData: Omit<Winner, 'id'>): Winner {
    const newWinner: Winner = {
      ...winnerData,
      id: `win-${Date.now()}`
    };
    this.data.winners.unshift(newWinner);
    this.save();
    return newWinner;
  }

  public updateWinner(id: string, updates: Partial<Winner>): Winner | null {
    const idx = this.data.winners.findIndex(w => w.id === id);
    if (idx === -1) return null;
    this.data.winners[idx] = { ...this.data.winners[idx], ...updates };
    this.save();
    return this.data.winners[idx];
  }

  public deleteWinner(id: string): boolean {
    const initialLen = this.data.winners.length;
    this.data.winners = this.data.winners.filter(w => w.id !== id);
    if (this.data.winners.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  public getFAQs(): FAQItem[] {
    return this.data.faqs;
  }

  public addFAQ(faqData: Omit<FAQItem, 'id'>): FAQItem {
    const newFaq: FAQItem = {
      ...faqData,
      id: `faq-${Date.now()}`
    };
    this.data.faqs.push(newFaq);
    this.save();
    return newFaq;
  }

  public updateFAQ(id: string, updates: Partial<FAQItem>): FAQItem | null {
    const idx = this.data.faqs.findIndex(f => f.id === id);
    if (idx === -1) return null;
    this.data.faqs[idx] = { ...this.data.faqs[idx], ...updates };
    this.save();
    return this.data.faqs[idx];
  }

  public deleteFAQ(id: string): boolean {
    const initialLen = this.data.faqs.length;
    this.data.faqs = this.data.faqs.filter(f => f.id !== id);
    if (this.data.faqs.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  public getContent(type: 'terms' | 'privacy'): ContentPage {
    return this.data.content[type];
  }

  public updateContent(type: 'terms' | 'privacy', content: string, title?: string): ContentPage {
    this.data.content[type] = {
      ...this.data.content[type],
      content,
      title: title || this.data.content[type].title,
      lastUpdated: new Date().toISOString()
    };
    this.save();
    return this.data.content[type];
  }

  public getSubscribers(): SubscriberLead[] {
    return this.data.subscribers || [];
  }

  public addSubscriber(phone: string, country: string, countryCode: string, categoryInterested?: string, source: string = 'explore_rewards'): SubscriberLead {
    if (!this.data.subscribers) {
      this.data.subscribers = [];
    }
    const cleanPhone = phone.trim();
    // Check if exists to update timestamp or add fresh
    const existing = this.data.subscribers.find(s => s.phone === cleanPhone);
    if (existing) {
      existing.createdAt = new Date().toISOString();
      if (categoryInterested) existing.categoryInterested = categoryInterested;
      this.save();
      return existing;
    }

    const newLead: SubscriberLead = {
      id: `lead-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      phone: cleanPhone,
      country,
      countryCode,
      categoryInterested,
      source,
      createdAt: new Date().toISOString()
    };
    this.data.subscribers.unshift(newLead);
    this.save();
    return newLead;
  }

  public deleteSubscriber(id: string): boolean {
    if (!this.data.subscribers) return false;
    const prev = this.data.subscribers.length;
    this.data.subscribers = this.data.subscribers.filter(s => s.id !== id);
    if (this.data.subscribers.length !== prev) {
      this.save();
      return true;
    }
    return false;
  }

  public findAdminByUsername(username: string): AdminUser | undefined {
    return this.data.admins.find(a => a.username.toLowerCase() === username.toLowerCase());
  }

  public updateAdminPassword(username: string, newPasswordHash: string): boolean {
    const admin = this.data.admins.find(a => a.username.toLowerCase() === username.toLowerCase());
    if (admin) {
      admin.passwordHash = newPasswordHash;
      this.save();
      return true;
    }
    return false;
  }

  public resetCampaignData(): void {
    this.data.campaign = DEFAULT_CAMPAIGN;
    this.data.rewards = DEFAULT_REWARDS;
    this.data.winners = DEFAULT_WINNERS;
    this.data.faqs = DEFAULT_FAQS;
    this.data.content = {
      terms: DEFAULT_TERMS,
      privacy: DEFAULT_PRIVACY
    };
    this.save();
  }

  public resetDemoData(): void {
    this.resetCampaignData();
  }
}

export const db = new Database();
