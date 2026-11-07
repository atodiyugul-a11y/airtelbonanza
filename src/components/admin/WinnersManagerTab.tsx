import React, { useState, useEffect } from 'react';
import { Winner } from '../../types';
import { fetchWinners, addWinner, updateWinner, deleteWinner } from '../../services/api';
import { UserCheck, Plus, Edit2, Trash2, CheckCircle, AlertCircle, X, Trophy, Search, Download } from 'lucide-react';

export const WinnersManagerTab: React.FC = () => {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingWinner, setEditingWinner] = useState<Winner | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formCountry, setFormCountry] = useState('Kenya');
  const [formCountryCode, setFormCountryCode] = useState('KE');
  const [formCategory, setFormCategory] = useState('Daily Cash Rewards');
  const [formAmount, setFormAmount] = useState<number>(500);
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [formRef, setFormRef] = useState('');
  const [formIsDemo, setFormIsDemo] = useState(false);
  const [formVerified, setFormVerified] = useState(true);

  const loadWinners = async () => {
    try {
      setLoading(true);
      const data = await fetchWinners('all');
      setWinners(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWinners();
  }, []);

  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Country', 'Country_Code', 'Category', 'Prize_Amount_USD', 'Date_Announced', 'Reference_Code', 'Status'];
    const rows = winners.map(w => [
      w.id,
      `"${w.name}"`,
      `"${w.country}"`,
      w.countryCode,
      `"${w.prizeCategory}"`,
      w.prizeAmount,
      w.dateAnnounced,
      w.ticketOrRefNumber,
      'Officially Verified'
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Airtel_Bonanza_Winners_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openAddModal = () => {
    setEditingWinner(null);
    setFormName('');
    setFormCountry('Kenya');
    setFormCountryCode('KE');
    setFormCategory('Daily Cash Rewards');
    setFormAmount(500);
    setFormDate(new Date().toISOString().split('T')[0]);
    setFormRef(`BONANZA-${Math.floor(1000 + Math.random() * 9000)}`);
    setFormIsDemo(false);
    setFormVerified(true);
    setModalOpen(true);
  };

  const openEditModal = (winner: Winner) => {
    setEditingWinner(winner);
    setFormName(winner.name);
    setFormCountry(winner.country);
    setFormCountryCode(winner.countryCode);
    setFormCategory(winner.prizeCategory);
    setFormAmount(winner.prizeAmount);
    setFormDate(winner.dateAnnounced);
    setFormRef(winner.ticketOrRefNumber);
    setFormIsDemo(winner.isDemo);
    setFormVerified(winner.verified);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formAmount < 100) {
      setFeedback({ type: 'error', msg: 'Prize amount must be at least $100 USD.' });
      return;
    }

    setSaving(true);
    setFeedback(null);

    try {
      if (editingWinner) {
        await updateWinner(editingWinner.id, {
          name: formName,
          country: formCountry,
          countryCode: formCountryCode,
          prizeCategory: formCategory,
          prizeAmount: Number(formAmount),
          dateAnnounced: formDate,
          ticketOrRefNumber: formRef,
          isDemo: formIsDemo,
          verified: formVerified
        });
        setFeedback({ type: 'success', msg: 'Winner details updated successfully.' });
      } else {
        await addWinner({
          name: formName,
          country: formCountry,
          countryCode: formCountryCode,
          prizeCategory: formCategory,
          prizeAmount: Number(formAmount),
          dateAnnounced: formDate,
          ticketOrRefNumber: formRef,
          isDemo: formIsDemo,
          verified: formVerified
        });
        setFeedback({ type: 'success', msg: 'New verified winner added.' });
      }

      setModalOpen(false);
      loadWinners();
    } catch (err: any) {
      setFeedback({ type: 'error', msg: err.message || 'Operation failed.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove the winner entry for "${name}"?`)) return;
    try {
      await deleteWinner(id);
      setFeedback({ type: 'success', msg: 'Winner removed successfully.' });
      loadWinners();
    } catch (err: any) {
      setFeedback({ type: 'error', msg: err.message || 'Failed to remove winner.' });
    }
  };

  const filtered = winners.filter(
    (w) =>
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.country.toLowerCase().includes(search.toLowerCase()) ||
      w.ticketOrRefNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <h2 className="text-xl font-black uppercase text-stone-900 font-display">
            Verified Winners Management
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Publish, edit, and audit authorized winner announcements with USD cash rewards.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={exportToCSV}
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition border border-stone-300"
            title="Download winners spreadsheet for audit"
          >
            <Download className="w-4 h-4 text-stone-600" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={openAddModal}
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-airtel-red hover:bg-airtel-darkred text-white text-xs font-black uppercase tracking-wider shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Verified Winner</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl flex items-center gap-2 text-xs font-semibold ${
            feedback.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {feedback.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
          <span>{feedback.msg}</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter winners by name, country, or reference code..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-airtel-red"
        />
      </div>

      {/* Winners Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase font-bold tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Winner Name</th>
                <th className="py-3 px-4">Country</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Prize Amount</th>
                <th className="py-3 px-4">Date Announced</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filtered.map((w) => (
                <tr key={w.id} className="hover:bg-rose-50/20 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-stone-900">{w.name}</div>
                    <div className="text-[10px] text-stone-400 font-mono">{w.ticketOrRefNumber}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium">{w.country}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-700">
                      {w.prizeCategory}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-black text-airtel-red">
                    ${w.prizeAmount.toLocaleString()} USD
                  </td>
                  <td className="py-3.5 px-4 text-stone-500">{w.dateAnnounced}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                      OFFICIAL &amp; LIVE
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1">
                    <button
                      onClick={() => openEditModal(w)}
                      className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                      title="Edit Winner"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(w.id, w.name)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50"
                      title="Delete Winner"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-stone-400">
                    No winner entries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form for Add/Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 relative shadow-2xl border border-stone-200">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-black uppercase text-stone-900 font-display mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-gold" />
              {editingWinner ? 'Edit Winner Record' : 'Add Verified Winner'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Winner Display Name</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Amina Mwangi"
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Country</label>
                  <input
                    type="text"
                    required
                    value={formCountry}
                    onChange={(e) => setFormCountry(e.target.value)}
                    placeholder="Kenya"
                    className="w-full px-3 py-2 border border-stone-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Country Code</label>
                  <input
                    type="text"
                    required
                    maxLength={3}
                    value={formCountryCode}
                    onChange={(e) => setFormCountryCode(e.target.value.toUpperCase())}
                    placeholder="KE"
                    className="w-full px-3 py-2 border border-stone-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Prize Category</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl"
                >
                  <option value="Instant Cash Rewards">Instant Cash Rewards</option>
                  <option value="Daily Cash Rewards">Daily Cash Rewards</option>
                  <option value="Weekly Cash Rewards">Weekly Cash Rewards</option>
                  <option value="Grand Prize">Grand Prize</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Prize ($ USD)</label>
                  <input
                    type="number"
                    min={100}
                    required
                    value={formAmount}
                    onChange={(e) => setFormAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-200 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Date Announced</label>
                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Reference / Ticket ID</label>
                <input
                  type="text"
                  value={formRef}
                  onChange={(e) => setFormRef(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl font-mono text-[11px]"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-stone-700">
                  <input
                    type="checkbox"
                    checked={formIsDemo}
                    onChange={(e) => setFormIsDemo(e.target.checked)}
                    className="w-4 h-4 text-airtel-red rounded"
                  />
                  <span>Mark as Demonstration Data</span>
                </label>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-stone-200 text-stone-600 font-bold hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="w-1/2 py-2.5 rounded-xl bg-airtel-red hover:bg-airtel-darkred text-white font-bold transition disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

