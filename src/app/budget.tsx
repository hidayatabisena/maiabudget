// app/BudgetingApp.tsx
'use client'

import React, { useState } from 'react';

const BudgetingApp: React.FC = () => {
  const [memberAmount, setMemberAmount] = useState<number>(0);
  const [maiaSubscription, setMaiaSubscription] = useState<number>(0);
  const [openAISubscription, setOpenAISubscription] = useState<number>(0);
  const [antropicSubscription, setAntropicSubscription] = useState<number>(0);
  const [geminiSubscription, setGeminiSubscription] = useState<number>(0);
  const [salesTarget, setSalesTarget] = useState<number>(0);
  const [salesPrice, setSalesPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [profit, setProfit] = useState<number>(0);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [exchangeRate, setExchangeRate] = useState<number>(15000);

  const daysInMonth = 30;

  const handleButtonClick = () => {
    if (isCalculated) {
      // Reset all input fields and results
      setMemberAmount(0);
      setMaiaSubscription(0);
      setOpenAISubscription(0);
      setAntropicSubscription(0);
      setGeminiSubscription(0);
      setSalesTarget(0);
      setSalesPrice(0);
      setTotalPrice(0);
      setTotalSales(0);
      setProfit(0);
      setIsCalculated(false);
    } else {
      // Perform calculations
      const openAIInRupiah = openAISubscription * exchangeRate * daysInMonth;
      const antropicInRupiah = antropicSubscription * exchangeRate * daysInMonth;
      const geminiInRupiah = geminiSubscription * daysInMonth;
      const calculatedTotalPrice = (memberAmount * maiaSubscription) + openAIInRupiah + antropicInRupiah + geminiInRupiah;
      setTotalPrice(calculatedTotalPrice);

      const calculatedTotalSales = salesTarget * salesPrice;
      setTotalSales(calculatedTotalSales);

      const calculatedProfit = calculatedTotalSales - calculatedTotalPrice;
      setProfit(calculatedProfit);
      setIsCalculated(true);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 items-start justify-center">
        <div className="w-full max-w-xl mx-auto md:mx-0 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">MAIA Cost Estimation</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Member Amount" value={memberAmount} onChange={setMemberAmount} />
            <Input label="MAIA Sub (IDR/month)" value={maiaSubscription} onChange={setMaiaSubscription} />
            <Input label="OpenAI Sub (USD/day)" value={openAISubscription} onChange={setOpenAISubscription} />
            <Input label="Antropic Sub (USD/day)" value={antropicSubscription} onChange={setAntropicSubscription} />
            <Input label="Gemini Sub (USD/day)" value={geminiSubscription} onChange={setGeminiSubscription} />
            <Input label="Sales Target" value={salesTarget} onChange={setSalesTarget} />
            <Input label="Sales Price (IDR)" value={salesPrice} onChange={setSalesPrice} />
            <Input label="Exchange Rate (IDR/USD)" value={exchangeRate} onChange={setExchangeRate} />
          </div>
          <button 
            onClick={handleButtonClick}
            className={`w-full mt-4 ${isCalculated ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded transition-colors`}
          >
            {isCalculated ? 'Reset' : 'Calculate'}
          </button>
        </div>

        <div className="md:self-start bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          {isCalculated ? (
            <div className="space-y-4 text-gray-800 dark:text-gray-200">
              <h2 className="text-xl font-bold mb-4">Results</h2>
              <p><strong>Total Price:</strong> {formatCurrency(totalPrice)}</p>
              <p><strong>Total Sales:</strong> {formatCurrency(totalSales)}</p>
              <p><strong>Profit per month:</strong> <span className="font-mono">{formatCurrency(profit)}</span></p>
            </div>
          ) : (
            <div className="text-gray-500 dark:text-gray-400 text-center">
              <p>Enter values and click Calculate to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface InputProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
  }
  
  const Input: React.FC<InputProps> = ({ label, value, onChange }) => {
    const formatNumber = (num: number): string => {
      return num.toLocaleString('id-ID');
    };
  
    const unformatNumber = (str: string): number => {
      return Number(str.replace(/\./g, ''));
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const numericValue = unformatNumber(inputValue);
      
      if (!isNaN(numericValue)) {
        onChange(numericValue);
      }
    };
  
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <input
          type="text"
          value={value === 0 ? '' : formatNumber(value)}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
    );
  };

export default BudgetingApp;
