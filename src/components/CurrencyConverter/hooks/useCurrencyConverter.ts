import { useState } from 'react';
import axiosInstance from '../../../services/axiosInstance';

export const useCurrencyConverter = () => {
  const [loading, setLoading] = useState(false);
  const [rate, setRate] = useState<number | null>(null);

  const convertBaseToTarget = (amount: number): string => {
    return rate ? (amount * rate).toFixed(2) : '';
  };

  const convertTargetToBase = (amount: number): string => {
    return rate ? (amount / rate).toFixed(2) : '';
  };

  const convert = async (from: string, to: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/latest`, {
        params: { base: from, symbols: to },
      });
      const rate = response.data.rates[to];
      if (rate) {
        setRate(rate);
      } else {
        throw new Error('Invalid currency data');
      }
    } catch (error) {
      alert(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    convert,
    convertBaseToTarget,
    convertTargetToBase,
  };
};
