import { useEffect, useState } from 'react';


export function usePriceTransition(
  currentPrice: number,
  previousPrice?: number
): 'text-green-500' | 'text-red-500' | 'text-gray-400' {
  const [color, setColor] = useState<'text-green-500' | 'text-red-500' | 'text-gray-400'>('text-gray-400');

  useEffect(() => {
    if (previousPrice === undefined) {
      setColor('text-gray-400');
      return;
    }

    if (currentPrice > previousPrice) {
      setColor('text-green-500');
    } else if (currentPrice < previousPrice) {
      setColor('text-red-500');
    } else {
      setColor('text-gray-400');
    }

    const timer = setTimeout(() => {
      setColor('text-gray-400');
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentPrice, previousPrice]);

  return color;
}

