import React, { useState } from 'react';
import { MOCK_TUTORIALS } from '../data/mockData';
import notebookVideo from '../data/videos/notebooklm-learning.mp4';
import { 
  GraduationCap, 
  Video, 
  BookOpen, 
  Users, 
  Clock, 
  Copy, 
  Check, 
  FileText, 
  Sparkles, 
  Download,
  Play,
  CheckCircle2,
  Film,
  Lightbulb,
  ExternalLink
} from 'lucide-react';

export const TutorialsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'כל ההדרכות' },
    { id: 'הוראה ולמידה', label: 'הוראה ולמידה (סטודנטים וסגל)' },
    { id: 'פרומפטים', label: 'הנדסת פרומפטים' },
    { id: 'אתיקה ומדיניות', label: 'אתיקה ומדיניות' },
    { id: 'מחקר וכתיבה', label: 'מחקר וכתיבה' },
  ];

  const filteredTutorials = selectedCategory === 'all'
    ? MOCK_TUTORIALS
    : MOCK_TUTORIALS.filter((t) => t.category === selectedCategory);

  // Ready-to-use Academic Prompt Templates
  const promptTemplates = [
    {
      title: 'הכנת סימולציית שאלות חזרה למבחן מתוך חומרי הקורס',
      prompt: `פעל כמתרגל בכיר בקורס [שם הקורס]. 
בהתבסס אך ורק על המקורות והמצגות שהעליתי למחברת זו:
1. נסח 3 שאלות תרגול פתוחות ברמת מבחן הבודקות הבנה עמוקה של החומר.
2. אל תציג את הפתרון עדיין. המתן לתשובותיי, ספק לי משוב מפורט וציין באילו נקודות עלי להעמיק.`,
      target: 'סטודנטים ולמידה'
    },
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

  const scrollToPlayer = () => {
    const el = document.getElementById('featured-video-player');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-academic-50 text-academic-700 text-xs font-semibold mb-3 border border-academic-100">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>המרכז לפיתוח פדגוגי, למידה ומחקר</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            מרכז הדרכות וידע אקדמי ב-AI
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            הדרכות וידאו מוקלטות, מדריכים יישומיים לסטודנטים ולסגל, תבניות פרומפטים מותאמות לאקדמיה ונוסחי הצהרות לשימוש בסילבוס.
          </p>
        </div>
      </div>

      {/* FEATURED VIDEO SECTION: NotebookLM for Students */}
      <section 
        id="featured-video-player"
        className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-soft"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-academic-700 text-white flex items-center justify-center shadow-sm">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  הדרכת וידאו לסטודנטים
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-academic-50 text-academic-800 border border-academic-200">
                  NotebookLM (Google)
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                למידה יעילה ומחקר באמצעות NotebookLM
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>משך הסרטון: 04:15 דק'</span>
          </div>
        </div>

        {/* 2-Column Layout: Video Player + Student Guide Context */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: HTML5 Video Player */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl overflow-hidden bg-slate-950 shadow-xl border border-slate-800 group relative">
              <video
                controls
                playsInline
                className="w-full aspect-video object-cover bg-black rounded-3xl"
                src={notebookVideo || '/videos/notebooklm-learning.mp4'}
              >
                <source src={notebookVideo} type="video/mp4" />
                <source src="/videos/notebooklm-learning.mp4" type="video/mp4" />
                דפדפנך אינו תומך בהפעלת קבצי וידאו HTML5.
              </video>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 px-1">
              <span className="flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 text-academic-600 fill-current" />
                <span>נגן וידאו מובנה — מקור מקומי מתוך: <code className="font-mono text-[11px] bg-slate-100 px-1 py-0.5 rounded">src/data/videos/</code></span>
              </span>
              <span className="text-emerald-700 font-semibold">איכות HD</span>
            </div>
          </div>

          {/* Column 2: Student Learning Guide & Highlights */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 space-y-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>כיצד סטודנטים מפיקים את המירב מהכלי?</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                בסרטון זה מודגם צעד אחר צעד כיצד סטודנטים יכולים להעלות את כל חומרי הקורס (סילבוס, מצגות שיעור, מאמרי קריאה וסיכומי הרצאות) לתוך "מחברת" אחת, ולשאול שאלות ממוקדות לקראת המבחן.
              </p>

              <div className="pt-2 border-t border-slate-200/60 space-y-2.5">
                <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">אפס הזיות (Grounded AI):</strong>
                    <span>התשובות מסתמכות אך ורק על המאמרים שהעליתם, עם הפניה מדויקת למספר העמוד.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">הפקת פודקאסט שמע (Audio Overview):</strong>
                    <span>יצירת שיחת שמע דו-קולית באנגלית המסכמת את עיקרי החומר להאזנה בדרכים.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">שאלות תרגול למבחן:</strong>
                    <span>בקשה מהמודל לחבר שאלות חזרה כדי לבדוק שליטה בחומר לפני הבחינה.</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                <span>מרצה/מנחה: <strong>היחידה לקידום ההוראה והלמידה</strong></span>
                <span className="text-academic-700 font-semibold">חופשי לכלל הסטודנטים</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Tutorials Catalog Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              כל ההדרכות והסדנאות האקדמיות
            </h3>
            <p className="text-xs text-slate-500">סדנאות מוקלטות, סדנאות חיות ומדריכים כתובים</p>
          </div>

          {/* Filter Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-academic-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tutorials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map((tut) => {
            const isStudentNotebookLM = tut.id === 'tut-notebooklm-students';

            return (
              <div
                key={tut.id}
                className={`bg-white rounded-3xl border p-6 shadow-soft hover:shadow-soft-hover transition-all flex flex-col justify-between ${
                  isStudentNotebookLM ? 'border-academic-400 ring-2 ring-academic-100' : 'border-slate-200/90'
                }`}
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

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-bold text-academic-700 bg-academic-50 px-2 py-0.5 rounded-md border border-academic-100 inline-block">
                      רמה: {tut.difficulty} • {tut.category}
                    </span>
                    {tut.targetAudience && (
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 inline-block">
                        {tut.targetAudience}
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-base text-slate-900 mb-2 leading-snug">
                    {tut.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {tut.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-auto">
                  <p className="text-[11px] text-slate-500 mb-3 truncate">
                    מרצה/מדריך: <strong className="text-slate-700">{tut.instructor}</strong>
                  </p>

                  {isStudentNotebookLM ? (
                    <button
                      onClick={scrollToPlayer}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-academic-700 hover:bg-academic-800 rounded-xl transition-colors shadow-sm cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>צפייה בסרטון הווידאו המלא</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => alert(`פתיחת הדרכה: "${tut.title}"\nהמערכת מנתבת למרכז ההקלטות המוסדי.`)}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-academic-800 bg-academic-50 hover:bg-academic-100 hover:text-academic-900 rounded-xl transition-colors border border-academic-200 cursor-pointer"
                    >
                      <span>{tut.linkText || 'צפייה בהדרכה'}</span>
                      <ExternalLink className="w-3.5 h-3.5 rtl:rotate-180" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Academic Prompts Repository */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-soft">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-academic-100 text-academic-800 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5 text-academic-700" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              תבניות פרומפטים אקדמיים מוכנים להעתקה
            </h3>
            <p className="text-xs text-slate-500">
              נוסחאות מובנות שהוכחו כיעילות בעבודה מחקרית, הוראתית ולימודית מול מודלי שפה (ChatGPT, Claude, NotebookLM)
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

                <h4 className="font-bold text-sm text-slate-800 mb-2">
                  {item.title}
                </h4>

                <pre className="text-xs font-sans text-slate-700 bg-white p-3 rounded-xl border border-slate-200/60 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-48 scrollbar-none font-medium" dir="auto">
                  {item.prompt}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Syllabus Guidelines Download Card */}
      <section className="bg-academic-50 border border-academic-200 rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
      </section>
    </div>
  );
};

export default TutorialsView;
