import React from 'react';
import { Sparkles, Terminal, PenTool, Globe } from 'lucide-react';

export const HomeView = ({ isLight, uiClasses }) => (
  <>
    <div className={`rounded-2xl p-6 backdrop-blur-md transition-all ${uiClasses.card}`}>
      <h2 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
        <Sparkles size={14} className="text-[var(--primary)]" /> Current Identity
      </h2>
      <h3 className={`font-medium text-lg ${isLight ? 'text-slate-800' : 'text-white'}`}>
        Content Strategist & AI Dev
      </h3>
      <p className={`text-sm mt-1 ${uiClasses.textMuted}`}>
        Bridging the gap between human understanding and artificial intelligence.
      </p>
    </div>
    <div className={`rounded-2xl p-6 backdrop-blur-md transition-all ${uiClasses.card}`}>
      <h2 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
        <Globe size={14} className="text-[var(--primary)]" /> Currently Focusing On
      </h2>
      <ul className="space-y-3">
        <li className="flex items-start gap-3">
          <div className={`mt-1 p-1.5 rounded-lg text-[var(--primary)] ${isLight ? 'bg-slate-100' : 'bg-[var(--primary-alpha)]'}`}>
            <PenTool size={16} />
          </div>
          <div>
            <span className={`block text-sm font-medium ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>Writing Direction</span>
            <span className={`text-xs ${uiClasses.textMuted}`}>Defining voice and content strategy</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className={`mt-1 p-1.5 rounded-lg text-[var(--primary)] ${isLight ? 'bg-slate-100' : 'bg-[var(--primary-alpha)]'}`}>
            <Terminal size={16} />
          </div>
          <div>
            <span className={`block text-sm font-medium ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>Portfolio Architecture</span>
            <span className={`text-xs ${uiClasses.textMuted}`}>Organizing past work and building this digital home</span>
          </div>
        </li>
      </ul>
    </div>
  </>
);
