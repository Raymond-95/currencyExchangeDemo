import React, { useState, useEffect, ChangeEvent } from 'react';
import './css/CurrencyConverter.css';
import { IMAGES } from '../../assets/images';

import { useFetchCurrencies } from './hooks/useFetchCurrencies';
import { useCurrencyConverter } from './hooks/useCurrencyConverter';

interface Props {
  initialCurrencies: { baseCurrency: string; targetCurrency: string };
  onCurrenciesSelect: (baseCurrency: string, targetCurrency: string) => void;
}

export const CurrencyConverter = ({
  initialCurrencies,
  onCurrenciesSelect,
}: Props) => {
  const [baseAmount, setBaseAmount] = useState<string>('1');
  const [targetAmount, setTargetAmount] = useState<string>();
  const [baseCurrency, setBaseCurrency] = useState(
    initialCurrencies.baseCurrency
  );
  const [targetCurrency, setTargetCurrency] = useState(
    initialCurrencies.targetCurrency
  );
  const [currentRate, setCurrentRate] = useState<number>(0);

  const { loading: isFetchingCurrencies, currencies } = useFetchCurrencies();
  const {
    loading: isConvertingCurrency,
    convert,
    convertBaseToTarget,
    convertTargetToBase,
  } = useCurrencyConverter();

  useEffect(() => {
    const getLatestRate = async () => {
      const newRate = await convert(baseCurrency, targetCurrency);

      if (newRate) {
        const convertedTargetAmount = convertBaseToTarget(
          Number(baseAmount),
          newRate
        );
        setCurrentRate(newRate);
        setTargetAmount(convertedTargetAmount);
      }
    };

    getLatestRate();
  }, [baseCurrency, targetCurrency]);

  const handleSwitch = () => {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
    setBaseAmount(targetAmount ?? '1');
    setTargetAmount(baseAmount);
  };

  const onBaseCurrencySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedBaseCurrency = e.target.value;
    if (selectedBaseCurrency === targetCurrency) {
      alert('Cannot select the same currency as target');
      return;
    }

    setBaseCurrency(selectedBaseCurrency);
    onCurrenciesSelect(selectedBaseCurrency, targetCurrency);
  };

  const onBaseInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const baseInputValue = Number(e.target.value);
    setBaseAmount(e.target.value);

    const convertedTargetAmount = convertBaseToTarget(baseInputValue, currentRate);
    setTargetAmount(convertedTargetAmount);
  };

  const onTargetCurrencySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedTargerCurrency = e.target.value;
    if (selectedTargerCurrency === baseCurrency) {
      alert('Cannot select the same currency as base');
      return;
    }
    setTargetCurrency(selectedTargerCurrency);
    onCurrenciesSelect(baseCurrency, selectedTargerCurrency);
  };

  const onTargetInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetInputValue = Number(e.target.value);
    setTargetAmount(e.target.value);

    const convertedBaseAmount = convertTargetToBase(targetInputValue, currentRate);
    setBaseAmount(convertedBaseAmount);
  };

  if (isFetchingCurrencies || isConvertingCurrency) return <p>Loading...</p>;

  return (
    <div className="currency-converter">
      <div className="currency-amount-container">
        <input type="number" value={baseAmount} onChange={onBaseInputChange} />
        <select value={baseCurrency} onChange={onBaseCurrencySelect}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <img
        src={IMAGES.switch}
        alt="Switch Currency"
        onClick={handleSwitch}
        className="switch-image"
      />

      <div className="currency-amount-container">
        <input
          type="number"
          value={targetAmount !== null ? targetAmount : ''}
          onChange={onTargetInputChange}
        />
        <select value={targetCurrency} onChange={onTargetCurrencySelect}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
