import notebookVideoAsset from './videos/notebooklm-learning.mp4';

export interface VideoTutorial {
  id: string;
  title: string;
  subtitle: string;
  tool: string;
  category: 'research' | 'teaching' | 'writing' | 'admin' | 'students';
  categoryLabel: string;
  targetAudience: string;
  targetAudienceType: 'academic' | 'admin' | 'students' | 'all';
  duration: string;
  summary: string;
  keyTakeaways: string[];
  instructor: string;
  instructorRole: string;
  videoUrl: string;
  badge: string;
  publishDate: string;
  viewsCount: number;
}

// Fallback to public path if asset bundle is bypassed
const resolvedNotebookVideo = notebookVideoAsset || '/videos/notebooklm-learning.mp4';

export const VIDEO_TUTORIALS: VideoTutorial[] = [
  {
    id: 'vid-notebooklm',
    title: 'מדריך מעשי: שימוש מתקדם ב-NotebookLM ללמידה ומחקר יעיל',
    subtitle: 'עיגון מקורות, הצלבת מאמרי PDF והפקת סקירות שמע אקדמיות (Audio Overviews)',
    tool: 'NotebookLM (Google)',
    category: 'research',
    categoryLabel: 'מחקר ואיסוף מידע',
    targetAudience: 'סגל אקדמי וחוקרים',
    targetAudienceType: 'academic',
    duration: '04:15',
    summary: 'הדרכת וידאו מעשית וממוקדת המדגימה שלב אחר שלב כיצד להעלות מאמרים ומסמכי מחקר ל-NotebookLM, לחלץ תשובות מדויקות המעוגנות במקור בלבד ללא הזיות (Grounded AI), ולהפיק פודקאסט שמע אקדמי המסכם את החומר לדיונים.',
    keyTakeaways: [
      'העלאת מספר מאמרים במקביל והצלבת טענות ביניהם בלחיצת כפתור',
      'קבלת מראי מקום מדויקים (מספר עמוד וציטוט) לכל תשובה',
      'הפקת Audio Overview (סקירת שמע דו-קולית) ללמידה מהירה',
      'שילוב נוח עם Google Drive וקבצי PDF סרוקים שעברו OCR'
    ],
    instructor: 'ד"ר אלון שפירא',
    instructorRole: 'ראש המרכז לחדשנות בהוראה ומחקר',
    videoUrl: resolvedNotebookVideo,
    badge: 'הדרכה ראשית מוקלטת',
    publishDate: 'נובמבר 2026',
    viewsCount: 428,
  },
  {
    id: 'vid-claude-prompting',
    title: 'הנדסת פרומפטים מתקדמת ב-Claude 3.5 Sonnet לחוקרים',
    subtitle: 'ניתוח ראיונות איכותניים, סקירת מאמרים ארוכים ושימוש ב-Artifacts',
    tool: 'Claude 3.5 Sonnet',
    category: 'writing',
    categoryLabel: 'כתיבה ועריכה אקדמית',
    targetAudience: 'סגל אקדמי',
    targetAudienceType: 'academic',
    duration: '06:30',
    summary: 'כיצד לנצל את חלון ההקשר העצום (200,000 תווים) של Claude לעיבוד ספרים ומאמרים שלמים, הגדרת פרומפטים רב-שלביים לכתיבה מדעית מדויקת ושימוש בלוח העבודה (Artifacts) לעריכת קוד ומסמכים במקביל.',
    keyTakeaways: [
      'בניית פרומפט מחקרי מובנה: תפקיד, הקשר, אילוצים ומבנה פלט',
      'ניתוח תמטי של עשרות תמלולי ראיונות עומק איכותניים',
      'שמירה על ניסוח אקדמי מאופק ומניעת שפה שיווקית מיותרת'
    ],
    instructor: 'פרופ\' יונתן ברק',
    instructorRole: 'חוקר בכיר ומנהל מעבדה',
    videoUrl: resolvedNotebookVideo,
    badge: 'פופולרי בסגל',
    publishDate: 'אוקטובר 2026',
    viewsCount: 312,
  },
  {
    id: 'vid-chatgpt-exams',
    title: 'יצירת וריאציות למבחנים ומחוון בדיקה (Rubric) עם ChatGPT Edu',
    subtitle: 'חיבור שאלות ברמות חשיבה גבוהות (בלום) והגדרת קריטריוני ניקוד אחידים',
    tool: 'ChatGPT Edu (GPT-4o)',
    category: 'teaching',
    categoryLabel: 'הוראה ולמידה',
    targetAudience: 'סגל הוראה ומרצים',
    targetAudienceType: 'academic',
    duration: '05:45',
    summary: 'סדנה מעשית למרצים ועוזרי הוראה: כיצד לחבר גרסאות שונות של אותה שאלת מבחן כדי למנוע העתקות, לבנות מחווני בדיקה מפורטים עם ניקוד מדורג לכל שגיאה, ולפתח שאלות הדורשות חשיבה אנליטית.',
    keyTakeaways: [
      'המרת שאלות שינון לשאלות יישום, ניתוח והערכה ביקורתית',
      'הפקת מחוון בדיקה (Rubric) מפורט עם טבלת הפחתת נקודות',
      'בדיקת מקרי קצה והבטחת קושי מאוזן בין מועדי א\' ו-ב\''
    ],
    instructor: 'ד"ר יואב אלון',
    instructorRole: 'מרצה בכיר ומפתח תוכניות לימוד',
    videoUrl: resolvedNotebookVideo,
    badge: 'מומלץ לסמסטר א\'',
    publishDate: 'אוקטובר 2026',
    viewsCount: 519,
  },
  {
    id: 'vid-admin-workflows',
    title: 'ייעול עבודה משרדית ומענה לפניות סטודנטים ב-Copilot ו-Gemini',
    subtitle: 'סיכומי ועדות, טבלאות Action Items ומענה שירותי מותאם נהלים',
    tool: 'Gemini / Microsoft Copilot',
    category: 'admin',
    categoryLabel: 'מנהלה ותפעול',
    targetAudience: 'סגל מנהלי ותפעולי',
    targetAudienceType: 'admin',
    duration: '04:50',
    summary: 'הדרכה ייעודית למזכירויות, מנהלי תוכניות וצוותי תפעול: הפקת פרוטוקולים מסוכמים מישיבות צוות, ניסוח מיילים רשמיים ואדיבים לסטודנטים לפי תקנוני הפקולטה וניהול משימות מהיר.',
    keyTakeaways: [
      'תמצות תמלולי ישיבות צוות והפקת טבלת משימות עם אחראי ביצוע',
      'התמודדות עם עומסי פניות במזכירות סביב תקופות רישום ומילואים',
      'שמירה על אבטחת מידע ופרטיות נתונים מוסדית'
    ],
    instructor: 'מיכל אהרוני',
    instructorRole: 'מנהלת מערכות מידע ושירות אקדמי',
    videoUrl: resolvedNotebookVideo,
    badge: 'ייעודי למנהלה',
    publishDate: 'ספטמבר 2026',
    viewsCount: 284,
  },
  {
    id: 'vid-student-debugging',
    title: 'מנטורינג AI לסטודנטים: דיבאגינג במעבדות ולמידת מושגים מופשטים',
    subtitle: 'קבלת הכוונה ורמזים לוגיים מבלי לפגוע בלמידה העצמאית',
    tool: 'Claude 3.5 Sonnet / Copilot',
    category: 'students',
    categoryLabel: 'סטודנטים',
    targetAudience: 'סטודנטים ועוזרי הוראה',
    targetAudienceType: 'students',
    duration: '05:15',
    summary: 'הדרכה לסטודנטים על שימוש אתי ויעיל ב-AI: איך להגדיר למודל לשמש כמנטור סוקרטי שאינו מגלה את הפתרון המלא, אלא מסביר מושגים מורכבים בדוגמאות אינטואיטיביות ומכוון לשורש שגיאות בקוד.',
    keyTakeaways: [
      'פרומפט מנטור: "הסבר לי את מנגנון השגיאה ותן רמז במקום קוד מוכן"',
      'פירוק הוכחות ונוסחאות מתמטיות להסברים אינטואיטיביים',
      'שמירה על כללי היושרה האקדמית ומניעת הפרת זכויות'
    ],
    instructor: 'עמית גלבוע',
    instructorRole: 'מתרגל בכיר בפקולטה להנדסה',
    videoUrl: resolvedNotebookVideo,
    badge: 'הדרכת סטודנטים',
    publishDate: 'ספטמבר 2026',
    viewsCount: 640,
  }
];
