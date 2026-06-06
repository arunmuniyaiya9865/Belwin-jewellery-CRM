import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, Layers, Settings, Gift, ShieldCheck, 
  Eye, Save, X, ChevronRight, CheckCircle2
} from 'lucide-react'
import { clsx } from 'clsx'

const steps = [
  { id: 1, title: 'Identity', icon: Layers },
  { id: 2, title: 'Finance', icon: Settings },
  { id: 3, title: 'Maturity', icon: Gift },
  { id: 4, title: 'Rules', icon: ShieldCheck },
  { id: 5, title: 'Review', icon: Eye },
]

export default function SchemeCreate() {
  const [activeStep, setActiveStep] = useState(1)
  const navigate = useNavigate()

  const handleNext = () => setActiveStep(prev => Math.min(prev + 1, steps.length))
  const handlePrev = () => setActiveStep(prev => Math.max(prev - 1, 1))

  return (
    <div className="max-w-[1000px] mx-auto pb-20">
      {/* Dynamic Breadcrumb for Create */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
           <button onClick={() => navigate(-1)} className="p-1 text-stone-400 hover:text-stone-700 transition-colors"><ArrowLeft className="w-5 h-5" /></button>
           <h1 className="text-[22px] font-bold text-[#16325C]">Create Financial Product</h1>
        </div>
        <button onClick={() => navigate('/schemes/list')} className="p-1 text-stone-400 hover:text-stone-700"><X className="w-5 h-5" /></button>
      </div>

      {/* Financial Stepper */}
      <div className="bg-white border border-[#D8DDE6] rounded shadow-sm p-4 mb-4 flex items-center justify-between">
         {steps.map((step, i) => (
           <div key={step.id} className="flex-1 flex items-center gap-4 group relative">
              <div className={clsx(
                "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black transition-all",
                activeStep === step.id ? "bg-[#0070D2] text-white" : activeStep > step.id ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-400"
              )}>
                {activeStep > step.id ? <CheckCircle2 className="w-4 h-4" /> : step.id}
              </div>
              <div className="hidden md:block">
                 <p className={clsx("text-[10px] font-black uppercase tracking-widest leading-none", activeStep >= step.id ? "text-[#16325C]" : "text-gray-400")}>{step.title}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-[1px] bg-gray-100 mx-4 hidden lg:block" />
              )}
           </div>
         ))}
      </div>

      {/* Workspace Area */}
      <div className="workspace-panel rounded p-10 min-h-[550px] relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {activeStep === 1 && <BasicInfoSection />}
            {activeStep === 2 && <FinancialConfigSection />}
            {activeStep === 3 && <MaturityBenefitsSection />}
            {activeStep === 4 && <EligibilitySection />}
            {activeStep === 5 && <ReviewSection />}
          </motion.div>
        </AnimatePresence>

        {/* Action Controls */}
        <div className="mt-16 flex items-center justify-between border-t border-[#D8DDE6] pt-10">
           <button 
             onClick={handlePrev}
             disabled={activeStep === 1}
             className="btn-action px-10 h-10 disabled:opacity-30"
           >
             Back
           </button>
           
           <div className="flex items-center gap-4">
             <button className="text-[11px] font-black text-[#54698D] uppercase tracking-widest hover:underline px-4">Cancel</button>
             {activeStep === steps.length ? (
               <button onClick={() => navigate('/schemes/list')} className="btn-primary-fn px-12 h-10 shadow-lg shadow-[#0070D2]/20">
                 Publish Financial Product
               </button>
             ) : (
               <button onClick={handleNext} className="btn-primary-fn px-12 h-10 flex items-center gap-2">
                 Proceed to next <ChevronRight className="w-4 h-4" />
               </button>
             )}
           </div>
        </div>
      </div>
    </div>
  )
}

function InputField({ label, placeholder, type = "text" }) {
  return (
    <div className="space-y-1.5 flex-1">
      <label className="text-[10px] font-black text-[#54698D] uppercase tracking-widest ml-0.5">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder}
        className="w-full h-10 px-4 bg-[#F3F5F9] border border-[#D8DDE6]/50 focus:bg-white focus:border-[#0070D2] rounded text-[12px] font-medium outline-none transition-all shadow-sm"
      />
    </div>
  )
}

