import React from 'react';
import type { NavView } from '../types';
import { 
  Search, 
  Menu, 
  X, 
  Bell, 
  User,
  PlusCircle
} from 'lucide-react';

interface HeaderProps {
  activeView: NavView;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenMobileMenu: () => void;
  onRequestTool: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  searchQuery,
  onSearchChange,
  onOpenMobileMenu,
  onRequestTool,
}) => {
  const getHeaderTitles = () => {
    switch (activeView) {
      case 'dashboard':
        return {
          title: 'דשבורד ראשי ועדכונים',
          subtitle: 'מרכז הכלים, המדיניות המוסדית ומקרי בוחן של עמיתי סגל'
        };
      case 'catalog':
        return {
          title: 'קטלוג כלי בינה מלאכותית',
          subtitle: 'כלים מאושרים לשימוש בסגל ההוראה, המחקר והתפעול האקדמי'
        };
      case 'use-cases':
        return {
          title: 'מקרי בוחן אקדמיים',
          subtitle: 'יוזמות ומתודולוגיות יישומיות של חוקרים ומרצים מהשטח'
        };
      case 'tutorials':
        return {
          title: 'מרכז הדרכות וידע',
          subtitle: 'מדריכים מעשיים, הנדסת פרומפטים, אתיקה וסילבוסים'
        };
    }
  };

  const { title, subtitle } = getHeaderTitles();

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 transition-all">
      {/* View Title & Subtitle + Mobile Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="פתח תפריט ניווט"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-xs text-slate-500 hidden sm:block">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Center Search Input */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="חיפוש כלי, מתודולוגיה, הדרכה או תחום מחקר..."
            className="w-full pl-9 pr-10 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-academic-500 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-academic-100 transition-all text-slate-800 placeholder-slate-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label="נקה חיפוש"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Actions and Faculty Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Request tool button */}
        <button
          onClick={onRequestTool}
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-academic-700 bg-academic-50 hover:bg-academic-100 border border-academic-200 rounded-xl transition-all"
        >
          <PlusCircle className="w-4 h-4 text-academic-600" />
          <span>בקשת כלי / רישיון</span>
        </button>

        {/* Notification bell */}
        <button 
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          title="עדכוני מערכת ומדיניות"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-academic-600"></span>
        </button>

        {/* User Faculty Badge */}
        <div className="flex items-center gap-2 pr-2 border-r border-slate-200">
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-academic-800 flex items-center justify-center font-bold text-xs">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden xl:block text-right">
            <p className="text-xs font-bold text-slate-800 leading-tight">פרופ' איתן כהן</p>
            <p className="text-[11px] text-slate-500 leading-tight">סגל בכיר • מדעי הטבע</p>
          </div>
        </div>
      </div>
    </header>
  );
};
