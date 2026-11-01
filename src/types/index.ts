export type CategoryKey = 'all' | 'research' | 'writing' | 'teaching' | 'administration';

export type LicenseType = 'institutional' | 'free-approved' | 'pilot' | 'approval-needed';

export interface AITool {
  id: string;
  name: string;
  englishName: string;
  tagline: string;
  category: 'research' | 'writing' | 'teaching' | 'administration';
  categoryLabel: string;
  description: string;
  keyFeatures: string[];
  academicUse: string;
  institutionalLicense: string;
  licenseType: LicenseType;
  url: string;
  tags: string[];
  iconName: string;
  accentColor: string;
  recommendedFor: string[];
  ethicalConsiderations: string;
  isFeatured?: boolean;
  rating: number;
  provider: string;
}

export type UseCaseCategory = 'academic' | 'admin' | 'students';

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
  toolUsed?: string;
  summary?: string;
}

export interface Tutorial {
  id: string;
  title: string;
  category: 'פרומפטים' | 'אתיקה ומדיניות' | 'הוראה ולמידה' | 'מחקר וכתיבה';
  difficulty: 'בסיסי' | 'מתקדם' | 'מומחה';
  durationMinutes: number;
  description: string;
  instructor: string;
  format: 'סרטון מוקלט' | 'מדריך כתוב' | 'סדנה חיה';
  downloadUrl?: string;
  linkText?: string;
}

export type NavView = 'dashboard' | 'catalog' | 'use-cases' | 'tutorials';

export interface NavItem {
  id: NavView;
  label: string;
  icon: string;
  badge?: string;
}
