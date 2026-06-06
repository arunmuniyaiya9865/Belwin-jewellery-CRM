import { useState } from 'react'
import { mockCustomers, mockMemberships } from '../../../mock'
import { 
  Search, Wallet, CreditCard, Smartphone, Banknote, 
  Landmark, Receipt, CheckCircle2, ChevronRight, User,
  Calculator, FileText, Printer, ArrowRight
} from 'lucide-react'
import { clsx } from 'clsx'

export default function CollectionEntry() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCustomerId, setSelectedCustomerId] = useState(null)
  const [paymentMode, setPaymentMode] = useState('Cash')

  const selectedCustomer = mockCustomers.find(c => c.id === selectedCustomerId)
  const selectedMembership = mockMemberships.find(m => m.customerId === selectedCustomerId)

  return (
    <div className="space-y-4">
      {/* Salesforce Page Header */}
      <div className="bg-white border-b border-[#D8DDE6] -mx-4 -mt-4 mb-4 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-[#0070D2] rounded flex items-center justify-center text-white shadow-lg">
                <Receipt className="w-6 h-6" />
             </div>
             <div>
               <p className="text-[11px] font-bold text-[#54698D] uppercase tracking-wider leading-none mb-1">Operational Desk</p>
               <h1 className="text-[20px] font-bold text-[#16325C] leading-none">High-Speed Collection Terminal</h1>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
        {/* Left Column - Search & Selection (3 Cols) */}
        <div className="xl:col-span-3 h-full">
           <div className="workspace-panel rounded flex flex-col min-h-[600px]">
              <div className="p-3 bg-gray-50/50 border-b border-[#D8DDE6]">
                 <h3 className="text-[11px] font-black text-[#16325C] uppercase tracking-wider">Target lookup</h3>
              </div>
              <div className="p-4 border-b border-[#D8DDE6]">
                 <div className="relative">
                   <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                   <input 
                     type="text" 
                     placeholder="UID, Name, or Mobile..." 
                     className="w-full h-9 pl-9 pr-4 bg-[#F3F5F9] border border-transparent focus:bg-white focus:border-[#0070D2] rounded text-[11px] outline-none" 
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                   />
                 </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                {mockCustomers.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.id.includes(searchTerm)).map(c => (
                  <button 
                    key={c.id} 
                    onClick={() => setSelectedCustomerId(c.id)}
                    className={clsx(
                      "w-full text-left p-3 rounded transition-all border",
                      selectedCustomerId === c.id ? "bg-[#F3F5F9] border-[#0070D2] shadow-sm" : "border-transparent hover:bg-gray-50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center font-black text-[10px]">{c.name[0]}</div>
                      <div>
                        <p className="text-[12px] font-bold text-[#16325C]">{c.name}</p>
                        <p className="text-[9px] font-black text-[#54698D] uppercase">{c.id} • {c.phone}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              {selectedCustomer && (
                <div className="p-4 bg-[#F3F5F9] border-t border-[#D8DDE6] space-y-3">
                   <div className="flex justify-between items-center text-[10px] font-black uppercase text-[#54698D] border-b border-gray-200 pb-2">
                     <span>Member Status</span>
                     <span className="text-emerald-600">Verified ✓</span>
                   </div>
                   <div className="space-y-1.5">
                     <p className="text-[11px] font-bold text-[#16325C]">{selectedCustomer.branch}</p>
                     <p className="text-[10px] font-medium text-[#54698D]">Scheme: {selectedMembership?.schemeName || 'N/A'}</p>
                   </div>
                </div>
              )}
           </div>
        </div>

        {/* Center Column - Installment Details (6 Cols) */}
        <div className="xl:col-span-6 space-y-4">
           <div className="workspace-panel rounded min-h-[600px] p-8">
              {!selectedMembership ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-20 py-20">
                   <Calculator className="w-20 h-20 mb-6" />
                   <p className="text-sm font-bold uppercase tracking-widest">Select target to load installment baseline</p>
                </div>
              ) : (
                <div className="space-y-10 animate-in fade-in zoom-in-95 duration-200">
                   <div className="flex justify-between items-start">
                      <div>
                         <p className="text-[11px] font-black text-[#54698D] uppercase tracking-widest mb-1">Financial Membership</p>
                         <h2 className="text-2xl font-black text-[#16325C] italic font-mono">{selectedMembership.id}</h2>
                      </div>
                      <div className="text-right">
                         <p className="text-[11px] font-black text-[#54698D] uppercase tracking-widest mb-1">Status</p>
                         <span className="status-badge-fn bg-emerald-50 text-emerald-700 border-emerald-100 uppercase tracking-tighter">Active Member</span>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-6 bg-gray-50/50 border border-[#D8DDE6] rounded-lg">
                         <p className="text-[10px] font-black text-[#54698D] uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">Tenure Snapshot</p>
                         <div className="space-y-4">
                            <div className="flex justify-between text-[13px] font-bold">
                               <span className="text-stone-500 uppercase font-medium">Installment #</span>
                               <span className="text-[#16325C]">06 of 11</span>
                            </div>
                            <div className="flex justify-between text-[13px] font-bold">
                               <span className="text-stone-500 uppercase font-medium">Scheduled Date</span>
                               <span className="text-[#16325C]">20 June 2025</span>
                            </div>
                            <div className="pt-2">
                               <div className="h-1.5 bg-white border border-gray-100 rounded-full overflow-hidden">
                                 <div className="h-full bg-[#0070D2]" style={{ width: '54%' }} />
                               </div>
                               <p className="text-[9px] font-black text-stone-400 mt-2">54% TENURE ELAPSED</p>
                            </div>
                         </div>
                      </div>

                      <div className="p-6 bg-[#00173A] text-white rounded-lg shadow-xl relative overflow-hidden">
                         <div className="relative z-10">
                            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Due Assessment</p>
                            <div className="space-y-4">
                               <div className="flex justify-between items-baseline">
                                  <span className="text-[11px] font-bold text-stone-400 uppercase">Principal Due</span>
                                  <span className="text-2xl font-black font-mono italic">₹5,000</span>
                               </div>
                               <div className="flex justify-between items-baseline">
                                  <span className="text-[11px] font-bold text-stone-400 uppercase">Late Surcharge</span>
                                  <span className="text-sm font-black font-mono text-rose-400">₹0.00</span>
                               </div>
                               <div className="pt-3 border-t border-white/5 flex justify-between items-baseline text-emerald-400">
                                  <span className="text-[11px] font-black uppercase">Net Payable</span>
                                  <span className="text-2xl font-black font-mono italic underline decoration-2 underline-offset-4">₹5,000</span>
                               </div>
                            </div>
                         </div>
                         <Smartphone className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 -rotate-12" />
                      </div>
                   </div>

                   <div className="space-y-4">
                      <p className="text-[11px] font-black text-[#54698D] uppercase tracking-widest">Select Settlement Mode</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                         {[
                           { name: 'Cash', icon: Banknote },
                           { name: 'UPI', icon: Smartphone },
                           { name: 'Card', icon: CreditCard },
                           { name: 'Transfer', icon: Landmark }
                         ].map(mode => (
                           <button 
                             key={mode.name}
                             onClick={() => setPaymentMode(mode.name)}
                             className={clsx(
                               "py-4 flex flex-col items-center gap-2 rounded border-2 transition-all active:scale-95",
                               paymentMode === mode.name ? "bg-white border-[#0070D2] shadow-lg text-[#0070D2]" : "bg-gray-50 border-transparent text-[#54698D] hover:bg-white hover:border-[#D8DDE6]"
                             )}
                           >
                             <mode.icon className="w-5 h-5" />
                             <span className="text-[10px] font-black uppercase tracking-wider">{mode.name}</span>
                           </button>
                         ))}
                      </div>
                   </div>
                </div>
              )}
           </div>
        </div>

        {/* Right Column - Submission Summary (3 Cols) */}
        <div className="xl:col-span-3 h-full">
           <div className="workspace-panel rounded min-h-[600px] flex flex-col">
              <div className="p-3 bg-gray-50/50 border-b border-[#D8DDE6]">
                 <h3 className="text-[11px] font-black text-[#16325C] uppercase tracking-wider">Settlement Preview</h3>
              </div>
              <div className="p-6 flex-1 space-y-8">
                 {!selectedMembership ? (
                   <div className="h-full flex flex-col items-center justify-center opacity-10">
                      <CheckCircle2 className="w-16 h-16" />
                   </div>
                 ) : (
                   <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                      <div className="space-y-6">
                        <div className="space-y-3">
                           <SummaryItem label="Mode" value={paymentMode} bold />
                           <SummaryItem label="Execution Date" value="04 Jun 2025" />
                           <SummaryItem label="Collected By" value="Admin Desk #01" />
                        </div>
                        <div className="p-4 bg-[#F3F5F9] rounded space-y-4">
                           <div className="flex justify-between items-baseline">
                              <p className="text-[11px] font-black text-[#54698D] uppercase tracking-widest">Total Settle</p>
                              <p className="text-3xl font-black text-[#16325C] font-mono italic">₹5,000</p>
                           </div>
                           <p className="text-[10px] font-medium text-stone-500 italic">Five Thousand Indian Rupees Only.</p>
                        </div>
                      </div>

                      <div className="space-y-3 pt-10">
                         <button className="w-full btn-primary-fn !py-4 flex items-center justify-center gap-2 shadow-xl shadow-[#0071d2]/20 text-[12px]">
                           Process Payment <ArrowRight className="w-4 h-4" />
                         </button>
                         <button className="w-full py-2.5 border border-[#D8DDE6] rounded text-[11px] font-bold text-stone-600 hover:bg-gray-50 flex items-center justify-center gap-2 uppercase tracking-widest">
                           <Printer className="w-4 h-4" /> Print Receipt
                         </button>
                      </div>

                      <div className="p-4 bg-emerald-50 border border-emerald-100 rounded flex gap-3">
                         <div className="p-1.5 bg-emerald-500 rounded-full text-white">
                           <CheckCircle2 className="w-3.5 h-3.5" />
                         </div>
                         <p className="text-[11px] font-bold text-emerald-800 leading-tight">Member account will be updated in Real-Time upon settlement.</p>
                      </div>
                   </div>
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

function SummaryItem({ label, value, bold }) {
  return (
    <div className="flex justify-between items-end gap-4 overflow-hidden">
       <span className="text-[10px] font-bold text-[#54698D] uppercase tracking-widest whitespace-nowrap">{label}</span>
       <div className="h-[1px] flex-1 bg-gray-50 border-b border-dotted border-gray-300 mb-1" />
       <span className={clsx("text-[12px] whitespace-nowrap", bold ? "font-black text-[#16325C] uppercase" : "font-semibold text-[#16325C]")}>{value}</span>
    </div>
  )
}