function BasicInfoSection() {
  return (
    <div className="space-y-8">
       <div>
         <h2 className="text-xl font-bold text-[#16325C]">Scheme Identification</h2>
         <p className="text-[12px] text-[#54698D] mt-1">Define the fundamental classification and code for the scheme.</p>
       </div>
       <div className="grid grid-cols-2 gap-8">
          <InputField label="Scheme Name" placeholder="e.g. Swarna Samruddhi 11+1" />
          <InputField label="Scheme Internal Code" placeholder="SC-SR-11" />
       </div>
       <div className="space-y-1.5 flex-1">
         <label className="text-[10px] font-black text-[#54698D] uppercase tracking-widest ml-0.5">Scheme Classification</label>
         <div className="grid grid-cols-4 gap-4">
            {['Monthly', 'Weekly', 'Gold Saving', 'Festival'].map(type => (
              <button key={type} className="h-12 border border-[#D8DDE6] rounded text-[11px] font-bold text-[#16325C] hover:border-[#0070D2] hover:bg-[#F3F5F9] transition-all bg-white">{type}</button>
            ))}
         </div>
       </div>
       <div className="space-y-1.5">
          <label className="text-[10px] font-black text-[#54698D] uppercase tracking-widest ml-0.5">Description & Objective</label>
          <textarea className="w-full min-h-[80px] p-4 bg-[#F3F5F9] border border-[#D8DDE6]/50 rounded text-[12px] outline-none" placeholder="Provide details on target audience and value proposition..." />
       </div>
    </div>
  )
}

function FinancialConfigSection() {
  return (
    <div className="space-y-8">
       <h2 className="text-xl font-bold text-[#16325C]">Financial Configuration Registry</h2>
       <div className="grid grid-cols-2 gap-8">
          <InputField label="Duration (Months/Weeks)" placeholder="e.g. 11" type="number" />
          <InputField label="Installment Amount (₹)" placeholder="e.g. 5000" type="number" />
       </div>
       <div className="grid grid-cols-3 gap-6">
          <InputField label="Bonus Percentage (%)" placeholder="e.g. 100" />
          <InputField label="Joining Fee (One-time)" placeholder="₹500" />
          <InputField label="Late Payment Penalty (₹)" placeholder="₹100/day" />
       </div>
       <div className="p-4 bg-blue-50 border border-blue-100 rounded text-[11px] font-medium text-[#0070D2] flex gap-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Note: Monthly collection targets will be automatically calculated based on the investment cap.</span>
       </div>
    </div>
  )
}

function MaturityBenefitsSection() {
  return (
    <div className="space-y-8">
       <h2 className="text-xl font-bold text-[#16325C]">Maturity Performance Rules</h2>
       <div className="space-y-4">
          {[
            { label: 'Gold Bonus (Free g)', desc: 'Add fixed gold grams at end of tenure.' },
            { label: 'Making Charge Waiver (%)', desc: 'Discount on jewellery making charges upon redemption.' },
            { label: 'Festival Sweepstake', desc: 'Auto-enroll in lucky draws during maturity Month.' }
          ].map((r, i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-[#D8DDE6] rounded bg-white hover:bg-[#F3F5F9] transition-all cursor-pointer group">
               <div className="flex gap-4 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0070D2]" />
                  <div>
                    <p className="text-[12px] font-black text-[#16325C]">{r.label}</p>
                    <p className="text-[10px] text-[#54698D]">{r.desc}</p>
                  </div>
               </div>
               <div className="w-10 h-6 bg-gray-200 rounded-full relative shadow-inner">
                  <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm" />
               </div>
            </div>
          ))}
       </div>
    </div>
  )
}

function EligibilitySection() {
  return (
    <div className="space-y-8">
       <h2 className="text-xl font-bold text-[#16325C]">Compliance & Eligibility Constraints</h2>
       <div className="grid grid-cols-2 gap-8">
          <InputField label="Min Age Constraint" placeholder="18" />
          <InputField label="Max Age Constraint" placeholder="75" />
       </div>
       <div className="grid grid-cols-2 gap-8">
          <InputField label="Member Cap Per Branch" placeholder="e.g. 500" />
          <div className="space-y-1.5 flex-1">
            <label className="text-[10px] font-black text-[#54698D] uppercase tracking-widest ml-0.5">KYC Requirements</label>
            <div className="flex gap-2">
               {['PAN Required', 'Aadhaar Mandatory', 'Nominee Form'].map(tag => (
                 <span key={tag} className="px-3 py-1 bg-[#F3F5F9] text-[#16325C] text-[10px] font-bold rounded-lg border border-[#D8DDE6]">{tag}</span>
               ))}
            </div>
          </div>
       </div>
    </div>
  )
}

function ReviewSection() {
  return (
    <div className="text-center py-10">
       <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Eye className="w-10 h-10" />
       </div>
       <h3 className="text-2xl font-black text-[#16325C]">Financial Product Ready</h3>
       <p className="text-[12px] text-[#54698D] mt-2 max-w-sm mx-auto">Review the summary. Once published, the scheme will be available for branch enrollment immediately.</p>
       <div className="mt-10 max-w-md mx-auto grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded text-left border border-[#D8DDE6]">
             <p className="text-[9px] font-black text-stone-400 uppercase">Est. Portfolio Yield</p>
             <p className="text-lg font-black text-[#16325C]">12.5% Per Annum</p>
          </div>
          <div className="bg-gray-50 p-4 rounded text-left border border-[#D8DDE6]">
             <p className="text-[9px] font-black text-stone-400 uppercase">Operational Status</p>
             <p className="text-lg font-black text-emerald-600">Compliant</p>
          </div>
       </div>
    </div>
  )
}
