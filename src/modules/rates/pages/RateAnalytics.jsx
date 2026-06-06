import { useState } from 'react'
import { mockHistoricalRates } from '../../../mock'
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area, 
  Legend, BarChart, Bar 
} from 'recharts'
import { 
  TrendingUp, Activity, BarChart3, PieChart, 
  ArrowUpRight, ArrowDownRight, Calendar, Filter,
  FileDown, Share2, Info
} from 'lucide-react'
import { clsx } from 'clsx'

export default function RateAnalytics() {
  const [timeRange, setTimeRange] = useState('30D')

  return (
    <div className="space-y-4 pb-20">
      {/* Analytics Header */}
      <div className="bg-white border-b border-[#D8DDE6] -mx-4 -mt-4 mb-4 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-[#16325C] rounded flex items-center justify-center text-white shadow-lg">
                <BarChart3 className="w-6 h-6" />
             </div>
             <div>
               <p className="text-[11px] font-bold text-[#54698D] uppercase tracking-wider leading-none mb-1">Market Intelligence</p>
               <h1 className="text-[20px] font-bold text-[#16325C] leading-none">Rate Volatility Analytics</h1>
             </div>
          </div>
          <div className="flex items-center gap-2">
             <button className="btn-action flex items-center gap-2 px-3 py-1.5"><FileDown className="w-3.5 h-3.5" /> Market Prospectus</button>
             <button className="btn-action flex items-center gap-2 px-3 py-1.5"><Share2 className="w-3.5 h-3.5" /> Forecast View</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Main Chart Area - 3 Cols */}
        <div className="lg:col-span-3 space-y-4">
           {/* Primary Price Trend */}
           <div className="workspace-panel rounded p-6 h-[500px] flex flex-col">
              <div className="flex items-center justify-between mb-8">
                 <div>
                    <h3 className="text-[11px] font-black text-[#16325C] uppercase tracking-widest leading-none mb-2 underline decoration-[#B8860B] underline-offset-4">Gold & Silver Velocity Index</h3>
                    <p className="text-[10px] font-bold text-stone-400">Comparing 24K Gold vs Silver Spot (Normalized)</p>
                 </div>
                 <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-100">
                    {['7D', '30D', '90D', 'YTD', 'ALL'].map(range => (
                      <button 
                        key={range} 
                        onClick={() => setTimeRange(range)}
                        className={clsx(
                          "px-3 py-1 text-[10px] font-black uppercase rounded transition-all",
                          timeRange === range ? "bg-white text-[#16325C] shadow-sm" : "text-stone-400 hover:text-[#54698D]"
                        )}
                      >
                        {range}
                      </button>
                    ))}
                 </div>
              </div>
              
              <div className="flex-1 w-full mt-4">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockHistoricalRates}>
                       <defs>
                          <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#B8860B" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#B8860B" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorSilver" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#94A3B8" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                       <XAxis 
                          dataKey="date" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 9, fontWeight: 700, fill: '#64748B' }} 
                          dy={10}
                        />
                       <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 9, fontWeight: 700, fill: '#64748B' }} 
                          domain={['auto', 'auto']}
                        />
                       <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '11px', fontWeight: '800' }} 
                        />
                       <Area 
                          type="monotone" 
                          dataKey="gold24" 
                          stroke="#B8860B" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorGold)" 
                          name="Gold 24K"
                        />
                       <Area 
                          type="monotone" 
                          dataKey="silver" 
                          stroke="#94A3B8" 
                          strokeWidth={2}
                          fillOpacity={1} 
                          fill="url(#colorSilver)" 
                          name="Silver Spot"
                        />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
              
              <div className="mt-6 flex items-center justify-between border-t border-[#F0F0F0] pt-4">
                 <div className="flex gap-6">
                    <LegendItem color="bg-[#B8860B]" label="Gold 24K" />
                    <LegendItem color="bg-[#94A3B8]" label="Silver Spot" />
                 </div>
                 <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-1">
                    <Activity className="w-3 h-3" /> High Correlation Identified
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="workspace-panel p-6 h-[300px] flex flex-col">
                 <h4 className="text-[11px] font-black text-[#16325C] uppercase tracking-widest mb-6">Price Distribution by session</h4>
                 <div className="flex-1 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={mockHistoricalRates.slice(-7)}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F8FAFC" />
                          <XAxis dataKey="date" hide />
                          <Tooltip />
                          <Bar dataKey="gold22" fill="#B8860B" radius={[4, 4, 0, 0]} barSize={20} />
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
              </div>
              <div className="workspace-panel p-6 h-[300px] flex flex-col bg-[#F8FAFC] border-dashed">
                 <h4 className="text-[11px] font-black text-[#16325C] uppercase tracking-widest mb-4">Market Prediction AI</h4>
                 <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30">
                    <PieChart className="w-12 h-12 mb-4" />
                    <p className="text-[10px] font-bold uppercase tracking-widest">Model Training in Progress...</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Sidebar - Intel Widgets - 1 Col */}
        <div className="space-y-4">
           <div className="workspace-panel p-5 bg-[#00173A] text-white overflow-hidden relative shadow-xl">
              <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6">Yield Insights</h4>
              <div className="space-y-8 relative z-10">
                 <div className="flex justify-between items-center">
                    <div>
                       <p className="text-[9px] font-black text-blue-300 uppercase">30D Returns</p>
                       <p className="text-xl font-black italic tracking-tighter text-emerald-400">+4.2%</p>
                    </div>
                    <ArrowUpRight className="w-8 h-8 text-emerald-400 opacity-30" />
                 </div>
                 <div className="space-y-4">
                    <p className="text-[10px] font-bold text-blue-100 leading-relaxed italic border-l-2 border-blue-500 pl-3">
                       "Gold to Silver ratio is currently at a 12-month low, signaling a massive Silver breakout potential. Stocking recommended."
                    </p>
                    <div className="flex gap-2">
                       <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-[9px] font-black uppercase">Technical</span>
                       <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-[9px] font-black uppercase">Bullish</span>
                    </div>
                 </div>
              </div>
              <Activity className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 -rotate-12" />
           </div>

           <div className="workspace-panel p-6 space-y-6">
              <h4 className="text-[11px] font-black text-[#16325C] uppercase underline decoration-emerald-500 underline-offset-8">Best Buying Period</h4>
              <div className="space-y-4">
                 <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-stone-500 uppercase">Confidence</span>
                    <span className="text-emerald-600">85% Match</span>
                 </div>
                 <div className="p-3 bg-gray-50 border border-[#D8DDE6] rounded">
                    <p className="text-[10px] font-black text-[#16325C] uppercase mb-1">Target Window</p>
                    <p className="text-[12px] font-bold text-[#54698D]">15 June - 22 June</p>
                 </div>
                 <div className="p-3 bg-emerald-50 border border-emerald-100 rounded flex gap-3 text-emerald-800">
                    <Info className="w-4 h-4 shrink-0" />
                    <p className="text-[10px] font-medium leading-relaxed">Historical data shows a seasonality dip during this period over 5 years.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
       <div className={clsx("w-2.5 h-2.5 rounded-full", color)} />
       <span className="text-[10px] font-black text-[#54698D] uppercase tracking-tighter">{label}</span>
    </div>
  )
}
