import React from 'react';
import type { CategoryKey } from '../types';
import { CATEGORIES } from '../data/mockData';
import { 
  Grid, 
  Microscope, 
  PenTool, 
  GraduationCap, 
  FileText 
} from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: CategoryKey;
  onSelectCategory: (cat: CategoryKey) => void;
  toolCounts: Record<CategoryKey, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  toolCounts,
}) => {
  const getCategoryIcon = (id: CategoryKey) => {
    const iconClass = "w-4 h-4";
    switch (id) {
      case 'all': return <Grid className={iconClass} />;
      case 'research': return <Microscope className={iconClass} />;
      case 'writing': return <PenTool className={iconClass} />;
      case 'teaching': return <GraduationCap className={iconClass} />;
      case 'administration': return <FileText className={iconClass} />;
    }
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        const count = toolCounts[cat.id] || 0;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
              isSelected
                ? 'bg-academic-700 text-white shadow-md shadow-academic-700/20'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {getCategoryIcon(cat.id)}
            <span>{cat.label}</span>
            <span
              className={`text-[11px] px-1.5 py-0.5 rounded-full font-mono ${
                isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
