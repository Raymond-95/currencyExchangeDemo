import React, { useState, useEffect, ChangeEvent } from 'react';
import './css/CurrencyConverter.css';
import { IMAGES } from '../../assets/images';

import { useFetchCurrencies } from './hooks/useFetchCurrencies';
import { useCurrencyConverter } from './hooks/useCurrencyConverter';

export const CurrencyConverter = () => {
  const [baseAmount, setBaseAmount] = useState<string>('1');
  const [targetAmount, setTargetAmount] = useState<string>();
  const [baseCurrency, setBaseCurrency] = useState('MYR'); // Set default base currency
  const [targetCurrency, setTargetCurrency] = useState('USD'); // Set default target currency

  const { loading: isFetchingCurrencies, currencies } = useFetchCurrencies();
  const {
    loading: isConvertingCurrency,
    convert,
    convertBaseToTarget,
    convertTargetToBase,
  } = useCurrencyConverter();

  useEffect(() => {
    const getLatestRate = async () => {
      await convert(baseCurrency, targetCurrency);
    };

    getLatestRate();

    const convertedTargetAmount = convertBaseToTarget(Number(baseAmount));
    setTargetAmount(convertedTargetAmount);
  }, [baseCurrency, targetCurrency]);

  const handleSwitch = () => {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
    setBaseAmount(targetAmount ?? '1');
    setTargetAmount(baseAmount);
  };

  const onBaseInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const baseInputValue = Number(e.target.value);
    setBaseAmount(e.target.value);

    const convertedTargetAmount = convertBaseToTarget(baseInputValue);
    setTargetAmount(convertedTargetAmount);
  };

  const onTargetInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetInputValue = Number(e.target.value);
    setTargetAmount(e.target.value);

    const convertedBaseAmount = convertTargetToBase(targetInputValue);
    setBaseAmount(convertedBaseAmount);
  };

  return (
    <div className="currency-converter">
      <div className="currency-amount-container">
        <input type="number" value={baseAmount} onChange={onBaseInputChange} />
        <select
          value={baseCurrency}
          onChange={(e) => {
            if (e.target.value === targetCurrency) {
              alert('Cannot select the same currency as target');
              return;
            }
            setBaseCurrency(e.target.value);
          }}
        >
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
        <select
          value={targetCurrency}
          onChange={(e) => {
            if (e.target.value === baseCurrency) {
              alert('Cannot select the same currency as base');
              return;
            }
            setTargetCurrency(e.target.value);
          }}
        >
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
