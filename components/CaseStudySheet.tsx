import React from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Project } from '../data/projects';

interface CaseStudySheetProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudySheet: React.FC<CaseStudySheetProps> = ({ project, onClose }) => {
  if (!project) return null;

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Dismiss if pulled down past 120px or with high downward velocity
    if (info.offset.y > 120 || info.velocity.y > 500) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Draggable Bottom Sheet */}
        <motion.div
          className="relative w-full max-w-xl max-h-[85vh] bg-[#0c101a] border-t border-x border-white/10 rounded-t-[32px] p-6 md:p-8 overflow-y-auto z-10 shadow-2xl touch-pan-y"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0.05, bottom: 0.6 }}
          onDragEnd={handleDragEnd}
        >
          {/* Pull Handle Indicator */}
          <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6 cursor-grab active:cursor-grabbing" />

          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{project.icon}</span>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-[#F5F5F7]">
                  {project.title}
                </h3>
                <span className="text-xs font-mono text-[#5B5BFF]">
                  {project.role} · {project.year}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 text-white/70 hover:text-white flex items-center justify-center text-lg"
              aria-label="Close case study"
            >
              ✕
            </button>
          </div>

          <p className="text-sm text-[#F5F5F7]/80 leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Problem & Solution */}
          <div className="space-y-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <h4 className="text-xs font-mono uppercase text-[#FC8181] tracking-wider mb-1 font-semibold">
                The Problem
              </h4>
              <p className="text-xs md:text-sm text-[#F5F5F7]/70 leading-relaxed">
                {project.caseStudy.problem}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <h4 className="text-xs font-mono uppercase text-[#68D391] tracking-wider mb-1 font-semibold">
                The Engineering Solution
              </h4>
              <p className="text-xs md:text-sm text-[#F5F5F7]/70 leading-relaxed">
                {project.caseStudy.solution}
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase text-[#5B5BFF] tracking-wider mb-2 font-semibold">
              Key Features
            </h4>
            <ul className="space-y-2">
              {project.caseStudy.features.map((feature, i) => (
                <li key={i} className="text-xs md:text-sm text-[#F5F5F7]/80 flex items-start gap-2">
                  <span className="text-[#5B5BFF] mt-0.5">✦</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Results & Metrics */}
          <div className="mb-8">
            <h4 className="text-xs font-mono uppercase text-[#D6BCFA] tracking-wider mb-2 font-semibold">
              Measured Results & Reliability
            </h4>
            <ul className="space-y-2">
              {project.caseStudy.results.map((result, i) => (
                <li key={i} className="text-xs md:text-sm text-[#F5F5F7]/80 flex items-start gap-2">
                  <span className="text-[#68D391] mt-0.5">✓</span>
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/[0.08]">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] rounded-full bg-[#5B5BFF] text-white font-medium text-xs md:text-sm flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(91,91,255,0.4)]"
              >
                Live Demo ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`min-h-[48px] rounded-full bg-white/[0.06] border border-white/10 text-white font-medium text-xs md:text-sm flex items-center justify-center gap-1.5 ${
                  !project.liveUrl ? 'col-span-2' : ''
                }`}
              >
                GitHub Repository ⌥
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
