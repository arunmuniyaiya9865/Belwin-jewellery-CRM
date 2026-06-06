import { mockMaturityKPIs, mockSettlements, mockMaturityAnalytics } from '../../../mock'
import { 
  CheckCircle, Clock, RotateCcw, ShoppingBag, 
  TrendingUp, BarChart3, AlertCircle, ChevronRight,
  Gem, ArrowUpRight, FileText, UserCheck
} from 'lucide-react'
import { clsx } from 'clsx'
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts'

export default function MaturityDashboard() {
  return (
    <div className="space-y-4 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-[#16325C] tracking-tight">Scheme Maturity Command Center</h1>
          <p className="text-[11px] font-bold text-[#54698D] uppercase tracking-wider mt-1">Lifecycle Settlement • Retention Management</p>
        </div>
        <div className="flex items-center gap-2">
           <button className="btn-action flex items-center gap-2"><FileText className="w-4 h-4" /> Settlement Report</button>
           <button className="btn-primary-fn !bg-[#16325C] px-8">Process Today's Batch</button>
        </div>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
         {[
           { label: 'Active Pipeline', value: mockMaturityKPIs.totalActive, icon: Gem, color: 'text-[#16325C]' },
           { label: 'Due This Month', value: mockMaturityKPIs.thisMonth, icon: Clock, color: 'text-amber-600' },
           { label: 'Forecast Next', value: mockMaturityKPIs.nextMonth, icon: BarChart3, color: 'text-blue-600' },
           { label: 'Pending Redm.', value: mockMaturityKPIs.pendingRedemptions, icon: ShoppingBag, color: 'text-rose-600' },
           { label: 'Pending Renew.', value: mockMaturityKPIs.pendingRenewals, icon: RotateCcw, color: 'text-indigo-600' },
           { label: 'Settled YTD', value: mockMaturityKPIs.completedSettlements, icon: CheckCircle, color: 'text-emerald-600' },
           { label: 'Pipeline Val.', value: mockMaturityKPIs.expectedValue, icon: TrendingUp, color: 'text-[#16325C]' },
         ].map((kpi, i) => (
           <div key={i} className="workspace-panel p-4 flex flex-col justify-between group hover:border-[#0070D2] transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                 <p className="text-[9px] font-black text-[#54698D] uppercase tracking-tighter">{kpi.label}</p>
                 <kpi.icon className={clsx("w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity", kpi.color)} />
              </div>
              <h3 className={clsx("text-lg font-black tracking-tight", kpi.color)}>{kpi.value}</h3>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
         {/* Center Content - 8 Cols */}
         <div className="xl:col-span-8 space-y-4">
            {/* Trend Chart */}
            <div className="workspace-panel p-6 h-[400px] flex flex-col">
               <div className="flex items-center justify-between mb-8">
                  <div>
                     <h4 className="text-[11px] font-black text-[#16325C] uppercase tracking-wider">Maturity Conversion Velocity</h4>
                     <p className="text-[10px] font-bold text-stone-400">Renewal vs. Redemption Ratio (6 Month Projection)</p>
                  </div>
                  <div className="flex gap-4">
                     <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#16325C]" /><span className="text-[9px] font-black uppercase text-stone-500">Renewals</span></div>
                     <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /><span className="text-[9px] font-black uppercase text-stone-500">Redemptions</span></div>
                  </div>
               </div>
               <div className="flex-1 w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={mockMaturityAnalytics}>
                        <defs>
                           <linearGradient id="colorRenew" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#16325C" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#16325C" stopOpacity={0}/>
                           </linearGradient>
                           <linearGradient id="colorRedeem" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#64748B' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#64748B' }} />
                        <Tooltip />
                        <Area type="monotone" dataKey="renewed" stroke="#16325C" strokeWidth={3} fillOpacity={1} fill="url(#colorRenew)" name="Renewals" />
                        <Area type="monotone" dataKey="redeemed" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorRedeem)" name="Redemptions" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>

            {/* Quick Access Table */}
            <div className="workspace-panel overflow-hidden">
               <div className="p-4 border-b border-[#D8DDE6] bg-gray-50/50 flex items-center justify-between">
                  <h3 className="text-[12px] font-black text-[#16325C] uppercase flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-500" /> Recent Settlements
                  </h3>
                  <button className="text-[10px] font-black text-[#0070D2] uppercase hover:underline">Full Registry</button>
               </div>
               <div className="overflow-x-auto">
                  <table className="enterprise-table">
                    <thead>
                      <tr>
                        <th>Settlement ID</th>
                        <th>Customer / Membership</th>
                        <th>Closure Type</th>
                        <th>Date</th>
                        <th className="text-right">Settled Amount</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                       {mockSettlements.map((row, i) => (
                         <tr key={i} className="hover:bg-[#F3F5F9]/30 transition-colors">
                           <td><span className="font-mono font-bold text-[#54698D]">{row.id}</span></td>
                           <td>
                             <div className="flex flex-col">
                               <span className="font-bold text-[#16325C]">{row.customer}</span>
                               <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter">{row.membership}</span>
                             </div>
                           </td>
                           <td>
                             <span className={clsx(
                               "px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter shadow-sm",
                               row.type === 'Renewal' ? "bg-indigo-50 text-indigo-700" : "bg-emerald-50 text-emerald-700"
                             )}>
                               {row.type} • {row.method}
                             </span>
                           </td>
                           <td className="text-[11px] font-bold text-[#54698D]">{row.date}</td>
                           <td className="text-right font-mono font-black italic">₹{row.amount.toLocaleString()}</td>
                           <td className="text-right">
                             <button className="p-1 px-2 text-[#0070D2] hover:bg-blue-50 rounded text-[10px] font-black uppercase transition-all">View Audit</button>
                           </td>
                         </tr>
                       ))}
                    </tbody>
                  </table>
               </div>
            </div>
         </div>

         {/* Sidebar - Intel & Work Queue - 4 Cols */}
         <div className="xl:col-span-4 space-y-4">
            <div className="workspace-panel p-6 bg-[#001D4A] text-white overflow-hidden relative shadow-2xl">
               <div className="relative z-10 space-y-8">
                  <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none">Intelligence Engine</h4>
                  
                  <div className="space-y-4">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                           <TrendingUp className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                           <p className="text-[13px] font-bold leading-tight">72% Renewal Forecast</p>
                           <p className="text-[10px] text-blue-200 mt-1 uppercase font-bold">Strong customer sentiment this quarter.</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                           <AlertCircle className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                           <p className="text-[13px] font-bold leading-tight">₹1.2 Cr Redemption Risk</p>
                           <p className="text-[10px] text-blue-200 mt-1 uppercase font-bold">12 High-value memberships due in 7 days.</p>
                        </div>
                     </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded border border-white/10">
                     <button className="w-full py-2.5 bg-blue-600 text-white rounded font-black text-[11px] uppercase tracking-widest shadow-lg shadow-blue-900/50">Run Outreach Wizard</button>
                  </div>
               </div>
               <BarChart3 className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10" />
            </div>

            <div className="workspace-panel p-5">
               <h4 className="text-[11px] font-black text-[#16325C] uppercase mb-4 underline decoration-[#B8860B] decoration-2 underline-offset-8">Critical Reminders</h4>
               <div className="space-y-4 pt-2">
                  {[
                    { label: 'Bank verification', status: 'Pending', color: 'text-amber-600' },
                    { label: 'Audit report release', status: 'Due Today', color: 'text-rose-600' },
                    { label: 'GST reconciliation', status: 'Completed', color: 'text-emerald-600' },
                  ].map((task, i) => (
                    <div key={i} className="flex justify-between items-center group cursor-pointer">
                       <span className="text-[12px] font-bold text-[#54698D] group-hover:text-[#16325C] transition-colors">{task.label}</span>
                       <span className={clsx("text-[10px] font-black uppercase tracking-tighter", task.color)}>{task.status}</span>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-8 py-2 border-t border-[#F0F0F0] text-[10px] font-black text-[#0070D2] uppercase tracking-widest flex items-center justify-center gap-2">
                  Operational Check <ChevronRight className="w-3 h-3" />
               </button>
            </div>
         </div>

      </div>
    </div>
  )
}
