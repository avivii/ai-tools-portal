import React, { useState, useMemo } from 'react';
import type { AITool, CategoryKey } from '../types';
import { ToolCard } from '../components/ToolCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { MOCK_TOOLS } from '../data/mockData';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles,
  Layers
} from 'lucide-react';

interface CatalogViewProps {
  onOpenToolDetails: (tool: AITool) => void;
  externalSearchQuery?: string;
  onClearExternalSearch?: () => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  onOpenToolDetails,
  externalSearchQuery = '',
  onClearExternalSearch,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const [selectedLicense, setSelectedLicense] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState<string>('');

  // Active search query combines external and local search
  const activeSearch = (externalSearchQuery || localSearch).trim().toLowerCase();

  // Calculate counts for each category
  const toolCounts = useMemo(() => {
    const counts: Record<CategoryKey, number> = {
      all: MOCK_TOOLS.length,
      research: 0,
      writing: 0,
      teaching: 0,
      administration: 0,
    };

    MOCK_TOOLS.forEach((tool) => {
      if (counts[tool.category] !== undefined) {
        counts[tool.category] += 1;
      }
    });

    return counts;
  }, []);

  // Filter tools
  const filteredTools = useMemo(() => {
    return MOCK_TOOLS.filter((tool) => {
      // Category filter
      if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
        return false;
      }

      // License filter
      if (selectedLicense !== 'all' && tool.licenseType !== selectedLicense) {
        return false;
      }

      // Search query filter
      if (activeSearch) {
        const matchesName = tool.name.toLowerCase().includes(activeSearch);
        const matchesEnglish = tool.englishName.toLowerCase().includes(activeSearch);
        const matchesProvider = tool.provider.toLowerCase().includes(activeSearch);
        const matchesTagline = tool.tagline.toLowerCase().includes(activeSearch);
        const matchesDescription = tool.description.toLowerCase().includes(activeSearch);
        const matchesAcademicUse = tool.academicUse.toLowerCase().includes(activeSearch);
        const matchesTags = tool.tags.some((t) => t.toLowerCase().includes(activeSearch));

        if (!matchesName && !matchesEnglish && !matchesProvider && !matchesTagline && !matchesDescription && !matchesAcademicUse && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, selectedLicense, activeSearch]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedLicense('all');
    setLocalSearch('');
    if (onClearExternalSearch) onClearExternalSearch();
  };

  const isFiltered = selectedCategory !== 'all' || selectedLicense !== 'all' || !!activeSearch;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Catalog Intro Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-academic-600" />
              קטלוג כלי AI אקדמיים
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              סקירה וסינון של כלי בינה מלאכותית מאושרים לשימוש סגל, לפי תחום פעילות ורמת רישוי מוסדי
            </p>
          </div>

          {/* Search bar inside catalog */}
          <div className="w-full md:w-80">
            <div className="relative">
              <input
                type="text"
                value={localSearch || externalSearchQuery}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="חיפוש לפי שם כלי, יכולת או תגית..."
                className="w-full pl-4 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-academic-100 focus:border-academic-500 transition-all text-slate-800 placeholder-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="pt-2 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-500 mb-2.5 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-academic-600" />
            סינון לפי תחום שימוש:
          </p>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            toolCounts={toolCounts}
          />
        </div>

        {/* License Filters */}
        <div className="pt-4 mt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1 ml-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              סטטוס רישוי:
            </span>
            {[
              { id: 'all', label: 'כל הרישיונות' },
              { id: 'institutional', label: 'רישיון מוסדי מלא' },
              { id: 'free-approved', label: 'גרסה חינמית מאושרת' },
              { id: 'pilot', label: 'פיילוט בבחינה' },
            ].map((lic) => (
              <button
                key={lic.id}
                onClick={() => setSelectedLicense(lic.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedLicense === lic.id
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lic.label}
              </button>
            ))}
          </div>

          {/* Reset Filters button if active */}
          {isFiltered && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 text-xs text-academic-700 hover:text-academic-900 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              איפוס סינונים
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          נמצאו <strong className="text-slate-800 font-bold">{filteredTools.length}</strong> כלים מתאימים
        </span>
        {activeSearch && (
          <span>
            תוצאות עבור: <strong className="text-academic-700 font-bold">"{activeSearch}"</strong>
          </span>
        )}
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onOpenDetails={onOpenToolDetails}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-soft">
          <div className="w-16 h-16 rounded-2xl bg-academic-50 text-academic-600 flex items-center justify-center mx-auto mb-4">
            <Filter className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">לא נמצאו כלים התואמים את הסינון</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
            נסה לשנות את מילות החיפוש, לבטל חלק מהמסננים או לבחור בקטגוריה אחרת.
          </p>
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-academic-700 text-white hover:bg-academic-800 transition-colors shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            איפוס כל המסננים
          </button>
        </div>
      )}
    </div>
  );
};
