import { CampaignConfig, RewardCategory, Winner, FAQItem, ContentPage, DashboardStats, AdminUser, SubscriberLead } from '../types';

const API_BASE = '/api';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('airtel_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

// Campaign APIs
export async function fetchCampaign(): Promise<CampaignConfig> {
  const res = await fetch(`${API_BASE}/campaign`);
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Échec de la récupération de la configuration");
  return data.campaign;
}

export async function updateCampaign(updates: Partial<CampaignConfig>): Promise<CampaignConfig> {
  const res = await fetch(`${API_BASE}/campaign`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates)
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Échec de la mise à jour de la campagne");
  return data.campaign;
}

export async function fetchStats(): Promise<DashboardStats> {
  const res = await fetch(`${API_BASE}/campaign/stats`, {
    headers: getAuthHeaders()
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Échec de la récupération des statistiques");
  return data.stats;
}

export async function resetDemoData(): Promise<void> {
  const res = await fetch(`${API_BASE}/campaign/reset`, {
    method: 'POST',
    headers: getAuthHeaders()
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Échec de la réinitialisation des données");
}

// Rewards APIs
export async function fetchRewards(showAll = false): Promise<RewardCategory[]> {
  const res = await fetch(`${API_BASE}/rewards?all=${showAll}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Échec de la récupération des récompenses");
  return data.rewards;
}

export async function updateReward(id: string, updates: Partial<RewardCategory>): Promise<RewardCategory> {
  const res = await fetch(`${API_BASE}/rewards/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates)
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Échec de la mise à jour de la récompense");
  return data.reward;
}

// Winners APIs
export async function fetchWinners(category = 'all', search = ''): Promise<Winner[]> {
  const params = new URLSearchParams();
  if (category && category !== 'all') params.append('category', category);
  if (search) params.append('search', search);

  const res = await fetch(`${API_BASE}/winners?${params.toString()}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Échec de la récupération des gagnants");
  return data.winners;
}

export async function addWinner(winner: Omit<Winner, 'id'>): Promise<Winner> {
  const res = await fetch(`${API_BASE}/winners`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(winner)
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Échec de l'ajout du gagnant");
  return data.winner;
}

export async function updateWinner(id: string, updates: Partial<Winner>): Promise<Winner> {
  const res = await fetch(`${API_BASE}/winners/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates)
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Échec de la mise à jour du gagnant");
  return data.winner;
}

export async function deleteWinner(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/winners/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Échec de la suppression du gagnant");
}

// FAQs APIs
export async function fetchFAQs(): Promise<FAQItem[]> {
  const res = await fetch(`${API_BASE}/faqs`);
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Échec de la récupération des FAQs");
  return data.faqs;
}

export async function addFAQ(faq: Omit<FAQItem, 'id'>): Promise<FAQItem> {
  const res = await fetch(`${API_BASE}/faqs`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(faq)
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Échec de l'ajout de la FAQ");
  return data.faq;
}

export async function updateFAQ(id: string, updates: Partial<FAQItem>): Promise<FAQItem> {
  const res = await fetch(`${API_BASE}/faqs/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates)
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Échec de la mise à jour de la FAQ");
  return data.faq;
}

export async function deleteFAQ(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/faqs/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Échec de la suppression de la FAQ");
}

// Content APIs
export async function fetchContent(type: 'terms' | 'privacy'): Promise<ContentPage> {
  const res = await fetch(`${API_BASE}/content/${type}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.message || `Échec de la récupération de ${type}`);
  return data.page;
}

export async function updateContent(type: 'terms' | 'privacy', content: string, title?: string): Promise<ContentPage> {
  const res = await fetch(`${API_BASE}/content/${type}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ content, title })
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || `Échec de la mise à jour de ${type}`);
  return data.page;
}

// Auth APIs
export async function loginAdmin(username: string, password: string): Promise<{ token: string; user: AdminUser }> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Nom d'utilisateur ou mot de passe incorrect");
  return { token: data.token, user: data.user };
}

export async function verifyAuth(): Promise<AdminUser> {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: getAuthHeaders()
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Session expirée");
  return data.user;
}

// Subscriber Leads APIs
export async function registerSubscriber(phone: string, countryCode: string, category?: string): Promise<{ success: boolean; message: string; subscriber: SubscriberLead }> {
  const res = await fetch(`${API_BASE}/entry/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, countryCode, category })
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Échec de l'enregistrement");
  return data;
}

export async function fetchSubscribers(): Promise<SubscriberLead[]> {
  const res = await fetch(`${API_BASE}/entry/subscribers`, {
    headers: getAuthHeaders()
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Échec de la récupération des abonnés");
  return data.subscribers || [];
}

export async function deleteSubscriber(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/entry/subscribers/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Échec de la suppression de l'abonné");
}
