import { useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setTokens } from '@/lib/store/slices/tokenSlice';
import { generateMockTokens } from '@/lib/mock-data';
import type { TokenColumnType } from '@/types/token';
import { useEffect } from 'react';

export function useTokens(column: TokenColumnType) {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.tokens[column]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['tokens', column],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const mockTokens = generateMockTokens(
        column === 'newPairs' ? 15 : column === 'finalStretch' ? 12 : 10,
        column
      );
      return mockTokens;
    },
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      dispatch(setTokens({ column, tokens: data }));
    }
  }, [data, column, dispatch]);

  return {
    tokens: tokens.length > 0 ? tokens : data || [],
    isLoading,
    error: error as Error | null,
  };
}

