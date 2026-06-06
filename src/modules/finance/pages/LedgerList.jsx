import { mockFinance } from '../../../mock'
import { ArrowUpRight, ArrowDownLeft, FileText, Download } from 'lucide-react'

export default function LedgerList() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Finance & Accounts</h1>
          <p className="text-sm text-gray-500">Monitor cash flow, bank balances and business ledgers.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="btn-primary">Add Entry</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-premium p-6">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Cash in Hand</p>
          <h2 className="text-2xl font-black text-gray-900">₹{mockFinance.cashInHand.toLocaleString()}</h2>
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-600">
            <ArrowUpRight className="w-4 h-4" /> +12% from today morning
          </div>
        </div>
        <div className="card-premium p-6">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Bank Balance</p>
          <h2 className="text-2xl font-black text-gray-900">₹{mockFinance.bankBalance.toLocaleString()}</h2>
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-gray-400">
            8 Connected Accounts
          </div>
        </div>
        <div className="card-premium p-6 border-l-4 border-l-rose-500">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Pending Payables</p>
          <h2 className="text-2xl font-black text-gray-900">₹8,45,000</h2>
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-rose-600 cursor-pointer hover:underline">
            View vendor dues
          </div>
        </div>
      </div>

      <div className="card-premium">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Recent Ledger Entries</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-gray-100 rounded text-xs font-bold text-gray-600">Daily</button>
            <button className="px-3 py-1 text-xs font-bold text-gray-400">Weekly</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { date: '2025-06-04', desc: 'Shop Rent - June', cat: 'Expense', amount: -150000, status: 'Cleared' },
                { date: '2025-06-04', desc: 'Sale: Gold Bangle', cat: 'Income', amount: 84000, status: 'Cleared' },
                { date: '2025-06-03', desc: 'Electric Bill', cat: 'Expense', amount: -12000, status: 'Pending' },
                { date: '2025-06-03', desc: 'Scheme Collection', cat: 'Income', amount: 45000, status: 'Cleared' },
              ].map((entry, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-600">{entry.date}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{entry.desc}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{entry.cat}</td>
                  <td className={clsx(
                    "px-6 py-4 text-sm font-bold",
                    entry.amount > 0 ? "text-emerald-600" : "text-rose-600"
                  )}>
                    {entry.amount > 0 ? '+' : ''}{entry.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{entry.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
