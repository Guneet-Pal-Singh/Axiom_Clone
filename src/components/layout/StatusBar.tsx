'use client';

import { memo } from 'react';
import {
  Wallet,
  Twitter,
  Search,
  Activity,
  TrendingUp,
  Grid3x3,
  Bell,
  X,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppSelector } from '@/lib/store/hooks';
import { formatCurrency } from '@/lib/formatters';

const StatusBar = memo(function StatusBar() {
  const {
    selectedPreset,
    selectedPage,
    isConnected,
    walletBalance,
    twitterBalance,
    discoverBalance,
    pulseBalance,
    pnl,
  } = useAppSelector((state) => state.ui);

  return (
    <div className="sticky bottom-0 z-50 flex h-12 items-center justify-between border-t border-gray-800/50 bg-[#0a0a0a] px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 text-xs text-gray-400 hover:text-white"
            >
              {selectedPreset}
              <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-gray-900 text-white">
            <DropdownMenuItem>PRESET 1</DropdownMenuItem>
            <DropdownMenuItem>PRESET 2</DropdownMenuItem>
            <DropdownMenuItem>PRESET 3</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 text-xs text-gray-400 hover:text-white"
            >
              {selectedPage}
              <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-gray-900 text-white">
            <DropdownMenuItem>1 0</DropdownMenuItem>
            <DropdownMenuItem>2 0</DropdownMenuItem>
            <DropdownMenuItem>3 0</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Wallet className="h-4 w-4" />
            <span>Wallet</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Twitter className="h-4 w-4" />
            <span>Twitter</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Search className="h-4 w-4" />
            <span>Discover</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Activity className="h-4 w-4" />
            <span>Pulse</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <TrendingUp className="h-4 w-4" />
            <span>PnL</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span>{formatCurrency(walletBalance)}</span>
          <span>{formatCurrency(twitterBalance)}</span>
          <span>= {formatCurrency(pnl)}</span>
        </div>

        <div
          className={`flex items-center gap-2 text-xs ${
            isConnected ? 'text-green-500' : 'text-red-500'
          }`}
        >
          <div
            className={`h-2 w-2 rounded-full ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
          <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 text-xs text-gray-400 hover:text-white"
            >
              GLOBAL
              <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-900 text-white">
            <DropdownMenuItem>GLOBAL</DropdownMenuItem>
            <DropdownMenuItem>US</DropdownMenuItem>
            <DropdownMenuItem>EU</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
            <Grid3x3 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
            <X className="h-4 w-4" />
          </Button>
          <a
            href="#"
            className="text-xs text-gray-400 hover:text-white"
          >
            Docs
          </a>
        </div>
      </div>
    </div>
  );
});

StatusBar.displayName = 'StatusBar';

export default StatusBar;

