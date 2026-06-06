import { useState } from 'react'
import { Link } from 'react-router-dom'
import { mockCustomers, mockSchemes } from '../../../mock'
import { 
  Search, User, ShoppingBag, ShieldCheck, 
  ArrowRight, FileText, CheckCircle2, ChevronRight,
  TrendingDown, TrendingUp, Users, Wallet
} from 'lucide-react'
import { clsx } from 'clsx'

export default function SchemeEnrollment() {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null)
  const [selectedSchemeId, setSelectedSchemeId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const selectedCustomer = mockCustomers.find(c => c.id === selectedCustomerId)
  const selectedScheme = mockSchemes.find(s => s.id === selectedSchemeId)

  return (
    <div className="space-y-4">
      {/* Dynamic Module Header */}
      <div className="bg-white border-b border-[#D8DDE6] -mx-4 -mt-4 mb-4 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-[#0070D2] rounded flex items-center justify-center text-white shadow-lg">
                <Users className="w-6 h-6" />
             </div>
             <div>
               <p className="text-[11px] font-bold text-[#54698D] uppercase tracking-wider leading-none mb-1">Transactional Center</p>
               <h1 className="text-[20px] font-bold text-[#16325C] leading-none">New Scheme Enrollment</h1>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
        {/* Left Column - Customer Selection (3 Cols) */}
        <div className="xl:col-span-3 space-y-4 h-full">
           <div className="workspace-panel rounded h-full flex flex-col min-h-[600px]">
             <div className="p-3 border-b border-[#D8DDE6] bg-gray-50/50">
               <h3 className="text-[11px] font-black text-[#16325C] uppercase tracking-wider">Step 1: Select Customer</h3>
             </div>
             <div className="p-4 border-b border-[#D8DDE6]">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="UID or Mobile Number..." 
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
                        <p className="text-[12px] font-bold text-[#16325C] truncate max-w-[120px]">{c.name}</p>
                        <p className="text-[9px] font-black text-[#54698D] uppercase">{c.id} • {c.phone}</p>
                      </div>
                    </div>
                  </button>
                ))}
             </div>
             {selectedCustomer && (
               <div className="p-4 bg-[#F3F5F9] border-t border-[#D8DDE6] space-y-3">
                  <p className="text-[9px] font-black text-[#54698D] uppercase">Customer Summary</p>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-medium"><span>Branch:</span> <span className="font-bold">{selectedCustomer.branch}</span></div>
                    <div className="flex justify-between text-[11px] font-medium"><span>Loyalty:</span> <span className="text-amber-600 font-bold">{selectedCustomer.tier}</span></div>
                    <div className="flex justify-between text-[11px] font-medium"><span>Outstanding:</span> <span className="text-rose-600 font-bold">₹{selectedCustomer.outstanding}</span></div>
                  </div>
               </div>
             )}
           </div>
        </div>

        {/* Center Column - Scheme Selection (6 Cols) */}
        <div className="xl:col-span-6 space-y-4">
           <div className="workspace-panel rounded min-h-[600px]">
             <div className="p-3 border-b border-[#D8DDE6] bg-gray-50/50">
               <h3 className="text-[11px] font-black text-[#16325C] uppercase tracking-wider">Step 2: Choose Financial Product</h3>
             </div>
             <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockSchemes.map((s) => (
                  <button 
                    key={s.id} 
                    onClick={() => setSelectedSchemeId(s.id)}
                    className={clsx(
                      "text-left p-6 rounded border-2 transition-all relative group",
                      selectedSchemeId === s.id ? "bg-white border-[#0070D2] shadow-xl" : "bg-gray-50 border-transparent hover:bg-white hover:border-[#D8DDE6]"
                    )}
                  >
                    <div className="flex justify-between">
                       <h4 className="text-[14px] font-black text-[#16325C] leading-none mb-1">{s.name}</h4>
                       {selectedSchemeId === s.id && <CheckCircle2 className="w-5 h-5 text-[#0070D2]" />}
                    </div>
                    <p className="text-[10px] font-bold text-[#54698D] uppercase tracking-widest mb-6">{s.type}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-[9px] font-black text-stone-400 uppercase leading-none mb-1">Monthly</p>
                        <p className="text-[15px] font-black text-[#16325C] font-mono leading-none">₹{s.amount.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-black text-stone-400 uppercase leading-none mb-1">Duration</p>
                        <p className="text-[15px] font-black text-[#16325C] leading-none">{s.duration}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-50 rounded border border-emerald-100 flex items-center justify-between text-[11px] font-black text-emerald-700">
                      <span className="uppercase tracking-widest">Est. Bonus:</span>
                      <span className="text-xs uppercase">₹{s.amount}</span>
                    </div>

                    {selectedSchemeId === s.id && (
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-[#0070D2]" />
                    )}
                  </button>
                ))}
             </div>
           </div>
        </div>

        {/* Right Column - Enrollment Summary (3 Cols) */}
        <div className="xl:col-span-3 space-y-4">
           <div className="workspace-panel rounded min-h-[600px] flex flex-col">
             <div className="p-3 border-b border-[#D8DDE6] bg-gray-50/50">
               <h3 className="text-[11px] font-black text-[#16325C] uppercase tracking-wider">Enrollment Validation</h3>
             </div>
             
             <div className="flex-1 p-6 space-y-8">
               {!selectedCustomer || !selectedScheme ? (
                 <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                    <ShieldCheck className="w-16 h-16 mb-4" />
                    <p className="text-[12px] font-bold">Complete Steps 1 & 2 to Generate Enrollment Agreement</p>
                 </div>
               ) : (
                 <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="space-y-4">
                       <h4 className="text-[11px] font-black text-[#16325C] uppercase tracking-widest border-b border-[#F0F0F0] pb-2">Account Summary</h4>
                       <div className="space-y-3">
                          <SummaryItem label="Beneficiary" value={selectedCustomer.name} />
                          <SummaryItem label="Financial Product" value={selectedScheme.name} />
                          <SummaryItem label="Installment" value={`₹${selectedScheme.amount.toLocaleString()}`} bold />
                          <SummaryItem label="Tenure" value={selectedScheme.duration} />
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h4 className="text-[11px] font-black text-[#16325C] uppercase tracking-widest border-b border-[#F0F0F0] pb-2">Financial Projection</h4>
                       <div className="p-4 bg-[#F3F5F9] rounded space-y-3">
                          <SummaryItem label="Total Investment" value={`₹${(selectedScheme.amount * parseInt(selectedScheme.duration)).toLocaleString()}`} />
                          <SummaryItem label="Bonus Value" value={`₹${selectedScheme.amount.toLocaleString()}`} />
                          <div className="pt-3 border-t border-[#D8DDE6] flex justify-between">
                            <span className="text-[10px] font-black text-[#16325C] uppercase tracking-widest">Maturity Value</span>
                            <span className="text-base font-black text-emerald-600 font-mono">₹{(selectedScheme.amount * (parseInt(selectedScheme.duration) + 1)).toLocaleString()}</span>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-3">
                       <button className="w-full btn-primary-fn !py-3.5 !rounded-lg flex items-center justify-center gap-2 shadow-xl shadow-[#0071d2]/20">
                         Create Membership <ArrowRight className="w-4 h-4" />
                       </button>
                       <button className="w-full h-10 border border-[#D8DDE6] rounded-lg text-[11px] font-bold uppercase tracking-widest text-stone-500 hover:bg-gray-50 flex items-center justify-center gap-2">
                         <FileText className="w-3.5 h-3.5" /> Print Agreement Draft
                       </button>
                    </div>
                 </div>
               )}
             </div>

             {selectedScheme && (
               <div className="p-4 border-t border-[#D8DDE6] bg-amber-50/50">
                  <div className="flex gap-3 text-[10px] font-medium text-amber-800">
                    <TrendingUp className="w-4 h-4 shrink-0 text-amber-600" />
                    <span>Selected product qualifies for **Tax Waiver** on Making Charges up to ₹5,000 upon redemption.</span>
                  </div>
               </div>
             )}
           </div>
        </div>
      </div>
    </div>
  )
}

function SummaryItem({ label, value, bold }) {
  return (
    <div className="flex justify-between items-end gap-4 overflow-hidden">
       <span className="text-[10px] font-bold text-[#54698D] uppercase tracking-tighter whitespace-nowrap">{label}</span>
       <div className="h-[1px] flex-1 bg-gray-50 border-b border-dotted border-gray-300 mb-1" />
       <span className={clsx("text-[12px] whitespace-nowrap", bold ? "font-black text-[#16325C]" : "font-semibold text-[#16325C]")}>{value}</span>
    </div>
  )
}
