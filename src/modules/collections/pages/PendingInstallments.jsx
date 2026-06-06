import { useState } from 'react'
import { Link } from 'react-router-dom'
import { mockInstallments } from '../../../mock'
import { 
  Search, Filter, Clock, AlertCircle, CheckCircle2,
  ChevronLeft, ChevronRight, FileDown, Download,
  Wallet, User, ArrowRight
} from 'lucide-react'
import { clsx } from 'clsx'

export default function PendingInstallments() {
  const stats = [
    { label: 'Total Pending', value: '₹12.4 L', count: '142 Tasks', icon: Wallet },
    { label: 'Due Today', value: '₹42,000', count: '12 Members', icon: Clock },
    { label: 'High Priority', value: '₹2.8 L', count: '38 Defaulters', icon: AlertCircle },
    { label: 'Expected Weekly', value: '₹4.5 L', count: 'Next 7 Days', icon: TrendingUp },
  ]

  return (
    <div className="space-y-4 pb-10">
      {/* Page Header */}
      <div className="bg-white border-b border-[#D8DDE6] -mx-4 -mt-4 mb-4 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-amber-500 rounded flex items-center justify-center text-white shadow-lg">
                <Clock className="w-6 h-6" />
             </div>
             <div>
               <p className="text-[11px] font-bold text-[#54698D] uppercase tracking-wider leading-none mb-1">Account Oversight</p>
               <h1 className="text-[20px] font-bold text-[#16325C] leading-none">Pending Installments</h1>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-action flex items-center gap-2 px-3 py-1.5"><FileDown className="w-3.5 h-3.5" /> Export Queue</button>
            <Link to="/collections/entry" className="btn-primary-fn flex items-center gap-2">
               Bulk Collection Mode
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="workspace-panel p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-[#54698D] uppercase tracking-wider mb-1">{stat.label}</p>
              <h3 className="text-xl font-black text-[#16325C]">{stat.value}</h3>
              <p className="text-[10px] font-bold text-stone-400 uppercase mt-0.5">{stat.count}</p>
            </div>
            <div className="p-2 rounded bg-gray-50 text-stone-300">
               <stat.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white p-3 rounded border border-[#D8DDE6] shadow-sm">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by Membership or Customer..." 
              className="w-full h-8 pl-10 pr-4 bg-[#F3F5F9] border border-transparent focus:bg-white focus:border-primary/30 rounded text-[12px] outline-none" 
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-action flex items-center gap-2"><Filter className="w-3.5 h-3.5" /> Scheme Type</button>
          <button className="btn-action flex items-center gap-2"><Filter className="w-3.5 h-3.5" /> Branch Hub</button>
        </div>
      </div>

      {/* Data Table */}
      <div className="workspace-panel overflow-hidden">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Membership</th>
                <th>Legal Name</th>
                <th>Scheme</th>
                <th>Due Date</th>
                <th className="text-right">Amount</th>
                <th>Days Rem.</th>
                <th>Status</th>
                <th className="text-right">Operations</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'MEM-25-01', name: 'Alok Sharma', scheme: 'Golden Harvest', due: '20 Jun 2025', amount: 5000, days: '+16', status: 'Upcoming' },
                { id: 'MEM-25-12', name: 'Priya Singh', scheme: 'Festival Swarna', due: '20 Jun 2025', amount: 2000, days: '+16', status: 'Upcoming' },
                { id: 'MEM-25-88', name: 'Raj Kumar', scheme: 'Weekly Dhan', due: '04 Jun 2025', amount: 500, days: 'Today', status: 'Due Today' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#F3F5F9] transition-colors group">
                  <td className="font-mono text-[11px] font-black text-[#0070D2]">{row.id}</td>
                  <td className="font-bold text-[#16325C]">{row.name}</td>
                  <td className="text-[#54698D] text-[11px] uppercase font-bold">{row.scheme}</td>
                  <td className="font-mono font-bold">{row.due}</td>
                  <td className="text-right font-black font-mono">₹{row.amount.toLocaleString()}</td>
                  <td>
                    <span className={clsx(
                      "px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter",
                      row.days === 'Today' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-stone-500'
                    )}>
                      {row.days}
                    </span>
                  </td>
                  <td>
                    <span className={clsx(
                      "status-badge-fn",
                      row.status === 'Due Today' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-blue-50 text-[#0070D2] border-blue-100'
                    )}>
                      {row.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <Link to="/collections/entry" className="inline-flex items-center gap-1.5 text-[#0070D2] font-black text-[11px] uppercase tracking-widest hover:underline opacity-0 group-hover:opacity-100 transition-all">
                       Process <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function TrendingUp(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
  )
}
