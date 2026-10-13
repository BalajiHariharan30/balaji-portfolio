import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../data/skills';

interface SkillCardProps {
  skill: Skill;
  isFlipped: boolean;
  onCardClick: () => void;
}

export const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  isFlipped,
  onCardClick
}) => {
  return (
    <div
      className="relative w-[155px] md:w-[175px] h-[195px] md:h-[215px] flex-shrink-0 cursor-pointer select-none perspective-[1000px]"
      onClick={onCardClick}
      tabIndex={0}
      role="button"
      aria-label={`${skill.name} skill card. Tap to see experience details.`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onCardClick();
        }
      }}
    >
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d] transition-transform duration-500 rounded-[24px]"
        animate={{
          rotateY: isFlipped ? 180 : 0,
          scale: isFlipped ? 1.05 : 1
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 25 }}
      >
        {/* FRONT FACE */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-[24px] bg-[#0c101c]/90 border border-white/[0.08] p-4 flex flex-col justify-between shadow-xl backdrop-blur-md">
          {/* Top Row: Icon & Proficiency Ring */}
          <div className="flex items-center justify-between">
            <span className="text-3xl filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
              {skill.icon}
            </span>
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/10"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#5B5BFF]"
                  strokeDasharray={`${skill.proficiency}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-[9px] font-mono font-bold text-white/90">
                {skill.proficiency}%
              </span>
            </div>
          </div>

          {/* Middle: Name */}
          <div>
            <h4 className="text-base font-semibold text-[#F5F5F7] tracking-tight">
              {skill.name}
            </h4>
            <p className="text-[10px] text-[#F5F5F7]/60 line-clamp-2 mt-1 leading-snug">
              {skill.builds}
            </p>
          </div>

          {/* Bottom Tap Hint */}
          <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[9px] font-mono text-[#5B5BFF]">
            <span>TAP TO FLIP</span>
            <span>↺</span>
          </div>
        </div>

        {/* BACK FACE (Flipped 180deg) */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[24px] bg-[#111626] border border-[#5B5BFF]/40 p-4 flex flex-col justify-between shadow-2xl backdrop-blur-xl">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-[#5B5BFF]">EXPERIENCE</span>
              <span className="text-[10px] font-mono text-white/80">{skill.experience}</span>
            </div>

            <p className="text-[10px] text-[#F5F5F7]/80 leading-relaxed mb-3">
              {skill.note}
            </p>
          </div>

          <div>
            <span className="text-[9px] font-mono uppercase text-[#F5F5F7]/50 block mb-1">
              USED IN PROJECTS:
            </span>
            <div className="flex flex-wrap gap-1">
              {skill.projectsUsed.map((projId, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-[#5B5BFF]/20 text-[#5B5BFF] border border-[#5B5BFF]/30 font-semibold"
                >
                  #{projId}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
