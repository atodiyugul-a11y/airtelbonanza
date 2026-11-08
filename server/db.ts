import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { DatabaseSchema, CampaignConfig, RewardCategory, Winner, FAQItem, ContentPage, AdminUser, SubscriberLead } from './types.js';

dotenv.config();

const DB_FILE_PATH = path.resolve(process.cwd(), 'server', 'data', 'store.json');

const DEFAULT_CAMPAIGN: CampaignConfig = {
  id: 'airtel-bonanza-2026',
  title: 'AIRTEL GRANDE TOMBOLA CASH DE DÉCEMBRE 2026',
  subtitle: 'Campagne Promotionnelle Festive Officielle de Récompenses Airtel',
  headline: 'CE DÉCEMBRE, VOTRE CHANCE POURRAIT VOUS RAPPORTER GROS !',
  subheadline: 'Célébrez les fêtes de fin d'année avec des opportunités uniques de remporter des prix exceptionnels en espèces. Découvrez des récompenses instantanées, des surprises quotidiennes, des tirages hebdomadaires et un grand jackpot spectaculaire.',
  badgeText: 'RÉCOMPENSES EN CASH À PARTIR DE 500 $',
  minPrizeUSD: 500,
  currency: 'USD',
  startDate: '2026-12-01T00:00:00.000Z',
  closingDate: '2026-12-25T23:59:59.000Z',
  isPublished: true,
  bannerNotice: '🎄 PROMOTION OFFICIELLE AIRTEL : Clôture le 25 décembre 2026. Grand Prix de 200 000 $ USD tiré et distribué le jour de Noël !',
  bannerNoticeEnabled: true,
  activeBannerUrl: '/banners/festive-hero.jpg',
  lastUpdated: new Date().toISOString()
};

const DEFAULT_REWARDS: RewardCategory[] = [
  {
    id: 'instant',
    title: 'Récompenses Cash Instantanées',
    prizeRangeDisplay: '500 $ – 1 000 $',
    minAmount: 500,
    maxAmount: 1000,
    description: 'Des opportunités uniques de gains en cash instantanés.',
    buttonText: 'EXPLORER LES PRIX',
    enabled: true,
    iconName: 'Zap',
    badgeTag: 'Surprise Instantanée',
    drawFrequency: 'Attribué lors des interactions éligibles',
    eligibilityNote: 'Soumis aux critères et conditions officielles de participation.'
  },
  {
    id: 'daily',
    title: 'Récompenses Cash Quotidiennes',
    prizeRangeDisplay: '1 000 $ – 5 000 $',
    minAmount: 1000,
    maxAmount: 5000,
    description: 'Découvrez des opportunités passionnantes de récompenses chaque jour.',
    buttonText: 'VOIR LES PRIX DU JOUR',
    enabled: true,
    iconName: 'Clock',
    badgeTag: 'Chaque Jour',
    drawFrequency: 'Annoncé chaque jour à 18h00 GMT',
    eligibilityNote: 'Les participations éligibles se réinitialisent chaque minuit.'
  },
  {
    id: 'weekly',
    title: 'Récompenses Cash Hebdomadaires',
    prizeRangeDisplay: '5 000 $ – 10 000 $',
    minAmount: 5000,
    maxAmount: 10000,
    description: 'Célébrez la semaine avec d'importantes cagnottes en cash.',
    buttonText: 'VOIR LES PRIX DE LA SEMAINE',
    enabled: true,
    iconName: 'Sparkles',
    badgeTag: 'Célébration du Week-end',
    drawFrequency: 'Annoncé chaque dimanche soir',
    eligibilityNote: 'Participation cumulée tout au long de la semaine civile.'
  },
  {
    id: 'grand',
    title: 'Grand Prix de Noël',
    prizeRangeDisplay: '50 000 $ – 200 000 $',
    minAmount: 50000,
    maxAmount: 200000,
    description: 'Découvrez le jackpot ultime de la tombola de décembre.',
    buttonText: 'VOIR LE GRAND PRIX',
    enabled: true,
    iconName: 'Trophy',
    badgeTag: 'Jackpot Ultime de Décembre',
    drawFrequency: 'Grand Tirage de Noël — 25 Décembre 2026',
    eligibilityNote: 'Le gagnant du Grand Prix sera annoncé et récompensé le 25 Décembre 2026.'
  }
];

