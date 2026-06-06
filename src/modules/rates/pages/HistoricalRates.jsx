import { useState } from 'react'
import { mockHistoricalRates } from '../../../mock'
import { 
  Search, Filter, FileDown, Download, Printer,
  ChevronLeft, ChevronRight, TrendingUp, TrendingDown,
  Calendar, Eye, History, ShieldEllipsis
} from 'lucide-react'
import { clsx } from 'clsx'

export default function HistoricalRates() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="space-y-4 pb-20">
      {/* Ledger Header */}
      <div className="bg-white border-b border-[#D8DDE6] -mx-4 -mt-4 mb-4 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-stone-700 rounded flex items-center justify-center text-white shadow-lg">
                <History className="w-6 h-6" />
             </div>
             <div>
               <p className="text-[11px] font-bold text-[#54698D] uppercase tracking-wider leading-none mb-1">Archival Services</p>
               <h1 className="text-[20px] font-bold text-[#16325C] leading-none">Historical Rate Ledger</h1>
             </div>
          </div>
          <div className="flex items-center gap-2">
             <button className="btn-action flex items-center gap-2 px-3 py-1.5 font-black uppercase text-[10px] tracking-widest leading-none">
                <FileDown className="w-3.5 h-3.5" /> Full Audit Export
             </button>
          </div>
        </div>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: 'Highest Rate (24K)', value: '₹7,380', count: 'May 24', trend: 'up' },
           { label: 'Lowest Rate (24K)', value: '₹7,110', count: 'Jun 02', trend: 'down' },
           { label: 'Total Updates', value: '142', count: 'This Quarter', trend: 'none' },
           { label: 'Avg Volatility', value: '1.2%', count: 'Daily Delta', trend: 'up' },
         ].map((stat, i) => (
           <div key={i} className="workspace-panel p-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-[#54698D] uppercase tracking-widest mb-1">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                   <h3 className="text-xl font-black text-[#16325C]">{stat.value}</h3>
                   {stat.trend === 'up' && <TrendingUp className="w-3 h-3 text-emerald-500" />}
                   {stat.trend === 'down' && <TrendingDown className="w-3 h-3 text-rose-500" />}
                </div>
                <p className="text-[10px] font-bold text-stone-400 mt-1 uppercase tracking-tighter italic">{stat.count}</p>
              </div>
              <ShieldEllipsis className="w-5 h-5 text-gray-100" />
           </div>
         ))}
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white p-3 rounded border border-[#D8DDE6] shadow-sm">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Filter by Date or Updated By..." 
              className="w-full h-8 pl-10 pr-4 bg-[#F3F5F9] border border-transparent focus:bg-white focus:border-primary/30 rounded text-[11px] outline-none" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-action flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Date Filter</button>
          <button className="btn-action flex items-center gap-2 px-6"><Download className="w-3.5 h-3.5" /> CSV</button>
        </div>
      </div>

      {/* Main Ledger Table */}
      <div className="workspace-panel overflow-hidden">
        <div className="overflow-x-auto min-h-[500px]">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Effective Date</th>
                <th className="text-right">Gold 24K</th>
                <th className="text-right">Gold 22K (916)</th>
                <th className="text-right">Gold 18K</th>
                <th className="text-right">Silver Spot</th>
                <th>Volatility</th>
                <th>Auth Agent</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockHistoricalRates.slice(0, 15).map((row, i) => {
                 const prevRow = mockHistoricalRates[i + 1] || row;
                 const diff = row.gold24 - prevRow.gold24;
                 const trend = diff > 0 ? 'up' : diff < 0 ? 'down' : 'stable';
                 
                 return (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="font-bold text-[#16325C]">{row.date}</td>
                    <td className="text-right font-mono font-black italic">₹{row.gold24.toLocaleString()}</td>
                    <td className="text-right font-mono font-medium text-[#54698D]">₹{row.gold22.toLocaleString()}</td>
                    <td className="text-right font-mono font-medium text-stone-400">₹{row.gold18.toLocaleString()}</td>
                    <td className="text-right font-mono font-black text-[#54698D]">₹{row.silver.toLocaleString()}</td>
                    <td>
                       <div className={clsx(
                         "flex items-center gap-1.5 text-[10px] font-black uppercase tracking-tighter leading-none",
                         trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-rose-600' : 'text-stone-400'
                       )}>
                          {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : trend === 'down' ? <TrendingDown className="w-3 h-3" /> : null}
                          {diff !== 0 && <span>{Math.abs(diff)}pts</span>}
                          {diff === 0 && <span>Stable</span>}
                       </div>
                    </td>
                    <td className="text-[10px] font-black text-[#54698D] uppercase tracking-tighter truncate max-w-[100px]">{row.updatedBy}</td>
                    <td className="text-right">
                       <button className="text-[#0070D2] font-black text-[10px] uppercase tracking-widest hover:underline opacity-0 group-hover:opacity-100 transition-all">
                          Inspect Session
                       </button>
                    </td>
                  </tr>
                 )
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Block */}
        <div className="p-4 border-t border-[#D8DDE6] flex items-center justify-between bg-gray-50/30">
           <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Showing 1 to 15 of 30 Update Events</p>
           <div className="flex items-center gap-2">
              <button className="p-1.5 bg-white border border-[#D8DDE6] rounded text-[#54698D] hover:bg-gray-50"><ChevronLeft className="w-4 h-4" /></button>
              <span className="px-3 text-[11px] font-black text-[#16325C]">1</span>
              <button className="p-1.5 bg-white border border-[#D8DDE6] rounded text-[#54698D] hover:bg-gray-50"><ChevronRight className="w-4 h-4" /></button>
           </div>
        </div>
      </div>
    </div>
  )
}
