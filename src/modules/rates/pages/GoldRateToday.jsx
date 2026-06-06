import { useState } from 'react'
import { mockTodayRates } from '../../../mock'
import { 
  TrendingUp, TrendingDown, Clock, ShieldCheck, 
  RefreshCw, Save, History, LineChart, AlertCircle,
  Gem, CheckCircle2, ArrowRight
} from 'lucide-react'
import { clsx } from 'clsx'

export default function GoldRateToday() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [rates, setRates] = useState(mockTodayRates)

  return (
    <div className="space-y-4 pb-20">
      {/* Treasury Header */}
      <div className="bg-white border-b border-[#D8DDE6] -mx-4 -mt-4 mb-4 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-[#B8860B] rounded flex items-center justify-center text-white shadow-lg">
                <Gem className="w-6 h-6" />
             </div>
             <div>
               <p className="text-[11px] font-bold text-[#54698D] uppercase tracking-wider leading-none mb-1">Treasury Operations</p>
               <h1 className="text-[20px] font-bold text-[#16325C] leading-none">Gold Rate Control Center</h1>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <p className="text-[11px] font-bold text-[#54698D] uppercase tracking-widest hidden md:block">Market Status:</p>
             <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-tighter">Bullish Market Peak</span>
             </div>
          </div>
        </div>
      </div>

      {/* Primary KPI Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
         {[
           { label: '24K Spot Gold', value: `₹${rates.gold24}`, desc: 'Per Gram', icon: TrendingUp, color: 'text-[#16325C]' },
           { label: '22K Standard', value: `₹${rates.gold22}`, desc: 'Per Gram', icon: TrendingUp, color: 'text-[#16325C]' },
           { label: '18K Jewelry', value: `₹${rates.gold18}`, desc: 'Per Gram', icon: TrendingUp, color: 'text-[#16325C]' },
           { label: 'Daily Momentum', value: rates.change, desc: 'Growth Delta', icon: LineChart, color: 'text-emerald-600' },
           { label: 'Control Agent', value: rates.updatedBy, desc: 'Authorization', icon: ShieldCheck, color: 'text-[#54698D]' },
         ].map((kpi, i) => (
           <div key={i} className="workspace-panel p-5 relative overflow-hidden group border-t-2 border-t-[#B8860B]">
             <div className="relative z-10">
               <p className="text-[10px] font-black text-[#54698D] uppercase tracking-widest mb-1">{kpi.label}</p>
               <h3 className={clsx("text-2xl font-black italic tracking-tighter", kpi.color)}>{kpi.value}</h3>
               <p className="text-[10px] font-bold text-stone-400 mt-0.5 uppercase tracking-tighter">{kpi.desc}</p>
             </div>
             <kpi.icon className="absolute -bottom-2 -right-2 w-16 h-16 opacity-5 group-hover:scale-110 transition-transform" />
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
         
         {/* Rate Entry Panel - 8 Cols */}
         <div className="xl:col-span-8 space-y-4">
            <div className="workspace-panel rounded h-full">
               <div className="p-4 border-b border-[#D8DDE6] bg-gray-50/50 flex items-center justify-between">
                  <h3 className="text-[11px] font-black text-[#16325C] uppercase tracking-wider flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5" /> Rate Update Terminal
                  </h3>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                     <span>Effective: Today, 10:30 AM</span>
                  </div>
               </div>
               
               <div className="p-10 space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                     <RateInput label="24K Purity (99.9%)" value={rates.gold24} suffix="/g" highlight />
                     <RateInput label="22K Purity (91.6%)" value={rates.gold22} suffix="/g" />
                     <RateInput label="18K Purity (75.0%)" value={rates.gold18} suffix="/g" />
                  </div>

                  <div className="pt-10 border-t border-[#F0F0F0] flex flex-col md:flex-row gap-6 justify-between items-center">
                     <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-stone-400">
                           <Clock className="w-4 h-4" />
                           <span className="text-[11px] font-black uppercase tracking-tighter">Last Modified 2.5 Hrs Ago</span>
                        </div>
                        <div className="flex items-center gap-2 text-stone-400">
                           <ShieldCheck className="w-4 h-4" />
                           <span className="text-[11px] font-black uppercase tracking-tighter">Admin Verified</span>
                        </div>
                     </div>
                     <div className="flex gap-3">
                        <button className="btn-action flex items-center gap-2 !py-2.5 px-6 font-black uppercase text-[10px] tracking-widest leading-none">
                           <History className="w-3.5 h-3.5" /> Internal Archive
                        </button>
                        <button className="btn-primary-fn !bg-[#16325C] flex items-center gap-2 !py-3 px-10 font-black uppercase text-[11px] tracking-widest leading-none shadow-xl shadow-[#16325c]/20 transition-all active:scale-95">
                           <Save className="w-4 h-4" /> Publish to ERP
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Market Intelligence - 4 Cols */}
         <div className="xl:col-span-4 space-y-4">
            <div className="workspace-panel rounded p-6 bg-[#00173A] text-white overflow-hidden relative shadow-2xl min-h-[400px]">
               <div className="relative z-10 space-y-10">
                  <div className="space-y-1">
                     <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Pricing Intelligence</h4>
                     <p className="text-xl font-bold tracking-tight">Today vs. Previous Session</p>
                  </div>

                  <div className="space-y-6">
                     <BenchmarkItem label="MCX Closing Delta" value="+85.00" trend="up" />
                     <BenchmarkItem label="Bullion Premium %" value="1.25%" trend="up" />
                     <BenchmarkItem label="Import Duty Impact" value="Zero" trend="none" />
                     <BenchmarkItem label="Retail Markup Baseline" value="3.5%" trend="none" />
                  </div>

                  <div className="p-4 bg-white/5 rounded border border-white/10 flex gap-4">
                     <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                     <p className="text-[11px] font-medium text-blue-100 leading-relaxed">
                        Rates are currently tracking **Strongly Bullish**. High volatility expected in afternoon session. Recommend locking scheme bookings.
                     </p>
                  </div>
               </div>
               <TrendingUp className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 rotate-12" />
            </div>

            <div className="workspace-panel p-5">
               <h4 className="text-[11px] font-black text-[#16325C] uppercase mb-4 underline decoration-[#B8860B] decoration-2 underline-offset-4">Auto-Update Policy</h4>
               <p className="text-[12px] font-medium text-[#54698D] mb-6">
                  "All saving schemes and gold coins will automatically recalibrate their gram-equivalent valuation upon rate publishing."
               </p>
               <div className="flex items-center gap-3 p-3 bg-gray-50 border border-[#D8DDE6] rounded text-[11px] font-bold text-[#16325C]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> System Wide Sync Active
               </div>
            </div>
         </div>

      </div>
    </div>
  )
}

