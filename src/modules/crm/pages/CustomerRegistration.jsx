import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, User, IdCard, MapPin, 
  Users, Heart, Camera, CheckCircle2, ChevronRight, Save, Gem
} from 'lucide-react'
import { clsx } from 'clsx'

const steps = [
  { id: 1, title: 'Identity', icon: User },
  { id: 2, title: 'Documents', icon: IdCard },
  { id: 3, title: 'Location', icon: MapPin },
  { id: 4, title: 'Relatives', icon: Users },
  { id: 5, title: 'Personal', icon: Heart },
]

export default function CustomerRegistration() {
  const [activeStep, setActiveStep] = useState(1)
  const navigate = useNavigate()

  const handleNext = () => setActiveStep(prev => Math.min(prev + 1, 5))
  const handlePrev = () => setActiveStep(prev => Math.max(prev - 1, 1))

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-10">
        <button 
          onClick={() => navigate(-1)}
          className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-500 hover:text-gray-900 transition-all shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-heading font-black text-gray-900 tracking-tight">Onboard New Customer</h1>
          <p className="text-gray-500 font-medium">Follow the steps to complete the 360-degree registration profile.</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm mb-8">
        <div className="flex items-center justify-between relative">
          {/* Progress Bar Background */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-50 -translate-y-1/2" />
          {/* Active Progress Bar */}
          <div 
            className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 transition-all duration-500" 
            style={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div 
                className={clsx(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 border-4",
                  activeStep === step.id 
                    ? "bg-primary text-white border-white shadow-xl shadow-primary/20 scale-110" 
                    : activeStep > step.id 
                    ? "bg-emerald-500 text-white border-white shadow-lg" 
                    : "bg-white text-gray-300 border-gray-50"
                )}
              >
                {activeStep > step.id ? <CheckCircle2 className="w-6 h-6" /> : <step.icon className="w-6 h-6" />}
              </div>
              <p className={clsx(
                "mt-3 text-[10px] font-black uppercase tracking-widest",
                activeStep >= step.id ? "text-gray-900" : "text-gray-300"
              )}>
                {step.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Form Area */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-10 min-h-[500px] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
          <Gem className="w-64 h-64 text-primary" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {activeStep === 1 && <IdentitySection />}
            {activeStep === 2 && <DocumentSection />}
            {activeStep === 3 && <LocationSection />}
            {activeStep === 4 && <RelativesSection />}
            {activeStep === 5 && <ReviewSection />}
          </motion.div>
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="mt-16 flex items-center justify-between border-t border-gray-50 pt-10">
          <button 
            onClick={handlePrev}
            disabled={activeStep === 1}
            className="px-8 py-4 bg-gray-50 rounded-2xl text-sm font-bold text-gray-500 hover:bg-gray-100 transition-all disabled:opacity-30 uppercase tracking-widest"
          >
            Previous
          </button>
          
          {activeStep === 5 ? (
            <button 
              onClick={() => navigate('/crm/customers')}
              className="btn-primary flex items-center gap-2 !py-4 !px-12 rounded-2xl shadow-xl shadow-primary/30"
            >
              <Save className="w-5 h-5" />
              Complete Onboarding
            </button>
          ) : (
            <button 
              onClick={handleNext}
              className="btn-primary flex items-center gap-2 !py-4 !px-12 rounded-2xl shadow-xl shadow-primary/30"
            >
              Next Step
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function IdentitySection() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-6">
        <div className="w-32 h-32 rounded-[32px] bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 group cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
          <Camera className="w-8 h-8 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Add Photo</span>
        </div>
        <div className="flex-1 space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Basic Background</h3>
          <p className="text-sm text-gray-500 font-medium">Please provide the legal name as per government records.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Full Business Name" placeholder="e.g. Alok Sharma" />
        <InputField label="Primary Mobile" placeholder="+91 XXXX-XXXXXX" />
        <InputField label="Email Address" placeholder="alok@example.com" />
        <div className="space-y-2">
          <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Gender</label>
          <div className="flex gap-4">
            {['Male', 'Female', 'Other'].map(g => (
              <button key={g} className={clsx("flex-1 py-4 border rounded-2xl text-sm font-bold transition-all", g === 'Male' ? "bg-primary/5 border-primary text-primary" : "bg-white border-gray-100 text-gray-400 hover:border-gray-300")}>
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function DocumentSection() {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-black text-gray-900">Regulatory Documents</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <InputField label="Aadhaar Number" placeholder="XXXX XXXX XXXX XXXX" />
        <InputField label="PAN Number" placeholder="ABCDE1234F" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[ 'Upload Aadhaar (Front)', 'Upload Aadhaar (Back)', 'Upload PAN Card' ].map(doc => (
          <div key={doc} className="p-8 border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center text-gray-300 bg-gray-50/50 hover:bg-white hover:border-primary transition-all group">
            <IdCard className="w-10 h-10 mb-3 opacity-20 group-hover:text-primary transition-colors" />
            <p className="text-xs font-bold uppercase tracking-widest">{doc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function LocationSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-black text-gray-900">Residential Address</h3>
      <div className="space-y-6">
        <InputField label="Street Address / Area" placeholder="House No, Apartment name, Street..." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="City" placeholder="City" />
          <InputField label="District" placeholder="District" />
          <InputField label="State" placeholder="State" />
          <InputField label="Pincode" placeholder="600001" />
        </div>
      </div>
    </div>
  )
}

function RelativesSection() {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-black text-gray-900">Nominee & Family</h3>
      <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100 space-y-6">
        <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest">Primary Nominee</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Nominee Name" placeholder="Legal Name" />
          <InputField label="Relationship" placeholder="Spouse, Child, Parent..." />
          <InputField label="Contact Number" placeholder="Mobile Number" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Spouse Name" placeholder="Optional" />
        <InputField label="Occupation" placeholder="Business, Service, etc." />
      </div>
    </div>
  )
}

function ReviewSection() {
  return (
    <div className="text-center py-10">
      <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
        <CheckCircle2 className="w-12 h-12" />
      </div>
      <h3 className="text-3xl font-black text-gray-900 leading-tight">All Set for Verification?</h3>
      <p className="text-gray-500 font-medium max-w-sm mx-auto mt-4">Review all the information provided carefully. Once submitted, the system will initiate the KYC audit.</p>
      
      <div className="mt-12 grid grid-cols-2 gap-4 max-w-md mx-auto">
        <div className="p-4 bg-gray-50 rounded-2xl text-left border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Fields</p>
          <p className="text-xl font-black text-gray-900">24/24</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl text-left border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Attachments</p>
          <p className="text-xl font-black text-gray-900">4 Assets</p>
        </div>
      </div>
    </div>
  )
}

function InputField({ label, placeholder }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">{label}</label>
      <input 
        type="text" 
        placeholder={placeholder}
        className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none text-gray-900 font-medium text-sm shadow-sm"
      />
    </div>
  )
}
