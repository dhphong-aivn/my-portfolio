import React from 'react';
import { Search, User, Briefcase, FileText, Image as ImageIcon } from 'lucide-react';

export const CommandMenu = ({ isCmdOpen, setIsCmdOpen, cmdSearch, setCmdSearch, handleNavigate, navOptions, currentView, uiClasses }) => {
  if (!isCmdOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-start justify-center pt-[15vh]">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsCmdOpen(false)}></div>
      <div className={`relative w-full max-w-lg rounded-xl border-2 shadow-solid-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 bg-surface-container-lowest border-on-surface`}>
        <div className={`flex items-center px-6 py-2 border-b-2 border-on-surface`}>
          <Search size={20} className="text-primary" />
          <input 
            autoFocus
            type="text" 
            placeholder="Type a command or search..." 
            className={`w-full bg-transparent border-none p-4 text-base focus:outline-none focus:ring-0 text-on-surface font-medium placeholder-on-surface-variant/50`}
            value={cmdSearch}
            onChange={(e) => setCmdSearch(e.target.value)}
          />
          <div className="text-[10px] font-bold bg-surface-container-high border-2 border-on-surface text-on-surface-variant px-2 py-1 rounded-sm tracking-wider">ESC</div>
        </div>
        <div className="p-3 max-h-80 overflow-y-auto">
          <div className="px-4 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-widest font-serif">Navigation</div>
          {navOptions.filter(opt => opt.title.toLowerCase().includes(cmdSearch.toLowerCase()) || opt.desc.toLowerCase().includes(cmdSearch.toLowerCase())).map(opt => (
            <button 
              key={opt.id}
              onClick={() => {
                handleNavigate(opt.id);
                setIsCmdOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-left transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary ${currentView === opt.id ? 'bg-primary/20 border-2 border-primary shadow-solid-sm' : 'hover:bg-surface-container-high border-2 border-transparent hover:border-on-surface'}`}
            >
              <div className={`p-2.5 rounded-lg border-2 ${currentView === opt.id ? 'bg-primary text-on-primary border-primary' : 'bg-surface border-on-surface text-primary group-hover:bg-primary/10'}`}>
                {opt.icon}
              </div>
              <div>
                <div className={`text-base font-bold font-serif ${currentView === opt.id ? 'text-primary' : 'text-on-surface'}`}>{opt.title}</div>
                <div className={`text-sm font-medium ${currentView === opt.id ? 'text-primary/70' : 'text-on-surface-variant'}`}>{opt.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
