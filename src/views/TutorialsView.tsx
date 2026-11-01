import React, { useState, useMemo } from 'react';
import { VIDEO_TUTORIALS, type VideoTutorial } from '../data/videoTutorialsData';
import { 
  GraduationCap, 
  Users, 
  Clock, 
  Copy, 
  Check, 
  FileText, 
  Sparkles, 
  Download,
  Play,
  CheckCircle2,
  Building2,
  PlayCircle,
  Film,
  Search,
  RotateCcw
} from 'lucide-react';

type AudienceFilter = 'all' | 'academic' | 'admin' | 'students';

export const TutorialsView: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<VideoTutorial>(VIDEO_TUTORIALS[0]);
  const [selectedAudience, setSelectedAudience] = useState<AudienceFilter>('all');
  const [videoSearch, setVideoSearch] = useState<string>('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Audience tabs
  const audienceTabs: { id: AudienceFilter; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'כל הסרטונים', icon: <Film className="w-4 h-4" /> },
    { id: 'academic', label: 'סגל אקדמי וחוקרים', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'admin', label: 'סגל מנהלי ותפעולי', icon: <Building2 className="w-4 h-4" /> },
    { id: 'students', label: 'סטודנטים', icon: <Users className="w-4 h-4" /> },
  ];

  // Filter video playlist
  const filteredVideos = useMemo(() => {
    return VIDEO_TUTORIALS.filter((v) => {
      if (selectedAudience !== 'all' && v.targetAudienceType !== selectedAudience) {
        return false;
      }
      if (videoSearch.trim()) {
        const q = videoSearch.toLowerCase();
        const matchesTitle = v.title.toLowerCase().includes(q);
        const matchesSummary = v.summary.toLowerCase().includes(q);
        const matchesTool = v.tool.toLowerCase().includes(q);
        const matchesInstructor = v.instructor.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSummary && !matchesTool && !matchesInstructor) {
          return false;
        }
      }
      return true;
    });
  }, [selectedAudience, videoSearch]);

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

  const getAudienceBadgeClass = (type: string) => {
    switch (type) {
      case 'academic': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'admin': return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'students': return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-academic-50 text-academic-800 text-xs font-semibold mb-3 border border-academic-200">
            <GraduationCap className="w-3.5 h-3.5 text-academic-600" />
            <span>מרכז הידע וההדרכות לסגל ולסטודנטים</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
            מרכז הדרכות וידאו ומאגר פרומפטים אקדמי
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            ספריית וידאו מקיפה המבוססת על סרטוני הדרכה מקומיים מהשטח, הדגמות מעשיות על גבי כלי ה-AI המאושרים, ונוסחאות פרומפטים מוכנות להעתקה.
          </p>
        </div>

        {/* Video Filters & Search */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            {audienceTabs.map((tab) => {
              const isSelected = selectedAudience === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedAudience(tab.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-academic-700 text-white shadow-md shadow-academic-700/20'
                      : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={videoSearch}
              onChange={(e) => setVideoSearch(e.target.value)}
              placeholder="חיפוש סרטון או מרצה..."
              className="w-full pl-4 pr-9 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-academic-100 focus:border-academic-500 transition-all text-slate-800 placeholder-slate-400"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Video Knowledge Hub Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-academic-700 text-white flex items-center justify-center shadow-sm">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <span>מאגר סרטוני הדרכה (Video Knowledge Hub)</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-academic-50 text-academic-700 border border-academic-200 font-mono">
                  {filteredVideos.length} סרטונים
                </span>
              </h2>
              <p className="text-xs text-slate-500">הקש על כל סרטון ברשימה כדי לצפות בו בנגן הראשי</p>
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Layout: Active Video Player + Playlist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Active Video Player Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* HTML5 Video Player Frame */}
            <div className="relative rounded-3xl overflow-hidden bg-slate-950 shadow-2xl border border-slate-800 group">
              <video
                key={activeVideo.id}
                src={activeVideo.videoUrl}
                controls
                playsInline
                className="w-full aspect-video object-cover bg-black rounded-3xl"
              >
                <source src={activeVideo.videoUrl} type="video/mp4" />
                דפדפנך אינו תומך בהפעלת קבצי וידאו HTML5.
              </video>
            </div>

            {/* Active Video Metadata Details */}
            <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/70 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getAudienceBadgeClass(activeVideo.targetAudienceType)}`}>
                    {activeVideo.targetAudience}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-academic-50 text-academic-800 border border-academic-200">
                    <Sparkles className="w-3 h-3 text-academic-600" />
                    {activeVideo.tool}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {activeVideo.duration} דק'
                  </span>
                  <span>•</span>
                  <span>{activeVideo.publishDate}</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {activeVideo.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {activeVideo.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {activeVideo.summary}
              </p>

              {/* Key Takeaways */}
              {activeVideo.keyTakeaways && activeVideo.keyTakeaways.length > 0 && (
                <div className="pt-3 border-t border-slate-200/60">
                  <h4 className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    נקודות מפתח ומיומנויות שנלמדו בהדרכה:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeVideo.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-academic-600 mt-1.5 shrink-0"></span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Instructor footer */}
              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-academic-100 text-academic-800 flex items-center justify-center font-bold text-xs">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">{activeVideo.instructor}</span>
                    <span className="text-slate-500 text-[11px] block">{activeVideo.instructorRole}</span>
                  </div>
                </div>

                <span className="text-[11px] text-slate-400 font-mono">
                  {activeVideo.viewsCount} צפיות בסגל
                </span>
              </div>
            </div>
          </div>

          {/* Playlist & Video Cards Column (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between pb-2">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-academic-700" />
                <span>רשימת סרטונים זמינים לצפייה</span>
              </h3>
              <span className="text-xs text-slate-500">
                {filteredVideos.length} תוצאות
              </span>
            </div>

            <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200">
              {filteredVideos.map((video) => {
                const isCurrentActive = activeVideo.id === video.id;

                return (
                  <button
                    key={video.id}
                    onClick={() => setActiveVideo(video)}
                    className={`w-full text-right p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isCurrentActive
                        ? 'bg-academic-50/80 border-academic-400 shadow-md ring-2 ring-academic-200/70'
                        : 'bg-slate-50/60 hover:bg-slate-100/80 border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      {/* Top meta tags */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getAudienceBadgeClass(video.targetAudienceType)}`}>
                          {video.targetAudience}
                        </span>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200/60 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {video.duration}
                          </span>
                          {isCurrentActive && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 animate-pulse">
                              מנגן כעת
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Video Title */}
                      <div className="flex items-start gap-2.5 mb-1.5">
                        <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                          isCurrentActive ? 'bg-academic-700 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </div>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                          {video.title}
                        </h4>
                      </div>

                      {/* Short summary */}
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-2 mr-9">
                        {video.summary}
                      </p>
                    </div>

                    {/* Tool tag & instructor */}
                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 mr-9">
                      <span className="font-semibold text-academic-800">{video.tool}</span>
                      <span>{video.instructor}</span>
                    </div>
                  </button>
                );
              })}

              {filteredVideos.length === 0 && (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="text-xs text-slate-500 mb-3">לא נמצאו סרטונים התואמים את הסינון.</p>
                  <button
                    onClick={() => { setSelectedAudience('all'); setVideoSearch(''); }}
                    className="text-xs font-bold text-academic-700 hover:underline inline-flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    איפוס סינונים
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Academic Prompts Repository */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-soft">
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
