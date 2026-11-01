import React from 'react';
import type { AITool } from '../types';
import { 
  ExternalLink, 
  Info, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Sparkles,
  BookOpen,
  Microscope,
  PenTool,
  GraduationCap,
  FileText,
  Bot,
  Cpu,
  Compass,
  Layers
} from 'lucide-react';

interface ToolCardProps {
  tool: AITool;
  onOpenDetails: (tool: AITool) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onOpenDetails }) => {
  // Render appropriate icon based on tool
  const renderIcon = () => {
    const props = { className: "w-6 h-6 text-white" };
    switch (tool.iconName) {
      case 'Bot': return <Bot {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'BookOpen': return <BookOpen {...props} />;
      case 'Search': return <Compass {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'Compass': return <Compass {...props} />;
      case 'CheckCircle2': return <PenTool {...props} />;
      case 'Layers': return <Layers {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  const renderLicenseBadge = () => {
    switch (tool.licenseType) {
      case 'institutional':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            {tool.institutionalLicense}
          </span>
        );
      case 'free-approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {tool.institutionalLicense}
          </span>
        );
      case 'pilot':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5" />
            {tool.institutionalLicense}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <AlertCircle className="w-3.5 h-3.5" />
            {tool.institutionalLicense}
          </span>
        );
    }
  };

  const getCategoryIcon = (category: string) => {
    const iconClass = "w-3.5 h-3.5";
    switch (category) {
      case 'research': return <Microscope className={iconClass} />;
      case 'writing': return <PenTool className={iconClass} />;
      case 'teaching': return <GraduationCap className={iconClass} />;
      case 'administration': return <FileText className={iconClass} />;
      default: return <Sparkles className={iconClass} />;
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-academic-300 p-5 shadow-soft hover:shadow-soft-hover transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm shrink-0 transition-transform group-hover:scale-105"
              style={{ backgroundColor: tool.accentColor }}
            >
              {renderIcon()}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-academic-700 transition-colors">
                  {tool.name}
                </h3>
                <span className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-mono">
                  {tool.provider}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">{tool.englishName}</p>
            </div>
          </div>
        </div>

        {/* License Badge & Category */}
        <div className="flex flex-wrap items-center gap-2 my-2.5">
          {renderLicenseBadge()}
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
            {getCategoryIcon(tool.category)}
            {tool.categoryLabel}
          </span>
        </div>

        {/* Tagline */}
        <p className="text-sm font-medium text-slate-700 mb-2 mt-1">
          {tool.tagline}
        </p>

        {/* Description */}
        <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
          {tool.description}
        </p>

        {/* Academic Use Case Snapshot */}
        <div className="bg-academic-50/70 border border-academic-100 rounded-xl p-3 mb-4">
          <p className="text-xs font-bold text-academic-900 flex items-center gap-1.5 mb-1">
            <GraduationCap className="w-3.5 h-3.5 text-academic-700" />
            שימוש מומלץ באקדמיה:
          </p>
          <p className="text-xs text-academic-800 leading-normal">
            {tool.academicUse}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-100"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-slate-100 flex items-center gap-2 mt-auto">
        <button
          onClick={() => onOpenDetails(tool)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-xl transition-colors"
        >
          <Info className="w-3.5 h-3.5 text-slate-500" />
          פרטים והנחיות
        </button>

        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 py-2 px-3.5 text-xs font-semibold text-white bg-academic-600 hover:bg-academic-700 rounded-xl transition-all shadow-sm hover:shadow"
        >
          <span>כניסה לכלי</span>
          <ExternalLink className="w-3.5 h-3.5 rtl:rotate-180" />
        </a>
      </div>
    </div>
  );
};
