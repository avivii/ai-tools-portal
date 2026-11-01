import React, { useState, useMemo } from 'react';
import { useCasesData, type UseCase } from '../data/useCasesData';
import { 
  BookOpenCheck, 
  Copy, 
  Check, 
  Sparkles, 
  GraduationCap, 
  Building2, 
  Users, 
  Search, 
  Plus, 
  X, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Code2
} from 'lucide-react';

type FilterCategory = 'all' | 'academic' | 'admin' | 'students';

export const UseCasesPage: React.FC = () => {
  const [items, setItems] = useState<UseCase[]>(useCasesData);
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modal submission state
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'academic' | 'admin' | 'students'>('academic');
  const [newProblem, setNewProblem] = useState('');
  const [newTool, setNewTool] = useState('');
  const [newPrompt, setNewPrompt] = useState('');

  // Tab definitions with category labels and icons
  const tabs: { id: FilterCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'הכל', icon: <BookOpenCheck className="w-4 h-4" /> },
    { id: 'academic', label: 'סגל אקדמי וחוקרים', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'admin', label: 'סגל מנהלי ותפעולי', icon: <Building2 className="w-4 h-4" /> },
    { id: 'students', label: 'סטודנטים', icon: <Users className="w-4 h-4" /> },
  ];

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<FilterCategory, number> = {
      all: items.length,
      academic: 0,
      admin: 0,
      students: 0,
    };
    items.forEach((item) => {
      if (counts[item.category] !== undefined) {
        counts[item.category]++;
      }
    });
    return counts;
  }, [items]);

  // Filter items based on active tab and search query
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesProblem = item.problem.toLowerCase().includes(query);
        const matchesTool = item.recommendedTool.toLowerCase().includes(query);
        const matchesPrompt = item.promptTemplate.toLowerCase().includes(query);
        const matchesCategory = item.categoryLabel.toLowerCase().includes(query);
        const matchesTags = item.tags ? item.tags.some(t => t.toLowerCase().includes(query)) : false;

        if (!matchesTitle && !matchesProblem && !matchesTool && !matchesPrompt && !matchesCategory && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [items, selectedCategory, searchQuery]);

  // Copy prompt handler
  const handleCopyPrompt = async (id: string, promptText: string) => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = promptText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    }
  };

  // Add new use case
  const handleSubmitNewUseCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newProblem || !newTool || !newPrompt) return;

    const categoryLabels: Record<'academic' | 'admin' | 'students', string> = {
      academic: 'סגל אקדמי וחוקרים',
      admin: 'סגל מנהלי ותפעולי',
      students: 'סטודנטים',
    };

    const newCase: UseCase = {
      id: `custom-${Date.now()}`,
      category: newCategory,
      categoryLabel: categoryLabels[newCategory],
      title: newTitle,
      problem: newProblem,
      recommendedTool: newTool,
      promptTemplate: newPrompt,
      date: 'נובמבר 2026',
      tags: ['יוזמת סגל', 'חדש'],
    };

    setItems([newCase, ...items]);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsSubmitModalOpen(false);
      setNewTitle('');
      setNewProblem('');
      setNewTool('');
      setNewPrompt('');
    }, 1500);
  };

  // Category badge styles
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'academic':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200/80';
      case 'admin':
        return 'bg-amber-50 text-amber-800 border-amber-200/80';
      case 'students':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200/80';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-academic-50 text-academic-800 text-xs font-semibold mb-3 border border-academic-200">
              <BookOpenCheck className="w-3.5 h-3.5 text-academic-600" />
              <span>מרכז מקרי בוחן ופרקטיקות יישומיות</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              מקרי בוחן ותבניות פרומפטים אקדמיות (Use Cases)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              מאגר מקיף של אתגרים אמיתיים מהפקולטה, הכלי המומלץ לפתרונם, ותבניות פרומפטים מובנות מוכנות להעתקה ולשימוש מיידי במחקר, בהוראה, בניהול ובלימודים.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm bg-academic-700 hover:bg-academic-800 text-white shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>הוספת מקרה בוחן</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="relative max-w-xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="חיפוש לפי אתגר, כלי מומלץ (Claude, ChatGPT...), מילות מפתח או פרומפט..."
              className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-academic-100 focus:border-academic-500 transition-all text-slate-800 placeholder-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="נקה חיפוש"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 border-t border-slate-100 mt-6 scrollbar-none">
          {tabs.map((tab) => {
            const isSelected = selectedCategory === tab.id;
            const count = categoryCounts[tab.id];

            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-academic-700 text-white shadow-md shadow-academic-700/20'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-medium ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          מציג <strong className="text-slate-800 font-bold">{filteredItems.length}</strong> מקרי בוחן
        </span>
        {searchQuery && (
          <span>
            תוצאות עבור: <strong className="text-academic-700 font-bold">"{searchQuery}"</strong>
          </span>
        )}
      </div>

      {/* Cards Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredItems.map((item) => {
            const isCopied = copiedId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200/90 hover:border-academic-300 p-6 shadow-soft hover:shadow-soft-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Category Badge + Recommended Tool Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getCategoryBadgeClass(
                        item.category
                      )}`}
                    >
                      {item.category === 'academic' && <GraduationCap className="w-3.5 h-3.5" />}
                      {item.category === 'admin' && <Building2 className="w-3.5 h-3.5" />}
                      {item.category === 'students' && <Users className="w-3.5 h-3.5" />}
                      <span>{item.categoryLabel}</span>
                    </span>

                    {/* Recommended AI Tool Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-academic-50 text-academic-800 border border-academic-200/90 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 text-academic-600" />
                      <span className="text-slate-600 font-normal">כלי מומלץ:</span>
                      <span className="font-bold text-academic-900">{item.recommendedTool}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
                    {item.title}
                  </h3>

                  {/* Problem Description */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 mb-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-700 mb-0.5">האתגר והצורך:</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.problem}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Code Block displaying promptTemplate */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between bg-slate-800 text-slate-200 px-4 py-2.5 rounded-t-2xl border-b border-slate-700">
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        <Code2 className="w-3.5 h-3.5 text-academic-300" />
                        <span className="text-slate-200">תבנית פרומפט (Prompt Template)</span>
                      </div>

                      {/* Copy Prompt Button */}
                      <button
                        onClick={() => handleCopyPrompt(item.id, item.promptTemplate)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isCopied
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                            : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                        }`}
                        title="העתק את הפרומפט ללוח"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>הועתק!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>העתק פרומפט</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="bg-slate-900 text-slate-100 p-4 rounded-b-2xl overflow-x-auto max-h-56 scrollbar-thin scrollbar-thumb-slate-700">
                      <pre className="text-xs font-mono whitespace-pre-wrap leading-relaxed text-slate-200 selection:bg-academic-600 selection:text-white" dir="auto">
                        {item.promptTemplate}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Footer Meta / Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="pt-3 border-t border-slate-100 mt-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-medium bg-slate-50 text-slate-600 px-2.5 py-0.5 rounded-md border border-slate-200/60"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {item.department && (
                      <span className="text-[11px] text-slate-500 font-medium">
                        {item.department}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-soft">
          <div className="w-16 h-16 rounded-2xl bg-academic-50 text-academic-600 flex items-center justify-center mx-auto mb-4">
            <BookOpenCheck className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">לא נמצאו מקרי בוחן מתאימים</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
            נסה לשנות את מילות החיפוש או לבחור בקטגוריה אחרת.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-academic-700 text-white hover:bg-academic-800 transition-colors shadow-sm cursor-pointer"
          >
            איפוס סינונים
          </button>
        </div>
      )}

      {/* Add New Use Case Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-academic-50 text-academic-700 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-slate-900">הוספת מקרה בוחן ותבנית פרומפט</h3>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-800">מקרה הבוחן נוסף בהצלחה!</h4>
                <p className="text-xs text-slate-500">תודה על שיתוף הידע והפרומפטים עם קהילת המוסד.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitNewUseCase} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">כותרת מקרה הבוחן *</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="לדוגמה: ניתוח וזיקוק מאמרי מחקר / מענה אוטומטי לפניות"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-academic-500 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">קהל יעד / קטגוריה *</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as 'academic' | 'admin' | 'students')}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:border-academic-500 focus:outline-hidden"
                    >
                      <option value="academic">סגל אקדמי וחוקרים</option>
                      <option value="admin">סגל מנהלי ותפעולי</option>
                      <option value="students">סטודנטים</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">כלי AI מומלץ *</label>
                    <input
                      type="text"
                      required
                      value={newTool}
                      onChange={(e) => setNewTool(e.target.value)}
                      placeholder="למשל: Claude 3.5 Sonnet / ChatGPT"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-academic-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">האתגר והצורך (Problem) *</label>
                  <textarea
                    required
                    rows={2}
                    value={newProblem}
                    onChange={(e) => setNewProblem(e.target.value)}
                    placeholder="תאר/י בקצרה את האתגר או הבעיה שהכלי פותר..."
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-academic-500 focus:outline-hidden"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">תבנית הפרומפט (Prompt Template) *</label>
                  <textarea
                    required
                    rows={5}
                    value={newPrompt}
                    onChange={(e) => setNewPrompt(e.target.value)}
                    placeholder="הדבק/י כאן את נוסח הפרומפט האקדמי המדויק כולל משתנים בסוגריים [ ]..."
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-xl focus:border-academic-500 focus:outline-hidden text-slate-800"
                  ></textarea>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    ביטול
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold bg-academic-700 hover:bg-academic-800 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    פרסום למאגר
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

export default UseCasesPage;
