import React from 'react';
import { Project } from '../data/projects';
import { ScreenshotSwiper } from './ScreenshotSwiper';

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  onOpenCaseStudy: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  total,
  onOpenCaseStudy
}) => {
  const topOffset = 70 + index * 14;

  return (
    <article
      className="project-deck-card sticky w-full rounded-[28px] border border-white/[0.08] bg-[#0d111d] overflow-hidden shadow-2xl transition-all duration-300 select-none"
      style={{
        top: `${topOffset}px`,
        aspectRatio: '3 / 4.4'
      }}
      tabIndex={0}
      role="button"
      aria-label={`View case study for ${project.title}`}
      onClick={(e) => {
        // Prevent opening modal when clicking action links
        if ((e.target as HTMLElement).closest('a')) return;
        onOpenCaseStudy();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenCaseStudy();
        }
      }}
    >
      {/* Top Floating Badges */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium backdrop-blur-md bg-black/50 border border-white/10 text-white">
          <span className="w-2 h-2 rounded-full bg-[#68D391] animate-pulse" />
          {project.status === 'live' ? 'Live' : project.status === 'wip' ? 'In Progress' : 'Case Study'}
        </span>
      </div>

      <div className="absolute top-4 right-4 z-20">
        <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium backdrop-blur-md bg-black/50 border border-white/10 text-[#F5F5F7]/80">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      {/* Screenshot Swiper */}
      <ScreenshotSwiper screenshots={project.screenshots} title={project.title} />

      {/* Bottom Content Block */}
      <div className="p-6 md:p-7 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-xl shadow-inner">
              {project.icon}
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-[#F5F5F7] tracking-tight leading-snug">
                {project.title}
              </h3>
            </div>
          </div>

          <p className="text-xs md:text-sm text-[#F5F5F7]/70 line-clamp-2 mb-4 leading-relaxed">
            {project.tagline || project.description}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.stack.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/[0.05] border border-white/10 text-[#F5F5F7]/80"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-[#5B5BFF]/15 text-[#5B5BFF] border border-[#5B5BFF]/30 font-medium">
                +{project.stack.length - 4}
              </span>
            )}
          </div>

          {/* Meta Row: ROLE | YEAR | TYPE */}
          <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.08em] text-[#F5F5F7]/50 pt-2 border-t border-white/[0.06] mb-5">
            <span>{project.role}</span>
            <span>•</span>
            <span>{project.year}</span>
            <span>•</span>
            <span>{project.type}</span>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-2 gap-3 mt-auto pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live demo for ${project.title}`}
              className="min-h-[48px] px-4 rounded-full bg-[#5B5BFF] text-white font-medium text-xs md:text-sm flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(91,91,255,0.35)] active:scale-95 transition-all"
            >
              Live Demo ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source on GitHub`}
              className={`min-h-[48px] px-4 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-[#F5F5F7] font-medium text-xs md:text-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all ${
                !project.liveUrl ? 'col-span-2' : ''
              }`}
            >
              GitHub ⌥
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
