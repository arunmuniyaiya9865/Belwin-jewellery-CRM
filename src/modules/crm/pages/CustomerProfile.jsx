import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mockCustomers, mockPurchases, mockPayments, mockMemberships, mockTimeline } from '../../../mock'
import { 
  ArrowLeft, Edit3, PlusCircle, CreditCard, FileText, 
  User, Layers, ShoppingBag, Receipt, Star, FileSearch, 
  MapPin, Phone, Mail, Calendar, PhoneCall, MessageCircle, MoreHorizontal,
  ChevronRight, BadgeInfo, CheckCircle2, AlertCircle, History, FileDown
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'

const tabItems = [
  { id: 'overview', label: 'Activity Feed', icon: History },
  { id: 'schemes', label: 'Active Schemes', icon: Layers },
  { id: 'purchases', label: 'Purchase Ledger', icon: ShoppingBag },
  { id: 'payments', label: 'Transaction history', icon: Receipt },
  { id: 'loyalty', label: 'Reward Points', icon: Star },
  { id: 'documents', label: 'KYC Vault', icon: FileSearch },
]

export default function CustomerProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  
  const customer = mockCustomers.find(c => c.id === id) || mockCustomers[0]

  return (
    <div className="space-y-4 pb-20">
      {/* Salesforce Record Header */}
      <div className="bg-white border border-[#D8DDE6] rounded shadow-sm">
        <div className="p-4 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 bg-[#54698D] rounded text-white flex items-center justify-center shadow-lg border-2 border-white group relative overflow-hidden">
                <span className="text-xl font-bold leading-none">{customer.name.split(' ').map(n => n[0]).join('')}</span>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-primary" />
             </div>
             <div>
                <p className="text-[11px] font-bold text-[#54698D] uppercase tracking-wider mb-1">Customer Service Center</p>
                <h1 className="text-[22px] font-bold text-[#16325C] leading-none mb-1">{customer.name}</h1>
                <div className="flex items-center gap-4 text-[12px] font-medium text-[#54698D]">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> {id} • Active</span>
                  <span>{customer.branch} Terminal</span>
                </div>
             </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="btn-action flex items-center gap-2"><PlusCircle className="w-3.5 h-3.5" /> Enroll Scheme</button>
            <button className="btn-action flex items-center gap-2"><CreditCard className="w-3.5 h-3.5" /> Add Receipt</button>
            <button className="btn-action flex items-center gap-2"><Download className="w-3.5 h-3.5" /> Statement</button>
            <button className="btn-primary-fn px-8">Process maturity</button>
          </div>
        </div>

        {/* Highlight Stats Bar */}
        <div className="bg-gray-50/50 border-t border-[#D8DDE6] grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 divide-x divide-[#D8DDE6]">
           {[
             { label: 'Total Value', value: '₹2,24,200', color: 'text-[#16325C]' },
             { label: 'Outstanding', value: '₹15,000', color: 'text-rose-600' },
             { label: 'Loyalty Tier', value: customer.tier, color: 'text-amber-600' },
             { label: 'Member Since', value: '15 Jan 25', color: 'text-[#54698D]' },
             { label: 'Last Receipt', value: '21 May 25', color: 'text-[#54698D]' },
             { label: 'Credit Limit', value: '₹5.0 L', color: 'text-emerald-600' },
           ].map(stat => (
             <div key={stat.label} className="px-5 py-2.5">
               <p className="text-[9px] font-bold text-[#54698D] uppercase tracking-tighter mb-0.5">{stat.label}</p>
               <p className={clsx("text-[13px] font-black truncate", stat.color)}>{stat.value}</p>
             </div>
           ))}
        </div>
      </div>

      {/* 3-Column Salesforce Workspace */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
        
        {/* Left Column - Record Details (3 Cols) */}
        <div className="xl:col-span-3 space-y-4">
           <div className="workspace-panel rounded">
             <div className="p-3 border-b border-[#D8DDE6] bg-gray-50/50 flex items-center justify-between">
                <h3 className="text-[11px] font-black text-[#16325C] uppercase tracking-wider">Communication Details</h3>
                <button className="text-[10px] font-bold text-[#0070D2] uppercase">Edit</button>
             </div>
             <div className="p-4 space-y-5">
                {[
                  { icon: Phone, label: 'Mobile', value: customer.phone },
                  { icon: Mail, label: 'Email', value: customer.email },
                  { icon: MapPin, label: 'Address', value: 'Block 12, Sector 4, Indiranagar' },
                  { icon: BadgeInfo, label: 'PAN Identity', value: 'ABCDE1234F' },
                ].map(item => (
                  <div key={item.label}>
                    <p className="text-[10px] font-bold text-[#54698D] uppercase tracking-tighter mb-1">{item.label}</p>
                    <div className="flex items-center gap-2 text-[12px] font-bold text-[#16325C]">
                      <item.icon className="w-3.5 h-3.5 text-stone-300" />
                      {item.value}
                    </div>
                  </div>
                ))}
             </div>
           </div>

           <div className="workspace-panel rounded p-4 bg-[#001639] text-white">
             <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">Quick Interactions</h3>
             <div className="space-y-2">
                <button className="w-full py-2.5 bg-white/5 border border-white/10 rounded flex items-center justify-center gap-2 text-[11px] font-bold uppercase transition-all hover:bg-white/10">
                   <PhoneCall className="w-3.5 h-3.5 text-emerald-400" /> Dial Customer
                </button>
                <button className="w-full py-2.5 bg-white/5 border border-white/10 rounded flex items-center justify-center gap-2 text-[11px] font-bold uppercase transition-all hover:bg-white/10">
                   <MessageCircle className="w-3.5 h-3.5 text-primary" /> WhatsApp
                </button>
             </div>
           </div>
        </div>

        {/* Center Column - Main Activity (6 Cols) */}
        <div className="xl:col-span-6 space-y-4">
           {/* Custom Tab Navigation */}
           <div className="bg-white border border-[#D8DDE6] rounded overflow-hidden flex divide-x divide-[#D8DDE6]">
             {tabItems.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    "flex-1 py-3 text-[11px] font-black uppercase tracking-widest transition-all relative",
                    activeTab === tab.id ? "bg-white text-[#0070D2]" : "bg-gray-50/50 text-[#54698D] hover:bg-gray-100"
                  )}
                >
                  {activeTab === tab.id && <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#0070D2]" />}
                  {tab.label.split(' ')[0]}
                </button>
             ))}
           </div>

           <div className="workspace-panel rounded min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="p-6"
                >
                  {activeTab === 'overview' && <ActivityFeed />}
                  {activeTab === 'schemes' && <FinanceGrid title="Active Enrolments" data={mockMemberships.filter(m => m.customerId === id)} />}
                  {activeTab === 'purchases' && <FinanceGrid title="Invoice Ledger" data={mockPurchases} />}
                  {activeTab === 'payments' && <FinanceGrid title="Receipt Registry" data={mockPayments} />}
                  {activeTab === 'loyalty' && <LoyaltyWorkspace customer={customer} />}
                </motion.div>
              </AnimatePresence>
           </div>
        </div>

        {/* Right Column - Intelligence & Upcoming (3 Cols) */}
        <div className="xl:col-span-3 space-y-4">
           <div className="workspace-panel rounded">
             <div className="p-3 border-b border-[#D8DDE6] bg-gray-50/50">
               <h3 className="text-[11px] font-black text-[#16325C] uppercase tracking-wider">Intelligence & Insights</h3>
             </div>
             <div className="p-4 space-y-4">
                <div className="flex gap-3">
                  <div className="p-2 bg-orange-50 text-orange-600 rounded shrink-0">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-[12px] font-black text-[#16325C]">High Churn Risk</h5>
                    <p className="text-[11px] text-[#54698D] mt-0.5">Missed last 2 installments. Recommend immediate callback.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded shrink-0">
                    <Star className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-[12px] font-black text-[#16325C]">Upsell Potential</h5>
                    <p className="text-[11px] text-[#54698D] mt-0.5">Gold savings maturing next month. Pitch new Bridal Collection.</p>
                  </div>
                </div>
             </div>
           </div>

           <div className="workspace-panel rounded">
              <div className="p-3 border-b border-[#D8DDE6] bg-gray-50/50 flex justify-between items-center">
                 <h3 className="text-[11px] font-black text-[#16325C] uppercase tracking-wider">Related Tasks</h3>
                 <button className="text-[10px] font-bold text-[#0070D2] uppercase">New</button>
              </div>
              <div className="divide-y divide-[#F0F0F0]">
                 {[
                   { task: 'Maturity Call', date: 'Tomorrow' },
                   { task: 'KYC Update', date: 'Done', color: 'text-emerald-500' },
                   { task: 'Points Redemption', date: '12 June' },
                 ].map((task, i) => (
                   <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors">
                      <span className="text-[12px] font-bold text-[#16325C]">{task.task}</span>
                      <span className={clsx("text-[10px] font-bold uppercase", task.color || "text-[#54698D]")}>{task.date}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </div>
  )
}

function ActivityFeed() {
  return (
    <div className="space-y-6">
       <div className="flex items-center gap-3 mb-8">
          <div className="h-0.5 flex-1 bg-gray-100" />
          <span className="text-[10px] font-black text-[#54698D] uppercase tracking-widest px-4">Timeline Feed</span>
          <div className="h-0.5 flex-1 bg-gray-100" />
       </div>
       
       <div className="space-y-8 relative pl-10">
          <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-[#D8DDE6]" />
          {mockTimeline.map((item, i) => (
            <div key={i} className="relative group">
               <div className={clsx(
                 "absolute -left-10 w-9 h-9 rounded-full flex items-center justify-center border-4 border-white shadow shadow-[#D8DDE6] transition-transform group-hover:scale-110",
                 item.type === 'purchase' ? 'bg-[#0070D2] text-white' : 'bg-emerald-500 text-white'
               )}>
                 {item.type === 'purchase' ? <ShoppingBag className="w-4 h-4" /> : <Receipt className="w-4 h-4" />}
               </div>
               <div className="pt-1">
                 <div className="flex items-center justify-between mb-1">
                   <h4 className="text-[13px] font-black text-[#16325C]">{item.title}</h4>
                   <p className="text-[10px] font-bold text-[#54698D] uppercase">{item.date}</p>
                 </div>
                 <p className="text-[12px] text-[#54698D] font-medium leading-normal">{item.desc}</p>
                 {item.amount && <p className="mt-2 text-[12px] font-black text-[#0070D2]">{item.amount}</p>}
               </div>
            </div>
          ))}
       </div>
    </div>
  )
}

function FinanceGrid({ title, data }) {
  return (
    <div className="overflow-hidden">
       <h3 className="text-[14px] font-black text-[#16325C] uppercase tracking-tight mb-6">{title}</h3>
       <table className="enterprise-table !border !border-[#D8DDE6]">
          <thead>
            <tr>
              {Object.keys(data[0] || {}).filter(k => k !== 'customerId').map(key => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
             {data.map((row, i) => (
               <tr key={i} className="hover:bg-[#F3F5F9] transition-colors">
                  {Object.entries(row).filter(([k]) => k !== 'customerId').map(([k, v], j) => (
                    <td key={j} className={clsx(k === 'amount' || k === 'monthlyAmount' ? 'font-mono font-bold' : '')}>
                      {typeof v === 'number' && k.toLowerCase().includes('amount') ? `₹${v.toLocaleString()}` : v}
                    </td>
                  ))}
               </tr>
             ))}
          </tbody>
       </table>
    </div>
  )
}

function LoyaltyWorkspace({ customer }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       <div className="p-8 bg-amber-50/50 border border-amber-100 rounded flex flex-col items-center text-center">
          <Star className="w-12 h-12 text-amber-500 fill-amber-500 mb-4" />
          <h3 className="text-xl font-black text-[#16325C] leading-none mb-2">{customer.tier} Reward Cluster</h3>
          <p className="text-[11px] font-bold text-amber-900 uppercase tracking-widest">{customer.loyaltyPoints} Active Points</p>
          <div className="w-full mt-10 p-5 bg-white border border-amber-100 rounded space-y-4">
             <div className="flex justify-between items-center text-[11px] font-black uppercase text-[#16325C]">
                <span>Exchange valuation</span>
                <span className="text-amber-600">₹{(customer.loyaltyPoints * 0.5)}</span>
             </div>
             <button className="w-full py-2.5 bg-[#16325C] text-white rounded font-bold text-[10px] uppercase tracking-widest">Redeem In-Store</button>
          </div>
       </div>
       <div className="space-y-4">
          <h4 className="text-[11px] font-black text-[#16325C] uppercase tracking-wider mb-2">Tier Benefits Checklist</h4>
          {[
            'Priority Gold Verification',
            'Zero Redemption Processing Fee',
            'Exclusive Anniversary Gift Registry',
            'Early Access to New Collections'
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-3 text-[12px] font-medium text-[#54698D] p-3 bg-gray-50/50 border border-[#D8DDE6] rounded">
               <CheckCircle2 className="w-4 h-4 text-emerald-500" />
               {b}
            </div>
          ))}
       </div>
    </div>
  )
}
