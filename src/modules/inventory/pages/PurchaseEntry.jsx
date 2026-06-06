import { useState } from 'react'
import { mockVendors, mockTodayRates } from '../../../mock'
import { 
  ShoppingBag, User, Calendar, Hash, Landmark, 
  Calculator, Plus, Save, Printer, ArrowLeft,
  ChevronDown, Gem, AlertCircle, FileText
} from 'lucide-react'
import { clsx } from 'clsx'
import { useNavigate } from 'react-router-dom'

export default function PurchaseEntry() {
  const navigate = useNavigate()
  const [selectedVendor, setSelectedVendor] = useState(mockVendors[0])

  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-[#D8DDE6] -mx-4 -mt-4 mb-4 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
           <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 group">
              <ArrowLeft className="w-5 h-5 group-hover:text-[#16325C] transition-colors" />
           </button>
           <div className="w-10 h-10 bg-indigo-700 rounded flex items-center justify-center text-white shadow-lg">
              <ShoppingBag className="w-6 h-6" />
           </div>
           <div>
             <p className="text-[11px] font-bold text-[#54698D] uppercase tracking-wider leading-none mb-1">Logistics & Supply</p>
             <h1 className="text-[20px] font-bold text-[#16325C] leading-none">New Stock Inward Purchase</h1>
           </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-right">
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none mb-1">Bullion Link Rate</p>
              <p className="text-xl font-black text-[#B8860B] italic leading-none">₹{mockTodayRates.gold24}/g</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
         <div className="xl:col-span-8 space-y-4">
            {/* Vendor & Invoice Section */}
            <div className="workspace-panel p-8">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-[#54698D] uppercase tracking-widest">Master Vendor</label>
                     <div className="relative h-11 border-2 border-[#D8DDE6] rounded-xl flex items-center px-4 bg-gray-50 focus-within:border-[#16325C] focus-within:bg-white transition-all cursor-pointer">
                        <User className="w-4 h-4 text-stone-400 mr-3" />
                        <span className="text-[13px] font-bold text-[#16325C] flex-1">{selectedVendor.name}</span>
                        <ChevronDown className="w-4 h-4 text-stone-300" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-[#54698D] uppercase tracking-widest">Invoice Ref #</label>
                     <div className="relative h-11 border border-[#D8DDE6] rounded-xl flex items-center px-4">
                        <Hash className="w-4 h-4 text-stone-300 mr-3" />
                        <input type="text" placeholder="INV-2025-..." className="bg-transparent border-none outline-none text-[13px] font-bold text-[#16325C] flex-1" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-[#54698D] uppercase tracking-widest">Entry Date</label>
                     <div className="relative h-11 border border-[#D8DDE6] rounded-xl flex items-center px-4">
                        <Calendar className="w-4 h-4 text-stone-300 mr-3" />
                        <input type="date" className="bg-transparent border-none outline-none text-[13px] font-bold text-[#16325C] flex-1" defaultValue="2025-06-04" />
                     </div>
                  </div>
               </div>
            </div>

            {/* Line Items Terminal */}
            <div className="workspace-panel min-h-[400px] flex flex-col overflow-hidden">
               <div className="p-4 border-b border-[#D8DDE6] bg-[#F8FAFC] flex items-center justify-between">
                  <h3 className="text-[11px] font-black text-[#16325C] uppercase tracking-wider">Itemized Load Specification</h3>
                  <p className="text-[9px] font-bold text-stone-400">Add gold, silver or stones from packing list</p>
               </div>
               <div className="flex-1 p-6">
                  <div className="overflow-x-auto">
                     <table className="enterprise-table !border-none">
                        <thead>
                           <tr className="!bg-transparent border-b">
                              <th>Metal / Type</th>
                              <th>Category</th>
                              <th className="text-right">Weight (g)</th>
                              <th className="text-right">Qty</th>
                              <th className="text-right">Purchase Rate</th>
                              <th className="text-right">Total</th>
                              <th className="w-10"></th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr className="hover:bg-gray-50/50">
                              <td>
                                 <select className="bg-transparent border-none font-bold text-[#16325C] text-[12px] focus:outline-none">
                                    <option>Gold (22K)</option>
                                    <option>Silver (925)</option>
                                    <option>Diamond</option>
                                 </select>
                              </td>
                              <td><span className="text-[12px] font-medium text-[#54698D]">Bangles</span></td>
                              <td className="text-right font-mono font-bold">120.45</td>
                              <td className="text-right font-bold">12</td>
                              <td className="text-right font-mono text-stone-400">₹6,850.00</td>
                              <td className="text-right font-mono font-black italic text-[#16325C]">₹8,25,082</td>
                              <td className="text-center">
                                 <button className="text-stone-300 hover:text-rose-500 transition-colors">
                                    <Hash className="w-4 h-4" />
                                 </button>
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
                  
                  <button className="w-full mt-6 py-6 border-2 border-dashed border-gray-100 rounded-3xl flex items-center justify-center gap-3 text-stone-300 hover:border-[#16325C]/30 hover:text-[#16325C] transition-all group">
                     <Plus className="w-5 h-5 group-hover:scale-125 transition-transform" />
                     <span className="text-[11px] font-black uppercase tracking-widest">Append Product Line Item</span>
                  </button>
               </div>
            </div>
         </div>

         {/* Financial Summary - 4 Cols */}
         <div className="xl:col-span-4 space-y-4">
            <div className="workspace-panel shadow-2xl border-2 border-[#16325C] overflow-hidden">
               <div className="p-6 bg-[#16325C] text-white">
                  <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6">Valuation Summary</h4>
                  <div className="space-y-4">
                     <SummaryLine label="Sub-Total (Assessable)" value="₹8,25,082.00" />
                     <SummaryLine label="GST (3%)" value="₹24,752.46" />
                     <SummaryLine label="KFC / Cess (0.1%)" value="₹825.08" />
                     <div className="h-[1px] bg-white/10 my-4" />
                     <div className="flex justify-between items-center text-xl font-black italic tracking-tighter">
                        <span className="text-[#B8860B]">Total Payable</span>
                        <span>₹8,50,659.54</span>
                     </div>
                  </div>
               </div>

               <div className="p-8 space-y-6">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-[#D8DDE6] flex gap-4">
                     <Landmark className="w-6 h-6 text-stone-400 mt-1 shrink-0" />
                     <div>
                        <p className="text-[11px] font-black text-[#16325C] uppercase tracking-widest mb-1">Standard Terms</p>
                        <p className="text-[10px] text-[#54698D] leading-relaxed">Payment via RTGS only. GRN will be auto-generated upon submission.</p>
                     </div>
                  </div>

                  <div className="pt-6 space-y-3">
                     <button className="w-full btn-primary-fn !bg-[#16325C] flex items-center justify-center gap-3 !py-4 font-black uppercase text-[12px] tracking-widest shadow-xl shadow-blue-900/10">
                        <Save className="w-5 h-5" /> Generate Stock GRN
                     </button>
                     <div className="flex gap-2">
                        <button className="flex-1 py-3 bg-white border border-[#D8DDE6] rounded-xl text-[10px] font-black uppercase tracking-widest text-[#54698D] flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
                           <Printer className="w-4 h-4" /> Print Entry
                        </button>
                        <button className="flex-1 py-3 bg-white border border-[#D8DDE6] rounded-xl text-[10px] font-black uppercase tracking-widest text-[#54698D] flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
                           <FileText className="w-4 h-4" /> Draft Saved
                        </button>
                     </div>
                  </div>
               </div>
            </div>

            <div className="workspace-panel p-5 bg-amber-50/50 border-amber-100 flex gap-4">
               <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
               <p className="text-[11px] font-medium text-amber-900 leading-relaxed italic">
                  Note: Gold rate is locked for <strong>60 minutes</strong>. Unsubmitted entries after this will require rate re-calibration.
               </p>
            </div>
         </div>
      </div>
    </div>
  )
}

function SummaryLine({ label, value }) {
  return (
    <div className="flex justify-between items-center text-sm font-bold">
       <span className="text-blue-100">{label}</span>
       <span className="font-mono">{value}</span>
    </div>
  )
}
