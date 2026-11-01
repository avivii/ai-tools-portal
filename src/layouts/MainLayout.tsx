import React, { useState } from 'react';
import type { NavView } from '../types';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { 
  LayoutDashboard, 
  Sparkles, 
  BookOpenCheck, 
  GraduationCap, 
  X, 
  CheckCircle2, 
  Send 
} from 'lucide-react';
import { NAV_ITEMS } from '../data/mockData';

interface MainLayoutProps {
  activeView: NavView;
  onSelectView: (view: NavView) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  activeView,
  onSelectView,
  searchQuery,
  onSearchChange,
  children,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [reqToolName, setReqToolName] = useState('');
  const [reqReason, setReqReason] = useState('');

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqToolName) return;
    setRequestSent(true);
    setTimeout(() => {
      setRequestSent(false);
      setIsRequestModalOpen(false);
      setReqToolName('');
      setReqReason('');
    }, 1800);
  };

  const getMobileIcon = (iconName: string) => {
    switch (iconName) {
      case 'LayoutDashboard': return <LayoutDashboard className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'BookOpenCheck': return <BookOpenCheck className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 flex flex-col lg:flex-row font-sans text-slate-800" dir="rtl">
      {/* Sidebar for Desktop & Mobile Drawer */}
      <Sidebar
        activeView={activeView}
        onSelectView={onSelectView}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-8">
        <Header
          activeView={activeView}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onRequestTool={() => setIsRequestModalOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 py-1.5 px-3 flex items-center justify-around shadow-lg">
        {NAV_ITEMS.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[11px] font-semibold transition-colors ${
                isActive
                  ? 'text-academic-700 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {getMobileIcon(item.icon)}
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Request Tool Modal */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-base text-slate-900">
                בקשת כלי AI חדש או הרחבת רישוי
              </h3>
              <button
                onClick={() => setIsRequestModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {requestSent ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-800">הבקשה הועברה בהצלחה</h4>
                <p className="text-xs text-slate-500">
                  המרכז לחדשנות ואגף המחשוב יבחנו את הבקשה ויצרו קשר במייל המוסדי.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    שם הכלי המבוקש *
                  </label>
                  <input
                    type="text"
                    required
                    value={reqToolName}
                    onChange={(e) => setReqToolName(e.target.value)}
                    placeholder="לדוגמה: Midjourney, Mid-level GPU API, Scite..."
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-academic-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    מטרת השימוש והצורך האקדמי
                  </label>
                  <textarea
                    rows={3}
                    value={reqReason}
                    onChange={(e) => setReqReason(e.target.value)}
                    placeholder="הסבר/י בקצרה לאיזה קורס או פרויקט מחקר מיועד הכלי..."
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-academic-500 focus:outline-hidden"
                  ></textarea>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsRequestModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    ביטול
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold bg-academic-700 hover:bg-academic-800 text-white rounded-xl shadow-xs transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    שליחת בקשה
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
