export const mockMaturityKPIs = {
  totalActive: 1420,
  thisMonth: 85,
  nextMonth: 112,
  pendingRedemptions: 24,
  pendingRenewals: 18,
  completedSettlements: 1250,
  expectedValue: '₹84,50,000'
};

export const mockUpcomingMaturities = [
  { 
    id: 'MEM-25-001', 
    customerName: 'Alok Sharma', 
    schemeName: 'Golden Harvest (11+1)', 
    enrollDate: '2024-07-15', 
    maturityDate: '2025-06-15', 
    paidAmount: 55000, 
    bonus: 5000, 
    value: 60000, 
    daysRemaining: 11, 
    status: 'Ready' 
  },
  { 
    id: 'MEM-25-042', 
    customerName: 'Priya Singh', 
    schemeName: 'Festival Swarna', 
    enrollDate: '2024-06-20', 
    maturityDate: '2025-06-20', 
    paidAmount: 24000, 
    bonus: 2000, 
    value: 26000, 
    daysRemaining: 16, 
    status: 'Processing' 
  },
  { 
    id: 'MEM-24-918', 
    customerName: 'Raj Kumar', 
    schemeName: 'Weekly Dhan', 
    enrollDate: '2024-05-10', 
    maturityDate: '2025-05-10', 
    paidAmount: 12000, 
    bonus: 1000, 
    value: 13000, 
    daysRemaining: 0, 
    status: 'Overdue' 
  },
  { 
    id: 'MEM-25-105', 
    customerName: 'Sunita Mehra', 
    schemeName: 'Golden Harvest (11+1)', 
    enrollDate: '2024-08-01', 
    maturityDate: '2025-07-01', 
    paidAmount: 50000, 
    bonus: 5000, 
    value: 55000, 
    daysRemaining: 27, 
    status: 'Upcoming' 
  },
];

export const mockSettlements = [
  { id: 'SET-9001', customer: 'Amit Varma', membership: 'MEM-24-11', type: 'Redemption', method: 'Jewellery', date: '2025-06-01', amount: 85000, status: 'Settled' },
  { id: 'SET-9002', customer: 'Sanjay Dutt', membership: 'MEM-24-12', type: 'Renewal', method: 'Gold Saver Plus', date: '2025-06-02', amount: 120000, status: 'Settled' },
  { id: 'SET-9003', customer: 'Rishi Kapoor', membership: 'MEM-24-15', type: 'Redemption', method: 'Gold Coins', date: '2025-06-03', amount: 45000, status: 'Settled' },
];

export const mockMaturityAnalytics = [
  { month: 'Jan', mature: 45, renewed: 32, redeemed: 13 },
  { month: 'Feb', mature: 52, renewed: 38, redeemed: 14 },
  { month: 'Mar', mature: 85, renewed: 60, redeemed: 25 },
  { month: 'Apr', mature: 62, renewed: 45, redeemed: 17 },
  { month: 'May', mature: 78, renewed: 55, redeemed: 23 },
  { month: 'Jun', mature: 95, renewed: 70, redeemed: 25 },
];
