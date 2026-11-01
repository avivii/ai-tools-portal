export interface UseCase {
    id: string;
    category: 'academic' | 'admin' | 'students';
    categoryLabel: string;
    title: string;
    problem: string;
    recommendedTool: string;
    promptTemplate: string;
    facultyMember?: string;
    department?: string;
    methodology?: string;
    results?: string;
    tags?: string[];
    date?: string;
}

export const useCasesData: UseCase[] = [
    // --- סגל אקדמי וחוקרים ---
    {
        id: 'academic-1',
        category: 'academic',
        categoryLabel: 'סגל אקדמי וחוקרים',
        title: 'ניתוח וזיקוק מאמרי מחקר (IEEE / arXiv)',
        problem: 'צורך לעבור על עשרות מאמרים טכניים בשבוע ולסנן רלוונטיות למחקר שגוזל שעות קריאה רבות.',
        recommendedTool: 'Claude 3.5 Sonnet / NotebookLM',
        facultyMember: 'פרופ\' רחל מנצור',
        department: 'הפקולטה להנדסת חשמל ומחשבים',
        tags: ['מאמרי מחקר', 'arXiv', 'IEEE', 'סקירת ספרות'],
        date: 'נובמבר 2026',
        promptTemplate: `Act as an academic research assistant in Electrical and Computer Engineering. I am uploading a research paper PDF. Please analyze it and provide a structured summary in Hebrew (keep technical terms in English):
1. Core Problem: What specific engineering/theoretical gap is this paper addressing?
2. Methodology & Architecture: How did they solve it? (Explain the model, setup, or algorithm).
3. Key Results & Metrics: What are the quantitative improvements over current state-of-the-art (SOTA)?
4. Limitations: What are the bottlenecks or failure cases mentioned by the authors?
5. Relevance check: I am currently researching [הכנס נושא מחקר]. Highlight how this paper connects to my topic.`
    },
    {
        id: 'academic-2',
        category: 'academic',
        categoryLabel: 'סגל אקדמי וחוקרים',
        title: 'יצירת וריאציות למבחנים ומחוון בדיקה (Rubric)',
        problem: 'צורך בחיבור שאלות בחינה חדשות באותה רמת קושי והגדרת מחוון מפורט לבודקים ולמתרגלים.',
        recommendedTool: 'ChatGPT (GPT-4o / o1)',
        facultyMember: 'ד"ר יואב אלון',
        department: 'הפקולטה למדעי המחשב',
        tags: ['הוראה ומבחנים', 'רובריקות', 'טקסונומיית בלום', 'מחוון'],
        date: 'אוקטובר 2026',
        promptTemplate: `You are a senior university professor in Electrical and Computer Engineering at the Technion. 
Here is a past exam question on [הכנס נושא, למשל: התמרת פורייה / מעגלים לוגיים]:
"[הדבק כאן את השאלה המקורית]"

Task:
1. Create 2 new variations of this question testing the same concepts and difficulty level, but changing parameters/scenarios to prevent copying.
2. Provide a step-by-step mathematical/logical solution for each variation.
3. Create a detailed grading rubric (מחוון בדיקה) totaling [X] points with exact point deductions for common errors. Output in Hebrew.`
    },
    {
        id: 'academic-3',
        category: 'academic',
        categoryLabel: 'סגל אקדמי וחוקרים',
        title: 'שכתוב וליטוש הצעות מחקר לקרנות (Grants)',
        problem: 'ניסוח תקציר ופרק השפעה (Impact) באנגלית אקדמית משכנעת, חדה ותחרותית לקרנות בינלאומיות.',
        recommendedTool: 'Claude 3.5 Sonnet',
        facultyMember: 'פרופ\' יונתן ברק',
        department: 'הפקולטה להנדסה ומדעים מדויקים',
        tags: ['הצעות מחקר', 'קרנות מחקר', 'ERC', 'ISF'],
        date: 'ספטמבר 2026',
        promptTemplate: `Act as an expert scientific grant editor for competitive funding bodies (like ERC and ISF). Review the following draft paragraph from my research proposal in [הכנס תחום מחקר]:
"[הדבק טיוטה באנגלית]"

Please rewrite this text in high-level academic English to:
1. Maximize clarity, flow, and persuasiveness without altering scientific meaning.
2. Strongly emphasize the novelty and potential impact of the proposed research.
3. Provide 2 versions: one concise (under 150 words) and one detailed. List 3 potential reviewer critiques.`
    },
    {
        id: 'academic-4',
        category: 'academic',
        categoryLabel: 'סגל אקדמי וחוקרים',
        title: 'הצלבת מאמרי מקור ומיפוי נרטיבים בארכיונים',
        problem: 'צורך למיין עשרות קבצי מקור סרוקים, לחלץ מוטיבים חוזרים ולבנות ציר זמן מדויק עם מראי מקום.',
        recommendedTool: 'NotebookLM',
        facultyMember: 'פרופ\' מיכל כהן',
        department: 'החוג להיסטוריה ולימודי תרבות',
        tags: ['ארכיונים', 'ניתוח מקורות', 'פודקאסט שמע'],
        date: 'אוקטובר 2026',
        promptTemplate: `Act as an academic research assistant. Based strictly on the uploaded source documents:
1. Identify recurring historical themes and divergent narratives between the authors.
2. Build a chronological timeline referencing exact page numbers and document titles.
3. Generate a comparative synthesis highlighting 3 points of consensus and 2 points of dispute.`
    },
    {
        id: 'academic-5',
        category: 'academic',
        categoryLabel: 'סגל אקדמי וחוקרים',
        title: 'סקירת ספרות מטא-אנליטית מבוססת ראיות שפיטות',
        problem: 'בדיקת קונצנזוס מדעי מהיר על השערת מחקר חדשה ומיפוי 100+ מאמרים אחרונים בכתבי עת שפיטים.',
        recommendedTool: 'Consensus',
        facultyMember: 'ד"ר שירה בן-דוד',
        department: 'הפקולטה להנדסת חומרים',
        tags: ['מאמרים שפיטים', 'מטא-אנליזה', 'קונצנזוס מדעי'],
        date: 'יולי 2026',
        promptTemplate: `Synthesize the current peer-reviewed evidence regarding: [הכנס שאלת מחקר].
Provide a structured overview with:
1. Consensus percentage and sample sizes from clinical/empirical studies.
2. Key methodological trade-offs between existing models.
3. Recommended citation list formatted in BibTeX.`
    },

    // --- סגל מנהלי ותפעולי ---
    {
        id: 'admin-1',
        category: 'admin',
        categoryLabel: 'סגל מנהלי ותפעולי',
        title: 'מענה שירותי ומדויק לפניות סטודנטים',
        problem: 'עומס מאות פניות במזכירות סביב תקופת רישום, מילואים ובקשות חריגות המחייבות תשובה מהירה לפי נהלים.',
        recommendedTool: 'ChatGPT / Gemini',
        facultyMember: 'מזכירות לימודי הסמכה',
        department: 'הפקולטה להנדסת חשמל ומחשבים',
        tags: ['שירות לסטודנט', 'נהלים ותקנון', 'מילואים', 'רישום קורסים'],
        date: 'נובמבר 2026',
        promptTemplate: `אתה עוזר חכם במזכירות לימודי הסמכה בפקולטה להנדסת חשמל ומחשבים בטכניון. 
להלן פנייה שהתקבלה מסטודנט/ית:
"[הדבק את המייל של הסטודנט]"

ולהלן סעיף הנוהל הרלוונטי מתקנון הפקולטה:
"[הדבק את הכלל הרלוונטי, למשל: מועדים מיוחדים או קורסי קדם]"

נסח מייל תשובה רשמי, אדיב וברור בעברית:
1. מענה ישיר לבקשה בהתבסס אך ורק על הנוהל המצורף.
2. פירוט ממוספר של מסמכים או צעדים נדרשים מהסטודנט.
3. שמירה על טון תומך ומכבד.`
    },
    {
        id: 'admin-2',
        category: 'admin',
        categoryLabel: 'סגל מנהלי ותפעולי',
        title: 'סיכום ישיבות ועדות והפקת טבלת משימות (Action Items)',
        problem: 'ישיבות צוות וועדות הוראה ממושכות הדורשות הפקת סיכום מנהלים וחלוקת משימות ללא בזבוז שעות עבודה.',
        recommendedTool: 'Gemini / Microsoft Copilot',
        facultyMember: 'ריכוז ועדות הוראה',
        department: 'מינהל אקדמי',
        tags: ['סיכום ישיבות', 'טבלת משימות', 'פרוטוקול', 'ניהול משימות'],
        date: 'אוקטובר 2026',
        promptTemplate: `להלן תמלול/נקודות גולמיות מישיבת צוות בפקולטה בנושא [נושא הישיבה]:
"[הדבק כאן את התמלול או ההערות]"

אנא הפק מסמך סיכום רשמי בעברית הכולל:
1. תקציר מנהלים (3-4 משפטים).
2. החלטות מרכזיות שהתקבלו בנקודות.
3. טבלת משימות להמשך (Action Items) עם עמודות: תיאור משימה, אחראי ביצוע, תאריך יעד.
4. נושאים פתוחים שנותרו לדיון הבא.`
    },
    {
        id: 'admin-3',
        category: 'admin',
        categoryLabel: 'סגל מנהלי ותפעולי',
        title: 'תרגום הודעות רשמיות לקהילה הבינלאומית',
        problem: 'הנגשת הודעות ונהלים פקולטיים לחוקרים וסטודנטים בינלאומיים באנגלית תקנית ומקובלת אקדמית.',
        recommendedTool: 'Claude / ChatGPT',
        facultyMember: 'דסק קשרי חוץ ובינלאומי',
        department: 'מינהל הפקולטה',
        tags: ['תרגום רשמי', 'סטודנטים בינלאומיים', 'הודעות פקולטה'],
        date: 'ספטמבר 2026',
        promptTemplate: `Translate the following official announcement from the Faculty of Electrical and Computer Engineering at the Technion from Hebrew to professional, natural-sounding academic English:
"[הדבק את ההודעה בעברית]"

Ensure Technion-specific academic terms are correctly converted, keeping a welcoming and formal tone.`
    },

    // --- סטודנטים ---
    {
        id: 'student-1',
        category: 'students',
        categoryLabel: 'סטודנטים',
        title: 'הסבר אינטואיטיבי של מושגים מורכבים והוכחות',
        problem: 'קושי בהבנת עקרונות תיאורטיים מופשטים (כמו אותות ומערכות, מל"מ או אלגוריתמים) מההרצאות.',
        recommendedTool: 'ChatGPT / Claude',
        facultyMember: 'סיוע לימודי לתואר ראשון',
        department: 'הוראה ולמידה',
        tags: ['הסבר אינטואיטיבי', 'אותות ומערכות', 'מל"מ', 'טכניון'],
        date: 'נובמבר 2026',
        promptTemplate: `Act as a patient Teaching Assistant (מתרגל) in Electrical and Computer Engineering at the Technion. I am struggling to understand [הכנס מושג, למשל: משפט הדגימה / טרנזיסטור MOSFET].

Please explain this in Hebrew in 3 parts:
1. Intuition: Simple real-world analogy without heavy math explaining why this is needed.
2. The Math/Logic: Step-by-step breakdown of the formula or concept.
3. Common Exam Pitfalls: Highlight common student mistakes and ask 1 short question to test my understanding.`
    },
    {
        id: 'student-2',
        category: 'students',
        categoryLabel: 'סטודנטים',
        title: 'הכוונה בדיבאגינג במעבדות ללא מתן פתרון מלא',
        problem: 'היתקעות של שעות על שגיאות קוד וחומרה (C, Python, SystemVerilog) ללא הבנת שורש התקלה.',
        recommendedTool: 'Claude 3.5 Sonnet / GitHub Copilot',
        facultyMember: 'מעבדות מחשבים וחומרה',
        department: 'הנדסת מחשבים',
        tags: ['דיבאגינג', 'SystemVerilog', 'C / Python', 'רמזים פדגוגיים'],
        date: 'נובמבר 2026',
        promptTemplate: `I am working on an assignment in [שפה, למשל: C / SystemVerilog]. 
Expected behavior: [מה הקוד אמור לבצע]
Error/Bug: "[הדבק שגיאה כאן]"

Code:
\`\`\`
[הדבק קוד כאן]
\`\`\`

IMPORTANT: Do NOT give the full corrected solution. Act as a mentor (in Hebrew):
1. Pinpoint the exact logic or syntax flaw.
2. Explain the mechanism causing it (e.g., memory leak, race condition).
3. Provide a focused hint for me to solve it myself.`
    },
    {
        id: 'student-3',
        category: 'students',
        categoryLabel: 'סטודנטים',
        title: 'הכנת סימולציית תרגול לקראת בחינה עם שאלות מותאמות',
        problem: 'מחסור בשאלות תרגול עדכניות עם פתרון מודרך לקראת תקופת המבחנים.',
        recommendedTool: 'ChatGPT (GPT-4o)',
        facultyMember: 'עוזרי הוראה ומתרגלים',
        department: 'הנדסת חשמל',
        tags: ['הכנה למבחנים', 'שאלות תרגול', 'סימולציה'],
        date: 'אוקטובר 2026',
        promptTemplate: `פעל כמתרגל בכיר בקורס [שם הקורס] בטכניון. 
הצג לי שאלה אחת ברמת מבחן בנושא [נושא מבוקש]. 
אל תציג את הפתרון מיד! המתן לתשובתי, נתח את הצעדים שלי, הצבע על טעויות חישוב או הנחות שגויות, וספק משוב בונה.`
    }
];