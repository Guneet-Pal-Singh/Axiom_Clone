'use client';

import { Search, Star, Bell, HelpCircle, Grid3x3, ChevronDown, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { setSearchQuery, setSelectedChain } from '@/lib/store/slices/uiSlice';
import { memo } from 'react';

const NavBar = memo(function NavBar() {
  const searchQuery = useAppSelector((state) => state.ui.searchQuery);
  const selectedChain = useAppSelector((state) => state.ui.selectedChain);
  const dispatch = useAppDispatch();

  const navLinks = [
    'Discover',
    'Pulse',
    'Trackers',
    'Perpetuals',
    'Yield',
    'Vision',
    'Portfolio',
    'Rewards',
  ];

  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-800/50 bg-[#0a0a0a] px-6">
      {/* Left Section - Logo and Nav Links */}
      <div className="flex items-center gap-8">
        <div className="text-xl font-bold text-white">AXIOM Pro</div>
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className={`text-sm font-medium transition-colors ${
                link === 'Pulse'
                  ? 'text-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by token or CA..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="h-9 w-64 bg-gray-900 pl-10 pr-8 text-sm text-white placeholder:text-gray-500"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
            /
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 text-white hover:bg-gray-800">
              {selectedChain}
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-900 text-white">
            <DropdownMenuItem onClick={() => dispatch(setSelectedChain('SOL'))}>
              SOL
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => dispatch(setSelectedChain('ETH'))}>
              ETH
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => dispatch(setSelectedChain('BTC'))}>
              BTC
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button className="h-9 bg-blue-600 text-white hover:bg-blue-700">
          Deposit
        </Button>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Star className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Grid3x3 className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <ChevronDown className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-900 text-white">
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
});

export default NavBar;

