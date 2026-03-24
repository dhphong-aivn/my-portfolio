import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { GALLERY_PHOTOS } from '../constants/data';

export const GalleryView = ({ isLight, uiClasses }) => (
  <div className={`rounded-2xl p-6 backdrop-blur-md transition-all ${uiClasses.card}`}>
    <h2 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-6 flex items-center gap-2">
      <ImageIcon size={14} className="text-[var(--primary)]" /> Life Gallery
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {GALLERY_PHOTOS.map(photo => (
        <div key={photo.id} className="aspect-square rounded-xl overflow-hidden border border-slate-700/50 group relative">
          <img src={photo.url} alt={photo.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
            <span className="text-white text-xs font-medium">{photo.alt}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
