import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { mockMemberships, mockInstallments } from '../../../mock'
import { 
  ArrowLeft, Wallet, Receipt, FileText, CheckCircle2, 
  MapPin, Phone, History, Gift, ShieldEllipsis, 
  ChevronRight, MoreHorizontal, Download, Printer,
  Layers, User, AlertCircle, Clock, CheckCircle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'

const tabs = [
  { id: 'overview', label: 'Operational Overview', icon: History },
  { id: 'installments', label: 'Installment Timeline', icon: Clock },
  { id: 'receipts', label: 'Receipt History', icon: Receipt },
  { id: 'documents', label: 'Agreement Vault', icon: FileText },
]

export default function MembershipDetail() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('overview')
  
  const m = mockMemberships[0] // Mocking the first membership for now

  return (
    <div className="space-y-4 pb-20">
      {/* Salesforce Record Header */}
      <div className="bg-white border border-[#D8DDE6] rounded shadow-sm">
        <div className="p-4 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 bg-[#FF8C00] rounded text-white flex items-center justify-center shadow-lg border-2 border-white group relative overflow-hidden">
                <Layers className="w-8 h-8" />
                <div className="absolute inset-x-0 bottom-0 h-1 bg-white/30" />
             </div>
             <div>
                <p className="text-[11px] font-bold text-[#54698D] uppercase tracking-wider mb-1">Membership 360 Account</p>
                <div className="flex items-center gap-3">
                   <h1 className="text-[22px] font-bold text-[#16325C] leading-none">{m.id}</h1>
                   <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded text-[10px] font-bold uppercase">{m.status}</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-medium text-[#54698D] mt-1">
                  <Link to={`/crm/customers/${m.customerId}`} className="text-[#0070D2] font-black hover:underline flex items-center gap-1">
                    <User className="w-3.5 h-3.5" /> {m.customerName}
                  </Link>
                  <span>• {m.schemeName}</span>
                </div>
             </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="btn-primary-fn flex items-center gap-2 !bg-emerald-600 !hover:bg-emerald-700">
              <Wallet className="w-4 h-4" /> Collect Installment
            </button>
            <button className="btn-action flex items-center gap-2"><Printer className="w-3.5 h-3.5" /> Passbook</button>
            <button className="btn-action flex items-center gap-2 text-rose-600 border-rose-100 hover:bg-rose-50">Close Account</button>
          </div>
        </div>

        {/* Account Milestone Bar */}
        <div className="bg-gray-50/50 border-t border-[#D8DDE6] p-4">
           <div className="flex items-center justify-between text-[10px] font-black uppercase text-[#54698D] mb-2 tracking-widest">
              <span>Maturity Pipeline Progress</span>
              <span className="text-[#16325C]">{m.progress}% Completed</span>
           </div>
           <div className="h-2 bg-white border border-[#D8DDE6] rounded-full overflow-hidden">
             <div 
               className="h-full bg-[#0070D2] transition-all duration-1000 shadow-[0_0_10px_rgba(0,112,210,0.4)]" 
               style={{ width: `${m.progress}%` }} 
             />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
        
        {/* Left Stats Column (3 Cols) */}
        <div className="xl:col-span-3 space-y-4">
           <div className="workspace-panel rounded">
              <div className="p-3 border-b border-[#D8DDE6] bg-gray-50/50">
                <h3 className="text-[11px] font-black text-[#16325C] uppercase tracking-wider">Account Balance</h3>
              </div>
              <div className="p-5 space-y-6">
                 <div>
                    <p className="text-[10px] font-black text-[#54698D] uppercase mb-1">Total Contributions</p>
                    <p className="text-2xl font-black text-[#16325C] font-mono italic">₹{m.paidAmount.toLocaleString()}</p>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                      <p className="text-[9px] font-black text-stone-400 uppercase mb-1">Bonus Accrued</p>
                      <p className="text-base font-black text-emerald-600 font-mono">₹{m.bonus.toLocaleString()}</p>
                   </div>
                   <div>
                      <p className="text-[9px] font-black text-stone-400 uppercase mb-1">Pending Amount</p>
                      <p className="text-base font-black text-rose-500 font-mono">₹{m.pendingAmount.toLocaleString()}</p>
                   </div>
                 </div>
              </div>
           </div>

           <div className="workspace-panel rounded p-5">
              <h3 className="text-[11px] font-black text-[#16325C] uppercase border-b border-[#F0F0F0] pb-3 mb-4">Dates Ledger</h3>
              <div className="space-y-4">
                 {[
                   { label: 'Enrollment', value: m.enrollmentDate },
                   { label: 'Next Due Date', value: '20 June 2025', color: 'text-rose-600' },
                   { label: 'Maturity Target', value: m.maturityDate },
                 ].map((d, i) => (
                   <div key={i}>
                      <p className="text-[9px] font-black text-stone-400 uppercase mb-1">{d.label}</p>
                      <p className={clsx("text-[12px] font-bold font-mono", d.color || "text-[#16325C]")}>{d.value}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Center Main Workspace (9 Cols) */}
        <div className="xl:col-span-9 space-y-4">
           <div className="workspace-panel rounded overflow-hidden flex divide-x divide-[#D8DDE6] border-b-0">
             {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    "flex-1 py-3 text-[11px] font-black uppercase tracking-widest transition-all relative border-b",
                    activeTab === tab.id ? "bg-white text-[#0070D2] border-b-transparent" : "bg-gray-50/50 text-[#54698D] hover:bg-gray-100 border-[#D8DDE6]"
                  )}
                >
                  {activeTab === tab.id && <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#0070D2]" />}
                   <span className="flex items-center justify-center gap-2"><tab.icon className="w-3.5 h-3.5" /> {tab.label}</span>
                </button>
             ))}
           </div>

           <div className="workspace-panel rounded -mt-[1px] min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="p-6"
                >
                  {activeTab === 'overview' && <MembershipOverview m={m} />}
                  {activeTab === 'installments' && <InstallmentTable />}
                  {activeTab === 'receipts' && <ReceiptTable />}
                </motion.div>
              </AnimatePresence>
           </div>
        </div>

      </div>
    </div>
  )
}

