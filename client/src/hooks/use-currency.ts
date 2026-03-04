
import { useState, useEffect } from 'react';

export const CURRENCY_MAP: Record<string, { symbol: string, code: string }> = {
  'PK': { symbol: 'Rs.', code: 'PKR' },
  'GB': { symbol: '£', code: 'GBP' },
  'US': { symbol: '$', code: 'USD' },
  'default': { symbol: '$', code: 'USD' }
};

export function useCurrency() {
  const [countryCode, setCountryCode] = useState('US');

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.country_code) {
          setCountryCode(data.country_code);
        }
      })
      .catch(() => setCountryCode('US'));
  }, []);

  const formatPrice = (prices: Record<string, number> | null | undefined, basePrice: number | null) => {
    const currency = CURRENCY_MAP[countryCode] || CURRENCY_MAP['default'];
    const amount = (prices && prices[countryCode]) ? prices[countryCode] : (basePrice || 0);
    return `${currency.symbol}${Math.floor(amount / 100)}`;
  };

  return { countryCode, formatPrice };
}
