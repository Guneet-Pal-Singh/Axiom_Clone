import { ArrowUpDown } from 'lucide-react';

interface MobileTabBarProps {
  activeTab: 'newPairs' | 'finalStretch' | 'migrated';
  onTabChange: (tab: 'newPairs' | 'finalStretch' | 'migrated') => void;
}

export default function MobileTabBar({ activeTab, onTabChange }: MobileTabBarProps) {
  return (
    <div className="lg:hidden sticky top-0 z-10 flex items-center justify-between border-b border-gray-800 bg-[#0a0a0a]">
      <div className="flex-1 flex">
        <button
          onClick={() => onTabChange('newPairs')}
          className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 ${
            activeTab === 'newPairs'
              ? 'text-white border-white'
              : 'text-gray-400 border-transparent'
          }`}
        >
          New Pairs
        </button>
        <button
          onClick={() => onTabChange('finalStretch')}
          className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 ${
            activeTab === 'finalStretch'
              ? 'text-white border-white'
              : 'text-gray-400 border-transparent'
          }`}
        >
          Final Stretch
        </button>
        <button
          onClick={() => onTabChange('migrated')}
          className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 ${
            activeTab === 'migrated'
              ? 'text-white border-white'
              : 'text-gray-400 border-transparent'
          }`}
        >
          Migrated
        </button>
      </div>
      <button className="px-4 text-gray-400">
        <ArrowUpDown className="h-4 w-4" />
      </button>
    </div>
  );
}