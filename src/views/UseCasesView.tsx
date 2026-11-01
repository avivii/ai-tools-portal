import React, { useState } from 'react';
import type { UseCase } from '../types';
import { MOCK_USE_CASES } from '../data/mockData';
import { 
  BookOpenCheck, 
  Plus, 
  Send, 
  X, 
  CheckCircle2, 
  User, 
  Calendar,
  Layers,
  Sparkles,
  Award
} from 'lucide-react';

export const UseCasesView: React.FC = () => {
  const [cases, setCases] = useState<UseCase[]>(MOCK_USE_CASES);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newFaculty, setNewFaculty] = useState('');
  const [newDept, setNewDept] = useState('');
  const [newTool, setNewTool] = useState('ChatGPT Edu (GPT-4o)');
  const [newSummary, setNewSummary] = useState('');
  const [newMethodology, setNewMethodology] = useState('');
  const [newResults, setNewResults] = useState('');

  // Collect unique tags
  const allTags = Array.from(new Set(cases.flatMap((c) => c.tags)));

  const filteredCases = selectedTag === 'all' 
    ? cases 
    : cases.filter((c) => c.tags.includes(selectedTag));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newFaculty || !newSummary) return;

    const newCase: UseCase = {
      id: `uc-${Date.now()}`,
      title: newTitle,
      facultyMember: newFaculty,
      department: newDept || 'סגל אקדמי',
      toolUsed: newTool,
      toolId: 'custom',
      summary: newSummary,
      methodology: newMethodology || 'יישום בהוראה ובמחקר במסגרת הסמסטר',
      results: newResults || 'שיפור משמעותי בזמן ויעילות העבודה',
      tags: ['יוזמת סגל', 'חדש'],
      date: 'נובמבר 2026',
    };

    setCases([newCase, ...cases]);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsSubmitModalOpen(false);
      // Reset form
      setNewTitle('');
      setNewFaculty('');
      setNewDept('');
      setNewSummary('');
      setNewMethodology('');
      setNewResults('');
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Intro Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3 border border-indigo-100">
            <BookOpenCheck className="w-3.5 h-3.5" />
            <span>מאגר פרקטיקות ומתודולוגיות עמיתים</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            מקרי בוחן אקדמיים: AI בהוראה ובמחקר
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            מאגר שיתופי של יוזמות סגל המדגימות יישום מעשי, מתודולוגיות עבודה, והישגים קונקרטיים בשילוב כלי בינה מלאכותית בפקולטות השונות.
          </p>
        </div>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm bg-academic-700 hover:bg-academic-800 text-white shadow-md hover:shadow-lg transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>שתף/י מקרה בוחן משלך</span>
        </button>
      </div>

      {/* Filter by Topic / Tag */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-bold text-slate-500 whitespace-nowrap ml-2">סינון לפי נושא:</span>
        <button
          onClick={() => setSelectedTag('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            selectedTag === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          כל המקרים ({cases.length})
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedTag === tag
                ? 'bg-academic-700 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Use Cases Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCases.map((uc) => (
          <div
            key={uc.id}
            className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-soft hover:shadow-soft-hover transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header meta */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-academic-50 text-academic-800 border border-academic-200">
                  <Sparkles className="w-3.5 h-3.5 text-academic-600" />
                  {uc.toolUsed}
                </span>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{uc.date}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
                {uc.title}
              </h3>

              {/* Author & Department */}
              <div className="flex items-center gap-2 mb-4 text-xs font-medium text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <User className="w-4 h-4 text-academic-600" />
                <span className="font-bold text-slate-800">{uc.facultyMember}</span>
                <span>•</span>
                <span>{uc.department}</span>
              </div>

              {/* Summary */}
              <div className="mb-4">
                <h4 className="text-xs font-bold text-slate-700 mb-1">האתגר והרקע:</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {uc.summary}
                </p>
              </div>

              {/* Methodology */}
              <div className="mb-4 bg-academic-50/50 p-3 rounded-2xl border border-academic-100/60">
                <h4 className="text-xs font-bold text-academic-900 mb-1 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-academic-700" />
                  המתודולוגיה ודרך היישום:
                </h4>
                <p className="text-xs text-academic-800 leading-relaxed">
                  {uc.methodology}
                </p>
              </div>
            </div>

            {/* Results & Tags */}
            <div className="pt-4 border-t border-slate-100 mt-2">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 mb-3">
                <h4 className="text-xs font-bold text-emerald-900 mb-0.5 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-700" />
                  תוצאות ומסקנות מרכזיות:
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  {uc.results}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {uc.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Case Study Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-academic-50 text-academic-700 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-slate-900">שיתוף מקרה בוחן חדש מהסגל</h3>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submittedSuccess ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-800">מקרה הבוחן נשמר בהצלחה!</h4>
                <p className="text-xs text-slate-500">תודה על תרומתך למאגר הידע האקדמי של חברי הסגל.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">כותרת מקרה הבוחן *</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="לדוגמה: שימוש ב-NotebookLM להצלבת מאמרים בסקירת ספרות"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-academic-500 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">שם חבר/ת הסגל *</label>
                    <input
                      type="text"
                      required
                      value={newFaculty}
                      onChange={(e) => setNewFaculty(e.target.value)}
                      placeholder="ד''ר / פרופ'..."
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-academic-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">מחלקה / פקולטה</label>
                    <input
                      type="text"
                      value={newDept}
                      onChange={(e) => setNewDept(e.target.value)}
                      placeholder="מדעי המחשב / היסטוריה..."
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-academic-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">הכלי המרכזי שנבדק</label>
                  <select
                    value={newTool}
                    onChange={(e) => setNewTool(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:border-academic-500 focus:outline-hidden"
                  >
                    <option value="ChatGPT Edu (GPT-4o)">ChatGPT Edu (GPT-4o)</option>
                    <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                    <option value="NotebookLM">NotebookLM</option>
                    <option value="Consensus">Consensus</option>
                    <option value="Google Gemini">Google Gemini</option>
                    <option value="Perplexity AI">Perplexity AI</option>
                    <option value="כלי אחר">כלי אחר</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">תקציר האתגר והשימוש *</label>
                  <textarea
                    required
                    rows={2}
                    value={newSummary}
                    onChange={(e) => setNewSummary(e.target.value)}
                    placeholder="תאר/י בקצרה את הצורך האקדמי או ההוראתי..."
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-academic-500 focus:outline-hidden"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">תוצאות, לקחים או חסכון שנמדד</label>
                  <input
                    type="text"
                    value={newResults}
                    onChange={(e) => setNewResults(e.target.value)}
                    placeholder="לדוגמה: חיסכון של 40% מזמן בדיקת המטלות..."
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-academic-500 focus:outline-hidden"
                  />
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
