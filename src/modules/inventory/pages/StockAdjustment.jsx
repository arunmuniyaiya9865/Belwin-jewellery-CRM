import { useState } from 'react'
import { 
  Plus, Search, ShieldCheck, AlertCircle, 
  ArrowRight, FileText, CheckCircle2, History,
  Database, Scale, Gem, Trash2, Save
} from 'lucide-react'
import { clsx } from 'clsx'

export default function StockAdjustment() {
  return (
    <div className="space-y-4 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-[#16325C] tracking-tight">Stock Correction & Adjustments</h1>
          <p className="text-[11px] font-bold text-[#54698D] uppercase tracking-wider mt-1">Discrepancy Resolution • Dual Authorization Required</p>
        </div>
        <div className="flex items-center gap-2">
           <button className="btn-action flex items-center gap-2 font-black uppercase text-[10px] tracking-widest px-6 shadow-sm"><History className="w-4 h-4" /> Adjustment Logs</button>
           <button className="btn-primary-fn !bg-[#16325C] flex items-center gap-2 px-8"><Plus className="w-4 h-4" /> Log Correction Entry</button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
         {/* Main Adjustment Area - 8 Cols */}
         <div className="xl:col-span-8 space-y-4">
            <div className="workspace-panel overflow-hidden border-dashed border-2 border-[#D8DDE6] bg-gray-50/20 p-10 flex flex-col items-center justify-center text-center">
               <div className="w-20 h-20 rounded-full bg-white border border-[#D8DDE6] flex items-center justify-center shadow-lg mb-6">
                  <Database className="w-10 h-10 text-stone-200" />
               </div>
               <h3 className="text-xl font-bold text-[#16325C] mb-2 tracking-tight">Start a Detailed Correction Sequence</h3>
               <p className="text-[12px] font-medium text-[#54698D] max-w-sm mb-8 leading-relaxed">Adjustments impact financial ledger values. Use this for weight variations, broken pieces, or audit corrections.</p>
               
               <div className="flex items-center gap-4">
                  <button className="px-10 py-3.5 bg-[#16325C] text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:scale-[1.02] transition-transform">Initiate Adjustment Flow</button>
               </div>
            </div>

            {/* Recent Adjustments Queue */}
            <div className="workspace-panel overflow-hidden">
               <div className="p-4 border-b border-[#D8DDE6] bg-[#F8FAFC]">
                  <h3 className="text-[11px] font-black text-[#16325C] uppercase tracking-wider">Awaiting Counter-Signature</h3>
               </div>
               <div className="p-4 space-y-3">
                  {[
                    { id: 'ADJ-1029', prd: 'Gold Ring (22K)', qty: '-1 Pcs', reason: 'Found Damaged (Setting)', branch: 'Main', by: 'Rahul' },
                    { id: 'ADJ-1030', prd: 'Silver Coin', qty: '+5 Pcs', reason: 'Audit Surplus', branch: 'City Mall', by: 'Amita' },
                  ].map((adj, i) => (
                    <div key={i} className="flex flex-col md:flex-row justify-between items-center p-4 border border-[#D8DDE6] rounded-2xl bg-white hover:border-[#16325C] transition-all group">
                       <div className="flex items-center gap-6">
                          <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-stone-300">
                             <Scale className="w-5 h-5 opacity-40" />
                          </div>
                          <div className="space-y-1">
                             <div className="flex items-center gap-2">
                                <span className="font-mono font-black text-[#54698D] text-[11px]">{adj.id}</span>
                                <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-[9px] font-black uppercase tracking-widest">Pending Auth</span>
                             </div>
                             <h4 className="font-bold text-[#16325C] text-[13px]">{adj.prd}</h4>
                             <p className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter italic">{adj.reason} • {adj.branch} Branch</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-8 w-full md:w-auto border-t md:border-none pt-4 md:pt-0">
                          <div className="text-right">
                             <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Impact</p>
                             <p className={clsx("text-lg font-black italic", adj.qty.includes('-') ? "text-rose-600" : "text-emerald-600")}>{adj.qty}</p>
                          </div>
                          <div className="flex items-center gap-2">
                             <button className="px-8 py-2.5 bg-emerald-600 text-white rounded text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-900/10 hover:bg-emerald-700 transition-colors">Authorize</button>
                             <button className="p-2.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors"><Trash2 className="w-4 h-4" /></button>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Policy Side Bar - 4 Cols */}
         <div className="xl:col-span-4 space-y-4">
            <div className="workspace-panel p-6 bg-[#001D4A] text-white">
               <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-8">Discrepancy Intelligence</h4>
               <div className="space-y-6">
                  <div className="flex gap-4">
                     <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                     <div>
                        <p className="text-[13px] font-bold leading-tight">Branch Variance: 0.02%</p>
                        <p className="text-[10px] text-blue-200 mt-1 font-medium leading-relaxed uppercase tracking-tighter">Current variance is within acceptable ERP tolerance levels of 0.05%.</p>
                     </div>
                  </div>
                  <div className="flex gap-4 border-t border-white/10 pt-6">
                     <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                     <div>
                        <p className="text-[13px] font-bold leading-tight">Dual-Sign Off Policy</p>
                        <p className="text-[10px] text-blue-200 mt-1 font-medium leading-relaxed uppercase tracking-tighter italic">All quantity adjustments exceeding 2 units require regional manager approval.</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="workspace-panel shadow-sm p-0 overflow-hidden">
               <div className="p-4 border-b border-[#D8DDE6] bg-gray-50/50">
                  <h4 className="text-[10px] font-black text-[#16325C] uppercase tracking-widest">Reason Code Distribution</h4>
               </div>
               <div className="p-6 space-y-4">
                  <ReasonStat label="Damaged Stock" val="12%" color="bg-rose-400" />
                  <ReasonStat label="Audit Surplus" val="45%" color="bg-emerald-400" />
                  <ReasonStat label="Tagging Errors" val="28%" color="bg-amber-400" />
                  <ReasonStat label="Repair Outsourcing" val="15%" color="bg-blue-400" />
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}

function ReasonStat({ label, val, color }) {
  return (
    <div className="space-y-1.5">
       <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-tighter">
          <span className="text-[#54698D]">{label}</span>
          <span className="text-[#16325C]">{val}</span>
       </div>
       <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
          <div className={clsx("h-full", color)} style={{ width: val }} />
       </div>
    </div>
  )
}
