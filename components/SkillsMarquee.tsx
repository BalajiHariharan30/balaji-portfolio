import React, { useState, useEffect, useRef } from 'react';
import { Skill } from '../data/skills';
import { SkillCard } from './SkillCard';
import { CategoryTabs, SkillCategory } from './CategoryTabs';

interface SkillsMarqueeProps {
  skills: Skill[];
}

export const SkillsMarquee: React.FC<SkillsMarqueeProps> = ({ skills }) => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');
  const [flippedSkillId, setFlippedSkillId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter skills by category
  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  // Split into Row 1 and Row 2
  const midIndex = Math.ceil(filteredSkills.length / 2);
  const row1Skills = filteredSkills.slice(0, midIndex);
  const row2Skills = filteredSkills.slice(midIndex);

  // Resume after idle 2.5s
  const resetIdleTimer = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setIsPaused(false);
      setFlippedSkillId(null);
    }, 2500);
  };

  const handleCardClick = (skillId: string) => {
    setIsPaused(true);
    setFlippedSkillId((prev) => (prev === skillId ? null : skillId));
    resetIdleTimer();
  };

  useEffect(() => {
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  return (
    <section 
      id="skills" 
      className="relative w-full py-24 px-4 bg-[#050507] overflow-hidden select-none"
      onClick={() => {
        if (flippedSkillId) {
          setFlippedSkillId(null);
          setIsPaused(false);
        }
      }}
    >
      <div className="max-w-xl mx-auto mb-10 text-center">
        <span className="inline-block text-[11px] font-mono uppercase tracking-[0.12em] text-[#5B5BFF] mb-2 font-semibold">
          TOOLKIT
        </span>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-[#F5F5F7]">
          Skills I <span className="text-[#5B5BFF] drop-shadow-[0_0_24px_rgba(91,91,255,0.4)]">work with</span>.
        </h2>
        <p className="mt-3 text-sm md:text-base text-[#F5F5F7]/60 max-w-md mx-auto">
          Production-tested technologies across frontend, backend, AI orchestration, and cloud infrastructure.
        </p>
      </div>

      {/* Swipeable Category Filter Tabs */}
      <CategoryTabs
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setFlippedSkillId(null);
        }}
      />

      {/* Dual Row Opposing Marquee */}
      <div className="relative w-full flex flex-col gap-6 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
        {/* Row 1: Right to Left */}
        <div 
          className="flex w-max gap-4 animate-marquee-left"
          style={{
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            if (!flippedSkillId) setIsPaused(false);
          }}
        >
          {[...row1Skills, ...row1Skills].map((skill, index) => (
            <SkillCard
              key={`${skill.id}-r1-${index}`}
              skill={skill}
              isFlipped={flippedSkillId === skill.id}
              onCardClick={() => handleCardClick(skill.id)}
            />
          ))}
        </div>

        {/* Row 2: Left to Right (Reverse) */}
        <div 
          className="flex w-max gap-4 animate-marquee-right"
          style={{
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            if (!flippedSkillId) setIsPaused(false);
          }}
        >
          {[...row2Skills, ...row2Skills].map((skill, index) => (
            <SkillCard
              key={`${skill.id}-r2-${index}`}
              skill={skill}
              isFlipped={flippedSkillId === skill.id}
              onCardClick={() => handleCardClick(skill.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
