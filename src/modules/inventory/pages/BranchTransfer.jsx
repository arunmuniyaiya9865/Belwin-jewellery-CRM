import { useState } from 'react'
import { mockStockTransfers, mockProducts } from '../../../mock'
import { 
  ArrowRightLeft, MapPin, Package, Clock, 
  ChevronRight, ArrowRight, Printer, ShieldCheck,
  Truck, AlertCircle, Calendar, Plus, Box, Save
} from 'lucide-react'
import { clsx } from 'clsx'

export default function BranchTransfer() {
  const [filterStatus, setFilterStatus] = useState('All')

  return (
    <div className="space-y-4 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-[#16325C] tracking-tight">Inter-Branch Logistics Hub</h1>
          <p className="text-[11px] font-bold text-[#54698D] uppercase tracking-wider mt-1">Cross-Branch Movement • Digital Delivery Notes</p>
        </div>
        <button className="btn-primary-fn !bg-blue-700 flex items-center gap-3 px-6"><ArrowRightLeft className="w-5 h-5" /> Initiate New Transfer</button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
         {/* Live Tracking Board - 8 Cols */}
         <div className="xl:col-span-8 space-y-4">
            <div className="workspace-panel shadow-sm overflow-hidden">
               <div className="p-4 border-b border-[#D8DDE6] bg-gray-50/50 flex items-center justify-between">
                  <h3 className="text-[11px] font-black text-[#16325C] uppercase flex items-center gap-2">
                    <Truck className="w-4 h-4" /> Active Shipment Lifecycle
                  </h3>
                  <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200">
                     {['All', 'Transit', 'Pending', 'Received'].map(status => (
                        <button 
                           key={status}
                           onClick={() => setFilterStatus(status)}
                           className={clsx(
                              "px-3 py-1 text-[10px] font-black uppercase rounded transition-all",
                              filterStatus === status ? "bg-white text-[#16325C] shadow-sm" : "text-stone-400 hover:text-[#54698D]"
                           )}
                        >
                           {status}
                        </button>
                     ))}
                  </div>
               </div>
               
               <div className="p-4 space-y-4">
                  {mockStockTransfers.map((tr) => (
                    <div key={tr.id} className="p-6 border border-[#D8DDE6] rounded-2xl bg-white hover:border-blue-500 transition-all group">
                       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                          <div className="flex items-center gap-6">
                             <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-[#16325C]">
                                <Package className="w-6 h-6" />
                             </div>
                             <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                   <span className="font-mono font-black text-[#54698D]">{tr.id}</span>
                                   <span className={clsx(
                                      "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest",
                                      tr.status === 'Completed' ? "bg-emerald-50 text-emerald-700" :
                                      tr.status === 'In Transit' ? "bg-blue-50 text-blue-700 anime-pulse" :
                                      "bg-amber-50 text-amber-700"
                                   )}>{tr.status}</span>
                                </div>
                                <h4 className="font-bold text-[#16325C]">{tr.product}</h4>
                                <div className="flex items-center gap-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                                   <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-rose-500" /> {tr.from}</span>
                                   <ArrowRight className="w-3 h-3 text-stone-300" />
                                   <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-emerald-500" /> {tr.to}</span>
                                </div>
                             </div>
                          </div>
                          
                          <div className="flex items-center gap-8 w-full md:w-auto border-t md:border-none pt-4 md:pt-0">
                             <div className="text-right">
                                <p className="text-[10px] font-black text-stone-400 uppercase mb-1 underline decoration-blue-200">Load Details</p>
                                <p className="text-[13px] font-black text-[#16325C] font-mono italic">{tr.weight} • {tr.qty} Units</p>
                             </div>
                             <div className="flex items-center gap-2">
                                <button className="p-2.5 bg-gray-50 hover:bg-white border hover:border-[#D8DDE6] rounded-xl text-[#54698D] transition-all"><Printer className="w-4 h-4" /></button>
                                <button className="p-2.5 bg-gray-50 hover:bg-white border hover:border-blue-500 rounded-xl text-blue-600 transition-all font-black text-[10px] uppercase tracking-widest px-6 shadow-sm group-hover:bg-blue-600 group-hover:text-white">Verify Receipt</button>
                             </div>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Logistics Intelligence - 4 Cols */}
         <div className="xl:col-span-4 space-y-4">
            <div className="workspace-panel p-6 bg-[#001D4A] text-white">
               <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6">Logistics Optimization</h4>
               <div className="space-y-8">
                  <div className="flex items-center justify-between">
                     <p className="text-[13px] font-bold">Monthly Bulk Weight</p>
                     <span className="text-xl font-black italic tracking-tighter text-emerald-400">12.5 Kg</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <p className="text-[9px] font-black uppercase text-blue-300 mb-1">Avg Transit Time</p>
                        <p className="text-[16px] font-black">4.2 Hrs</p>
                     </div>
                     <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <p className="text-[9px] font-black uppercase text-blue-300 mb-1">Stock Gap Fulfilled</p>
                        <p className="text-[16px] font-black">92%</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="workspace-panel p-6">
               <h4 className="text-[11px] font-black text-[#16325C] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-rose-500" /> Pending Approval Queue
               </h4>
               <div className="space-y-4">
                  {[
                    { prd: 'Gold Chains', from: 'Main', to: 'Airport', due: 'Due Today' },
                    { prd: 'Silver Coins', from: 'Main', to: 'City Mall', due: 'Overdue' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-3 border border-[#F0F0F0] rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                       <div>
                          <p className="text-[12px] font-bold text-[#16325C] leading-none mb-1">{item.prd}</p>
                          <p className="text-[9px] font-bold text-stone-400 uppercase tracking-tighter">{item.from} → {item.to}</p>
                       </div>
                       <span className={clsx(
                         "text-[9px] font-black uppercase tracking-widest",
                         item.due === 'Overdue' ? "text-rose-600" : "text-amber-600"
                       )}>{item.due}</span>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-6 py-2.5 bg-[#F8FAFC] border border-[#D8DDE6] rounded-xl text-[10px] font-black text-[#16325C] uppercase tracking-widest hover:bg-white transition-all">Review Global Queues</button>
            </div>

            <div className="workspace-panel p-5 bg-blue-50/50 border-blue-100 flex gap-4">
               <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
               <p className="text-[10px] font-medium text-blue-900 leading-relaxed italic">
                  Digital Signatures are <strong>mandatory</strong> for all physical gold handovers between branch managers.
               </p>
            </div>
         </div>
      </div>
    </div>
  )
}
