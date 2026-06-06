import { mockPurchases } from '../../../mock'
import { ShoppingBag, TrendingUp, Gem, Layers, Search, Filter } from 'lucide-react'
import { clsx } from 'clsx'

export default function PurchaseHistory() {
  return (
    <div className="space-y-8 pb-20">
      <div>
        <h1 className="text-4xl font-heading font-black text-gray-900 tracking-tight">Purchase Inventory Log</h1>
        <p className="text-gray-500 mt-2 text-lg font-medium">Audit every jewellery transaction processed within the network.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '₹42.8 L', icon: TrendingUp, color: 'emerald' },
          { label: 'Gold Volume', value: '1,240g', icon: Gem, color: 'amber' },
          { label: 'Stock Items Sold', value: '184', icon: ShoppingBag, color: 'blue' },
          { label: 'Avg Ticket Size', value: '₹23,200', icon: Layers, color: 'stone' },
        ].map(s => (
          <div key={s.label} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
             <div className={`w-12 h-12 rounded-2xl bg-${s.color}-50 text-${s.color}-600 flex items-center justify-center mb-4`}>
                <s.icon className="w-6 h-6" />
             </div>
             <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">{s.label}</p>
             <h3 className="text-2xl font-black text-gray-900">{s.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between gap-4">
           <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search invoices..." className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20" />
           </div>
           <button className="px-6 py-3 border border-gray-100 rounded-xl flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50">
             <Filter className="w-4 h-4" /> Filter History
           </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] font-black text-stone-400 uppercase tracking-widest border-b border-gray-100">
                <th className="px-8 py-5">Invoice ID</th>
                <th className="px-8 py-5">Customer</th>
                <th className="px-8 py-5">Items</th>
                <th className="px-8 py-5">Weight</th>
                <th className="px-8 py-5 text-right">Settled Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockPurchases.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6 text-sm font-black text-gray-900">{p.id}</td>
                  <td className="px-8 py-6 font-bold text-sm text-primary">{p.customerId}</td>
                  <td className="px-8 py-6 text-sm text-gray-500 font-medium">{p.items}</td>
                  <td className="px-8 py-6 text-sm text-stone-900 font-black">{p.weight}</td>
                  <td className="px-8 py-6 text-right text-sm font-black text-stone-900">₹{p.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