function RateInput({ label, value, suffix, highlight }) {
  return (
    <div className="space-y-3 group">
       <label className="text-[11px] font-black text-[#54698D] uppercase tracking-widest">{label}</label>
       <div className={clsx(
         "relative h-14 border rounded-xl flex items-center px-4 transition-all",
         highlight ? "bg-amber-50 border-[#B8860B] shadow-inner" : "bg-white border-[#D8DDE6] group-hover:border-[#54698D]"
       )}>
          <span className="text-[11px] font-black text-stone-400 mr-2 uppercase tracking-tighter">₹</span>
          <input 
            type="text" 
            defaultValue={value}
            className="bg-transparent border-none outline-none text-xl font-black font-mono flex-1 text-[#16325C]"
          />
          <span className="text-[11px] font-bold text-stone-400 ml-2 uppercase tracking-tighter">{suffix}</span>
       </div>
    </div>
  )
}

function BenchmarkItem({ label, value, trend }) {
  return (
    <div className="flex justify-between items-center group">
       <div className="flex items-center gap-3">
          <div className={clsx(
            "w-8 h-8 rounded-lg flex items-center justify-center border",
            trend === 'up' ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" :
            trend === 'down' ? "bg-rose-500/10 border-rose-500/30 text-rose-400" :
            "bg-white/10 border-white/20 text-stone-400"
          )}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : trend === 'down' ? <TrendingDown className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
          </div>
          <span className="text-[12px] font-bold text-blue-100">{label}</span>
       </div>
       <span className={clsx(
         "text-[14px] font-black font-mono italic",
         trend === 'up' ? "text-emerald-400" : trend === 'down' ? "text-rose-400" : "text-stone-300"
       )}>{value}</span>
    </div>
  )
}
