import { useState } from 'react'
import { mockUpcomingMaturities } from '../../../mock'
import { 
  ArrowLeft, ShieldCheck, CheckCircle2, ShoppingBag, 
  RotateCcw, FileText, Landmark, Calculator, AlertCircle,
  Gem, ArrowRight, Printer, Save, User
} from 'lucide-react'
import { clsx } from 'clsx'
import { useNavigate } from 'react-router-dom'

export default function MaturityProcessing() {
  const navigate = useNavigate()
  const customer = mockUpcomingMaturities[0]

  return (
    <div className="space-y-4 pb-20">
      {/* Settlement Header */}
      <div className="bg-white border-b border-[#D8DDE6] -mx-4 -mt-4 mb-4 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
             <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 group">
                <ArrowLeft className="w-5 h-5 group-hover:text-[#16325C] transition-colors" />
             </button>
             <div className="w-10 h-10 bg-emerald-600 rounded flex items-center justify-center text-white shadow-lg">
                <ShieldCheck className="w-6 h-6" />
             </div>
             <div>
               <p className="text-[11px] font-bold text-[#54698D] uppercase tracking-wider leading-none mb-1">Authorization Desk</p>
               <h1 className="text-[20px] font-bold text-[#16325C] leading-none">Scheme Settlement Audit</h1>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-tighter">Verified for Settlement</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
         {/* Main Settlement Form - 8 Cols */}
         <div className="xl:col-span-8 space-y-4">
            {/* Customer Summary Panel */}
            <div className="workspace-panel p-6 flex flex-col md:flex-row gap-8 items-center bg-gray-50/30">
               <div className="w-20 h-20 rounded-2xl bg-[#16325C] text-white flex items-center justify-center text-2xl font-black shadow-xl">
                 {customer.customerName[0]}
               </div>
               <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
                 <div><p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Customer</p><p className="font-bold text-[#16325C]">{customer.customerName}</p></div>
                 <div><p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Identity UID</p><p className="font-bold font-mono text-[#54698D]">C001-A-IND</p></div>
                 <div><p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Membership</p><p className="font-bold font-mono text-[#54698D]">{customer.id}</p></div>
                 <div><p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Enrollment</p><p className="font-bold text-[#54698D]">{customer.enrollDate}</p></div>
               </div>
            </div>

            {/* Settlement Worklist */}
            <div className="workspace-panel h-full overflow-hidden">
               <div className="p-4 border-b border-[#D8DDE6] bg-[#F8FAFC]">
                  <h3 className="text-[11px] font-black text-[#16325C] uppercase tracking-wider flex items-center gap-2">
                    <Calculator className="w-4 h-4" /> Final Valuation Ledger
                  </h3>
               </div>
               <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                       <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Eligibility Audit
                       </h4>
                       <div className="space-y-4">
                          <AuditItem label="Total Installments Paid" value="11 / 11" status="success" />
                          <AuditItem label="Grace Period Utilized" value="Zero" status="success" />
                          <AuditItem label="KYC Compliance Status" value="Verified" status="success" />
                          <AuditItem label="Nominee Verification" value="Completed" status="success" />
                       </div>
                    </div>
                    <div className="p-8 bg-gray-50/50 rounded-2xl border border-[#D8DDE6] space-y-8">
                       <div className="space-y-2">
                          <p className="text-[11px] font-black text-stone-400 uppercase tracking-widest">Calculated Balance</p>
                          <p className="text-4xl font-black text-[#16325C] italic tracking-tighter">₹{customer.paidAmount.toLocaleString()}</p>
                       </div>
                       <div className="flex items-center justify-between p-4 bg-[#B8860B]/5 border-2 border-dashed border-[#B8860B]/20 rounded-xl">
                          <div>
                             <p className="text-[10px] font-black text-[#B8860B] uppercase">Loyalty Bonus Applied</p>
                             <p className="text-xl font-black text-[#16325C]">₹{customer.bonus.toLocaleString()}</p>
                          </div>
                          <Gem className="w-8 h-8 text-[#B8860B] opacity-40" />
                       </div>
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center bg-emerald-50 -mx-8 -mb-8 p-8">
                     <div className="flex gap-4 mb-4 md:mb-0">
                        <div className="p-3 bg-white rounded-xl shadow-sm border border-emerald-100">
                           <p className="text-[10px] font-black text-stone-400 uppercase tracking-tighter">Final Maturity Value</p>
                           <p className="text-2xl font-black text-emerald-700 italic">₹{customer.value.toLocaleString()}</p>
                        </div>
                     </div>
                     <div className="flex gap-3">
                        <button 
                          onClick={() => navigate('/maturity/redemption')}
                          className="btn-primary-fn !bg-[#16325C] flex items-center gap-3 !py-4 px-8 font-black uppercase text-[11px] tracking-widest leading-none shadow-xl shadow-[#16325c]/20"
                        >
                           <ShoppingBag className="w-5 h-5" /> Move to Redemption
                        </button>
                        <button 
                          onClick={() => navigate('/maturity/renewal')}
                          className="btn-primary-fn !bg-white border-2 border-[#16325C] !text-[#16325C] flex items-center gap-3 !py-4 px-8 font-black uppercase text-[11px] tracking-widest leading-none"
                        >
                           <RotateCcw className="w-5 h-5" /> Renew Scheme
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Meta Actions - 4 Cols */}
         <div className="xl:col-span-4 space-y-4">
            <div className="workspace-panel p-6 space-y-8">
               <h4 className="text-[11px] font-black text-[#16325C] uppercase tracking-widest border-b border-[#F0F0F0] pb-3">Internal Audit Log</h4>
               <div className="space-y-4">
                  <LogEntry user="Sanjay (Admin)" time="10:30 AM" task="Installment ledger verified" />
                  <LogEntry user="Rahul (Desk)" time="10:45 AM" task="KYC Assets re-scanned" />
                  <LogEntry user="System" time="11:00 AM" task="Bonus points provisioned" />
               </div>
               <div className="space-y-3 pt-4">
                  <button className="w-full py-3 bg-gray-50 border border-[#D8DDE6] rounded text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all text-[#54698D]">
                     <FileText className="w-4 h-4" /> Download Statement
                  </button>
                  <button className="w-full py-3 bg-gray-50 border border-[#D8DDE6] rounded text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all text-[#54698D]">
                     <Printer className="w-4 h-4" /> Print Checklist
                  </button>
               </div>
            </div>

            <div className="workspace-panel p-6 bg-amber-50/50 border-amber-100 flex gap-4">
               <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
               <p className="text-[11px] font-medium text-amber-900 leading-relaxed">
                  <strong>Wait!</strong> This customer has expressed interest in the <i>Bridal Collection 2025</i>. Redemption might be more lucrative for current inventory goals.
               </p>
            </div>
         </div>
      </div>
    </div>
  )
}

function AuditItem({ label, value, status }) {
  return (
    <div className="flex justify-between items-center p-3 bg-white border border-[#D8DDE6] rounded-xl hover:border-emerald-500 transition-colors cursor-default">
       <span className="text-[11px] font-bold text-[#54698D] uppercase tracking-tighter">{label}</span>
       <div className="flex items-center gap-2">
          <span className="text-[11px] font-black text-[#16325C]">{value}</span>
          <CheckCircle2 className={clsx("w-3.5 h-3.5", status ==='success' ? "text-emerald-500" : "text-stone-300")} />
       </div>
    </div>
  )
}

function LogEntry({ user, time, task }) {
  return (
    <div className="flex gap-4 group">
       <div className="w-1.5 h-1.5 rounded-full bg-stone-300 mt-2 group-hover:bg-[#16325C] transition-colors shrink-0" />
       <div>
          <p className="text-[11px] font-medium text-[#16325C] leading-none mb-1">{task}</p>
          <div className="flex items-center gap-2 text-[9px] font-bold text-stone-400 uppercase tracking-tighter">
             <span>{user}</span>
             <span className="w-1 h-1 rounded-full bg-stone-300" />
             <span>{time}</span>
          </div>
       </div>
    </div>
  )
}
