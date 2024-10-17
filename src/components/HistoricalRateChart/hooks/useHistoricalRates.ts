import { useEffect, useState } from 'react';
import axiosInstance from '../../../services/axiosInstance';

interface HistoricalRate {
  date: string;
  rate: number;
}

interface DateCurrencyMap {
  [date: string]: { [currency: string]: number };
}

const useHistoricalRates = (
  baseCurrency: string,
  targetCurrency: string,
  startDate: string,
  endDate: string
) => {
  const [historicalRates, setHistoricalRates] = useState<HistoricalRate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHistoricalRates = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/${startDate}..${endDate}?base=${baseCurrency}&symbols=${targetCurrency}`
        );

        const rates: DateCurrencyMap = response.data.rates;

        const historicalData = Object.entries(rates).map(([date, rate]) => ({
          date,
          rate: rate[targetCurrency],
        }));

        setHistoricalRates(historicalData);
      } catch (err: any) {
        alert(
          err.message || 'An error occurred while fetching historical rates.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricalRates();
  }, [baseCurrency, targetCurrency, startDate, endDate]);

  return { loading, historicalRates };
};

export default useHistoricalRates;
