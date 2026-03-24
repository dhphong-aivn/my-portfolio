import React from 'react';
import { BookOpen } from 'lucide-react';
import { VAULT_ARTICLES } from '../constants/data';

export const VaultView = ({ isLight, uiClasses }) => (
  <div className={`rounded-2xl p-6 backdrop-blur-md transition-all ${uiClasses.card}`}>
    <h2 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-6 flex items-center gap-2">
      <BookOpen size={14} className="text-[var(--primary)]" /> Knowledge Vault
    </h2>
    <div className="space-y-4">
      {VAULT_ARTICLES.map(article => (
        <div key={article.id} className={`p-4 rounded-xl border transition-colors cursor-pointer group ${isLight ? 'hover:bg-slate-50 border-slate-200' : 'hover:bg-slate-800/60 border-slate-700/50'}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--primary-alpha)] text-[var(--primary)]">{article.category}</span>
            <span className={`text-[10px] ${uiClasses.textMuted}`}>{article.date} · {article.readTime}</span>
          </div>
          <h3 className={`font-medium text-base group-hover:text-[var(--primary)] transition-colors ${isLight ? 'text-slate-800' : 'text-white'}`}>{article.title}</h3>
        </div>
      ))}
    </div>
  </div>
);