const DEFAULT_WINNERS: Winner[] = [
  {
    id: 'win-1',
    name: 'Amina Mwangi',
    country: 'Kenya',
    countryCode: 'KE',
    prizeCategory: 'Récompenses Cash Quotidiennes',
    prizeAmount: 2500,
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
    prizeCategory: 'Récompenses Cash Instantanées',
    prizeAmount: 750,
    dateAnnounced: '2026-12-06',
    ticketOrRefNumber: 'BONANZA-GH-3109',
    isDemo: false,
    verified: true
  },
  {
    id: 'win-3',
    name: 'Fatou Diop',
    country: 'Sénégal',
    countryCode: 'SN',
    prizeCategory: 'Récompenses Cash Hebdomadaires',
    prizeAmount: 6500,
    dateAnnounced: '2026-12-08',
    ticketOrRefNumber: 'BONANZA-SN-7721',
    isDemo: false,
    verified: true
  },
  {
    id: 'win-4',
    name: 'Brian Chikwanda',
    country: 'Zambie',
    countryCode: 'ZM',
    prizeCategory: 'Récompenses Cash Quotidiennes',
    prizeAmount: 3500,
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
    prizeCategory: 'Récompenses Cash Instantanées',
    prizeAmount: 850,
    dateAnnounced: '2026-12-12',
    ticketOrRefNumber: 'BONANZA-NG-1154',
    isDemo: false,
    verified: true
  },
  {
    id: 'win-6',
    name: 'David Kigozi',
    country: 'Ouganda',
    countryCode: 'UG',
    prizeCategory: 'Récompenses Cash Hebdomadaires',
    prizeAmount: 8500,
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
    prizeCategory: 'Grand Prix de Noël',
    prizeAmount: 125000,
    dateAnnounced: '2026-12-25',
    ticketOrRefNumber: 'BONANZA-ZW-0012',
    isDemo: false,
    verified: true
  }
];

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: "Qu'est-ce que la Grande Tombola Cash de Décembre d'Airtel ?",
    answer: "La Grande Tombola Cash de Décembre 2026 d'Airtel est une campagne promotionnelle festive officielle organisée par Airtel pour récompenser ses abonnés à travers les réseaux participants, avec des prix en espèces allant de 500 $ à 200 000 $ USD durant le mois de décembre.",
    category: 'general',
    displayOrder: 1
  },
  {
    id: 'faq-2',
    question: "Quels sont les prix en espèces disponibles ?",
    answer: "Quatre catégories de prix officielles sont proposées : Récompenses Instantanées (500 $ – 1 000 $), Récompenses Quotidiennes (1 000 $ – 5 000 $), Récompenses Hebdomadaires (5 000 $ – 10 000 $) et le Grand Prix de Noël (50 000 $ – 200 000 $). Tous les montants sont libellés en USD avec versement équivalent en devise locale via Airtel Money ou compte bancaire.",
    category: 'prizes',
    displayOrder: 2
  },
  {
    id: 'faq-3',
    question: "Comment participer à la tombola ?",
    answer: "La participation s'effectue en trois étapes simples et sécurisées : 1) Découvrez les détails de la promotion officielle ; 2) Consultez les critères d'éligibilité sur les plateformes officielles Airtel ; 3) Suivez le processus autorisé et surveillez la publication officielle des gagnants vérifiés. Ne faites jamais confiance aux canaux tiers non officiels.",
    category: 'participation',
    displayOrder: 3
  },
  {
    id: 'faq-4',
    question: "Quand les gagnants sont-ils annoncés ?",
    answer: "Les récompenses instantanées sont traitées dès la validation de l'interaction éligible. Les récompenses quotidiennes sont annoncées chaque jour à 18h00 GMT. Les gagnants hebdomadaires sont publiés chaque dimanche soir, et le Grand Prix de Noël sera tiré et distribué le 25 Décembre 2026 sur nos plateformes certifiées.",
    category: 'verification',
    displayOrder: 4
  },
  {
    id: 'faq-5',
    question: "Comment vérifier l'authenticité d'un gagnant ou d'une notification ?",
    answer: "Tous les gagnants légitimes sont répertoriés exclusivement sur ce portail officiel et sur les canaux certifiés d'Airtel. Aucun agent Airtel ne vous demandera JAMAIS votre code PIN Airtel Money, mot de passe ou code de sécurité OTP reçu par SMS.",
    category: 'verification',
    displayOrder: 5
  },
  {
    id: 'faq-6',
    question: "Y a-t-il des frais à payer pour recevoir un prix ?",
    answer: "NON. Les promotions officielles d'Airtel sont entièrement gratuites pour les gagnants. Aucun frais d'enregistrement, taxe préalable ou commission n'est requis pour débloquer votre gain. Si quelqu'un vous réclame de l'argent, c'est une arnaque : signalez-le sans attendre.",
    category: 'general',
    displayOrder: 6
  },
  {
    id: 'faq-7',
    question: "Comment contacter le service client officiel d'Airtel ?",
    answer: "Pour toute demande concernant cette promotion ou les services Airtel, rendez-vous sur le site officiel https://www.airtel.com/ ou joignez le service client Airtel en composant le 100 depuis votre ligne mobile Airtel dans les pays participants.",
    category: 'support',
    displayOrder: 7
  }
];

