import React from 'react';
import { Search, User, Briefcase, FileText, Image as ImageIcon } from 'lucide-react';

export const CommandMenu = ({ isCmdOpen, setIsCmdOpen, isLight, cmdSearch, setCmdSearch, handleNavigate, navOptions, currentView, uiClasses }) => {
  if (!isCmdOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-start justify-center pt-[15vh]">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setIsCmdOpen(false)}></div>
      <div className={`relative w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700'}`}>
        <div className={`flex items-center px-4 border-b ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
          <Search size={18} className="text-slate-500" />
          <input 
            autoFocus
            type="text" 
            placeholder="Gõ lệnh hoặc tìm kiếm..." 
            className={`w-full bg-transparent border-none p-4 text-sm focus:outline-none focus:ring-0 ${isLight ? 'text-slate-900 placeholder-slate-400' : 'text-white placeholder-slate-500'}`}
            value={cmdSearch}
            onChange={(e) => setCmdSearch(e.target.value)}
          />
          <div className="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-1 rounded">ESC</div>
        </div>
        <div className="p-2 max-h-80 overflow-y-auto">
          <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Menu Điều Hướng</div>
          {navOptions.filter(opt => opt.title.toLowerCase().includes(cmdSearch.toLowerCase()) || opt.desc.toLowerCase().includes(cmdSearch.toLowerCase())).map(opt => (
            <button 
              key={opt.id}
              onClick={() => handleNavigate(opt.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors ${currentView === opt.id ? 'bg-[var(--primary-alpha)] text-[var(--primary)]' : isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-slate-800 text-slate-300'}`}
            >
              <div className={`p-2 rounded-lg ${currentView === opt.id ? 'bg-[var(--primary)] text-white' : isLight ? 'bg-slate-200 text-slate-600' : 'bg-slate-800 text-slate-400'}`}>
                {opt.icon}
              </div>
              <div>
                <div className="text-sm font-semibold">{opt.title}</div>
                <div className={`text-xs ${uiClasses.textMuted}`}>{opt.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
