export const mockPurchases = [
  { id: 'INV-1001', date: '2025-05-12', items: 'Gold Necklace (22K)', weight: '24.5g', amount: 175000, customerId: 'C001' },
]

export const mockPayments = [
  { id: 'REC-5001', date: '2025-05-12', amount: 100000, mode: 'Card', scheme: 'None', status: 'Success', customerId: 'C001' },
]

export const mockFinance = {
  cashInHand: 1250000,
  bankBalance: 8540000,
  totalRevenue: 15420000
}

export const mockTimeline = [
  { type: 'purchase', date: '2025-05-12', title: 'New Purchase', desc: 'Gold Necklace (24.5g)', amount: '₹1,75,000' },
  { type: 'payment', date: '2025-05-12', title: 'Payment Received', desc: 'Paid via Card', amount: '₹1,00,000' },
]
