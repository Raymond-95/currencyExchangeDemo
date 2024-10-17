import { useEffect, useState } from 'react';
import axiosInstance from '../../../services/axiosInstance';

type CurrencyMap = {
  [key: string]: string;
};

interface Currency {
  code: string;
  name: string;
}

export const useFetchCurrencies = () => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCurrencies = async () => {
      setLoading(true);
      try {
        const response: CurrencyMap = await axiosInstance.get('/currencies');
        const currenciesArray = Object.entries(response.data).map(
          ([code, _]) => code
        );
        setCurrencies(currenciesArray);
      } catch (err) {
        alert('Failed to fetch currencies');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  return { loading, currencies };
};
