import React from 'react';
import { Briefcase, Github } from 'lucide-react';
import { EXPERIENCES, GITHUB_PROJECTS } from '../constants/data';

export const TimelineView = ({ isLight, uiClasses, handleLinkClick }) => (
  <>
    <div className={`rounded-2xl p-6 backdrop-blur-md transition-all ${uiClasses.card}`}>
      <h2 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-6 flex items-center gap-2">
        <Briefcase size={14} className="text-[var(--primary)]" /> Career Journey
      </h2>
      <div className={`relative border-l ml-2 space-y-6 ${isLight ? 'border-slate-300' : 'border-slate-700/50'}`}>
        {EXPERIENCES.map((exp) => (
          <div key={exp.id} className="relative pl-6">
            <div className={`absolute w-3 h-3 bg-[var(--primary)] rounded-full -left-[6.5px] top-1.5 border-2 ${isLight ? 'border-white' : 'border-slate-900'} shadow-[0_0_10px_var(--primary-glow)]`}></div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
              <h3 className={`font-semibold text-sm ${isLight ? 'text-slate-800' : 'text-white'}`}>{exp.role}</h3>
              <span className={`text-xs font-mono mt-1 sm:mt-0 ${uiClasses.textMuted}`}>{exp.period}</span>
            </div>
            <div className="text-sm mb-2 font-medium" style={{ color: 'var(--primary)' }}>{exp.company}</div>
            <p className={`text-xs leading-relaxed ${uiClasses.textMuted}`}>{exp.desc}</p>
          </div>
        ))}
      </div>
    </div>
    
    <div className={`rounded-2xl p-6 backdrop-blur-md transition-all ${uiClasses.card}`}>
      <h2 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
        <Github size={14} className="text-[var(--primary)]" /> Featured Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {GITHUB_PROJECTS.map((project) => (
          <a key={project.id} href={project.link} onClick={(e) => handleLinkClick(e, project.link, project.title)} 
             className={`block p-4 rounded-xl border transition-all group ${isLight ? 'bg-slate-50 border-slate-200 hover:border-[var(--primary)]' : 'bg-slate-800/40 border-slate-700/50 hover:border-[var(--primary)]'}`}>
            <h3 className={`font-semibold text-sm mb-2 group-hover:text-[var(--primary)] ${isLight ? 'text-slate-800' : 'text-white'}`}>{project.title}</h3>
            <p className={`text-xs mb-4 ${uiClasses.textMuted}`}>{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map(tag => (
                <span key={tag} className={`text-[10px] px-2 py-0.5 rounded-md border ${isLight ? 'bg-white border-slate-200 text-slate-600' : 'bg-slate-900 border-slate-700 text-slate-400'}`}>
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