function MembershipOverview({ m }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
       <div className="space-y-8">
          <h4 className="text-[13px] font-black text-[#16325C] uppercase tracking-tight">Tenure Milestone Tracker</h4>
          <div className="grid grid-cols-6 gap-3">
             {[...Array(12)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                   <div className={clsx(
                     "w-10 h-10 rounded border-2 flex items-center justify-center text-[11px] font-black transition-all",
                     i < 5 ? "bg-emerald-50 border-emerald-500 text-emerald-600 shadow-sm" : 
                     i === 5 ? "bg-amber-50 border-amber-500 text-amber-600 animate-pulse" : 
                     "bg-white border-gray-100 text-stone-300"
                   )}>
                      {i < 5 ? <CheckCircle className="w-5 h-5" /> : i + 1}
                   </div>
                   <span className="text-[8px] font-black text-stone-400 uppercase">M{i+1}</span>
                </div>
             ))}
          </div>
          <div className="mt-8 p-6 bg-[#001639] text-white rounded relative overflow-hidden">
             <div className="relative z-10">
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Projected Maturity Value</p>
                <p className="text-3xl font-black italic tracking-tighter">₹{(m.paidAmount + m.pendingAmount + m.bonus).toLocaleString()}</p>
                <div className="mt-4 flex items-center gap-4 text-[10px] font-black uppercase text-blue-200">
                   <span className="flex items-center gap-1"><Gift className="w-3 h-3" /> Includes 1 Month Bonus</span>
                   <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Zero Wastage Waiver</span>
                </div>
             </div>
             <ShieldEllipsis className="absolute top-1/2 -translate-y-1/2 -right-4 w-32 h-32 opacity-10 rotate-12" />
          </div>
       </div>

       <div className="space-y-6">
          <h4 className="text-[13px] font-black text-[#16325C] uppercase tracking-tight">Internal Compliance Flags</h4>
          <div className="space-y-3">
             <FlagItem status="Passed" label="KYC Document Verification" />
             <FlagItem status="Passed" label="Mobile Number OTP Validation" />
             <FlagItem status="Warning" label="Late Payment History (Mar 25)" />
             <FlagItem status="Passed" label="Signature Mapped to UID" />
          </div>
          <div className="pt-6 border-t border-[#F0F0F0]">
             <h4 className="text-[11px] font-black text-[#16325C] uppercase mb-4">Operational Staff Notes</h4>
             <div className="p-4 bg-yellow-50/50 border border-yellow-100 rounded text-[11px] text-yellow-800 italic leading-relaxed">
               "Member requested home collection service for next 2 installments due to travel. Coordinate with recovery agent."
             </div>
             <button className="text-[10px] font-bold text-[#0070D2] uppercase mt-3 hover:underline">+ Add Staff Log</button>
          </div>
       </div>
    </div>
  )
}

