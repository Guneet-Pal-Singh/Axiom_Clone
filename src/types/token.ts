export type TokenColumnType = 'newPairs' | 'finalStretch' | 'migrated';

export interface TokenMetrics {
  link: number;
  chart: number;
  question: number;
  person: number;
  trophy: number;
  shield: number;
}

export interface TokenProgress {
  current: number;
  total: number;
}

export interface TokenPercentages {
  person: number;
  clock: number;
  calendar: number;
  chart: number;
  extra1: number;
  extra2: number;
}

export interface Token {
  id: string;
  name: string;
  symbol: string;
  description: string;
  icon: string;
  age: string; // e.g., "0s", "3s", "10h", "23h"
  metrics: TokenMetrics;
  progress: TokenProgress;
  percentages: TokenPercentages;
  marketCap: number;
  volume: number;
  fees: number;
  transactions: number;
  price: number;
  previousPrice?: number;
  lastUpdated?: number;
  contractAddress: string;
  buyAmount?: number; // SOL amount for buy button
  bonding?: number; // Bonding percentage for New Pairs
}

export interface TokenColumn {
  type: TokenColumnType;
  title: string;
  tokens: Token[];
  isLoading?: boolean;
  error?: string | null;
}

