'use client';

import { memo, useState, useRef, useEffect } from 'react';
import {
  Link2,
  TrendingUp,
  HelpCircle,
  User,
  Trophy,
  Shield,
  Clock,
  Calendar,
  BarChart3,
  Play,
  Zap,
  ChevronsRight,
  Search,
  Copy,
  Users,
  Crown,
  Star,
  Target,
  Boxes,
  PenTool,
  ArrowRight,
  UtensilsCrossed,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { usePriceTransition } from '@/hooks/use-price-transition';
import { cn } from '@/lib/utils';
import type { Token } from '@/types/token';
import { formatNumber, formatCurrency, formatTimeAgo } from '@/lib/formatters';
import Image from 'next/image';
import { ThreeArrowAnimation } from '@/components/ui/three-arrow-animation';

interface TokenRowProps {
  token: Token;
  columnType: 'newPairs' | 'finalStretch' | 'migrated';
  isFavorite?: boolean;
  onFavoriteToggle?: (tokenId: string) => void;
}

const TokenRow = memo(function TokenRow({
  token,
  columnType,
  isFavorite = false,
  onFavoriteToggle,
}: TokenRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [imagePosition, setImagePosition] = useState({ top: 0, left: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const priceColor = usePriceTransition(token.price, token.previousPrice);

  const progressPercentage = (token.progress.current / token.progress.total) * 100;

  const priceChangeClass =
    token.previousPrice !== undefined
      ? token.price > token.previousPrice
        ? 'price-up'
        : token.price < token.previousPrice
          ? 'price-down'
          : ''
      : '';

  const getPercentageColor = (value: number, index: number) => {
    if (index === 0) return 'text-red-500'; 
    if (index === 1) return 'text-green-500'; 
    if (index === 2) return 'text-red-500'; 
    if (index === 3) return 'text-red-500';
    if (index === 4) return 'text-green-500'; 
    return 'text-gray-400';
  };

  const formatFeesWithSubscript = (fees: number) => {
    const str = fees.toFixed(3);
    const parts = str.split('.');
    if (parts[1] && parts[1].length >= 2) {
      return (
        <>
          {parts[0]}.{parts[1][0]}
          <sub className="text-[0.7em] align-baseline">{parts[1][1]}</sub>
          {parts[1].slice(2)}
        </>
      );
    }
    return str;
  };

  useEffect(() => {
    if (isImageHovered && imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      setImagePosition({
        top: rect.top - 220, 
        left: rect.left + rect.width / 2, 
      });
    }
  }, [isImageHovered]);

  return (
    <>
      {isImageHovered && (
        <div 
          className="fixed z-[9999] pointer-events-none"
          style={{
            left: `${imagePosition.left}px`,
            top: `${imagePosition.top}px`,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="bg-gray-200 rounded-lg p-4 shadow-2xl relative">
            <Image
              src={token.icon}
              alt={token.name}
              width={200}
              height={200}
              className="w-48 h-48 object-cover rounded"
              unoptimized
            />
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-200"></div>
            </div>
          </div>
        </div>
      )}
      <div
        className={`group relative border-b border-gray-800 bg-[#0a0a0a] px-4 py-3 transition-colors hover:bg-gray-900/50 overflow-x-hidden ${priceChangeClass}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {columnType === 'newPairs' && isHovered && token.bonding !== undefined && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 z-50 pointer-events-none">
            <div className="bg-[#1a1a1a] border border-gray-700 rounded px-3 py-2 shadow-lg min-w-[200px]">
              <div className="text-xs">
                <div className="mb-1">
                  <span className="text-green-500">Bonding:</span>{' '}
                  <span className="text-white">{token.bonding.toFixed(2)}%</span>
                </div>
           
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-700"></div>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center gap-2 shrink-0 relative">
            <div 
              ref={imageRef}
              className="relative w-12 h-12 border border-purple-500/50 bg-black rounded overflow-hidden"
              onMouseEnter={() => setIsImageHovered(true)}
              onMouseLeave={() => setIsImageHovered(false)}
            >
              <Image
                src={token.icon}
                alt={token.name}
                width={48}
                height={48}
                className="w-full h-full object-cover cursor-pointer"
                unoptimized
              />
              {token.symbol === 'NOAI' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-full h-0.5 bg-red-500 transform rotate-12 origin-center" style={{ marginTop: '2px' }} />
                </div>
              )}
              <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center transform translate-x-1 translate-y-1">
                <PenTool className="h-2.5 w-2.5 text-white" />
              </div>
            </div>
          <div className="text-[10px] text-gray-400 text-center max-w-[60px] truncate">
            {token.description.includes('...') ? token.description : `${token.contractAddress.slice(0, 4)}...${token.contractAddress.slice(-4)}`}
          </div>
        </div>

        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">{token.name}</span>
            <span className="text-sm text-gray-300">{token.symbol}</span>
            <Copy className="h-3.5 w-3.5 text-gray-500 cursor-pointer hover:text-gray-400" />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-green-500">{formatTimeAgo(token.age)}</span>
            <Search className="h-3.5 w-3.5 text-gray-500" />
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-gray-500" />
              <span className="text-blue-500">{token.metrics.person}</span>
            </div>
            <div className="flex items-center gap-1">
              <BarChart3 className="h-3.5 w-3.5 text-gray-500" />
              <span className="text-blue-500">{token.metrics.chart}</span>
            </div>
            <div className="flex items-center gap-1">
              <Trophy className="h-3.5 w-3.5 text-gray-500" />
              <span className="text-blue-500">{token.metrics.trophy}</span>
            </div>
            <div className="flex items-center gap-1">
              <Crown className="h-3.5 w-3.5 text-gray-500" />
              <span className="text-blue-500">{token.progress.current}/{token.progress.total}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-xs">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-red-500 fill-red-500" />
              <span className="text-red-500 font-medium">{token.percentages.person}%</span>
            </div>
            <div className="flex items-center gap-1">
              <UtensilsCrossed className="h-3.5 w-3.5 text-green-500" />
              <span className="text-green-500 font-medium">{token.percentages.clock}% {formatTimeAgo(token.age)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Target className="h-3.5 w-3.5 text-red-500 fill-red-500" />
              <span className="text-red-500 font-medium">{token.percentages.chart}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-red-500" />
              <span className="text-red-500 font-medium">{token.percentages.extra1}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Boxes className="h-3.5 w-3.5 text-green-500" />
              <span className="text-green-500 font-medium">{token.percentages.extra2}%</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <div className="text-xs">
            <span className="text-gray-400">MC</span>{' '}
            <span className="text-blue-400 font-semibold">{formatCurrency(token.marketCap)}</span>
          </div>
          <div className="text-xs">
            <span className="text-gray-400">V</span>{' '}
            <span className="text-blue-400 font-semibold">{formatCurrency(token.volume)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400">F</span>
            <span className="bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent font-medium">
              {formatFeesWithSubscript(token.fees)}
            </span>
            <span className="text-gray-400">TX {token.transactions}</span>
            <div className="h-0.5 w-8 bg-green-500" />
          </div>
          <div className="flex items-center gap-1 mt-1">
            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
              <PenTool className="h-3 w-3 text-white" />
            </div>
            <div className="flex items-center justify-center">
              <ThreeArrowAnimation />
            </div>
            <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center">
              <PenTool className="h-3 w-3 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
});

TokenRow.displayName = 'TokenRow';

export default TokenRow;

