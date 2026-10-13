import React, { useState } from 'react';
import { Project } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { CaseStudySheet } from './CaseStudySheet';

interface ProjectDeckProps {
  projects: Project[];
}

export const ProjectDeck: React.FC<ProjectDeckProps> = ({ projects }) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative w-full py-24 px-4 bg-[#050507] overflow-hidden">
      {/* Background Ambient Glow */}
      <div 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#5B5BFF]/10 rounded-full blur-[140px]" 
        aria-hidden="true" 
      />

      <div className="max-w-xl mx-auto mb-16 text-center">
        <span className="inline-block text-[11px] font-mono uppercase tracking-[0.12em] text-[#5B5BFF] mb-2 font-semibold">
          SELECTED WORK
        </span>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-[#F5F5F7]">
          Projects that <span className="text-[#5B5BFF] drop-shadow-[0_0_24px_rgba(91,91,255,0.4)]">ship</span>.
        </h2>
        <p className="mt-3 text-sm md:text-base text-[#F5F5F7]/60 max-w-md mx-auto">
          High-performance full-stack applications, intelligent AI pipelines, and responsive web systems.
        </p>
      </div>

      {/* Vertical Sticky Stacked Deck Container */}
      <div className="relative max-w-[480px] mx-auto flex flex-col gap-8 pb-32">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
            onOpenCaseStudy={() => setActiveProject(project)}
          />
        ))}
      </div>

      {/* Touch-Native Draggable Case Study Bottom Sheet */}
      <CaseStudySheet
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
