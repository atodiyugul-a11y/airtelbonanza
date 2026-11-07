export interface CampaignConfig {
  id: string;
  title: string;
  subtitle: string;
  headline: string;
  subheadline: string;
  badgeText: string;
  minPrizeUSD: number;
  currency: string;
  startDate: string;
  closingDate: string;
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
  prizeCategory: string;
  prizeAmount: number;
  dateAnnounced: string;
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
  content: string;
  lastUpdated: string;
}

export interface AdminUser {
  id: string;
  username: string;
  role: string;
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

export interface DashboardStats {
  isPublished: boolean;
  activeCategories: number;
  totalCategories: number;
  verifiedWinnersCount: number;
  totalPrizesAwardedUSD: number;
  totalPrizePoolMax: number;
  daysLeft: number;
  hasEnded: boolean;
  faqCount: number;
  subscribersCount?: number;
  lastUpdated: string;
}

