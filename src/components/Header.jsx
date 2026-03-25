import React from 'react';
import { User, Linkedin, BookOpen, Facebook, Instagram } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants/data';

export const Header = ({ isMounted, uiClasses, handleFileChange, fileInputRef, avatarUrl, handleLinkClick }) => (
  <section className={`relative flex items-center py-12 md:py-20 overflow-hidden transition-all duration-1000 ease-out transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
    <div className="w-full grid md:grid-cols-2 gap-12 items-center">
      
      {/* Left Text Column */}
      <div className="order-2 md:order-1">
        <span className="text-tertiary font-bold tracking-widest uppercase text-xs mb-4 block">
          AI Researcher & Builder
        </span>
        <h1 className="text-5xl md:text-7xl font-black text-on-surface leading-tight mb-6 font-serif">
          Dinh Hong <span className="block text-primary mt-2">Phong</span>
        </h1>
        <p className="text-lg md:text-xl text-on-surface-variant max-w-xl mb-10 leading-relaxed">
          An <strong className="text-primary font-bold">AI Researcher</strong> learning to build products with AI. Grounding advanced technology in human-centric design.
        </p>
        
        <div className="flex flex-wrap items-center gap-4 mt-6">
          <div className="flex gap-2 relative z-10">
            <a href={SOCIAL_LINKS.linkedin} onClick={(e) => handleLinkClick(e, SOCIAL_LINKS.linkedin, 'LinkedIn')} className={`px-4 py-2.5 rounded-lg border border-on-surface transition-all duration-300 flex items-center gap-2 text-sm font-bold hover:translate-x-0.5 hover:translate-y-0.5 shadow-solid-sm hover:shadow-solid text-on-surface bg-surface-container-lowest outline-none focus-visible:ring-2 focus-visible:ring-primary`}><Linkedin size={16} /> LinkedIn</a>
            <a href={SOCIAL_LINKS.blog} onClick={(e) => handleLinkClick(e, SOCIAL_LINKS.blog, 'Blog')} className={`px-4 py-2.5 rounded-lg border border-on-surface transition-all duration-300 flex items-center gap-2 text-sm font-bold hover:translate-x-0.5 hover:translate-y-0.5 shadow-solid-sm hover:shadow-solid text-on-surface bg-surface-container-lowest outline-none focus-visible:ring-2 focus-visible:ring-primary`}><BookOpen size={16} /> Blog</a>
          </div>
          <div className={`flex items-center gap-2 pl-4 relative z-10`}>
            <a href={SOCIAL_LINKS.facebook} onClick={(e) => handleLinkClick(e, SOCIAL_LINKS.facebook, 'Facebook')} className={`flex p-2.5 rounded-lg border border-transparent transition-all duration-300 hover:translate-x-0.5 hover:translate-y-0.5 text-on-surface-variant hover:border-on-surface hover:shadow-solid-sm hover:bg-surface-container-high hover:text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary`}><Facebook size={16} /></a>
            <a href={SOCIAL_LINKS.instagram} onClick={(e) => handleLinkClick(e, SOCIAL_LINKS.instagram, 'Instagram')} className={`flex p-2.5 rounded-lg border border-transparent transition-all duration-300 hover:translate-x-0.5 hover:translate-y-0.5 text-on-surface-variant hover:border-on-surface hover:shadow-solid-sm hover:bg-surface-container-high hover:text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary`}><Instagram size={16} /></a>
            <a href={SOCIAL_LINKS.tiktok} onClick={(e) => handleLinkClick(e, SOCIAL_LINKS.tiktok, 'TikTok')} className={`flex p-2.5 rounded-lg border border-transparent transition-all duration-300 hover:translate-x-0.5 hover:translate-y-0.5 text-on-surface-variant hover:border-on-surface hover:shadow-solid-sm hover:bg-surface-container-high hover:text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary`}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg></a>
          </div>
        </div>
      </div>

      {/* Right Avatar Column */}
      <div className="order-1 md:order-2 flex justify-center items-center">
        <div className="relative w-full max-w-sm aspect-square rounded-2xl border-2 border-on-surface bg-surface-container-high flex items-center justify-center overflow-hidden cursor-pointer group shadow-solid hover:shadow-solid-lg transition-shadow duration-300" onClick={() => fileInputRef.current?.click()}>
          {avatarUrl ? 
            <img src={avatarUrl} alt="Dinh Hong Phong" className="relative z-10 w-[95%] h-[95%] object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700 rounded-xl" crossOrigin="anonymous" /> 
          : <User size={80} className="text-outline relative z-10" />}
          
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none opacity-60 z-20"></div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex flex-col items-center justify-center z-30">
             <span className="opacity-0 group-hover:opacity-100 text-white font-bold transition-opacity duration-300 bg-on-surface px-4 py-2 rounded-lg text-sm shadow-solid-sm transform translate-y-4 group-hover:translate-y-0">Update Photo</span>
          </div>
          
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden"/>
        </div>
      </div>
      
    </div>
  </section>
);