function FlagItem({ status, label }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white border border-[#D8DDE6] rounded">
       {status === 'Passed' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <AlertCircle className="w-3.5 h-3.5 text-amber-500" />}
       <span className="text-[11px] font-bold text-[#16325C] flex-1">{label}</span>
       <span className={clsx("text-[9px] font-black uppercase tracking-tighter", status === 'Passed' ? 'text-emerald-600' : 'text-amber-600')}>{status}</span>
    </div>
  )
}

function InstallmentTable() {
  return (
    <div className="overflow-x-auto">
      <table className="enterprise-table">
        <thead>
          <tr>
            <th>Tenure Month</th>
            <th>Due Date</th>
            <th>Installment Amount</th>
            <th>Paid Date</th>
            <th>Status</th>
            <th className="text-right">Receipt #</th>
          </tr>
        </thead>
        <tbody>
           {mockInstallments.map((ins, i) => (
             <tr key={i} className="hover:bg-gray-50/50">
               <td className="font-bold text-[#16325C]">{ins.month}</td>
               <td className="font-mono text-[11px]">{ins.dueDate}</td>
               <td className="font-mono font-bold">₹{ins.amount.toLocaleString()}</td>
               <td className="text-[#54698D]">{ins.paidDate}</td>
               <td>
                  <span className={clsx(
                    "status-badge-fn",
                    ins.status === 'Paid' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-amber-50 text-amber-700 border-amber-100"
                  )}>
                    {ins.status}
                  </span>
               </td>
               <td className="text-right font-mono text-[#0070D2] font-black">{ins.receipt}</td>
             </tr>
           ))}
        </tbody>
      </table>
    </div>
  )
}

function ReceiptTable() {
  return (
    <div className="space-y-4">
       <div className="flex justify-between items-center bg-gray-50 p-3 rounded border border-[#D8DDE6]">
          <span className="text-[11px] font-black text-[#54698D] uppercase">Verified Transactions: 05 Items</span>
          <button className="btn-action flex items-center gap-2"><Download className="w-3.5 h-3.5" /> Download Ledger</button>
       </div>
       <table className="enterprise-table">
          <thead>
            <tr>
              <th>Receipt ID</th>
              <th>Settlement Date</th>
              <th>Operational Month</th>
              <th>Mode</th>
              <th className="text-right">Amount Settled</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
             {mockInstallments.filter(i => i.status === 'Paid').map((ins, i) => (
               <tr key={i}>
                 <td className="font-black text-[#0070D2]">{ins.receipt}</td>
                 <td className="font-medium text-[#54698D]">{ins.paidDate}</td>
                 <td className="font-bold">{ins.month} FY25</td>
                 <td className="text-[11px] uppercase font-black text-stone-400 italic">Net Banking</td>
                 <td className="text-right font-mono font-black text-[#16325C]">₹{ins.amount.toLocaleString()}</td>
                 <td className="text-right">
                    <button className="text-[#0070D2] font-black text-[10px] uppercase hover:underline">Download PDf</button>
                 </td>
               </tr>
             ))}
          </tbody>
       </table>
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
