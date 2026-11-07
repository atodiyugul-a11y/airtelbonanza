import React, { useState, useEffect } from 'react';
import { fetchSubscribers, deleteSubscriber } from '../../services/api';
import { SubscriberLead } from '../../types';
import { Phone, Trash2, Download, Search, RefreshCw, Calendar, Globe, Tag, ShieldCheck } from 'lucide-react';

export const SubscribersManagerTab: React.FC = () => {
  const [subscribers, setSubscribers] = useState<SubscriberLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchSubscribers();
      setSubscribers(data);
    } catch (err) {
      console.error('Failed to load subscribers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string, phone: string) => {
    if (!window.confirm(`Delete subscriber ${phone} from recorded entries?`)) return;
    try {
      setDeletingId(id);
      await deleteSubscriber(id);
      setSubscribers(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete subscriber.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleExportCSV = () => {
    if (subscribers.length === 0) return;
    const headers = ['ID', 'Phone Number', 'Country', 'Country Code', 'Category Interested', 'Source', 'Registered At'];
    const rows = subscribers.map(s => [
      `"${s.id}"`,
      `"${s.phone}"`,
      `"${s.country}"`,
      `"${s.countryCode}"`,
      `"${s.categoryInterested || 'All Rewards'}"`,
      `"${s.source}"`,
      `"${s.createdAt}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `airtel-subscribers-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = subscribers.filter(s =>
    s.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.categoryInterested && s.categoryInterested.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black uppercase text-stone-900 font-display">
              Registered Subscriber Leads
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-airtel-red border border-rose-200">
              {subscribers.length} Captured
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Mobile numbers submitted by users when clicking "Explore Rewards" or checking eligibility.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            disabled={loading}
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition"
            title="Refresh list"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleExportCSV}
            disabled={subscribers.length === 0}
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-airtel-red text-white text-xs font-semibold uppercase tracking-wider transition disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by phone, country, or category..."
          className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-airtel-red"
        />
      </div>

      {/* Subscribers Table */}
      {loading ? (
        <div className="py-16 text-center text-stone-400 text-sm">
          Loading subscriber phone records...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center bg-stone-50 rounded-2xl border border-stone-200 p-8 space-y-2">
          <Phone className="w-10 h-10 text-stone-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-stone-700">No Subscriber Records Found</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            {searchQuery
              ? 'No subscribers matched your search filter.'
              : 'When visitors click "Explore Rewards" and enter their phone numbers, they will appear here in real-time.'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-stone-50 border-b border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-500">
              <tr>
                <th className="py-3 px-4">Phone Number</th>
                <th className="py-3 px-4">Country</th>
                <th className="py-3 px-4">Interest / Source</th>
                <th className="py-3 px-4">Registered Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 bg-white">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-rose-50/20 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                    <span className="inline-flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-airtel-red" />
                      {item.phone}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">
                    <span className="inline-flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-stone-400" />
                      {item.country} ({item.countryCode})
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-700">
                      <Tag className="w-3 h-3 text-stone-400" />
                      {item.categoryInterested || 'Explore Rewards'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-stone-500 text-xs">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDelete(item.id, item.phone)}
                      disabled={deletingId === item.id}
                      type="button"
                      className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer Info */}
      <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-stone-600 leading-relaxed">
          <strong className="text-stone-800">Administrator Data Notice:</strong> Subscriber numbers captured through "Explore Cash Rewards" are stored strictly in the persistent campaign database and can be used to reach qualifying participants for official Airtel December Bonanza draws.
        </p>
      </div>
    </div>
  );
};

