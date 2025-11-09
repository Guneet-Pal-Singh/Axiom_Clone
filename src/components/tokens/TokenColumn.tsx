'use client';

import { memo, useMemo } from 'react';
import { Settings, Star, MoreVertical, Grid3x3, ChevronDown, Zap, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Virtuoso } from 'react-virtuoso';
import TokenRow from './TokenRow';
import { Skeleton } from '@/components/ui/skeleton';
import { useTokens } from '@/hooks/use-tokens';
import { useWebSocket } from '@/hooks/use-websocket';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { setSortConfig } from '@/lib/store/slices/tokenSlice';
import type { TokenColumnType } from '@/types/token';
import { ErrorBoundary } from 'react-error-boundary';
import { Shimmer } from '@/components/ui/shimmer';

interface TokenColumnProps {
  type: TokenColumnType;
  title: string;
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex h-64 items-center justify-center rounded-lg border border-red-500 bg-red-500/10 p-4">
      <div className="text-center">
        <p className="text-sm font-medium text-red-500">Error loading tokens</p>
        <p className="mt-1 text-xs text-gray-400">{error.message}</p>
      </div>
    </div>
  );
}

function TokenColumnSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 border-b border-gray-800 p-4">
          <Shimmer className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Shimmer className="h-4 w-32" />
            <Shimmer className="h-3 w-24" />
          </div>
          <Shimmer className="h-8 w-20" />
        </div>
      ))}
    </div>
  );
}

const TokenColumn = memo(function TokenColumn({ type, title }: TokenColumnProps) {
  const { tokens, isLoading, error } = useTokens(type);
  const sortConfig = useAppSelector((state) => state.tokens.sortConfig);
  const dispatch = useAppDispatch();

  const tokenIds = useMemo(() => tokens.map((t) => t.id), [tokens]);
  useWebSocket(type, tokenIds);

  const sortedTokens = useMemo(() => {
    if (sortConfig.column !== type || !sortConfig.field || !sortConfig.direction) {
      return tokens;
    }

    const sorted = [...tokens].sort((a, b) => {
      const aVal = a[sortConfig.field as keyof typeof a];
      const bVal = b[sortConfig.field as keyof typeof b];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortConfig.direction === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return 0;
    });

    return sorted;
  }, [tokens, sortConfig, type]);

  const handleSort = (field: keyof typeof tokens[0]) => {
    const currentDirection =
      sortConfig.column === type && sortConfig.field === field
        ? sortConfig.direction
        : null;

    const newDirection =
      currentDirection === 'asc' ? 'desc' : currentDirection === 'desc' ? null : 'asc';

    dispatch(
      setSortConfig({
        column: type,
        field: newDirection ? field : null,
        direction: newDirection,
      })
    );
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className={`flex flex-col w-full h-full lg:h-[calc(100vh-8.5rem)] ${type === 'finalStretch' ? 'final-stretch-gradient' : ''}`}>
        <div className="w-full flex items-center justify-between border-b border-gray-800 bg-[#0a0a0a] px-4 py-2.5">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-semibold text-white">{title}</h3>
            {type === 'newPairs' && (
              <div className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-xs text-gray-400">0</span>
              </div>
            )}
            {type === 'migrated' && (
              <div className="flex items-center gap-1.5">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 px-2 text-xs text-gray-400 hover:text-white hover:bg-gray-800"
                >
                  Display
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 text-gray-400 hover:text-white hover:bg-gray-800"
                >
                  <Grid3x3 className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {(type === 'finalStretch' || type === 'migrated') && (
              <div className="flex items-center gap-0.5">
                <button className="px-1.5 py-0.5 text-[10px] font-medium text-gray-500 hover:text-white hover:bg-gray-800 rounded">
                  P1
                </button>
                <button className="px-1.5 py-0.5 text-[10px] font-medium text-gray-500 hover:text-white hover:bg-gray-800 rounded">
                  P2
                </button>
                <button className="px-1.5 py-0.5 text-[10px] font-medium text-gray-500 hover:text-white hover:bg-gray-800 rounded">
                  P3
                </button>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Filter className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {isLoading ? (
            <div className="h-full overflow-y-auto">
              <TokenColumnSkeleton />
            </div>
          ) : error ? (
            <div className="flex h-64 items-center justify-center p-4">
              <p className="text-sm text-red-500">Error: {error.message}</p>
            </div>
          ) : sortedTokens.length === 0 ? (
            <div className="flex h-64 items-center justify-center p-4">
              <p className="text-sm text-gray-400">No tokens found</p>
            </div>
          ) : (
            <div className="w-full h-full">
              <Virtuoso
                totalCount={sortedTokens.length}
                itemContent={(index) => {
                  const token = sortedTokens[index];
                  return <TokenRow key={token.id} token={token} columnType={type} />;
                }}
                style={{ height: '100%' }}
                className="h-full w-full"
              />
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
});

TokenColumn.displayName = 'TokenColumn';

export default TokenColumn;

