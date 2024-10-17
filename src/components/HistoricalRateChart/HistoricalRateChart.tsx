import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import useHistoricalRates from './hooks/useHistoricalRates';

interface Props {
  baseCurrency: string;
  targetCurrency: string;
  startDate: string;
  endDate: string;
}

export const HistoricalRateChart = ({
  baseCurrency,
  targetCurrency,
  startDate,
  endDate,
}: Props) => {
  const { loading, historicalRates } = useHistoricalRates(
    baseCurrency,
    targetCurrency,
    startDate,
    endDate
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Historical Exchange Rate: {baseCurrency} to {targetCurrency}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={historicalRates}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
          <YAxis />
          <Tooltip formatter={(value) => [`${value}`, targetCurrency]} />
          <Line type="monotone" dataKey="rate" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
