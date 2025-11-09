import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  searchQuery: string;
  selectedChain: string;
  isConnected: boolean;
  selectedPreset: string;
  selectedPage: string;
  walletBalance: number;
  twitterBalance: number;
  discoverBalance: number;
  pulseBalance: number;
  pnl: number;
}

const initialState: UiState = {
  searchQuery: '',
  selectedChain: 'SOL',
  isConnected: false,
  selectedPreset: 'PRESET 1',
  selectedPage: '1 0',
  walletBalance: 101800,
  twitterBalance: 3376,
  discoverBalance: 0,
  pulseBalance: 0,
  pnl: 156.91,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedChain: (state, action: PayloadAction<string>) => {
      state.selectedChain = action.payload;
    },
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setPreset: (state, action: PayloadAction<string>) => {
      state.selectedPreset = action.payload;
    },
    setPage: (state, action: PayloadAction<string>) => {
      state.selectedPage = action.payload;
    },
    updateBalances: (
      state,
      action: PayloadAction<Partial<Omit<UiState, 'searchQuery' | 'selectedChain' | 'isConnected' | 'selectedPreset' | 'selectedPage'>>>
    ) => {
      Object.assign(state, action.payload);
    },
  },
});

export const {
  setSearchQuery,
  setSelectedChain,
  setConnectionStatus,
  setPreset,
  setPage,
  updateBalances,
} = uiSlice.actions;
export default uiSlice.reducer;

