import { nanoid } from 'nanoid';
import type { Token } from '@/types/token';

/**
 * Generates mock token data based on the Axiom Trade interface
 */
export function generateMockTokens(count: number, column: 'newPairs' | 'finalStretch' | 'migrated'): Token[] {
  const names = [
    { name: '1st 1st degen coin', symbol: '1ST', desc: '6svs...pump', icon: '🪙' },
    { name: 'Yehud first Jewish coin', symbol: 'YEHU', desc: 'first Jewish coin', icon: '🪙' },
    { name: 'NOAI', symbol: 'NOAI', desc: 'NOAI', icon: '🤖' },
    { name: 'Montoya', symbol: 'MONTOYA', desc: 'Justice for Montoya Family', icon: '🚗' },
    { name: 'privcoin', symbol: 'PRIV', desc: 'just a privacy memecoin', icon: '🔒' },
    { name: 'narrative', symbol: 'NARR', desc: '1 narrative can change your life', icon: '📖' },
    { name: 'TikTok', symbol: 'TIKTOK', desc: 'TikTok', icon: '🎵' },
    { name: 'DeepSeek', symbol: 'DEEP', desc: 'DeepSeek', icon: '🔍' },
    { name: 'South Park', symbol: 'SPARK', desc: 'South Park', icon: '🎭' },
    { name: 'KEV', symbol: 'KEV', desc: 'MLG KEV', icon: '👤' },
    { name: 'Bangabu', symbol: 'BANG', desc: 'The Spirit of Bangers', icon: '👑' },
    { name: 'CORDEX', symbol: 'CORDEX', desc: 'AI Cordex', icon: '🔌' },
    { name: 'PUMP', symbol: 'PUMP', desc: 'Pump Bangers', icon: '🚀' },
    { name: 'PARLEY', symbol: 'PARLEY', desc: 'PARLEY', icon: '💬' },
    { name: '9-5', symbol: '9-5', desc: '9-5', icon: '💼' },
    { name: 'LUNOR', symbol: 'LUNOR', desc: 'LUNOR', icon: '🌸' },
  ];

  const ages = ['0s', '3s', '1m', '2m', '10h', '23h', '1d', '3mo', '4mo', '4h'];
  
  return Array.from({ length: count }, (_, i) => {
    const nameData = names[i % names.length];
    const basePrice = Math.random() * 0.1 + 0.001;
    const marketCap = Math.random() * 500000 + 1000;
    const volume = Math.random() * 50000 + 100;
    
    // Generate random image URL using Picsum Photos with unique seed per token
    const imageSeed = Math.floor(Math.random() * 1000) + i;
    const iconUrl = `https://picsum.photos/seed/${imageSeed}/48/48`;
    
    return {
      id: nanoid(),
      name: nameData.name,
      symbol: nameData.symbol,
      description: nameData.desc,
      icon: iconUrl,
      age: ages[Math.floor(Math.random() * ages.length)],
      metrics: {
        link: Math.floor(Math.random() * 200),
        chart: Math.floor(Math.random() * 200),
        question: Math.floor(Math.random() * 200),
        person: Math.floor(Math.random() * 200),
        trophy: Math.floor(Math.random() * 200),
        shield: Math.floor(Math.random() * 200),
      },
      progress: {
        current: Math.floor(Math.random() * 200),
        total: Math.floor(Math.random() * 10000) + 100,
      },
      percentages: {
        person: Math.floor(Math.random() * 100),
        clock: Math.floor(Math.random() * 100),
        calendar: Math.floor(Math.random() * 100),
        chart: Math.floor(Math.random() * 100),
        extra1: Math.floor(Math.random() * 100),
        extra2: Math.floor(Math.random() * 100),
      },
      marketCap,
      volume,
      fees: Math.random() * 0.1,
      transactions: Math.floor(Math.random() * 500) + 1,
      price: basePrice,
      previousPrice: basePrice,
      lastUpdated: Date.now(),
      contractAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
      buyAmount: column === 'migrated' ? undefined : 4,
      bonding: column === 'newPairs' ? Math.random() * 100 : undefined, // Bonding percentage for New Pairs
    };
  });
}

