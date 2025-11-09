import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Token, TokenColumnType } from '@/types/token';

interface TokenState {
  newPairs: Token[];
  finalStretch: Token[];
  migrated: Token[];
  favorites: string[]; // Changed from Set to array for serialization
  sortConfig: {
    column: TokenColumnType;
    field: keyof Token | null;
    direction: 'asc' | 'desc' | null;
  };
}

const initialState: TokenState = {
  newPairs: [],
  finalStretch: [],
  migrated: [],
  favorites: [],
  sortConfig: {
    column: 'newPairs',
    field: null,
    direction: null,
  },
};

const tokenSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{
        column: TokenColumnType;
        tokens: Token[];
      }>
    ) => {
      state[action.payload.column] = action.payload.tokens;
    },
    updatePrice: (
      state,
      action: PayloadAction<{
        column: TokenColumnType;
        tokenId: string;
        price: number;
        marketCap: number;
        volume: number;
        fees?: number;
        transactions?: number;
        percentages?: Partial<Token['percentages']>;
        progress?: Partial<Token['progress']>;
        metrics?: Partial<Token['metrics']>;
      }>
    ) => {
      const { column, tokenId, price, marketCap, volume, fees, transactions, percentages, progress, metrics } = action.payload;
      const token = state[column].find((t) => t.id === tokenId);
      if (token) {
        token.previousPrice = token.price;
        token.price = price;
        token.marketCap = marketCap;
        token.volume = volume;
        if (fees !== undefined) token.fees = fees;
        if (transactions !== undefined) token.transactions = transactions;
        if (percentages) {
          token.percentages = { ...token.percentages, ...percentages };
        }
        if (progress) {
          token.progress = { ...token.progress, ...progress };
        }
        if (metrics) {
          token.metrics = { ...token.metrics, ...metrics };
        }
        token.lastUpdated = Date.now();
      }
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const index = state.favorites.indexOf(action.payload);
      if (index > -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(action.payload);
      }
    },
    setSortConfig: (
      state,
      action: PayloadAction<{
        column: TokenColumnType;
        field: keyof Token | null;
        direction: 'asc' | 'desc' | null;
      }>
    ) => {
      state.sortConfig = action.payload;
    },
  },
});

export const { setTokens, updatePrice, toggleFavorite, setSortConfig } =
  tokenSlice.actions;
export default tokenSlice.reducer;

