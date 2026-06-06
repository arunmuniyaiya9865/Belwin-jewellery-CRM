export const mockSchemes = [
  { id: 'SC-GLD-11', name: 'Golden Harvest (11+1)', type: 'Gold Saving', duration: '11 Months', amount: 500, target: '₹50,00,000', achieved: '₹42,50,000', members: 850, status: 'Active', date: '2025-01-01' },
  { id: 'SC-FST-12', name: 'Festival Swarna', type: 'Festival', duration: '12 Months', amount: 2000, target: '₹20,00,000', achieved: '₹18,20,000', members: 420, status: 'Active', date: '2024-12-15' },
  { id: 'SC-WKL-52', name: 'Weekly Dhan', type: 'Weekly', duration: '52 Weeks', amount: 500, target: '₹10,00,000', achieved: '₹9,80,000', members: 156, status: 'Active', date: '2025-02-01' },
]

export const mockMemberships = [
  { id: 'MEM-2025-001', customerName: 'Alok Sharma', customerId: 'C001', schemeName: 'Golden Harvest (11+1)', enrollmentDate: '2025-01-20', maturityDate: '2025-12-20', status: 'Active', progress: 45, paidAmount: 25000, pendingAmount: 30000, bonus: 5000 },
  { id: 'MEM-2025-002', customerName: 'Priya Singh', customerId: 'C002', schemeName: 'Festival Swarna', enrollmentDate: '2025-02-15', maturityDate: '2026-02-15', status: 'Active', progress: 25, paidAmount: 6000, pendingAmount: 18000, bonus: 2000 },
]

export const mockInstallments = [
  { month: 'January', dueDate: '2025-01-20', amount: 5000, paidDate: '2025-01-20', status: 'Paid', receipt: 'REC-9001' },
  { month: 'February', dueDate: '2025-02-20', amount: 5000, paidDate: '2025-02-22', status: 'Paid', receipt: 'REC-9042' },
  { month: 'March', dueDate: '2025-03-20', amount: 5000, paidDate: '2025-03-18', status: 'Paid', receipt: 'REC-9105' },
  { month: 'April', dueDate: '2025-04-20', amount: 5000, paidDate: '2025-04-20', status: 'Paid', receipt: 'REC-9218' },
  { month: 'May', dueDate: '2025-05-20', amount: 5000, paidDate: '2025-05-19', status: 'Paid', receipt: 'REC-9350' },
  { month: 'June', dueDate: '2025-06-20', amount: 5000, paidDate: '-', status: 'Pending', receipt: '-' },
]
