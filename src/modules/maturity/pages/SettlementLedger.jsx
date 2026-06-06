import { useState } from 'react'
import { mockSettlements } from '../../../mock'
import { 
  Search, Filter, FileDown, Download, Printer,
  ChevronLeft, ChevronRight, CheckCircle2, History,
  ShieldCheck, ArrowUpRight, ArrowDownRight, Eye,
  Landmark, Receipt, RotateCcw, ShoppingBag
} from 'lucide-react'
import { clsx } from 'clsx'

export default function SettlementLedger() {
  return (
    <div className="space-y-4 pb-20">
      {/* Ledger Header */}
      <div className="bg-white border-b border-[#D8DDE6] -mx-4 -mt-4 mb-4 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center text-white shadow-lg">
              <Landmark className="w-6 h-6" />
           </div>
           <div>
             <p className="text-[11px] font-bold text-[#54698D] uppercase tracking-wider leading-none mb-1">Compliance Archive</p>
             <h1 className="text-[20px] font-bold text-[#16325C] leading-none">Settlement Registry</h1>
           </div>
        </div>
        <div className="flex items-center gap-2">
           <button className="btn-action flex items-center gap-2 px-6 font-black uppercase text-[10px] tracking-widest"><FileDown className="w-4 h-4" /> Export Ledger</button>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: 'Total Settled (YTD)', value: '₹1.84 Cr', icon: Landmark, color: 'text-emerald-600' },
           { label: 'Redemption Val.', value: '₹1.25 Cr', icon: ShoppingBag, color: 'text-[#16325C]' },
           { label: 'Renewal Reinvest.', value: '₹59.4 L', icon: RotateCcw, color: 'text-indigo-600' },
           { label: 'Audit Compliance', value: '100%', icon: ShieldCheck, color: 'text-emerald-600' },
         ].map((kpi, i) => (
           <div key={i} className="workspace-panel p-5 flex items-center justify-between">
              <div>
                 <p className="text-[9px] font-black text-[#54698D] uppercase tracking-widest mb-1">{kpi.label}</p>
                 <h3 className={clsx("text-xl font-black italic tracking-tighter", kpi.color)}>{kpi.value}</h3>
              </div>
              <kpi.icon className="w-8 h-8 opacity-5" />
           </div>
         ))}
      </div>

      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white p-3 rounded border border-[#D8DDE6] shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by settlement ID, Name or Membership..." 
            className="w-full h-8 pl-10 pr-4 bg-[#F3F5F9] border border-transparent focus:bg-white focus:border-primary/30 rounded text-[11px] outline-none" 
          />
        </div>
        <div className="flex items-center gap-2">
           <button className="btn-action px-6 flex items-center gap-2"><Filter className="w-3.5 h-3.5" /> Scheme Type</button>
           <button className="btn-action px-6">Status</button>
        </div>
      </div>

      <div className="workspace-panel overflow-hidden min-h-[600px]">
        <table className="enterprise-table">
          <thead>
            <tr>
              <th>Settlement Number</th>
              <th>Customer Entity</th>
              <th>Method</th>
              <th>Transaction Date</th>
              <th className="text-right">Final Amount</th>
              <th className="text-center">Audit Status</th>
              <th className="text-right">Operation</th>
            </tr>
          </thead>
          <tbody>
            {mockSettlements.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                 <td className="font-mono font-bold text-[#54698D]">{row.id}</td>
                 <td>
                    <div className="flex flex-col">
                       <span className="font-bold text-[#16325C]">{row.customer}</span>
                       <span className="text-[9px] font-black text-stone-400 uppercase tracking-tighter">{row.membership}</span>
                    </div>
                 </td>
                 <td>
                    <span className={clsx(
                      "px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-widest leading-none",
                      row.type === 'Renewal' ? "bg-indigo-50 text-indigo-700" : "bg-emerald-50 text-emerald-700"
                    )}>
                      {row.type}
                    </span>
                 </td>
                 <td className="text-[12px] font-bold text-[#54698D]">{row.date}</td>
                 <td className="text-right font-mono font-black italic text-[#16325C]">₹{row.amount.toLocaleString()}</td>
                 <td className="text-center">
                    <div className="flex items-center justify-center gap-1.5 text-emerald-500">
                       <CheckCircle2 className="w-3.5 h-3.5" />
                       <span className="text-[10px] font-black uppercase tracking-tighter">Settled</span>
                    </div>
                 </td>
                 <td className="text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="p-2 hover:bg-white rounded border border-transparent hover:border-[#D8DDE6] text-[#54698D] transition-all"><Eye className="w-4 h-4" /></button>
                       <button className="p-2 hover:bg-white rounded border border-transparent hover:border-[#D8DDE6] text-[#54698D] transition-all"><Printer className="w-4 h-4" /></button>
                    </div>
                 </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="p-4 border-t border-[#D8DDE6] flex items-center justify-between bg-gray-50/30">
           <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Showing settlement arc 1 to 3 of 1250 total closures</p>
           <div className="flex items-center gap-2">
              <button className="p-1 w-8 h-8 flex items-center justify-center bg-white border border-[#D8DDE6] rounded text-[#54698D] hover:bg-gray-50 disabled:opacity-30" disabled><ChevronLeft className="w-4 h-4" /></button>
              <span className="px-4 text-[11px] font-black text-[#16325C]">1</span>
              <button className="p-1 w-8 h-8 flex items-center justify-center bg-white border border-[#D8DDE6] rounded text-[#54698D] hover:bg-gray-50"><ChevronRight className="w-4 h-4" /></button>
           </div>
        </div>
      </div>
    </div>
  )
}
