// Generating 30 days of historical data
const generateRates = () => {
  const data = [];
  const baseGold = 7200;
  const baseSilver = 85;
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Simulate some volatility
    const volGold = (Math.random() - 0.5) * 100;
    const volSilver = (Math.random() - 0.5) * 5;
    
    data.push({
      date: dateStr,
      gold24: Math.round(baseGold + (i * 2) + volGold),
      gold22: Math.round((baseGold + (i * 2) + volGold) * 0.916),
      gold18: Math.round((baseGold + (i * 2) + volGold) * 0.75),
      silver: Math.round((baseSilver + (i * 0.2) + volSilver) * 100) / 100,
      updatedBy: 'Market Feed',
      status: 'Published'
    });
  }
  return data;
};

export const mockHistoricalRates = generateRates();

export const mockTodayRates = {
  gold24: 7340,
  gold22: 6735,
  gold18: 5505,
  silver: 92.50,
  lastUpdated: '2025-06-04T10:30:00Z',
  updatedBy: 'Admin Desk',
  trend: 'Bullish',
  change: '+1.2%',
  diff: 85
};

export const mockSilverRates = {
  current: 92.50,
  yesterday: 90.80,
  diff: 1.70,
  change: '+1.87%',
  weeklyAvg: 91.20,
  monthlyHigh: 94.00,
  monthlyLow: 88.50
};