const DEFAULT_TERMS: ContentPage = {
  type: 'terms',
  title: 'Conditions Générales de la Campagne',
  content: `### 1. Autorité et Lancement Officiel de la Campagne
La « GRANDE TOMBOLA CASH DE DÉCEMBRE 2026 D'AIRTEL » est une campagne promotionnelle de télécommunications officiellement autorisée et organisée par Airtel à travers ses territoires opérationnels participants. Toutes les attributions de prix, l'authentification des gagnants et le calendrier des événements sont placés sous le contrôle réglementaire officiel d'Airtel.

### 2. Devises et Valeur des Prix
Tous les montants de récompenses affichés sur cette plateforme sont libellés en dollars américains (USD), avec des prix admissibles débutant à partir de 500 $ USD jusqu'à 200 000 $ USD. Les versements officiels seront effectués en USD ou en devise locale équivalente au taux officiel agréé via Airtel Money ou virement bancaire.

### 3. Éligibilité et Équité
La participation est réservée aux abonnés Airtel actifs, régulièrement enregistrés et majeurs dans les pays d'opération participants. Les employés d'Airtel, leurs filiales directes, leurs agences de communication et les régulateurs sont soumis aux directives standard de conformité promotionnelle.

### 4. Tolérance Zéro pour les Demandes de Données Confidentielles
Airtel et ses partenaires agréés ne vous demanderont **JAMAIS** :
- Votre code PIN Airtel Money ou vos codes bancaires personnels.
- De lire, partager ou transférer un code de validation à usage unique (OTP) reçu par SMS.
- De régler des « frais de dossier », « taxes de déblocage » ou acomptes préalables pour percevoir un gain.
- D'effectuer un transfert d'argent vers le compte privé d'un agent.

### 5. Vérification et Registre Officiel
Seuls les gagnants publiés via nos canaux administratifs autorisés et authentifiés par les centres de service client officiels sont reconnus comme bénéficiaires légitimes de la campagne.

### 6. Modifications et Droit Applicable
Les organisateurs de la campagne se réservent le droit d'adapter, de reprogrammer ou de gérer les paramètres promotionnels conformément aux exigences réglementaires des télécommunications régionales.`,
  lastUpdated: new Date().toISOString()
};

const DEFAULT_PRIVACY: ContentPage = {
  type: 'privacy',
  title: 'Politique de Confidentialité et Protection des Abonnés',
  content: `### 1. Notre Engagement pour Votre Confidentialité
Airtel respecte et protège la vie privée de ses abonnés en stricte conformité avec les normes internationales de protection des données de télécommunications et les réglementations nationales.

### 2. Données Traitées
Les interactions des abonnés avec cette promotion sont traitées exclusivement via des passerelles de télécommunications sécurisées et chiffrées. Nous ne collectons ni ne stockons jamais vos codes PIN Airtel Money ou mots de passe bancaires.

### 3. Divulgation des Gagnants et Consentement
Les noms et pays des gagnants affichés sur le portail représentent des abonnés authentifiés ayant consenti aux règles standard de publicité promotionnelle.

### 4. Sécurité et Chiffrement
Toutes les fonctions administratives, modifications de configuration et vérifications requièrent une authentification cryptographique conforme aux normes de l'industrie (JSON Web Tokens et hachage bcrypt) sur protocole HTTPS.

### 5. Contacter le Délégué à la Protection des Données
Pour toute question relative à la confidentialité des données et aux droits des abonnés, veuillez consulter le portail officiel de l'entreprise sur https://www.airtel.com/privacy.`,
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
