import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCampaign } from '../context/CampaignContext';
import { AdminLoginPage } from './AdminLoginPage';
import { CampaignSettingsTab } from '../components/admin/CampaignSettingsTab';
import { RewardsManagerTab } from '../components/admin/RewardsManagerTab';
import { WinnersManagerTab } from '../components/admin/WinnersManagerTab';
import { FaqManagerTab } from '../components/admin/FaqManagerTab';
import { ContentEditorTab } from '../components/admin/ContentEditorTab';
import { BannerManagerTab } from '../components/admin/BannerManagerTab';
import { SubscribersManagerTab } from '../components/admin/SubscribersManagerTab';
import { fetchStats, resetDemoData } from '../services/api';
import { DashboardStats } from '../types';
import {
  Shield,
  Settings,
  Gift,
  Trophy,
  HelpCircle,
  FileText,
  Image,
  LogOut,
  ExternalLink,
  RotateCcw,
  Clock,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Eye,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

type ActiveTab = 'settings' | 'subscribers' | 'rewards' | 'winners' | 'faqs' | 'content' | 'banners';

export const AdminPage: React.FC = () => {
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();
  const { campaign, rewards, refreshCampaign } = useCampaign();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('settings');
  const [resetting, setResetting] = useState(false);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  const loadStats = async () => {
    try {
      const data = await fetchStats();
      setStats(data);
    } catch (err) {
      console.error('Stats error:', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadStats();
    }
  }, [isAuthenticated, campaign]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center text-white">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-airtel-red border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-wider text-stone-400 font-bold">Verifying Administrator Session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLoginPage />;
  }

  const handleResetDemo = async () => {
    if (!window.confirm('Reset campaign data, categories, verified winners, and FAQs to official initial baseline?')) {
      return;
    }

    setResetting(true);
    setResetMessage(null);

    try {
      await resetDemoData();
      await refreshCampaign();
      await loadStats();
      setResetMessage('Official campaign baseline restored successfully!');
      setTimeout(() => setResetMessage(null), 4000);
    } catch (err: any) {
      alert('Failed to reset campaign data: ' + err.message);
    } finally {
      setResetting(false);
    }
  };

  const navTabs = [
    { id: 'subscribers', label: 'Phone Leads', icon: <Users className="w-4 h-4 text-airtel-red" /> },
    { id: 'settings', label: 'Campaign Settings', icon: <Settings className="w-4 h-4" /> },
    { id: 'rewards', label: 'Prize Categories', icon: <Gift className="w-4 h-4" /> },
    { id: 'winners', label: 'Verified Winners', icon: <Trophy className="w-4 h-4" /> },
    { id: 'faqs', label: 'FAQs Manager', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'content', label: 'Terms & Privacy', icon: <FileText className="w-4 h-4" /> },
    { id: 'banners', label: 'Banners & Creative', icon: <Image className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-stone-100/90 text-stone-900">
      
      {/* Top Admin Navigation Header */}
      <header className="bg-stone-950 text-white border-b border-stone-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left: Brand & Dashboard Indicator */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-airtel-red text-white flex items-center justify-center font-bold shadow">
                <Shield className="w-5 h-5 text-gold" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm tracking-tight text-white uppercase font-display">
                    Airtel Bonanza Admin
                  </span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-red-950 border border-red-800 text-gold">
                    2026
                  </span>
                </div>
                <span className="text-[10px] text-stone-400">Authenticated Administrator</span>
              </div>
            </div>

            {/* Right: Actions & User Info */}
            <div className="flex items-center gap-3">
              <Link
                to="/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-stone-200 transition"
                title="Open public website in new tab"
              >
                <span>Live Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={handleResetDemo}
                disabled={resetting}
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 transition disabled:opacity-50"
                title="Restore default campaign data baseline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{resetting ? 'Resetting...' : 'Reset Defaults'}</span>
              </button>

              <button
                onClick={logout}
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-red-900/40 text-red-300 hover:bg-red-900/60 transition"
                title="Sign out of administration"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Reset Feedback Notification */}
        {resetMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{resetMessage}</span>
          </div>
        )}

        {/* Dashboard Analytics & Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Card 0: Captured Phone Leads */}
          <div
            onClick={() => setActiveTab('subscribers')}
            className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-airtel-red transition"
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                Phone Leads
              </span>
              <span className="text-xl font-black text-airtel-red font-display mt-0.5 block">
                {stats?.subscribersCount ?? 0} Recorded
              </span>
              <span className="text-[10px] text-stone-400">
                Click to view numbers
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-airtel-red flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          {/* Card 1: Status */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                Campaign Status
              </span>
              <span className="text-xl font-black text-stone-900 font-display mt-0.5 block">
                {campaign?.isPublished ? 'PUBLIC & LIVE' : 'DRAFT MODE'}
              </span>
              <span className="text-[10px] text-stone-400">
                {campaign?.isPublished ? 'Accessible to visitors' : 'Restricted preview'}
              </span>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${campaign?.isPublished ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
              <Eye className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Total Max Prize Pool */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                Max Prize Value
              </span>
              <span className="text-xl font-black text-airtel-red font-display mt-0.5 block">
                ${stats?.totalPrizePoolMax.toLocaleString() || '206,500'} USD
              </span>
              <span className="text-[10px] text-stone-400">
                Starting from $100 min
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-airtel-red flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Verified Winners */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                Verified Winners
              </span>
              <span className="text-xl font-black text-stone-900 font-display mt-0.5 block">
                {stats?.verifiedWinnersCount || 7} Published
              </span>
              <span className="text-[10px] text-stone-400">
                ${stats?.totalPrizesAwardedUSD.toLocaleString() || '44,300'} USD total awarded
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-gold-dark" />
            </div>
          </div>

          {/* Card 4: Countdown Target */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                Campaign Countdown
              </span>
              <span className="text-xl font-black text-stone-900 font-display mt-0.5 block">
                {stats?.hasEnded ? 'Campaign Ended' : `${stats?.daysLeft || 0} Days Remaining`}
              </span>
              <span className="text-[10px] text-stone-400">
                Closes {campaign?.closingDate ? new Date(campaign.closingDate).toLocaleDateString() : 'Dec 31, 2026'}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200">
          {navTabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  active
                    ? 'bg-airtel-red text-white shadow-md shadow-airtel-red/20'
                    : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-50 border border-stone-200'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm">
          {activeTab === 'subscribers' && (
            <SubscribersManagerTab />
          )}

          {campaign && activeTab === 'settings' && (
            <CampaignSettingsTab campaign={campaign} onRefresh={refreshCampaign} />
          )}

          {activeTab === 'rewards' && (
            <RewardsManagerTab rewards={rewards} onRefresh={refreshCampaign} />
          )}

          {activeTab === 'winners' && (
            <WinnersManagerTab />
          )}

          {activeTab === 'faqs' && (
            <FaqManagerTab />
          )}

          {activeTab === 'content' && (
            <ContentEditorTab />
          )}

          {campaign && activeTab === 'banners' && (
            <BannerManagerTab campaign={campaign} onRefresh={refreshCampaign} />
          )}
        </div>

      </main>
    </div>
  );
};

