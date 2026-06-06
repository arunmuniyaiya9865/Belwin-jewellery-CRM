import { useState } from 'react'
import { mockUpcomingMaturities, mockTodayRates } from '../../../mock'
import { 
  ArrowLeft, ShoppingBag, Gem, Calculator, Ticket, 
  CheckCircle2, Printer, Save, Scale, ArrowRight,
  Landmark, CreditCard, ChevronDown, Package
} from 'lucide-react'
import { clsx } from 'clsx'
import { useNavigate } from 'react-router-dom'

export default function RedemptionManagement() {
  const navigate = useNavigate()
  const customer = mockUpcomingMaturities[0]
  const [selectedItems, setSelectedItems] = useState([
    { id: 'I001', name: 'Gold Bangle (22K)', weight: '12.50g', price: 84000 },
  ])

  const subTotal = selectedItems.reduce((acc, item) => acc + item.price, 0)
  const remainingValue = customer.value - subTotal

  return (
    <div className="space-y-4 pb-20">
      {/* Redemption Header */}
      <div className="bg-white border-b border-[#D8DDE6] -mx-4 -mt-4 mb-4 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
             <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 group">
                <ArrowLeft className="w-5 h-5 group-hover:text-[#16325C] transition-colors" />
             </button>
             <div className="w-10 h-10 bg-[#B8860B] rounded flex items-center justify-center text-white shadow-lg">
                <ShoppingBag className="w-6 h-6" />
             </div>
             <div>
               <p className="text-[11px] font-bold text-[#54698D] uppercase tracking-wider leading-none mb-1">POS Conversion Hub</p>
               <h1 className="text-[20px] font-bold text-[#16325C] leading-none">Jewellery Redemption Desk</h1>
             </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="text-right">
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none mb-1">Maturity Balance</p>
                <p className="text-xl font-black text-emerald-600 italic leading-none">₹{customer.value.toLocaleString()}</p>
             </div>
             <div className="h-10 w-[1px] bg-gray-100" />
             <div className="hidden lg:flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded border border-yellow-100">
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                <span className="text-[10px] font-black text-yellow-800 uppercase tracking-tighter">Gold Rate: ₹{mockTodayRates.gold22}/g</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
         {/* Redemption Items Search - 7 Cols */}
         <div className="xl:col-span-7 space-y-4">
            <div className="workspace-panel shadow-sm">
               <div className="p-4 border-b border-[#D8DDE6] bg-gray-50/50 flex items-center justify-between">
                  <h3 className="text-[11px] font-black text-[#16325C] uppercase tracking-wider flex items-center gap-2">
                    <Package className="w-4 h-4" /> Itemized Selection
                  </h3>
                  <button className="btn-action flex items-center gap-2 !py-1 px-3 text-[10px]"><Gem className="w-3.5 h-3.5" /> Browse Inventory</button>
               </div>
               <div className="p-6">
                  {selectedItems.map((item, i) => (
                    <div key={i} className="flex flex-col md:flex-row gap-6 p-4 bg-gray-50 border border-gray-100 rounded-2xl mb-4 group hover:border-[#B8860B] transition-all">
                       <div className="w-16 h-16 bg-white rounded-xl border border-gray-200 flex items-center justify-center shrink-0">
                          <Gem className="w-8 h-8 text-stone-200" />
                       </div>
                       <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="col-span-2">
                             <p className="text-[10px] font-black text-stone-400 uppercase">Item Description</p>
                             <p className="font-bold text-[#16325C]">{item.name}</p>
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-stone-400 uppercase">Net Weight</p>
                             <p className="font-bold font-mono text-[#54698D]">{item.weight}</p>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] font-black text-stone-400 uppercase">Current Value</p>
                             <p className="font-black text-[#16325C]">₹{item.price.toLocaleString()}</p>
                          </div>
                       </div>
                    </div>
                  ))}

                  <button className="w-full mt-4 py-8 border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center text-stone-300 hover:text-[#B8860B] hover:border-[#B8860B] hover:bg-amber-50/10 transition-all group">
                     <Calculator className="w-10 h-10 mb-2 opacity-20 group-hover:opacity-100" />
                     <span className="text-[11px] font-black uppercase tracking-widest">Add Jewellery Item to Redemption List</span>
                  </button>
               </div>
            </div>
         </div>

         {/* Financial Summary - 5 Cols */}
         <div className="xl:col-span-5 space-y-4">
            <div className="workspace-panel shadow-2xl overflow-hidden border-2 border-[#16325C]">
               <div className="p-6 bg-[#16325C] text-white">
                  <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6">Financial Reconciliation</h3>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-blue-100">Redemption Value Pool</span>
                        <span className="font-mono italic">₹{customer.value.toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-blue-100">Itemized Purchase Total</span>
                        <span className="font-mono text-rose-300">₹{subTotal.toLocaleString()}</span>
                     </div>
                     <div className="h-[1px] bg-white/10 my-4" />
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#B8860B]">Settlement Balance</span>
                        <span className={clsx(
                           "text-2xl font-black italic tracking-tighter",
                           remainingValue >= 0 ? "text-emerald-400" : "text-rose-400"
                        )}>
                           ₹{remainingValue.toLocaleString()}
                        </span>
                     </div>
                  </div>
               </div>
               
               <div className="p-8 space-y-6 bg-white">
                  <div className="space-y-4">
                    <p className="text-[11px] font-black text-[#16325C] uppercase tracking-wider mb-2">Final Adjustment Method</p>
                    <div className="grid grid-cols-2 gap-3">
                       <button className="flex flex-col items-center gap-2 p-4 border-2 border-[#D8DDE6] rounded-2xl hover:border-[#B8860B] transition-all bg-gray-50/50">
                          <CreditCard className="w-5 h-5 text-stone-400" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#54698D]">Pay Difference</span>
                       </button>
                       <button className="flex flex-col items-center gap-2 p-4 border-2 border-[#B8860B] rounded-2xl bg-amber-50/50 shadow-inner">
                          <Landmark className="w-5 h-5 text-[#B8860B]" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#B8860B]">Store Credit</span>
                       </button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#F0F0F0]">
                     <button className="w-full btn-primary-fn !bg-[#B8860B] flex items-center justify-center gap-3 !py-4 font-black uppercase text-[12px] tracking-widest shadow-2xl shadow-[#B8860B]/30">
                        <CheckCircle2 className="w-5 h-5" /> Execute Redemption
                     </button>
                     <div className="mt-6 flex items-center justify-center gap-4">
                        <button className="text-[10px] font-black text-[#54698D] uppercase tracking-widest flex items-center gap-2 hover:text-[#16325C]"><Printer className="w-3.5 h-3.5" /> Redemption Slip</button>
                        <div className="h-4 w-[1px] bg-gray-200" />
                        <button className="text-[10px] font-black text-[#54698D] uppercase tracking-widest flex items-center gap-2 hover:text-[#16325C]"><Save className="w-3.5 h-3.5" /> Save Template</button>
                     </div>
                  </div>
               </div>
            </div>

            <div className="workspace-panel p-5 bg-[#F8FAFC]">
               <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                     <Ticket className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h5 className="text-[12px] font-black text-[#16325C] leading-none mb-1">Maturity Voucher Active</h5>
                    <p className="text-[10px] text-[#54698D] font-medium leading-relaxed">
                       Successfully applied **100% Zero Making Charge** waiver as per scheme terms.
                    </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
