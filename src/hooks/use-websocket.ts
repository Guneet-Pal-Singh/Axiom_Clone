import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { updatePrice } from '@/lib/store/slices/tokenSlice';
import type { TokenColumnType } from '@/types/token';

export function useWebSocket(column: TokenColumnType, tokenIds: string[]) {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.tokens[column]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (tokenIds.length === 0) return;

    const simulateRandomUpdate = () => {
      const randomTokenId = tokenIds[Math.floor(Math.random() * tokenIds.length)];
      const token = tokens.find((t) => t.id === randomTokenId);
      
      if (!token) return;

      const priceChange = (Math.random() - 0.5) * 0.1;
      const newPrice = Math.max(0.001, token.price * (1 + priceChange));
      
      const marketCapChange = (Math.random() - 0.5) * 0.2;
      const newMarketCap = Math.max(100, token.marketCap * (1 + marketCapChange));
      
      const volumeChange = (Math.random() - 0.5) * 0.4;
      const newVolume = Math.max(10, token.volume * (1 + volumeChange));
      
      const newFees = Math.max(0, Math.min(0.1, token.fees + (Math.random() - 0.5) * 0.02));
      
      const newTransactions = Math.max(1, token.transactions + Math.floor((Math.random() - 0.5) * 10));
      
      const newPercentages = {
        person: Math.max(0, Math.min(100, token.percentages.person + Math.floor((Math.random() - 0.5) * 10))),
        clock: Math.max(0, Math.min(100, token.percentages.clock + Math.floor((Math.random() - 0.5) * 10))),
        calendar: Math.max(0, Math.min(100, token.percentages.calendar + Math.floor((Math.random() - 0.5) * 10))),
        chart: Math.max(0, Math.min(100, token.percentages.chart + Math.floor((Math.random() - 0.5) * 10))),
        extra1: Math.max(0, Math.min(100, token.percentages.extra1 + Math.floor((Math.random() - 0.5) * 10))),
        extra2: Math.max(0, Math.min(100, token.percentages.extra2 + Math.floor((Math.random() - 0.5) * 10))),
      };
      
      const progressChange = Math.floor((Math.random() - 0.5) * 20);
      const newProgress = {
        current: Math.max(0, Math.min(token.progress.total, token.progress.current + progressChange)),
        total: token.progress.total,
      };
      
      const newMetrics = {
        link: Math.max(0, token.metrics.link + Math.floor((Math.random() - 0.5) * 5)),
        chart: Math.max(0, token.metrics.chart + Math.floor((Math.random() - 0.5) * 5)),
        question: Math.max(0, token.metrics.question + Math.floor((Math.random() - 0.5) * 5)),
        person: Math.max(0, token.metrics.person + Math.floor((Math.random() - 0.5) * 5)),
        trophy: Math.max(0, token.metrics.trophy + Math.floor((Math.random() - 0.5) * 5)),
        shield: Math.max(0, token.metrics.shield + Math.floor((Math.random() - 0.5) * 5)),
      };

      dispatch(
        updatePrice({
          column,
          tokenId: randomTokenId,
          price: newPrice,
          marketCap: newMarketCap,
          volume: newVolume,
          fees: newFees,
          transactions: newTransactions,
          percentages: newPercentages,
          progress: newProgress,
          metrics: newMetrics,
        })
      );
    };

    intervalRef.current = setInterval(
      simulateRandomUpdate,
      1000 + Math.random() * 2000
    );

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [column, tokenIds, tokens, dispatch]);

  return { connected: true };
}

