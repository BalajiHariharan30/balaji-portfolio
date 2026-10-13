import React, { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';

interface ScreenshotSwiperProps {
  screenshots: string[];
  title: string;
}

export const ScreenshotSwiper: React.FC<ScreenshotSwiperProps> = ({ screenshots, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPeeking, setIsPeeking] = useState(false);

  const images = screenshots.length > 0 ? screenshots : ['assets/images/og-preview.png'];

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 40;
    if (info.offset.x < -threshold && currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div 
      className="relative w-full h-[260px] overflow-hidden select-none touch-pan-y"
      onContextMenu={(e) => e.preventDefault()}
      onPointerDown={() => {
        const timer = setTimeout(() => setIsPeeking(true), 400);
        const cancel = () => {
          clearTimeout(timer);
          setIsPeeking(false);
          window.removeEventListener('pointerup', cancel);
        };
        window.addEventListener('pointerup', cancel);
      }}
    >
      {/* Draggable Screenshot Track */}
      <motion.div
        className="flex w-full h-full cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        animate={{
          x: `-${currentIndex * 100}%`,
          scale: isPeeking ? 1.05 : 1
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      >
        {images.map((imgSrc, idx) => (
          <div key={idx} className="relative w-full h-full flex-shrink-0">
            <img
              src={imgSrc}
              alt={`${title} screenshot ${idx + 1}`}
              loading="lazy"
              className="w-full h-full object-cover select-none pointer-events-none"
            />
          </div>
        ))}
      </motion.div>

      {/* Dark gradient overlay for typography readability */}
      <div 
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/40 to-transparent" 
        aria-hidden="true" 
      />

      {/* Progress Dots if multiple images */}
      {images.length > 1 && (
        <div className="absolute bottom-3 right-4 flex items-center gap-1.5 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-5 bg-[#5B5BFF]' : 'w-1.5 bg-white/30'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
