import React from 'react';
import { BookOpen } from 'lucide-react';
import { VAULT_ARTICLES } from '../constants/data';

export const VaultView = ({ uiClasses }) => (
  <div className={`rounded-2xl p-8 sm:p-10 bg-surface-container-lowest border-2 border-on-surface shadow-solid hover:shadow-solid-lg transition-shadow duration-300`}>
    <h2 className="text-sm font-bold text-on-surface uppercase tracking-widest mb-8 flex items-center gap-3 font-serif">
      <BookOpen size={16} className="text-primary" /> Knowledge Vault
    </h2>
    <div className="space-y-4">
      {VAULT_ARTICLES.map(article => (
        <div key={article.id} className={`p-6 rounded-xl border-2 border-on-surface transition-all duration-300 cursor-pointer group bg-surface hover:shadow-solid hover:border-primary hover:-translate-y-0.5 hover:-translate-x-0.5 shadow-solid-sm outline-none focus-visible:ring-2 focus-visible:ring-primary`}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-none bg-primary/10 text-primary border-2 border-primary">{article.category}</span>
            <span className={`text-xs font-medium text-on-surface-variant`}>{article.date} · {article.readTime}</span>
          </div>
          <h3 className={`font-bold text-xl group-hover:text-primary transition-colors text-on-surface font-serif`}>{article.title}</h3>
        </div>
      ))}
    </div>
  </div>
);
