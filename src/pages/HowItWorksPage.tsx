import React from 'react';
import { Search, FileText, CheckCircle2, ShieldAlert, ArrowRight, CheckCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Discover the Promotion',
      desc: 'Understand the campaign purpose, prize structure, and schedule.',
      details: [
        'Four reward tiers from $500 up to $200,000 USD — instant, daily, weekly, and grand prize.',
        'Prizes are announced throughout December across all participating Airtel networks.',
        'Familiarize yourself with this portal and authorized Airtel communications channels.',
      ],
      icon: <Search className="w-6 h-6 text-airtel-red" />,
    },
    {
      step: '02',
      title: 'Review Participation Requirements',
      desc: 'Check authorized eligibility criteria and regional regulatory guidelines.',
      details: [
        'Review official participation terms published on verified Airtel platforms only.',
        'Ensure compliance with local telecommunications subscriber regulations.',
        'No upfront fees or account charges are required to qualify or claim any prize.',
      ],
      icon: <FileText className="w-6 h-6 text-airtel-red" />,
    },
    {
      step: '03',
      title: 'Follow the Authorized Process',
      desc: 'Participate through approved channels and check authenticated results.',
      details: [
        'Engage only through officially sanctioned Airtel processes.',
        'Winners are announced and grand prize is disbursed on December 25, 2026.',
        'Await official contact from recognized Airtel customer support — never from third parties.',
      ],
      icon: <CheckCircle2 className="w-6 h-6 text-airtel-red" />,
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-airtel-red mb-3">Official Guide</p>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight font-display mb-4">
            How It Works
          </h1>
          <p className="text-stone-500 text-sm leading-relaxed">
            The Airtel December Cash Bonanza 2026 operates on a simple, transparent three-step journey.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-5 mb-10">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 flex flex-col md:flex-row items-start gap-6"
            >
              {/* Step marker */}
              <div className="flex-shrink-0 flex md:flex-col items-center gap-4 md:gap-3 md:w-20 md:text-center">
                <span className="text-4xl font-black text-stone-100 font-display leading-none select-none">
                  {item.step}
                </span>
                <div className="w-11 h-11 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center">
                  {item.icon}
                </div>
              </div>

              {/* Content */}
              <div className="flex-grow space-y-4">
                <div>
                  <h2 className="text-lg font-bold text-stone-900 mb-1">{item.title}</h2>
                  <p className="text-sm text-stone-500">{item.desc}</p>
                </div>
                <div className="bg-stone-50 rounded-lg border border-stone-200 p-4 space-y-2.5">
                  {item.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-3 text-sm text-stone-600">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Anti-Fraud Section */}
        <div id="safety" className="rounded-xl bg-stone-900 text-white p-7 sm:p-10 border border-stone-700">
          <div className="flex items-center gap-2 mb-5">
            <ShieldAlert className="w-5 h-5 text-red-400 flex-shrink-0" />
            <h3 className="text-base font-bold text-white">Consumer Protection Notice</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-7">
            {[
              { bad: true, label: 'Never share your PIN', desc: 'Airtel will never ask for your Airtel Money PIN or ATM PIN.' },
              { bad: true, label: 'Never share OTPs', desc: 'Do not disclose one-time passwords sent to your phone to anyone.' },
              { bad: true, label: 'No upfront claim fees', desc: 'Authentic Airtel campaigns never require payment to release rewards.' },
              { bad: false, label: 'Official channels only', desc: 'Only consult airtel.com or the Verified Winners page for results.' },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-1">
                <span className={`font-semibold block text-sm ${item.bad ? 'text-red-400' : 'text-emerald-400'}`}>
                  {item.bad ? '✕' : '✓'} {item.label}
                </span>
                <p className="text-stone-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/winners"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-stone-900 font-semibold text-xs uppercase tracking-wider hover:bg-gold transition-colors"
            >
              Check Verified Winners
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="https://www.airtel.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-colors border border-white/20"
            >
              Official Airtel Website
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
