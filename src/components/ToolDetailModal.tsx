import React from 'react';
import type { AITool } from '../types';
import { 
  X, 
  ExternalLink, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  Users, 
  Building2,
  FileCheck2
} from 'lucide-react';

interface ToolDetailModalProps {
  tool: AITool | null;
  onClose: () => void;
}

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({ tool, onClose }) => {
  if (!tool) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-xs"
              style={{ backgroundColor: tool.accentColor }}
            >
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{tool.name}</h2>
              <p className="text-xs text-slate-500">{tool.englishName} • {tool.provider}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
            aria-label="סגור חלון"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Institutional Status Banner */}
          <div className="bg-academic-50 border border-academic-200/80 rounded-2xl p-4 flex items-start gap-3">
            <Building2 className="w-5 h-5 text-academic-700 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-academic-900 mb-1">
                סטטוס רישוי מוסדי: {tool.institutionalLicense}
              </h4>
              <p className="text-xs text-academic-700 leading-relaxed">
                כלי זה נבדק על ידי המרכז לחדשנות אקדמית ואושר לשימושי הוראה ומחקר בהתאם למגבלות המפורטות להלן.
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">תיאור הכלי</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {tool.description}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">יכולות מפתח</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tool.keyFeatures.map((feat, index) => (
                <li key={index} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended For */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-academic-600" />
              קהל יעד מומלץ בסגל
            </h3>
            <div className="flex flex-wrap gap-2">
              {tool.recommendedFor.map((rec) => (
                <span key={rec} className="text-xs bg-slate-100 text-slate-800 font-medium px-3 py-1 rounded-full border border-slate-200">
                  {rec}
                </span>
              ))}
            </div>
          </div>

          {/* Ethical & Security Guidelines */}
          <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-4">
            <h4 className="text-sm font-bold text-amber-900 mb-1 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
              הנחיות אתיקה, אבטחת מידע וציטוט
            </h4>
            <p className="text-xs text-amber-800 leading-relaxed mb-2">
              {tool.ethicalConsiderations}
            </p>
            <div className="text-[11px] text-amber-900 flex items-center gap-1.5 font-medium">
              <FileCheck2 className="w-3.5 h-3.5 text-amber-700" />
              יש לכלול הצהרת שימוש (AI Disclosure) בהתאם לתקנון המחקר המוסדי.
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-100 px-6 py-4 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            חזרה לפורטל
          </button>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-academic-600 hover:bg-academic-700 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <span>כניסה לכלי עם SSO מוסדי</span>
            <ExternalLink className="w-4 h-4 rtl:rotate-180" />
          </a>
        </div>
      </div>
    </div>
  );
};
