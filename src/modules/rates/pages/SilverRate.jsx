import { useState } from 'react'
import { mockSilverRates } from '../../../mock'
import { 
  TrendingUp, TrendingDown, Clock, ShieldCheck, 
  RefreshCw, Save, History, Scale, Landmark,
  CheckCircle2, ArrowRight, BarChart2
} from 'lucide-react'
import { clsx } from 'clsx'

export default function SilverRate() {
  const [rates, setRates] = useState(mockSilverRates)

  return (
    <div className="space-y-4 pb-20">
      {/* Silver Treasury Header */}
      <div className="bg-white border-b border-[#D8DDE6] -mx-4 -mt-4 mb-4 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-slate-500 rounded flex items-center justify-center text-white shadow-lg">
                <Scale className="w-6 h-6" />
             </div>
             <div>
               <p className="text-[11px] font-bold text-[#54698D] uppercase tracking-wider leading-none mb-1">Bullion Desk</p>
               <h1 className="text-[20px] font-bold text-[#16325C] leading-none">Silver Market Management</h1>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                <span className="text-[10px] font-black text-slate-700 uppercase tracking-tighter">Spot Silver: ₹{rates.current}/g</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: 'Current Rate', value: `₹${rates.current}`, count: rates.change, icon: Scale, trend: 'up' },
           { label: 'Weekly Average', value: `₹${rates.weeklyAvg}`, count: 'Benchmark', icon: BarChart2, trend: 'none' },
           { label: 'Monthly High', value: `₹${rates.monthlyHigh}`, count: 'Resistance', icon: TrendingUp, trend: 'up' },
           { label: 'Monthly Low', value: `₹${rates.monthlyLow}`, count: 'Support', icon: TrendingDown, trend: 'down' },
         ].map((kpi, i) => (
           <div key={i} className="workspace-panel p-5 relative overflow-hidden group border-l-4 border-l-slate-400">
              <div className="relative z-10">
                <p className="text-[10px] font-black text-[#54698D] uppercase tracking-widest mb-1">{kpi.label}</p>
                <div className="flex items-baseline gap-2">
                   <h3 className="text-2xl font-black italic tracking-tighter text-[#16325C]">{kpi.value}</h3>
                   <span className={clsx("text-[10px] font-bold", kpi.trend === 'up' ? "text-emerald-500" : "text-rose-500")}>{kpi.count}</span>
                </div>
              </div>
              <kpi.icon className="absolute -bottom-2 -right-2 w-16 h-16 opacity-5 group-hover:scale-110 transition-transform" />
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
         {/* Entry Panel */}
         <div className="xl:col-span-8 space-y-4">
            <div className="workspace-panel rounded h-full bg-white">
               <div className="p-4 border-b border-[#D8DDE6] bg-gray-50/50 flex justify-between items-center">
                  <h3 className="text-[11px] font-black text-[#16325C] uppercase tracking-widest flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5" /> Pulse Silver Entry
                  </h3>
               </div>
               <div className="p-10 space-y-10">
                  <div className="max-w-md">
                     <p className="text-[11px] font-black text-[#54698D] uppercase tracking-widest mb-3">Live Silver Rate (Per Gram)</p>
                     <div className="flex items-center gap-4">
                        <div className="flex-1 relative h-16 bg-[#F8FAFC] border border-[#D8DDE6] rounded-xl flex items-center px-6">
                           <span className="text-xl font-black text-stone-300 mr-4">₹</span>
                           <input 
                              type="text" 
                              defaultValue={rates.current}
                              className="bg-transparent border-none outline-none text-3xl font-black italic font-mono text-[#16325C] flex-1"
                           />
                        </div>
                        <button className="btn-primary-fn !bg-slate-700 !py-5 px-10 font-black uppercase text-[11px] tracking-widest shadow-xl shadow-slate-700/20 active:scale-95 transition-all">
                           Publish
                        </button>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-gray-50">
                     <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-[#54698D] uppercase tracking-widest">Rate Components</h4>
                        <div className="space-y-3">
                           <ComponentLine label="International Spot" value="₹78.20" />
                           <ComponentLine label="Import Levy (15%)" value="₹11.73" />
                           <ComponentLine label="Local Freight" value="₹2.57" />
                        </div>
                     </div>
                     <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-[#54698D] uppercase tracking-widest">Pricing Policy</h4>
                        <p className="text-[12px] font-medium text-[#54698D] leading-relaxed italic border-l-2 border-[#B8860B] pl-4">
                           "Silver rates are updated every morning at 09:30 AM based on the closing MCX bullion spread."
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Sidebar Intel */}
         <div className="xl:col-span-4 space-y-4">
            <div className="workspace-panel p-6 bg-slate-100 border-l-4 border-l-slate-700">
               <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-6">Historical Comparison</h4>
               <div className="space-y-6">
                  <ComparisonBlock label="Vs. Yesterday" diff="+1.70" trend="up" />
                  <ComparisonBlock label="Vs. Last Week" diff="-2.40" trend="down" />
                  <ComparisonBlock label="Vs. Monthly Open" diff="+12.10" trend="up" />
               </div>
            </div>
            <div className="workspace-panel p-5 text-center flex flex-col items-center justify-center min-h-[200px] border-dashed">
               <BarChart2 className="w-10 h-10 text-stone-200 mb-2" />
               <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Market Feed: Synced</p>
            </div>
         </div>
      </div>
    </div>
  )
}

function ComponentLine({ label, value }) {
  return (
    <div className="flex justify-between items-center text-[11px] font-bold">
       <span className="text-stone-400 uppercase tracking-tighter">{label}</span>
       <span className="text-[#16325C]">{value}</span>
    </div>
  )
}

function ComparisonBlock({ label, diff, trend }) {
  return (
    <div className="flex justify-between items-center">
       <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">{label}</span>
       <div className={clsx(
         "flex items-center gap-1 font-mono font-black italic text-[14px]",
         trend === 'up' ? "text-emerald-600" : "text-rose-600"
       )}>
          {trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          {diff}
       </div>
    </div>
  )
}
