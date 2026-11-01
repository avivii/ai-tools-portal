import React, { useState } from 'react';
import { MOCK_TUTORIALS } from '../data/mockData';
import { 
  GraduationCap, 
  Video, 
  BookOpen, 
  Users, 
  Clock, 
  Copy, 
  Check, 
  FileText, 
  ExternalLink,
  Sparkles,
  Download
} from 'lucide-react';

export const TutorialsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'כל ההדרכות' },
    { id: 'פרומפטים', label: 'הנדסת פרומפטים' },
    { id: 'אתיקה ומדיניות', label: 'אתיקה ומדיניות' },
    { id: 'הוראה ולמידה', label: 'הוראה ולמידה' },
    { id: 'מחקר וכתיבה', label: 'מחקר וכתיבה' },
  ];

  const filteredTutorials = selectedCategory === 'all'
    ? MOCK_TUTORIALS
    : MOCK_TUTORIALS.filter((t) => t.category === selectedCategory);

  // Ready-to-use Academic Prompt Templates
  const promptTemplates = [
    {
      title: 'ניסוח שאלות חשיבה ברמה גבוהה למבחן (בלום)',
      prompt: `פעל כפרופסור מומחה להוראה אקדמית בתחום [נושא הקורס]. 
בהתבסס על הטקסט המצורף, נסח 3 שאלות מבחן פתוחות הדורשות ניתוח והערכה ביקורתית (דרגות עליונות של טקסונומיית בלום), ולא רק שינון עובדות. 
לכל שאלה, צרף רובריקת הערכה מפורטת עם 4 קריטריונים וניקוד מוצע.`,
      target: 'הוראה ומבחנים'
    },
    {
      title: 'עריכת טקסט אקדמי ושמירה על משלב לשוני',
      prompt: `פעל כעורך מדעי בכיר עבור כתב עת בינלאומי מוביל (Q1).
קרא את פסקת המבוא המצורפת. בצע עריכה לשונית המשפרת את שטף הטיעון, הבהירות והמשלב האקדמי, מבלי לשנות את המשמעות המחקרית המקורית.
לאחר הפסקה הערוכה, פרט בנקודות 3 שיפורים מרכזיים שבחרת לבצע ומדוע.`,
      target: 'כתיבה מדעית'
    },
    {
      title: 'הצלבת טענות וזיהוי פערים בסקירת ספרות',
      prompt: `לפניך סיכום של שלושה מאמרים העוסקים בנושא [הנושא הנחקר].
1. ערוך טבלת השוואה מתודולוגית (מדגם, שיטת מחקר, ממצא עיקרי).
2. זהה נקודות אי-הסכמה או סתירה בין המאמרים.
3. הצבע על שני פערי מחקר (Research Gaps) שלא קיבלו מענה בשלושת המחקרים.`,
      target: 'מחקר ואיסוף מידע'
    }
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'סרטון מוקלט': return <Video className="w-3.5 h-3.5 text-blue-600" />;
      case 'מדריך כתוב': return <BookOpen className="w-3.5 h-3.5 text-emerald-600" />;
      case 'סדנה חיה': return <Users className="w-3.5 h-3.5 text-purple-600" />;
      default: return <GraduationCap className="w-3.5 h-3.5 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-academic-50 text-academic-700 text-xs font-semibold mb-3 border border-academic-100">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>המרכז לפיתוח פדגוגי וטכנולוגי</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            מרכז הדרכות וידע אקדמי ב-AI
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            סדנאות מוקלטות, מדריכים יישומיים, תבניות פרומפטים מותאמות לאקדמיה ונוסחי הצהרות לשימוש בסילבוס.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 border-t border-slate-100 mt-6 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-academic-700 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tutorials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.map((tut) => (
          <div
            key={tut.id}
            className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-soft hover:shadow-soft-hover transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700">
                  {getFormatIcon(tut.format)}
                  {tut.format}
                </span>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{tut.durationMinutes} דק'</span>
                </div>
              </div>

              <span className="text-[11px] font-bold text-academic-700 bg-academic-50 px-2 py-0.5 rounded-md border border-academic-100 inline-block mb-2">
                רמה: {tut.difficulty} • {tut.category}
              </span>

              <h3 className="font-bold text-base text-slate-900 mb-2 leading-snug">
                {tut.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {tut.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-auto">
              <p className="text-[11px] text-slate-500 mb-3 truncate">
                מרצה/מדריך: <strong className="text-slate-700">{tut.instructor}</strong>
              </p>

              <button
                onClick={() => alert(`פתיחת הדרכה: "${tut.title}"\nהמערכת מנתבת למרכז ההקלטות המוסדי.`)}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-academic-800 bg-academic-50 hover:bg-academic-100 hover:text-academic-900 rounded-xl transition-colors border border-academic-200 cursor-pointer"
              >
                <span>{tut.linkText || 'צפייה בהדרכה'}</span>
                <ExternalLink className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Academic Prompts Repository */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-soft">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-academic-100 text-academic-800 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5 text-academic-700" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              תבניות פרומפטים אקדמיים מוכנים להעתקה
            </h2>
            <p className="text-xs text-slate-500">
              נוסחאות מובנות שהוכחו כיעילות בעבודה מחקרית והוראתית מול מודלי שפה (ChatGPT, Claude, Gemini)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {promptTemplates.map((item, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold text-academic-800 bg-academic-100/70 px-2.5 py-0.5 rounded-full">
                    {item.target}
                  </span>
                  <button
                    onClick={() => handleCopy(item.prompt, index)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-academic-700 transition-colors cursor-pointer"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">הועתק!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>העתק</span>
                      </>
                    )}
                  </button>
                </div>

                <h3 className="font-bold text-sm text-slate-800 mb-2">
                  {item.title}
                </h3>

                <pre className="text-xs font-sans text-slate-700 bg-white p-3 rounded-xl border border-slate-200/60 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-48 scrollbar-none font-medium">
                  {item.prompt}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Syllabus Guidelines Download Card */}
      <div className="bg-academic-50 border border-academic-200 rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-academic-700 text-white flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">
              נוסח סעיף שימוש ב-AI לסילבוס הקורס (תשפ"ז)
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-xl">
              נוסח תקני שאושר על ידי הסנאט האקדמי, הכולל 3 רמות הרשאה לבחירת המרצה (שימוש חופשי מונחה / שימוש מוגבל למטלות ספציפיות / איסור שימוש במטלות הערכה מסוימות).
            </p>
          </div>
        </div>

        <button
          onClick={() => alert("הנוסח המלא של סעיף הסילבוס הועתק או ירד כקובץ PDF.")}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-academic-700 text-white hover:bg-academic-800 transition-colors shrink-0 shadow-sm cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>הורדת נוסח הסילבוס (PDF)</span>
        </button>
      </div>
    </div>
  );
};
