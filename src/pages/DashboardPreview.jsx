import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { 
  Users, Wallet, CheckCircle, Receipt, Clock, 
  ArrowUpRight, AlertCircle, ChevronRight, FileText,
  UserPlus, Gem, Calendar
} from 'lucide-react'
import { clsx } from 'clsx'
import { Link } from 'react-router-dom'

export default function DashboardPreview() {
  const { user } = useSelector(state => state.auth)
  
  return (
    <div className="space-y-4">
      {/* Page Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-2 bg-white/50 rounded-lg border border-transparent">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded shadow-sm flex items-center justify-center border border-[#D8DDE6]">
             <Briefcase className="w-6 h-6 text-[#0070D2]" />
          </div>
          <div>
            <h1 className="text-[18px] font-bold text-[#16325C] leading-none">Command Center</h1>
            <p className="text-[11px] text-[#54698D] font-medium mt-1 uppercase tracking-wider">{user?.branch} • Operational Desk</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button className="btn-action flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> View Schedule</button>
           <button className="btn-primary-fn flex items-center gap-2"><UserPlus className="w-3.5 h-3.5" /> New Registration</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Column - Work Queues */}
        <div className="lg:col-span-3 space-y-4">
          {/* Actionable KPIs (Condensed) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Today's Receipts", value: "₹4,25,800", count: "24 Transactions", color: "emerald", icon: Receipt },
              { label: "Pending Collections", value: "₹12.4 L", count: "142 Overdue", color: "rose", icon: Clock },
              { label: "New Enrolments", value: "18", count: "Last 24 Hours", color: "blue", icon: UserPlus },
            ].map((kpi, i) => (
              <div key={i} className="workspace-panel p-4 flex items-center justify-between group hover:border-[#0070D2] transition-colors cursor-pointer">
                 <div>
                   <p className="text-[10px] font-black text-[#54698D] uppercase tracking-wider mb-1">{kpi.label}</p>
                   <h3 className="text-xl font-black text-[#16325C]">{kpi.value}</h3>
                   <p className={clsx("text-[10px] font-bold mt-1", kpi.color === 'rose' ? 'text-rose-600' : 'text-emerald-600')}>{kpi.count}</p>
                 </div>
                 <div className={clsx("p-2 rounded bg-gray-50 text-gray-400 group-hover:bg-[#0070D2] group-hover:text-white transition-all")}>
                    <kpi.icon className="w-5 h-5" />
                 </div>
              </div>
            ))}
          </div>

          {/* Primary Work Desk - Pending Actions Table */}
          <div className="workspace-panel overflow-hidden">
             <div className="p-4 border-b border-[#D8DDE6] flex items-center justify-between bg-gray-50/50">
               <h3 className="text-[12px] font-black text-[#16325C] uppercase flex items-center gap-2">
                 <AlertCircle className="w-4 h-4 text-primary" /> Urgent Action Queue
               </h3>
               <button className="text-[10px] font-black text-[#0070D2] uppercase hover:underline">View All Tasks</button>
             </div>
             <div className="overflow-x-auto">
               <table className="enterprise-table">
                 <thead>
                   <tr>
                     <th>Customer</th>
                     <th>Issue / Activity</th>
                     <th>Due Date</th>
                     <th>Amount</th>
                     <th className="text-right">Action</th>
                   </tr>
                 </thead>
                 <tbody>
                    {[
                      { name: 'Alok Sharma', task: 'Monthly Collection Overdue', due: 'Today', amount: '₹5,000', id: 'C001' },
                      { name: 'Priya Singh', task: 'Scheme Maturity Processing', due: 'Tomorrow', amount: '₹12.5 L', id: 'C002' },
                      { name: 'Raj Kumar', task: 'KYC Document Expiring', due: '15 June', amount: 'N/A', id: 'C003' },
                      { name: 'Mehta Jewelers', task: 'Vendor Payment Pending', due: 'Today', amount: '₹4.2 Cr', id: 'V009' }
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-[#F3F5F9]/50 transition-colors">
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black">{row.name[0]}</div>
                            <span className="font-bold">{row.name}</span>
                          </div>
                        </td>
                        <td><span className="text-[#54698D]">{row.task}</span></td>
                        <td><span className={clsx("px-2 py-0.5 rounded text-[10px] font-bold uppercase", row.due === 'Today' ? 'bg-rose-50 text-rose-600' : 'bg-gray-100 text-gray-500')}>{row.due}</span></td>
                        <td className="font-mono font-bold">{row.amount}</td>
                        <td className="text-right">
                          <button className="text-[#0070D2] hover:underline font-bold text-[11px] uppercase tracking-wide">Process</button>
                        </td>
                      </tr>
                    ))}
                 </tbody>
               </table>
             </div>
          </div>

          {/* Performance Grids */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="workspace-panel p-5">
               <h4 className="text-[11px] font-black text-[#16325C] uppercase mb-4 flex items-center gap-2">
                 <Gem className="w-4 h-4 text-amber-500" /> Revenue Stream
               </h4>
               <div className="h-32 flex items-center justify-center border border-dashed border-gray-100 rounded text-stone-300 text-[10px] font-bold uppercase tracking-widest">
                 Grid Chart Engine Offline
               </div>
            </div>
            <div className="workspace-panel p-5">
               <h4 className="text-[11px] font-black text-[#16325C] uppercase mb-4 flex items-center gap-2">
                 <Users className="w-4 h-4 text-blue-500" /> Member Activity
               </h4>
               <div className="h-32 flex items-center justify-center border border-dashed border-gray-100 rounded text-stone-300 text-[10px] font-bold uppercase tracking-widest">
                 Activity Log Suspended
               </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Branch & Profile */}
        <div className="space-y-4">
          <div className="workspace-panel p-5 bg-[#001639] text-white rounded-lg shadow-xl">
             <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">Branch Overview</h4>
             <div className="space-y-4">
                <div>
                   <p className="text-[9px] font-bold uppercase text-stone-400">Cash-in-Hand</p>
                   <p className="text-lg font-black text-emerald-400 font-mono italic">₹4,50,000</p>
                </div>
                <div>
                   <p className="text-[9px] font-bold uppercase text-stone-400">Safe Balance</p>
                   <p className="text-lg font-black text-white font-mono italic">₹1.25 Cr</p>
                </div>
                <div className="pt-4 border-t border-white/5 space-y-2">
                   <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-stone-400">Collection Rate</span>
                      <span className="text-emerald-400">92%</span>
                   </div>
                   <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400" style={{ width: '92%' }} />
                   </div>
                </div>
             </div>
          </div>

          <div className="workspace-panel p-5">
             <h4 className="text-[11px] font-black text-[#16325C] uppercase mb-4">Recent Audit Log</h4>
             <div className="space-y-4">
                {[
                  { time: '10:45 AM', log: 'Receipt generated for C001 (₹5,000)' },
                  { time: '09:20 AM', log: 'Branch Safe opening verified by Admin' },
                  { time: '08:00 AM', log: 'Auto-processing for Maturity list ENR-90' },
                ].map((log, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0070D2] mt-1 shrink-0" />
                    <div>
                      <p className="text-[11px] font-medium text-[#16325C] leading-tight">{log.log}</p>
                      <p className="text-[10px] text-[#54698D] font-bold uppercase mt-1">{log.time}</p>
                    </div>
                  </div>
                ))}
             </div>
             <button className="w-full mt-6 py-2 border-t border-[#D8DDE6] text-[10px] font-black text-[#0070D2] uppercase tracking-widest hover:bg-gray-50">View Full Audit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Briefcase(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
  )
}
