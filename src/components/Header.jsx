import React from 'react';
import { User, Linkedin, BookOpen, Facebook, Instagram } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants/data';

export const Header = ({ isLight, isMounted, uiClasses, handleFileChange, fileInputRef, avatarUrl, handleLinkClick }) => (
  <header className={`mb-12 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 transition-all duration-700 ease-out transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
    <div className="relative group shrink-0 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
      <div className="absolute -inset-0.5 bg-gradient-to-br from-[var(--primary-glow)] to-slate-600 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 bg-slate-900 rounded-full border-2 border-slate-700/50 flex items-center justify-center overflow-hidden">
        {avatarUrl ? 
          <img src={avatarUrl} alt="Dinh Hong Phong" className="w-full h-full object-cover relative z-10" crossOrigin="anonymous" /> 
        : <User size={64} className="text-slate-300 relative z-10" />}
      </div>
      <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-slate-950 z-30"></div>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden"/>
    </div>

    <div className="text-center md:text-left flex-1">
      <h1 className={`text-4xl sm:text-5xl font-bold mb-3 tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>Dinh Hong Phong</h1>
      <p className={`text-xl mb-4 font-light leading-relaxed ${uiClasses.textMuted}`}>
        An <span className="font-medium text-[var(--primary)]">AI Researcher</span> learning to build products with AI.
      </p>
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6">
        <div className="flex gap-2 relative z-10">
          <a href={SOCIAL_LINKS.linkedin} onClick={(e) => handleLinkClick(e, SOCIAL_LINKS.linkedin, 'LinkedIn')} className={`px-3 py-2 rounded-lg border transition-all duration-300 flex items-center gap-2 text-sm font-medium hover:-translate-y-0.5 hover:shadow-lg ${isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-slate-800 border-slate-700 text-slate-300'}`}><Linkedin size={16} /> LinkedIn</a>
          <a href={SOCIAL_LINKS.blog} onClick={(e) => handleLinkClick(e, SOCIAL_LINKS.blog, 'Blog')} className={`px-3 py-2 rounded-lg border transition-all duration-300 flex items-center gap-2 text-sm font-medium hover:-translate-y-0.5 hover:shadow-lg ${isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-slate-800 border-slate-700 text-slate-300'}`}><BookOpen size={16} /> Blog</a>
        </div>
        <div className={`flex items-center gap-2 pl-4 border-l relative z-10 ${isLight ? 'border-slate-300' : 'border-slate-700'}`}>
          <a href={SOCIAL_LINKS.facebook} onClick={(e) => handleLinkClick(e, SOCIAL_LINKS.facebook, 'Facebook')} className={`flex p-2 rounded-full transition-all duration-300 hover:-translate-y-1 ${isLight ? 'text-slate-500 hover:bg-slate-200' : 'text-slate-400 hover:bg-slate-800'}`}><Facebook size={16} /></a>
          <a href={SOCIAL_LINKS.instagram} onClick={(e) => handleLinkClick(e, SOCIAL_LINKS.instagram, 'Instagram')} className={`flex p-2 rounded-full transition-all duration-300 hover:-translate-y-1 ${isLight ? 'text-slate-500 hover:bg-slate-200' : 'text-slate-400 hover:bg-slate-800'}`}><Instagram size={16} /></a>
          <a href={SOCIAL_LINKS.tiktok} onClick={(e) => handleLinkClick(e, SOCIAL_LINKS.tiktok, 'TikTok')} className={`flex p-2 rounded-full transition-all duration-300 hover:-translate-y-1 ${isLight ? 'text-slate-500 hover:bg-slate-200' : 'text-slate-400 hover:bg-slate-800'}`}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg></a>
        </div>
      </div>
    </div>
  </header>
);
