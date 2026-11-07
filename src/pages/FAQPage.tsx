import React from 'react';
import { FAQSection } from '../components/home/FAQSection';

export const FAQPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      <FAQSection isFullPage={true} />
    </div>
  );
};
