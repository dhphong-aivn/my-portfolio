import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { GALLERY_PHOTOS } from '../constants/data';

export const GalleryView = ({ uiClasses }) => (
  <div className={`rounded-2xl p-8 sm:p-10 bg-surface-container-lowest border-2 border-on-surface shadow-solid hover:shadow-solid-lg transition-shadow duration-300`}>
    <h2 className="text-sm font-bold text-on-surface uppercase tracking-widest mb-8 flex items-center gap-3 font-serif">
      <ImageIcon size={16} className="text-primary" /> Life Gallery
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {GALLERY_PHOTOS.map(photo => (
        <div key={photo.id} className="aspect-square rounded-xl overflow-hidden border-2 border-on-surface group relative shadow-solid-sm hover:shadow-solid hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300 cursor-pointer">
          <img src={photo.url} alt={photo.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <span className="text-white text-sm font-bold tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{photo.alt}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
