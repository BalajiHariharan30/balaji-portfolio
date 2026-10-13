import React from 'react';

export type SkillCategory = 'all' | 'frontend' | 'backend' | 'ai' | 'tools';

interface CategoryTabsProps {
  activeCategory: SkillCategory;
  onSelectCategory: (cat: SkillCategory) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onSelectCategory
}) => {
  const tabs: { id: SkillCategory; label: string }[] = [
    { id: 'all', label: 'All Stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'ai', label: 'AI & Cloud' },
    { id: 'tools', label: 'Tools & CI/CD' }
  ];

  return (
    <div 
      className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-1 max-w-xl mx-auto mb-10 touch-pan-x"
      role="tablist"
      aria-label="Filter skills by category"
    >
      {tabs.map((tab) => {
        const isActive = activeCategory === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectCategory(tab.id)}
            className={`min-h-[44px] px-5 rounded-full text-xs font-mono font-medium whitespace-nowrap transition-all duration-300 select-none ${
              isActive
                ? 'bg-[#5B5BFF] text-white shadow-[0_4px_16px_rgba(91,91,255,0.35)] scale-105'
                : 'bg-white/[0.04] text-[#F5F5F7]/70 hover:text-white border border-white/[0.08]'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
