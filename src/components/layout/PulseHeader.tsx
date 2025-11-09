'use client';

import { memo } from 'react';
import { 
  Menu,
  HelpCircle, 
  Bell, 
  Github, 
  Monitor,
  ChevronDown,
  Sun,
  Table,
  LineChart,
  Grid,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';

const PulseHeader = memo(function PulseHeader() {
  return (
    <div id="pulse-header" className="flex items-center justify-between border-b border-gray-800/50 bg-[#0a0a0a] px-6 py-4">
      <div id="header-left" className="flex items-center gap-3">
        <Button
          id="menu-toggle"
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div id="brand-container" className="flex items-center gap-3">
          <div id="brand-logo" className="flex flex-col gap-0.5">
            <div id="logo-top" className="h-2 w-2 rounded bg-blue-500" />
            <div id="logo-bottom" className="h-2 w-2 rounded bg-orange-500" />
          </div>
          <h1 id="brand-title" className="text-2xl font-bold text-white">Pulse</h1>
        </div>
      </div>
      <div id="header-right" className="flex items-center gap-4">
        <Button
          id="help-button"
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white"
          aria-label="Help"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
        <Button
          id="notifications-button"
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </Button>
        <Button
          id="github-button"
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white"
          aria-label="GitHub"
        >
          <Github className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer hover:text-white">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                >
                  <Monitor className="h-5 w-5" />
                </Button>
                <span className="text-sm text-gray-400">Display</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent id="display-dropdown" className="w-[280px] bg-[#1a1a1a] border-gray-800">
              <div id="display-content" className="p-2">
                <div id="quick-buy-label" className="text-xs font-medium text-gray-400 mb-2">Quick Buy</div>
                <div id="size-buttons" className="grid grid-cols-4 gap-1 mb-4">
                  {['Small', 'Large', 'Mega', 'Ultra'].map((size) => (
                    <Button
                      id={`size-${size.toLowerCase()}`}
                      key={size}
                      variant="outline"
                      className="h-8 text-xs bg-[#2a2a2a] border-gray-700 hover:bg-[#3a3a3a]"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
                <div id="theme-selector" className="flex items-center gap-2 mb-4">
                  <Sun className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-200">Grey</span>
                </div>
                <div id="tab-navigation" className="flex space-x-1 mb-4">
                  {['Layout', 'Metrics', 'Row', 'Extras'].map((tab) => (
                    <Button
                      id={`tab-${tab.toLowerCase()}`}
                      key={tab}
                      variant="ghost"
                      className={`h-8 text-xs ${
                        tab === 'Layout' ? 'bg-[#2a2a2a]' : 'text-gray-400'
                      }`}
                    >
                      {tab}
                    </Button>
                  ))}
                </div>
                <div id="display-options" className="space-y-1">
                  <DropdownMenuCheckboxItem id="option-search-bar" checked>
                    Show Search Bar
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem id="option-decimals" checked>
                    No Decimals
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem id="option-hidden-tokens">
                    Show Hidden Tokens
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem id="option-migrated">
                    Unhide on Migrated
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem id="option-circle-images">
                    Circle Images
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem id="option-progress-bar">
                    Progress Bar
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem id="option-spaced-tables">
                    Spaced Tables
                  </DropdownMenuCheckboxItem>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div id="user-profile" className="flex items-center gap-2">
          <div id="user-avatar" className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center">
            <span id="user-initial" className="text-sm font-medium text-white">1</span>
          </div>
          <ChevronDown id="profile-dropdown-arrow" className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
});

PulseHeader.displayName = 'PulseHeader';

export default PulseHeader;

