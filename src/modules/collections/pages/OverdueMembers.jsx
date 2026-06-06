import { useState } from 'react'
import { Link } from 'react-router-dom'
import { mockOverdue } from '../../../mock'
import { 
  AlertTriangle, ShieldAlert, PhoneCall, History, 
  Search, Filter, ChevronRight, UserMinus, FileText,
  BadgeAlert, TrendingDown, Users
} from 'lucide-react'
import { clsx } from 'clsx'

export default function OverdueMembers() {
  const [filterRisk, setFilterRisk] = useState('All')

  return (
    <div className="space-y-4 pb-10">
      {/* Page Header */}
      <div className="bg-white border-b border-[#D8DDE6] -mx-4 -mt-4 mb-4 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-rose-600 rounded flex items-center justify-center text-white shadow-lg">
                <AlertTriangle className="w-6 h-6" />
             </div>
             <div>
               <p className="text-[11px] font-bold text-[#54698D] uppercase tracking-wider leading-none mb-1">Financial Risk Management</p>
               <h1 className="text-[20px] font-bold text-[#16325C] leading-none">Overdue & Recovery Desk</h1>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-action flex items-center gap-2 px-3 py-1.5"><History className="w-3.5 h-3.5" /> Call History</button>
            <button className="btn-primary-fn !bg-rose-600 !hover:bg-rose-700 px-8 h-10">Print Defaulter Notice</button>
          </div>
        </div>
      </div>

      {/* Risk Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Critical Risk', value: '18', count: '₹2.5 L', color: 'bg-rose-600', icon: ShieldAlert },
          { label: 'High Risk', value: '24', count: '₹1.8 L', color: 'bg-orange-600', icon: BadgeAlert },
          { label: 'Medium Risk', value: '52', count: '₹4.2 L', color: 'bg-amber-500', icon: AlertTriangle },
          { label: 'Low Risk', value: '48', count: '₹1.2 L', color: 'bg-blue-500', icon: Users },
        ].map((stat, i) => (
          <div key={i} className="workspace-panel border-l-4 p-4 flex items-center justify-between border-l-rose-500">
             <div>
               <p className="text-[10px] font-black text-[#54698D] uppercase tracking-widest leading-none mb-2">{stat.label}</p>
               <div className="flex items-baseline gap-2">
                 <h3 className="text-2xl font-black text-[#16325C]">{stat.value}</h3>
                 <span className="text-[11px] font-bold text-[#54698D]">Accounts</span>
               </div>
               <p className="text-[11px] font-black text-rose-600 mt-1">{stat.count} Total OD</p>
             </div>
             <div className={clsx("p-2 rounded text-white", stat.color)}>
                <stat.icon className="w-5 h-5" />
             </div>
          </div>
        ))}
      </div>

      {/* Data Workspace */}
      <div className="workspace-panel overflow-hidden">
        <div className="p-4 border-b border-[#D8DDE6] flex flex-col lg:flex-row items-center justify-between gap-4 bg-gray-50/50">
           <div className="flex items-center gap-2">
              {['All', 'Critical', 'High', 'Medium', 'Low'].map(risk => (
                <button 
                  key={risk} 
                  onClick={() => setFilterRisk(risk)}
                  className={clsx(
                    "px-4 py-1.5 rounded text-[10px] font-black uppercase tracking-widest border transition-all",
                    filterRisk === risk ? "bg-[#16325C] text-white border-transparent" : "bg-white text-stone-500 border-[#D8DDE6] hover:bg-gray-100"
                  )}
                >
                  {risk}
                </button>
              ))}
           </div>
           <div className="relative w-full lg:w-72">
             <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
             <input type="text" placeholder="Filter recovery queue..." className="w-full h-8 pl-9 pr-4 bg-white border border-[#D8DDE6] rounded text-[11px] outline-none shadow-inner" />
           </div>
        </div>
        <div className="overflow-x-auto min-h-[400px]">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Risk Level</th>
                <th>Subject Name</th>
                <th>Membership</th>
                <th>Product</th>
                <th className="text-right">OS Principal</th>
                <th className="text-right">OD Tenure</th>
                <th>Collection Agent</th>
                <th className="text-right">Operations</th>
              </tr>
            </thead>
            <tbody>
              {mockOverdue.map((row, i) => (
                <tr key={i} className="hover:bg-rose-50/30 transition-colors group">
                  <td>
                    <span className={clsx(
                      "status-badge-fn",
                      row.risk === 'Critical' ? 'bg-rose-600 text-white border-transparent' : 
                      row.risk === 'High' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                      'bg-amber-50 text-amber-600 border-amber-100'
                    )}>
                      {row.risk}
                    </span>
                  </td>
                  <td>
                    <Link to={`/crm/customers/${row.id}`} className="font-bold text-[#16325C] hover:text-[#0070D2]">{row.customerName}</Link>
                  </td>
                  <td className="font-mono text-[11px] font-black text-[#0070D2]">{row.membershipId}</td>
                  <td className="text-[10px] uppercase font-bold text-[#54698D]">{row.scheme}</td>
                  <td className="text-right font-black font-mono text-rose-600 italic">₹{row.amount.toLocaleString()}</td>
                  <td className="text-right font-bold text-[#16325C]">{row.daysOverdue} Days</td>
                  <td className="text-[11px] font-medium text-stone-500 uppercase">{row.executive}</td>
                  <td className="text-right">
                    <div className="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                       <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded" title="Call Now"><PhoneCall className="w-3.5 h-3.5" /></button>
                       <button className="p-1.5 text-rose-600 hover:bg-rose-50 rounded" title="View History"><FileText className="w-3.5 h-3.5" /></button>
                    </div>
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
