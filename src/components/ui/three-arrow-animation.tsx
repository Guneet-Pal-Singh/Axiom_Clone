'use client';

import { memo } from 'react';
import { ChevronRight } from 'lucide-react';

export const ThreeArrowAnimation = memo(function ThreeArrowAnimation() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="flex items-center" style={{ gap: '-2px' }}>
        <div className="relative arrow-anim-1" style={{ marginRight: '-3px' }}>
          <ChevronRight 
            className="h-2 w-2 text-teal-600/60 blur-[0.3px]" 
            style={{ 
              filter: 'drop-shadow(0 0 1px rgba(20, 184, 166, 0.3))',
            }}
          />
        </div>
        
        <div className="relative arrow-anim-2" style={{ marginRight: '-3px' }}>
          <ChevronRight 
            className="h-2.5 w-2.5 text-teal-400/80 blur-[0.2px]" 
            style={{ 
              filter: 'drop-shadow(0 0 2px rgba(45, 212, 191, 0.5))',
            }}
          />
        </div>
        
        <div className="relative arrow-anim-3">
          <ChevronRight 
            className="h-3 w-3 text-green-400 blur-[0.1px]" 
            style={{ 
              filter: 'drop-shadow(0 0 2px rgba(74, 222, 128, 0.7)) drop-shadow(0 0 4px rgba(74, 222, 128, 0.4))',
            }}
          />
        </div>
      </div>
    </div>
  );
});

