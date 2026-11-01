import React from 'react';
import type { AITool, NavView } from '../types';
import { ToolCard } from '../components/ToolCard';
import {
  MOCK_TOOLS,
  MOCK_USE_CASES,
  MOCK_TUTORIALS,
  ETHICAL_GUIDELINES,
  INSTITUTION_STATS
} from '../data/mockData';
import {
  Sparkles,
  ArrowLeft,
  BookOpenCheck,
  GraduationCap,
  ShieldCheck,
  Users,
  FileCheck2,
  ChevronLeft
} from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (view: NavView) => void;
  onOpenToolDetails: (tool: AITool) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onOpenToolDetails,
}) => {
  const featuredTools = MOCK_TOOLS.filter((t) => t.isFeatured).slice(0, 4);
  const recentUseCases = MOCK_USE_CASES.slice(0, 2);
  const upcomingTutorials = MOCK_TUTORIALS.slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#10223d] bg-gradient-to-l from-[#10223d] via-[#1a3762] to-[#234f93] text-white p-6 sm:p-8 shadow-xl border border-academic-800/50">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-semibold mb-4 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-academic-300" />
            <span>המרכז לקידום ההוראה והמחקר באקדמיה</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-3 tracking-tight drop-shadow-xs">
            ברוכים הבאים לפורטל כלי ה-AI האקדמי לסגל
          </h1>
          <p className="text-slate-100 text-sm sm:text-base leading-relaxed mb-6 font-normal">
            מאגר ייעודי של כלי בינה מלאכותית יוצרת (GenAI) המאושרים ומסופקים לחברי הסגל, לצד מקרי בוחן של עמיתים, הדרכות מעשיות והנחיות אתיקה מוסדיות.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('catalog')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-white text-slate-900 hover:bg-slate-100 transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>מעבר לקטלוג הכלים המלא</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('tutorials')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-white/15 hover:bg-white/25 text-white border border-white/25 transition-all backdrop-blur-xs cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>הדרכות וסדנאות סגל</span>
            </button>
          </div>
        </div>

        {/* Decorative background circles */}
        <div className="absolute left-0 bottom-0 translate-y-1/3 -translate-x-1/4 w-96 h-96 rounded-full bg-academic-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 w-80 h-80 rounded-full bg-academic-400/20 blur-2xl pointer-events-none"></div>
      </div>

      {/* Institutional Metric Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft">
          <div className="w-10 h-10 rounded-xl bg-academic-50 text-academic-700 flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">
            {INSTITUTION_STATS.activeToolsCount}
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">כלי AI מוסדיים זמינים</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
            <Users className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">
            {INSTITUTION_STATS.facultyMembersEngaged}+
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">חברי סגל פעילים</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3">
            <BookOpenCheck className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">
            {INSTITUTION_STATS.useCasesDocumented}
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">מקרי בוחן מתועדים</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">
            {INSTITUTION_STATS.licenseCoverage}
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">הגנת פרטיות ואבטחה</p>
        </div>
      </div>

      {/* Featured AI Tools Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-academic-600" />
              כלים מובילים לסגל
            </h2>
            <p className="text-xs text-slate-500">הכלים הנפוצים ביותר במחקר, כתיבה והוראה בסמסטר זה</p>
          </div>

          <button
            onClick={() => onNavigate('catalog')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-academic-700 hover:text-academic-900 transition-colors cursor-pointer"
          >
            <span>לכל הכלים בקטלוג</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5">
          {featuredTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onOpenDetails={onOpenToolDetails}
            />
          ))}
        </div>
      </div>

      {/* Two Column Section: Recent Use Cases & Ethical Guidelines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Academic Use Cases Spotlight */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                  <BookOpenCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">מקרי בוחן מהשטח האקדמי</h3>
                  <p className="text-xs text-slate-500">כיצד חוקרים ומרצים משלבים AI בפועל</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('use-cases')}
                className="text-xs font-bold text-academic-700 hover:underline cursor-pointer"
              >
                צפייה בכל המקרים
              </button>
            </div>

            <div className="space-y-4">
              {recentUseCases.map((uc) => (
                <div
                  key={uc.id}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-academic-50/50 border border-slate-100 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-academic-800 bg-academic-100/70 px-2.5 py-0.5 rounded-full">
                      {uc.recommendedTool}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {uc.facultyMember ? `${uc.facultyMember} • ` : ''}{uc.department || uc.categoryLabel}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1 leading-snug">
                    {uc.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-2">
                    {uc.problem}
                  </p>
                  {uc.results ? (
                    <div className="text-[11px] text-emerald-700 font-medium bg-emerald-50/70 px-2.5 py-1 rounded-lg border border-emerald-100 inline-block">
                      תוצאה: {uc.results}
                    </div>
                  ) : (
                    <div className="text-[11px] text-academic-700 font-medium bg-academic-50/70 px-2.5 py-1 rounded-lg border border-academic-100 inline-block">
                      {uc.categoryLabel}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => onNavigate('use-cases')}
              className="w-full py-2.5 text-center text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              עיון במאגר מקרי הבוחן המלא והגשת מקרה בוחן
            </button>
          </div>
        </div>

        {/* Institutional Guidelines */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">עקרונות המדיניות המוסדית</h3>
                <p className="text-xs text-slate-500">הנחיות ועדת האתיקה לעבודת הסגל</p>
              </div>
            </div>

            <div className="space-y-3">
              {ETHICAL_GUIDELINES.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-academic-100 text-academic-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 mb-0.5">{item.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigate('tutorials'); }}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 text-center text-xs font-bold text-academic-800 bg-academic-50 hover:bg-academic-100 rounded-xl transition-colors cursor-pointer"
            >
              <span>למדריך המלא ונוסח הצהרת סילבוס</span>
              <ChevronLeft className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Upcoming Workshops & Tutorials preview */}
      <div className="rounded-3xl bg-[#0f172a] bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white p-6 sm:p-7 shadow-xl border border-slate-700/60">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white">
              <GraduationCap className="w-5 h-5 text-academic-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">הדרכות וסדנאות סגל קרובות</h3>
              <p className="text-xs text-slate-300">הקלטות זמינות ומפגשים בזום לפיתוח מקצועי</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('tutorials')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors cursor-pointer"
          >
            כל הסדנאות וההקלטות
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingTutorials.map((tut) => (
            <div
              key={tut.id}
              className="bg-slate-800/80 border border-slate-700 hover:border-academic-400/60 p-4 rounded-2xl transition-all flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-academic-500/20 text-academic-200 border border-academic-400/30">
                    {tut.category}
                  </span>
                  <span className="text-[11px] text-slate-300 font-mono">
                    {tut.durationMinutes} דק'
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white mb-2 leading-snug">
                  {tut.title}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                  {tut.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-300">{tut.format}</span>
                <button
                  onClick={() => onNavigate('tutorials')}
                  className="font-bold text-academic-300 hover:text-white transition-colors cursor-pointer"
                >
                  צפייה
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
