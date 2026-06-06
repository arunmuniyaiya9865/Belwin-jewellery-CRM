import { useState } from 'react'
import { mockUpcomingMaturities } from '../../../mock'
import { 
  Search, Filter, Calendar, PhoneCall, 
  ChevronRight, ArrowRight, Wallet, CheckCircle2,
  AlertCircle, History, User, MessageCircle
} from 'lucide-react'
import { clsx } from 'clsx'
import { useNavigate } from 'react-router-dom'

export default function UpcomingMaturity() {
  const [filterRange, setFilterRange] = useState('30')
  const navigate = useNavigate()

  return (
    <div className="space-y-4 pb-20">
      {/* Search & Filter Header */}
      <div className="bg-white border-b border-[#D8DDE6] -mx-4 -mt-4 mb-4 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by Membership or Name..." 
              className="w-full h-8 pl-10 pr-4 bg-[#F3F5F9] border border-transparent focus:bg-white focus:border-primary/30 rounded text-[11px] outline-none" 
            />
          </div>
          <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200">
             {['7', '30', '90'].map(d => (
               <button 
                 key={d}
                 onClick={() => setFilterRange(d)}
                 className={clsx(
                   "px-3 py-1 text-[10px] font-black uppercase rounded transition-all",
                   filterRange === d ? "bg-white text-[#16325C] shadow-sm" : "text-stone-400 hover:text-[#54698D]"
                 )}
               >
                 Next {d} Days
               </button>
             ))}
          </div>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
           <button className="btn-action flex items-center gap-2 px-6"><Filter className="w-3.5 h-3.5" /> Advance Filters</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
         {/* Main List - 9 Cols */}
         <div className="lg:col-span-9 space-y-4">
            <div className="workspace-panel shadow-sm overflow-hidden">
               <div className="overflow-x-auto min-h-[600px]">
                  <table className="enterprise-table">
                    <thead>
                      <tr>
                        <th>Membership</th>
                        <th>Customer Profile</th>
                        <th>Scheme</th>
                        <th>Maturity Date</th>
                        <th className="text-right">Maturity Value</th>
                        <th className="text-center">Status</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockUpcomingMaturities.map((row, i) => (
                        <tr key={i} className="hover:bg-[#F3F5F9]/50 transition-colors group">
                          <td>
                             <div className="flex flex-col">
                               <span className="font-mono font-bold text-[#54698D]">{row.id}</span>
                               <span className="text-[9px] font-black text-stone-400 uppercase tracking-tighter">Enrolled {row.enrollDate}</span>
                             </div>
                          </td>
                          <td>
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-[#16325C] text-white flex items-center justify-center text-[11px] font-black">{row.customerName[0]}</div>
                                <div className="flex flex-col">
                                   <span className="font-bold text-[#16325C]">{row.customerName}</span>
                                   <div className="flex gap-2">
                                      <button className="text-[#0070D2] hover:text-[#005fb2]"><PhoneCall className="w-3 h-3" /></button>
                                      <button className="text-emerald-500 hover:text-emerald-600"><MessageCircle className="w-3 h-3" /></button>
                                   </div>
                                </div>
                             </div>
                          </td>
                          <td><span className="text-[11px] font-bold text-[#54698D]">{row.schemeName}</span></td>
                          <td>
                             <div className="flex flex-col">
                               <span className="text-[12px] font-black text-[#16325C]">{row.maturityDate}</span>
                               <span className={clsx(
                                 "text-[10px] font-black uppercase tracking-tighter",
                                 row.daysRemaining === 0 ? "text-rose-500" : "text-amber-600"
                               )}>
                                 {row.daysRemaining === 0 ? "OVERDUE SESSION" : `IN ${row.daysRemaining} DAYS`}
                               </span>
                             </div>
                          </td>
                          <td className="text-right">
                             <div className="flex flex-col">
                                <span className="font-mono font-black italic text-[#16325C]">₹{row.value.toLocaleString()}</span>
                                <span className="text-[9px] font-bold text-stone-300 uppercase tracking-tighter">Bonus ₹{row.bonus} Inc.</span>
                             </div>
                          </td>
                          <td className="text-center">
                             <span className={clsx(
                               "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest leading-none border",
                               row.status === 'Ready' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                               row.status === 'Processing' ? "bg-amber-50 text-amber-700 border-amber-100" :
                               row.status === 'Overdue' ? "bg-rose-50 text-rose-700 border-rose-100" :
                               "bg-gray-50 text-stone-400 border-gray-100"
                             )}>
                               {row.status}
                             </span>
                          </td>
                          <td className="text-right">
                             <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                  onClick={() => navigate('/maturity/process')}
                                  className="h-8 px-4 bg-[#B8860B] text-white rounded font-black text-[10px] uppercase tracking-widest shadow-lg shadow-[#B8860B]/20 active:scale-95 transition-all"
                                >
                                   Settle Account
                                </button>
                                <button className="h-8 w-8 bg-gray-50 border border-[#D8DDE6] rounded flex items-center justify-center text-[#54698D] hover:bg-white transition-all shadow-sm">
                                   <History className="w-3.5 h-3.5" />
                                </button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>
            </div>
         </div>

         {/* Sidebar Intel - 3 Cols */}
         <div className="lg:col-span-3 space-y-4">
            <div className="workspace-panel p-5 bg-[#00173A] text-white">
               <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6 underline underline-offset-8 decoration-blue-500/30">Worklist Intelligence</h4>
               <div className="space-y-6">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex gap-4">
                     <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                     <div>
                        <p className="text-[11px] font-bold text-blue-50">Immediate Settlement</p>
                        <p className="text-[10px] text-blue-300 font-medium leading-relaxed mt-1">
                           3 customers have reached maturity but haven't been contacted.
                        </p>
                     </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex gap-4">
                     <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                     <div>
                        <p className="text-[11px] font-bold text-blue-50">Outreach High</p>
                        <p className="text-[10px] text-blue-300 font-medium leading-relaxed mt-1">
                           85% of upcoming maturities have confirmed renewal intent.
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="workspace-panel p-5">
               <h4 className="text-[11px] font-black text-[#16325C] uppercase tracking-wider mb-4 border-b border-[#F0F0F0] pb-3">Action Checklist</h4>
               <div className="space-y-3">
                  {[
                    'Verify Payment Ledger',
                    'Generate Bonus Points',
                    'Audit KYC Expiry',
                    'Lock Final Valuation',
                    'Confirm Contact Details'
                  ].map((task, i) => (
                    <div key={i} className="flex items-center gap-3 text-[11px] font-bold text-[#54698D] p-1.5 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                       <div className="w-4 h-4 rounded border-2 border-[#D8DDE6] flex items-center justify-center group-hover:border-[#0070D2]" />
                       {task}
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
