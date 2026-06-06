import { motion } from 'framer-motion'
import { 
  Wallet, TrendingUp, AlertCircle, Clock, 
  ArrowUpRight, ArrowDownRight, CheckCircle2,
  Calendar, PieChart, Users, Receipt
} from 'lucide-react'
import { clsx } from 'clsx'

export default function CollectionDashboard() {
  const kpis = [
    { label: "Today's Collection", value: "₹4,25,800", change: "+12%", trend: 'up' },
    { label: "Monthly Collection", value: "₹42.8 L", change: "85% of Target", trend: 'none' },
    { label: "Pending Amount", value: "₹12.4 L", change: "142 Accounts", trend: 'down', color: 'rose' },
    { label: "Defaulter Risk", value: "₹2.5 L", change: "18 High Risk", trend: 'down', color: 'rose' },
  ]

  return (
    <div className="space-y-4 pb-10">
      {/* Salesforce Page Header */}
      <div className="bg-white border-b border-[#D8DDE6] -mx-4 -mt-4 mb-4 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-[#00A1E0] rounded flex items-center justify-center text-white shadow-lg">
                <Wallet className="w-6 h-6" />
             </div>
             <div>
               <p className="text-[11px] font-bold text-[#54698D] uppercase tracking-wider leading-none mb-1">Financial Intelligence</p>
               <h1 className="text-[20px] font-bold text-[#16325C] leading-none">Collection Management</h1>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-action flex items-center gap-2 px-3 py-1.5 font-black uppercase text-[10px]"><Calendar className="w-3.5 h-3.5" /> Performance Report</button>
            <button className="btn-primary-fn px-8 h-10">Create Recovery Task</button>
          </div>
        </div>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="workspace-panel p-5 relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-[10px] font-black text-[#54698D] uppercase tracking-widest mb-1">{kpi.label}</p>
              <h3 className={clsx("text-2xl font-black", kpi.color === 'rose' ? 'text-rose-600' : 'text-[#16325C]')}>{kpi.value}</h3>
              <div className="mt-2 flex items-center gap-1.5">
                {kpi.trend === 'up' && <ArrowUpRight className="w-3 h-3 text-emerald-500" />}
                {kpi.trend === 'down' && <ArrowDownRight className="w-3 h-3 text-rose-500" />}
                <span className={clsx("text-[10px] font-bold uppercase", kpi.trend === 'up' ? 'text-emerald-600' : kpi.trend === 'down' ? 'text-rose-600' : 'text-stone-400')}>{kpi.change}</span>
              </div>
            </div>
            {/* Subtle background icon */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 opacity-5 group-hover:scale-110 transition-transform">
               <Wallet className="w-20 h-20" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* Main Analytics - 8 Cols */}
        <div className="xl:col-span-8 space-y-4">
           {/* Branch-wise Performance */}
           <div className="workspace-panel rounded p-6">
              <div className="flex items-center justify-between mb-8">
                 <h4 className="text-[11px] font-black text-[#16325C] uppercase flex items-center gap-2 tracking-widest underline decoration-primary/30 decoration-2 underline-offset-4">Branch Performance Ledger</h4>
                 <select className="bg-[#F3F5F9] border-none text-[10px] font-bold uppercase px-3 py-1 rounded outline-none">
                    <option>June FY2025</option>
                    <option>May FY2025</option>
                 </select>
              </div>
              <div className="space-y-6">
                 {[
                   { name: 'Main HQ Terminal', collection: '₹18.4 L', target: '₹20 L', progress: 92 },
                   { name: 'Indiranagar Hub', collection: '₹12.2 L', target: '₹15 L', progress: 81 },
                   { name: 'Mobile Recovery Team', collection: '₹4.5 L', target: '₹10 L', progress: 45 },
                 ].map((b, i) => (
                   <div key={i} className="space-y-2">
                     <div className="flex justify-between items-end">
                       <div>
                         <p className="text-[12px] font-bold text-[#16325C] leading-none mb-1">{b.name}</p>
                         <p className="text-[10px] font-medium text-[#54698D]">Collection Flow: {b.collection} / {b.target}</p>
                       </div>
                       <span className="text-[11px] font-black text-[#16325C]">{b.progress}%</span>
                     </div>
                     <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                       <div 
                         className={clsx("h-full transition-all duration-1000", b.progress > 80 ? 'bg-[#0070D2]' : 'bg-amber-400')}
                         style={{ width: `${b.progress}%` }} 
                       />
                     </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="workspace-panel p-6">
                 <h4 className="text-[11px] font-black text-[#16325C] uppercase mb-6 flex items-center gap-2 tracking-widest"><PieChart className="w-4 h-4 text-[#00A1E0]" /> Scheme Mix</h4>
                 <div className="h-40 border border-dashed border-[#D8DDE6] rounded flex flex-col items-center justify-center text-[#54698D]">
                    <PieChart className="w-8 h-8 opacity-20 mb-2" />
                    <span className="text-[10px] font-bold uppercase">Dynamic Mix Data Offline</span>
                 </div>
              </div>
              <div className="workspace-panel p-6">
                 <h4 className="text-[11px] font-black text-[#16325C] uppercase mb-6 flex items-center gap-2 tracking-widest"><TrendingUp className="w-4 h-4 text-emerald-500" /> Payment Velocity</h4>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-[11px] font-bold">
                       <span className="text-stone-500 uppercase">Cash Settlements</span>
                       <span className="text-[#16325C]">42%</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-bold">
                       <span className="text-stone-500 uppercase">UPI / Digital</span>
                       <span className="text-[#16325C]">48%</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-bold">
                       <span className="text-stone-500 uppercase">Card / POS</span>
                       <span className="text-[#16325C]">10%</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Actionable Sidebar - 4 Cols */}
        <div className="xl:col-span-4 space-y-4">
           <div className="workspace-panel rounded p-6 bg-[#00173A] text-white overflow-hidden relative shadow-2xl">
              <div className="relative z-10">
                 <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6 underline decoration-blue-500 underline-offset-8">Critical Recovery Queue</h4>
                 <div className="space-y-5">
                    {[
                      { name: 'Amit Varma', due: '₹4,500', delay: '95 Days', risk: 'Critical' },
                      { name: 'Sanjay Gupta', due: '₹12,000', delay: '62 Days', risk: 'High' },
                    ].map((r, i) => (
                      <div key={i} className="flex items-center justify-between group">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-white/10 text-white flex items-center justify-center text-[11px] font-black">{r.name[0]}</div>
                            <div>
                               <p className="text-[12px] font-bold">{r.name}</p>
                               <p className="text-[9px] font-black text-blue-300 uppercase italic">OD: {r.delay}</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className="text-[13px] font-black text-rose-400 font-mono italic">{r.due}</p>
                            <button className="text-[9px] font-bold uppercase text-white/50 group-hover:text-white transition-colors">Call Agent</button>
                         </div>
                      </div>
                    ))}
                 </div>
                 <button className="w-full mt-8 py-2.5 bg-blue-600 rounded text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/40">Launch Recovery Desk</button>
              </div>
              <AlertCircle className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 -rotate-12" />
           </div>

           <div className="workspace-panel rounded p-5">
              <h4 className="text-[11px] font-black text-[#16325C] uppercase mb-4 flex items-center gap-2">
                 <Receipt className="w-4 h-4 text-emerald-500" /> Recent Receipts
              </h4>
              <div className="space-y-4">
                 {[
                   { id: 'REC-9350', name: 'Alok Sharma', value: '₹5,000', time: '12 mins ago' },
                   { id: 'REC-9348', name: 'Priya Singh', value: '₹2,000', time: '42 mins ago' },
                   { id: 'REC-9291', name: 'Sunita M', value: '₹5,000', time: '1 hr ago' },
                 ].map((rec, i) => (
                   <div key={i} className="flex gap-3 text-[12px]">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                     <div className="flex-1">
                        <div className="flex justify-between font-bold text-[#16325C] leading-none mb-1">
                           <span>{rec.name}</span>
                           <span className="font-mono text-emerald-600 tracking-tighter italic">{rec.value}</span>
                        </div>
                        <div className="flex justify-between text-[10px] font-medium text-[#54698D]">
                           <span>{rec.id}</span>
                           <span className="uppercase tracking-tighter">{rec.time}</span>
                        </div>
                     </div>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-6 py-2 border-t border-[#D8DDE6] text-[10px] font-black text-[#0070D2] uppercase tracking-widest">Full Audit Log</button>
           </div>
        </div>
      </div>
    </div>
  )
}
