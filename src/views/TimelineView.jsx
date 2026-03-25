import React from 'react';
import { Briefcase, Github } from 'lucide-react';
import { EXPERIENCES, GITHUB_PROJECTS } from '../constants/data';

export const TimelineView = ({ uiClasses, handleLinkClick }) => (
  <>
    <div className={`rounded-2xl p-8 sm:p-10 bg-surface-container-lowest border-2 border-on-surface shadow-solid hover:shadow-solid-lg transition-shadow duration-300`}>
      <h2 className="text-sm font-bold text-on-surface uppercase tracking-widest mb-8 flex items-center gap-3 font-serif">
        <Briefcase size={16} className="text-primary" /> Career Journey
      </h2>
      <div className={`relative border-l-2 ml-2 space-y-8 border-outline-variant/30`}>
        {EXPERIENCES.map((exp) => (
          <div key={exp.id} className="relative pl-8">
            <div className={`absolute w-3 h-3 bg-primary rounded-none -left-[7px] top-1.5 border-2 border-on-surface`}></div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className={`font-bold text-lg text-on-surface font-serif`}>{exp.role}</h3>
              <span className={`text-xs font-bold tracking-wider uppercase mt-1 sm:mt-0 text-primary`}>{exp.period}</span>
            </div>
            <div className="text-sm border-2 border-on-surface px-3 py-1 rounded-none inline-block mb-3 font-bold text-on-surface-variant bg-surface">{exp.company}</div>
            <p className={`text-sm leading-relaxed text-on-surface-variant font-medium`}>{exp.desc}</p>
          </div>
        ))}
      </div>
    </div>
    
    <div className={`rounded-2xl p-8 sm:p-10 bg-surface-container-lowest border-2 border-on-surface shadow-solid hover:shadow-solid-lg transition-shadow duration-300`}>
      <h2 className="text-sm font-bold text-on-surface uppercase tracking-widest mb-8 flex items-center gap-3 font-serif">
        <Github size={16} className="text-primary" /> Featured Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {GITHUB_PROJECTS.map((project) => (
          <a key={project.id} href={project.link} onClick={(e) => handleLinkClick(e, project.link, project.title)} 
             className={`block p-6 rounded-xl border-2 border-on-surface transition-all duration-300 group bg-surface shadow-solid-sm hover:shadow-solid hover:translate-x-0.5 hover:translate-y-0.5 hover:border-primary outline-none focus-visible:ring-2 focus-visible:ring-primary`}>
            <h3 className={`font-bold text-lg mb-3 group-hover:text-primary transition-colors text-on-surface font-serif`}>{project.title}</h3>
            <p className={`text-sm mb-6 text-on-surface-variant font-medium leading-relaxed`}>{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-none border border-on-surface/50 bg-surface-container-low text-on-surface-variant`}>
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  </>
);
