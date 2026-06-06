import { useState } from 'react'
import { mockUpcomingMaturities, mockSchemes } from '../../../mock'
import { 
  ArrowLeft, RotateCcw, Gem, Zap, Gift, 
  CheckCircle2, ArrowRight, Save, History,
  ShieldCheck, AlertCircle, FilePlus, Layers
} from 'lucide-react'
import { clsx } from 'clsx'
import { useNavigate } from 'react-router-dom'

export default function RenewalManagement() {
  const navigate = useNavigate()
  const customer = mockUpcomingMaturities[0]
  const [selectedScheme, setSelectedScheme] = useState(mockSchemes[0])

  return (
    <div className="space-y-4 pb-20">
      {/* Renewal Header */}
      <div className="bg-white border-b border-[#D8DDE6] -mx-4 -mt-4 mb-4 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
             <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 group">
                <ArrowLeft className="w-5 h-5 group-hover:text-[#16325C] transition-colors" />
             </button>
             <div className="w-10 h-10 bg-[#16325C] rounded flex items-center justify-center text-white shadow-lg">
                <RotateCcw className="w-6 h-6" />
             </div>
             <div>
               <p className="text-[11px] font-bold text-[#54698D] uppercase tracking-wider leading-none mb-1">Retention Services</p>
               <h1 className="text-[20px] font-bold text-[#16325C] leading-none">Scheme Renewal Desk</h1>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right">
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none mb-1">Reinvestment Pool</p>
                <p className="text-xl font-black text-[#16325C] italic leading-none">₹{customer.value.toLocaleString()}</p>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
         {/* Renewal Options - 8 Cols */}
         <div className="xl:col-span-8 space-y-4">
            <div className="workspace-panel p-8 bg-[#F8FAFC]/50 border-dashed">
               <h3 className="text-[11px] font-black text-[#16325C] uppercase tracking-wider mb-8 flex items-center gap-2">
                 <FilePlus className="w-4 h-4" /> Recommended Renewal Paths
               </h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockSchemes.map((scheme) => (
                    <div 
                      key={scheme.id}
                      onClick={() => setSelectedScheme(scheme)}
                      className={clsx(
                        "p-6 rounded-3xl border-2 transition-all cursor-pointer relative overflow-hidden group",
                        selectedScheme.id === scheme.id 
                          ? "bg-white border-[#16325C] shadow-2xl scale-[1.02] z-10" 
                          : "bg-white/50 border-gray-100 hover:border-[#16325C]/30"
                      )}
                    >
                       <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                             <span className="px-3 py-1 bg-gray-50 rounded-full text-[9px] font-black uppercase tracking-tighter text-[#16325C]">{scheme.type}</span>
                             {selectedScheme.id === scheme.id && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                          </div>
                          <h4 className="text-lg font-black text-[#16325C] mb-2">{scheme.name}</h4>
                          <div className="flex items-end justify-between">
                             <div className="space-y-1">
                                <p className="text-[10px] font-bold text-stone-400 uppercase">Monthly Commitment</p>
                                <p className="text-xl font-black text-[#16325C]">₹{scheme.amount.toLocaleString()}</p>
                             </div>
                             <button className="text-[10px] font-black text-[#0070D2] uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                                View Terms <ArrowRight className="w-3 h-3" />
                             </button>
                          </div>
                       </div>
                       <Layers className="absolute -bottom-4 -right-4 w-24 h-24 opacity-[0.03]" />
                    </div>
                  ))}
               </div>
            </div>

            <div className="workspace-panel p-8">
               <h4 className="text-[11px] font-black text-[#16325C] uppercase tracking-widest mb-6 underline decoration-[#16325C] underline-offset-8">Selected Plan Configuration</h4>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <ConfigItem label="Initial Reinvestment" value={`₹${customer.value.toLocaleString()}`} />
                  <ConfigItem label="Adjusted Monthly" value={`₹${selectedScheme.amount.toLocaleString()}`} />
                  <ConfigItem label="Target Purity" value="22K (916)" />
               </div>
               
               <div className="mt-12 p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex flex-col md:flex-row gap-6 items-center justify-between">
                  <div className="flex gap-4">
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-emerald-100">
                        <Gift className="w-6 h-6 text-emerald-500" />
                     </div>
                     <div>
                        <p className="text-[11px] font-black text-emerald-800 uppercase leading-none mb-1">Renewal Incentive Applied</p>
                        <p className="text-[13px] font-bold text-[#16325C]">Extra 500 Gold Coins on First Installment</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <span className="text-[11px] font-black text-emerald-600 uppercase">Loyalty Tier: {customer.status}</span>
                     <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                  </div>
               </div>
            </div>
         </div>

         {/* Meta Actions - 4 Cols */}
         <div className="xl:col-span-4 space-y-4">
            <div className="workspace-panel p-6 bg-[#00173A] text-white overflow-hidden relative shadow-2xl min-h-[400px]">
               <div className="relative z-10 space-y-10">
                  <div className="space-y-1">
                     <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Retention Logic</h4>
                     <p className="text-xl font-bold tracking-tight">Renewal Executive Workspace</p>
                  </div>

                  <div className="space-y-6">
                     <RetentionTip label="Relationship Age" value="2.5 Years" />
                     <RetentionTip label="Risk of Churn" value="Low" />
                     <RetentionTip label="Conversion Prob." value="High (92%)" />
                  </div>

                  <div className="pt-6 border-t border-white/10">
                     <button className="w-full btn-primary-fn !bg-[#16325C] flex items-center justify-center gap-3 !py-4 font-black uppercase text-[12px] tracking-widest shadow-2xl shadow-[#16325c]/10 border border-white/10">
                        <ShieldCheck className="w-5 h-5 text-emerald-400" /> Confirm Re-Enrollment
                     </button>
                     <p className="text-center mt-6 text-[10px] font-bold text-blue-300 uppercase tracking-widest">Auto-notifies Customer via WhatsApp</p>
                  </div>
               </div>
               <RotateCcw className="absolute -bottom-10 -right-10 w-48 h-48 opacity-[0.03]" />
            </div>

            <div className="workspace-panel p-5 flex items-center justify-center gap-4 border-dashed text-stone-300">
               <History className="w-5 h-5" />
               <span className="text-[10px] font-black uppercase tracking-widest">View Past Commitments</span>
            </div>
         </div>
      </div>
    </div>
  )
}

function ConfigItem({ label, value }) {
  return (
    <div className="space-y-1">
       <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{label}</p>
       <p className="text-xl font-black text-[#16325C] italic">{value}</p>
    </div>
  )
}

function RetentionTip({ label, value }) {
  return (
    <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
       <span className="text-[11px] font-bold text-blue-100 uppercase tracking-widest">{label}</span>
       <span className="text-[12px] font-black text-[#B8860B]">{value}</span>
    </div>
  )
}
