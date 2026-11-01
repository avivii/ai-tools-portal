import React from 'react';
import type { NavView } from '../types';
import { NAV_ITEMS, INSTITUTION_STATS } from '../data/mockData';
import { 
  LayoutDashboard, 
  Sparkles, 
  BookOpenCheck, 
  GraduationCap, 
  ShieldCheck, 
  LifeBuoy
} from 'lucide-react';

interface SidebarProps {
  activeView: NavView;
  onSelectView: (view: NavView) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  isOpenMobile,
  onCloseMobile,
}) => {
  const getNavIcon = (iconName: string, isActive: boolean) => {
    const props = { className: `w-5 h-5 shrink-0 transition-transform ${isActive ? 'scale-110' : ''}` };
    switch (iconName) {
      case 'LayoutDashboard': return <LayoutDashboard {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'BookOpenCheck': return <BookOpenCheck {...props} />;
      case 'GraduationCap': return <GraduationCap {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-academic-700 text-white flex items-center justify-center shadow-md shadow-academic-700/25">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-base text-slate-900 leading-snug">
              פורטל כלי AI לסגל
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              מרכז הידע האקדמי
            </p>
          </div>
        </div>

        {/* Institution Semester Tag */}
        <div className="px-6 py-3 bg-academic-50/60 border-b border-slate-100 text-[11px] text-academic-800 font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{INSTITUTION_STATS.semester}</span>
        </div>

        {/* Main Navigation */}
        <nav className="p-4 space-y-1.5" aria-label="תפריט ראשי">
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectView(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 text-right ${
                  isActive
                    ? 'bg-academic-700 text-white shadow-sm shadow-academic-700/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  {getNavIcon(item.icon, isActive)}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-academic-100 text-academic-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Support & Academic Info Card */}
      <div className="p-4 m-4 rounded-2xl bg-slate-50 border border-slate-200/80">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1.5">
          <LifeBuoy className="w-4 h-4 text-academic-600" />
          <span>מוקד סיוע וייעוץ לסגל</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
          ייעוץ פדגוגי בשילוב AI בהוראה, בדיקת כלי חדש ובקשת רישיונות מוסדיים.
        </p>
        <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
          <span className="text-slate-500 font-mono">ai-support@uni.ac.il</span>
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            סגל פעיל
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-l border-slate-200/80 shrink-0 h-screen sticky top-0 shadow-sm z-30">
        {navContent}
      </aside>

      {/* Mobile Backdrop & Drawer */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        >
          <div 
            className="fixed inset-y-0 right-0 w-72 bg-white shadow-2xl z-50 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};
