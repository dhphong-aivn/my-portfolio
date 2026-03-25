import React from 'react';
import { Sparkles, Terminal, PenTool, Globe, MessageCircle } from 'lucide-react';

export const HomeView = ({ uiClasses, setIsChatOpen }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
    <div className={`rounded-2xl p-8 sm:p-10 bg-surface-container-lowest border-2 border-on-surface shadow-solid hover:shadow-solid-lg transition-shadow duration-300`}>
      <h2 className="text-sm font-bold text-on-surface uppercase tracking-widest mb-6 flex items-center gap-3 font-serif">
        <Sparkles size={16} className="text-primary" /> Current Identity
      </h2>
      <h3 className={`font-bold text-2xl text-on-surface font-serif mb-2`}>
        Content Strategist & AI Dev
      </h3>
      <p className={`text-base text-on-surface-variant font-medium leading-relaxed mb-8`}>
        Bridging the gap between human understanding and artificial intelligence.
      </p>

      <div 
        onClick={() => setIsChatOpen?.(true)}
        className="mt-4 p-5 rounded-xl bg-surface-container-high border-2 border-on-surface flex items-center justify-between cursor-pointer group hover:border-primary hover:shadow-solid hover:translate-x-0.5 hover:translate-y-0.5 shadow-solid-sm transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        role="button"
        tabIndex={0}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm group-hover:scale-105 transition-transform">
            <MessageCircle size={18} />
          </div>
          <div>
            <h4 className="font-bold text-on-surface font-serif text-base">Chat with my AI Twin</h4>
            <p className="text-xs font-medium text-on-surface-variant mt-0.5">Available 24/7</p>
          </div>
        </div>
        <div className="text-primary opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </div>
      </div>
    </div>
    
    <div className={`rounded-2xl p-8 sm:p-10 bg-surface-container-lowest border-2 border-on-surface shadow-solid hover:shadow-solid-lg transition-shadow duration-300`}>
      <h2 className="text-sm font-bold text-on-surface uppercase tracking-widest mb-6 flex items-center gap-3 font-serif">
        <Globe size={16} className="text-primary" /> Currently Focusing On
      </h2>
      <ul className="space-y-6">
        <li className="flex items-start gap-4">
          <div className={`mt-1 p-2.5 rounded-xl text-primary bg-primary/10 border border-primary/20`}>
            <PenTool size={18} />
          </div>
          <div>
            <span className={`block text-lg font-bold text-on-surface font-serif`}>Writing Direction</span>
            <span className={`text-sm text-on-surface-variant mt-1 font-medium block`}>Defining voice and content strategy</span>
          </div>
        </li>
        <li className="flex items-start gap-4">
          <div className={`mt-1 p-2.5 rounded-xl text-primary bg-primary/10 border border-primary/20`}>
            <Terminal size={18} />
          </div>
          <div>
            <span className={`block text-lg font-bold text-on-surface font-serif`}>Portfolio Architecture</span>
            <span className={`text-sm text-on-surface-variant mt-1 font-medium block`}>Organizing past work and building this digital home</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
);
