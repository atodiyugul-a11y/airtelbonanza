import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CampaignConfig, RewardCategory } from '../types';
import { fetchCampaign, fetchRewards } from '../services/api';

interface CampaignContextType {
  campaign: CampaignConfig | null;
  rewards: RewardCategory[];
  loading: boolean;
  error: string | null;
  refreshCampaign: () => Promise<void>;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [campaign, setCampaign] = useState<CampaignConfig | null>(null);
  const [rewards, setRewards] = useState<RewardCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [campData, rewData] = await Promise.all([
        fetchCampaign(),
        fetchRewards(false)
      ]);
      setCampaign(campData);
      setRewards(rewData);
    } catch (err: any) {
      console.error('Error loading campaign data:', err);
      setError(err.message || 'Failed to initialize campaign data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <CampaignContext.Provider
      value={{
        campaign,
        rewards,
        loading,
        error,
        refreshCampaign: loadData
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = () => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
};

