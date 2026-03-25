import React from 'react';
import { Leaf } from 'lucide-react';

export const AboutView = ({ uiClasses }) => (
  <div className={`rounded-xl p-8 sm:p-10 bg-surface-container-lowest border-2 border-on-surface shadow-solid transition-shadow duration-300`}>
    <h2 className="text-xl font-bold text-on-surface mb-8 flex items-center gap-3 font-serif">
      <Leaf size={24} className="text-primary" /> Who am I ?
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      {/* Content Side */}
      <div className="space-y-6 text-base md:text-lg text-on-surface-variant leading-relaxed">
        <p>
          I am an <strong className="text-primary font-bold">AI Researcher</strong> dedicated to bridging the gap between complex algorithms and meaningful user experiences. Currently, I'm focusing my energy on building AI-powered products that feel natural and intuitive.
        </p>
        <p>
          Beyond the code and data, I'm an avid <strong className="text-tertiary-fixed font-bold">writer and blogger</strong>. I believe that documenting the learning journey is as important as the destination. My interests lie at the intersection of AI applications, knowledge management, and digital philosophy.
        </p>
        <p>
          When I'm not training models or architecting interfaces, you'll likely find me immersed in a book or exploring the latest developments in productivity apps. I thrive on the "Tactile Papercraft & Neo-Geometric" aesthetic—creating technology that feels grounded, intentionally crafted, and approachable.
        </p>
      </div>
      
      {/* Image Side */}
      <div className="relative group">
        <div className="w-full aspect-square rounded-xl border-2 border-on-surface overflow-hidden shadow-solid-sm group-hover:shadow-solid group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
          <img src="/about.jpg" alt="About Me Avatar" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl -z-10"></div>
      </div>
    </div>
  </div>
);
