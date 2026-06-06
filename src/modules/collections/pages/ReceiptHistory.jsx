import { useState } from 'react'
import { mockReceipts } from '../../../mock'
import { 
  Search, Filter, Receipt, FileDown, Printer,
  Eye, Download, Smartphone, Banknote, CreditCard,
  Landmark, Calendar, MoreHorizontal, User
} from 'lucide-react'
import { clsx } from 'clsx'

export default function ReceiptHistory() {
  const [selectedReceipt, setSelectedReceipt] = useState(null)

  return (
    <div className="space-y-4 pb-20">
      {/* Page Header */}
      <div className="bg-white border-b border-[#D8DDE6] -mx-4 -mt-4 mb-4 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-emerald-600 rounded flex items-center justify-center text-white shadow-lg">
                <Receipt className="w-6 h-6" />
             </div>
             <div>
               <p className="text-[11px] font-bold text-[#54698D] uppercase tracking-wider leading-none mb-1">Audit Ledger</p>
               <h1 className="text-[20px] font-bold text-[#16325C] leading-none">Receipt Registry</h1>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-action flex items-center gap-2 px-3 py-1.5"><FileDown className="w-3.5 h-3.5" /> Full Reconciliation</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
        {/* Main List - 8 Cols */}
        <div className="xl:col-span-8 space-y-4">
           {/* Toolbar */}
           <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white p-3 rounded border border-[#D8DDE6] shadow-sm">
             <div className="flex items-center gap-3 w-full md:w-auto">
               <div className="relative w-full md:w-80">
                 <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                 <input type="text" placeholder="Search Receipt ID or Customer UID..." className="w-full h-8 pl-9 pr-4 bg-[#F3F5F9] border border-transparent focus:bg-white focus:border-[#0070D2] rounded text-[11px] outline-none" />
               </div>
             </div>
             <div className="flex items-center gap-2">
               <button className="btn-action flex items-center gap-2"><Filter className="w-3.5 h-3.5" /> Date Range</button>
               <button className="btn-action flex items-center gap-2"><Download className="w-3.5 h-3.5" /> CSV</button>
             </div>
           </div>

           {/* Data Table */}
           <div className="workspace-panel overflow-hidden">
             <div className="overflow-x-auto min-h-[500px]">
               <table className="enterprise-table">
                 <thead>
                   <tr>
                     <th>Receipt #</th>
                     <th>Execution Date</th>
                     <th>Policy Member</th>
                     <th>Tenure Account</th>
                     <th className="text-right">Settled Val</th>
                     <th>Mode</th>
                     <th>Collected By</th>
                     <th>Status</th>
                   </tr>
                 </thead>
                 <tbody>
                   {mockReceipts.map((r) => (
                     <tr 
                        key={r.id} 
                        onClick={() => setSelectedReceipt(r)}
                        className={clsx(
                          "hover:bg-[#F3F5F9] transition-colors cursor-pointer group",
                          selectedReceipt?.id === r.id ? "bg-[#F3F5F9]" : ""
                        )}
                     >
                       <td className="font-mono text-[11px] font-black text-[#0070D2]">{r.id}</td>
                       <td className="font-medium text-[#54698D]">{r.date}</td>
                       <td className="font-bold text-[#16325C]">{r.customerName}</td>
                       <td className="font-mono text-[11px] text-stone-400">{r.membershipId}</td>
                       <td className="text-right font-black font-mono text-[#16325C]">₹{r.amount.toLocaleString()}</td>
                       <td>
                          <div className="flex items-center gap-2">
                             {r.mode === 'UPI' ? <Smartphone className="w-3 h-3 text-emerald-500" /> : <Banknote className="w-3 h-3 text-amber-500" />}
                             <span className="text-[10px] font-black uppercase tracking-tighter">{r.mode}</span>
                          </div>
                       </td>
                       <td className="text-[10px] font-bold text-[#54698D] uppercase truncate max-w-[100px]">{r.collector}</td>
                       <td>
                          <span className="status-badge-fn bg-emerald-50 text-emerald-600 border-emerald-100">
                             {r.status}
                          </span>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
        </div>

        {/* Sidebar Preview - 4 Cols */}
        <div className="xl:col-span-4 space-y-4">
           <div className="workspace-panel rounded min-h-[500px]">
              <div className="p-3 bg-gray-50/50 border-b border-[#D8DDE6]">
                 <h3 className="text-[11px] font-black text-[#16325C] uppercase tracking-wider">Receipt Inspection</h3>
              </div>
              {!selectedReceipt ? (
                <div className="p-10 flex flex-col items-center justify-center text-center opacity-20">
                   <Receipt className="w-20 h-20 mb-4" />
                   <p className="text-[11px] font-bold uppercase tracking-widest leading-loose">Select target from ledger to inspect settlement details and metadata</p>
                </div>
              ) : (
                <div className="p-6 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                   <div className="p-6 bg-white border border-[#D8DDE6] rounded-lg shadow-sm border-t-4 border-t-[#16325C] relative overflow-hidden">
                      <div className="relative z-10 space-y-6">
                         <div className="flex justify-between items-start">
                            <h4 className="text-xl font-black italic tracking-tighter font-mono">{selectedReceipt.id}</h4>
                            <div className="text-right">
                               <p className="text-[9px] font-black text-[#54698D] uppercase leading-none">Status</p>
                               <span className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter">Settled ✓</span>
                            </div>
                         </div>
                         
                         <div className="space-y-3">
                            <PreviewItem label="Beneficiary" value={selectedReceipt.customerName} />
                            <PreviewItem label="Account ID" value={selectedReceipt.membershipId} />
                            <PreviewItem label="Execution" value={selectedReceipt.date} />
                            <PreviewItem label="Settlement Cluster" value={selectedReceipt.collector} />
                            <PreviewItem label="Funding Source" value={selectedReceipt.mode} bold />
                         </div>

                         <div className="pt-6 border-t border-dashed border-[#D8DDE6]">
                            <div className="flex justify-between items-baseline text-emerald-600">
                               <span className="text-[11px] font-black uppercase tracking-widest">Total Value</span>
                               <span className="text-3xl font-black font-mono italic">₹{selectedReceipt.amount.toLocaleString()}</span>
                            </div>
                         </div>
                      </div>
                      <Receipt className="absolute -bottom-10 -right-10 w-40 h-40 opacity-5 -rotate-12" />
                   </div>

                   <div className="space-y-2">
                      <button className="w-full btn-primary-fn flex items-center justify-center gap-2 h-11 text-[11px]">
                         <Printer className="w-4 h-4" /> Print Receipt
                      </button>
                      <button className="w-full h-10 border border-[#D8DDE6] rounded text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:bg-gray-50 flex items-center justify-center gap-2">
                         <Download className="w-4 h-4" /> Export as PDF Archive
                      </button>
                   </div>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  )
}

function PreviewItem({ label, value, bold }) {
  return (
    <div className="flex justify-between items-center text-[11px] gap-4">
       <span className="text-stone-400 font-bold uppercase tracking-tighter shrink-0">{label}</span>
       <div className="h-[1px] flex-1 bg-gray-50 border-b border-dotted border-gray-200" />
       <span className={clsx("text-[#16325C]", bold ? "font-black" : "font-semibold")}>{value}</span>
    </div>
  )
}
