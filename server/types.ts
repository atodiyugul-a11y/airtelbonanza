export interface CampaignConfig {
  id: string;
  title: string;
  subtitle: string;
  headline: string;
  subheadline: string;
  badgeText: string;
  minPrizeUSD: number;
  currency: string;
  startDate: string; // ISO 8601
  closingDate: string; // ISO 8601
  isPublished: boolean;
  bannerNotice: string;
  bannerNoticeEnabled: boolean;
  activeBannerUrl?: string;
  lastUpdated: string;
}

export interface RewardCategory {
  id: string;
  title: string;
  prizeRangeDisplay: string;
  minAmount: number;
  maxAmount: number;
  description: string;
  buttonText: string;
  enabled: boolean;
  iconName: string;
  badgeTag: string;
  drawFrequency: string;
  eligibilityNote: string;
}

export interface Winner {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  prizeCategory: string; // e.g. "Instant Cash Rewards", "Daily Cash Rewards", "Weekly Cash Rewards", "Grand Prize"
  prizeAmount: number;
  dateAnnounced: string; // YYYY-MM-DD
  ticketOrRefNumber: string;
  isDemo: boolean;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'prizes' | 'participation' | 'verification' | 'support';
  displayOrder: number;
}

export interface ContentPage {
  type: 'terms' | 'privacy';
  title: string;
  content: string; // Markdown or rich formatted text
  lastUpdated: string;
}

export interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
  role: 'admin' | 'editor';
  createdAt: string;
}

export interface SubscriberLead {
  id: string;
  phone: string;
  country: string;
  countryCode: string;
  categoryInterested?: string;
  source: string;
  createdAt: string;
}

export interface DatabaseSchema {
  campaign: CampaignConfig;
  rewards: RewardCategory[];
  winners: Winner[];
  faqs: FAQItem[];
  content: Record<'terms' | 'privacy', ContentPage>;
  admins: AdminUser[];
  subscribers?: SubscriberLead[];
}

