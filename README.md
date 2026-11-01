# פורטל כלי AI ומרכז ידע אקדמי לסגל (AI Tools Portal & Academic Knowledge Center)

פורטל מתקדם ומודולרי המיועד לחברי סגל אקדמי (הוראה, מחקר ומנהלה), המאגד כלי בינה מלאכותית יוצרת (GenAI) מאושרים, מקרי בוחן של עמיתים, הדרכות יישומיות ומדיניות אתיקה מוסדית.

---

## 🚀 תכונות מרכזיות (Key Features)

1. **מבנה מודולרי וניווט רב-לשוני בעברית מלאה (RTL):**
   - **דשבורד ראשי (Dashboard):** מדדי מפתח מוסדיים, כלי AI מומלצים לפתיחת סמסטר, תמצית מקרי בוחן אחרונים, עקרונות מדיניות ואתיקה, וסדנאות קרובות.
   - **קטלוג כלי AI (AI Tools Catalog):** קטלוג של כלי AI מובילים (ChatGPT Edu, Claude 3.5 Sonnet, NotebookLM, Consensus, Google Gemini, Perplexity ועוד).
     - סינון קטגוריות מהיר (מחקר ואיסוף מידע, כתיבה ועריכה אקדמית, הוראה ולמידה, מנהלה ותפעול).
     - סינון לפי רמת רישוי מוסדי (רישיון מלא, גרסה מאושרת, פיילוט בבחינה).
     - חיפוש טקסטואלי חי בזמן אמת.
   - **מקרי בוחן (Use Cases):** מאגר יוזמות סגל אותנטיות הכוללות מתודולוגיה אקדמית ותוצאות מדודות + אפשרות לחברי סגל להגיש מקרה בוחן חדש.
   - **מרכז הדרכות (Tutorials):** סדנאות מוקלטות, הנחיות סילבוס להורדה, ותבניות פרומפטים אקדמיים מוכנים להעתקה בלחיצה אחת.

2. **עיצוב וסגנון אקדמי פרימיום (Tailwind CSS):**
   - פלטפורמה מעוצבת בגווני כחול-אקדמי עמוק, אפור נקי, כרטיסים בעלי צללים רכים (`shadow-soft`), ותגיות רישוי ייעודיות.
   - תמיכה מלאה בתצוגת מובייל ודסקטופ (סרגל צד בדסקטופ, מגירת ניווט וסרגל תחתון במובייל).
   - טיפוגרפיה מותאמת עברית בעזרת גופני Google Fonts (Assistant & Rubik).

3. **מודל נתונים מרכזי (`src/data/mockData.ts`):**
   - מבנה נתונים טיפוסי ב-TypeScript (`src/types/index.ts`) לכלים, מקרי בוחן, הדרכות והנחיות אתיקה.

---

## 📁 מבנה הפרויקט (Project Structure)

```text
AI portal/
├── index.html                   # הגדרות HTML, תמיכת RTL וגופני Google Fonts
├── package.json                 # תלויות הפרויקט (React, Vite, Tailwind, Lucide)
├── tailwind.config.js           # הגדרות Tailwind, גווני Academic וצללים
├── src/
│   ├── main.tsx                 # נקודת כניסה של React
│   ├── App.tsx                  # ניהול מצב ניווט, חיפוש גלובלי ומודאלים
│   ├── index.css                # הגדרות Tailwind בסיסיות ועיצוב גלילה
│   ├── types/
│   │   └── index.ts             # הגדרות ממשקים וטיפוסים (AITool, UseCase, Tutorial...)
│   ├── data/
│   │   └── mockData.ts          # נתוני מוק מרכזיים (כלים, מקרים, מדריכים, סטטיסטיקות)
│   ├── components/
│   │   ├── Sidebar.tsx          # סרגל ניווט צדדי ראשי (דסקטופ ומובייל)
│   │   ├── Header.tsx           # כותרת עליונה עם חיפוש ופרופיל סגל
│   │   ├── ToolCard.tsx         # כרטיס כלי AI עשיר עם תגיות רישוי ופעולות
│   │   ├── ToolDetailModal.tsx  # חלון מודאלי להנחיות אתיקה ומידע מפורט
│   │   └── CategoryFilter.tsx   # רכיב כפתורי סינון קטגוריות
│   ├── layouts/
│   │   └── MainLayout.tsx       # מעטפת עמוד ריספונסיבית עם ניווט תחתון ומודאל בקשות
│   └── views/
│       ├── DashboardView.tsx    # דשבורד ראשי
│       ├── CatalogView.tsx      # קטלוג כלי AI וסינונים
│       ├── UseCasesView.tsx     # מקרי בוחן אקדמיים והגשת מקרה חדש
│       └── TutorialsView.tsx    # מרכז הדרכות ומאגר פרומפטים אקדמיים
```

---

## 🛠️ הרצה מקומית (Getting Started)

1. **התקנת תלויות (אם נדרש):**
   ```bash
   npm install
   ```

2. **הרצת שרת פיתוח:**
   ```bash
   npm run dev
   ```
   הפורטל יהיה זמין בכתובת: `http://localhost:5173/`

3. **בנייה לפרודקשן (Production Build):**
   ```bash
   npm run build
   ```

---

## 🌐 פריסה בענן (Deploy to Render)

הפרויקט מוגדר לפריסה ישירה ואוטומטית כ-**Static Site** ב-Render באמצעות קובץ הקונפיגורציה `render.yaml`.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/avivii/ai-tools-portal)

### הגדרות לפריסה ידנית ב-Render:
- **Environment:** `Static Site`
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- **Rewrite Rule:** `/*` -> `/index.html` (תומך ב-SPA Client-side routing)

