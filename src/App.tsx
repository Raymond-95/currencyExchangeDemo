import React, { useState } from 'react';
import './App.css';

import { CurrencyConverter, HistoricalRateChart } from './components';
import { getDateRange } from './utils/dateUtils';

const HISTORY_MONTH = 6;

const App: React.FC = () => {
  const [selectedCurrencies, setSelectedCurrencies] = useState<{
    baseCurrency: string;
    targetCurrency: string;
  }>({
    baseCurrency: 'MYR',
    targetCurrency: 'USD',
  });

  // Get six months data
  const { startDate, endDate } = getDateRange(HISTORY_MONTH);

  const onCurrenciesSelect = (baseCurrency: string, targetCurrency: string) => {
    setSelectedCurrencies({ baseCurrency, targetCurrency });
  };

  return (
    <div className="App">
      <HistoricalRateChart
        baseCurrency={selectedCurrencies.baseCurrency}
        targetCurrency={selectedCurrencies.targetCurrency}
        startDate={startDate}
        endDate={endDate}
      />

      <div className="currency-converter-wrapper">
        <CurrencyConverter
          initialCurrencies={selectedCurrencies}
          onCurrenciesSelect={onCurrenciesSelect}
        />
      </div>
    </div>
  );
};

export default App;
