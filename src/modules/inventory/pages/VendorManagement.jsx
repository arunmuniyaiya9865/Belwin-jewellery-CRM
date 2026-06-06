import { useState } from 'react'
import { mockVendors } from '../../../mock'
import { 
  User, Search, Filter, Plus, FileDown, 
  MapPin, Phone, CreditCard, ChevronRight,
  TrendingUp, Calendar, ArrowUpRight, Mail,
  ShieldCheck, Landmark, MoreVertical
} from 'lucide-react'
import { clsx } from 'clsx'

export default function VendorManagement() {
  return (
    <div className="space-y-4 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-[#16325C] tracking-tight">Supplier & Artisan CRM</h1>
          <p className="text-[11px] font-bold text-[#54698D] uppercase tracking-wider mt-1">Master Procurement Registry • Credit Control</p>
        </div>
        <div className="flex items-center gap-2">
           <button className="btn-action flex items-center gap-2 font-black uppercase text-[10px] tracking-widest px-6 shadow-sm"><FileDown className="w-4 h-4" /> Vendor Ledger</button>
           <button className="btn-primary-fn !bg-[#16325C] flex items-center gap-2 px-8"><Plus className="w-4 h-4" /> Register Supplier</button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
         {/* Vendor Directory - 8 Cols */}
         <div className="xl:col-span-8 space-y-4">
            <div className="workspace-panel p-3 shadow-sm border-[#D8DDE6] flex items-center gap-3">
               <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Search by Vendor Name, GST, Code..." className="w-full h-10 pl-10 pr-4 bg-[#F3F5F9] border border-transparent focus:bg-white focus:border-primary/30 rounded-xl text-[11px] outline-none transition-all" />
               </div>
               <button className="p-2.5 bg-gray-50 border border-[#D8DDE6] rounded-xl text-[#54698D] hover:text-[#16325C] transition-all"><Filter className="w-4 h-4" /></button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {mockVendors.map((vendor) => (
                  <div key={vendor.id} className="workspace-panel p-6 hover:border-[#16325C] transition-all cursor-pointer group shadow-sm flex flex-col justify-between">
                     <div className="space-y-4">
                        <div className="flex justify-between items-start">
                           <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-[#16325C] group-hover:bg-[#16325C] group-hover:text-white transition-all shadow-sm">
                              <Landmark className="w-6 h-6" />
                           </div>
                           <div className="text-right">
                              <span className="font-mono font-black text-[#54698D] text-[10px] block mb-1">{vendor.code}</span>
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase tracking-widest leading-none">Active Partner</span>
                           </div>
                        </div>

                        <div className="space-y-1">
                           <h3 className="text-lg font-black text-[#16325C] tracking-tight">{vendor.name}</h3>
                           <div className="flex items-center gap-2 text-[10px] font-bold text-stone-400 uppercase tracking-tighter">
                              <MapPin className="w-3 h-3" /> {vendor.address}
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                           <ContactInfo icon={Phone} label="Contact" val={vendor.contact} />
                           <ContactInfo icon={CreditCard} label="Tax ID" val={vendor.gst} />
                        </div>
                     </div>

                     <div className="mt-8 flex items-center justify-between bg-gray-50/50 p-4 rounded-xl border border-dashed border-gray-100 group-hover:border-[#16325C]/30 transition-all">
                        <div className="space-y-0.5">
                           <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Credit Terms</p>
                           <p className="text-[12px] font-black text-[#16325C]">{vendor.terms}</p>
                        </div>
                        <button className="p-2 hover:bg-white rounded-lg text-[#54698D] transition-colors"><ArrowUpRight className="w-5 h-5" /></button>
                     </div>
                  </div>
               ))}

               <div className="workspace-panel p-6 border-dashed border-2 flex flex-col items-center justify-center text-center opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-stone-300 mb-2">
                     <Plus className="w-6 h-6" />
                  </div>
                  <p className="text-[11px] font-black text-[#54698D] uppercase tracking-widest">Enroll New Supply Partner</p>
               </div>
            </div>
         </div>

         {/* Procurement Intel - 4 Cols */}
         <div className="xl:col-span-4 space-y-4">
            <div className="workspace-panel shadow-2xl bg-[#16325C] text-white p-6 relative overflow-hidden">
               <div className="relative z-10 space-y-10">
                  <div className="space-y-1">
                     <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Partner Performance</h4>
                     <p className="text-xl font-bold tracking-tight">Supply Health Index</p>
                  </div>

                  <div className="space-y-6">
                     <PerfPoint label="Total Procurement (YTD)" val="₹84.2 L" />
                     <PerfPoint label="Reliability Score" val="98.5%" />
                     <PerfPoint label="Lead Time Efficiency" val="+12%" />
                  </div>

                  <div className="pt-6 border-t border-white/10 flex justify-between items-center text-[11px] font-bold italic text-blue-200">
                     <span>Last verified: 04 Jun</span>
                     <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
               </div>
               <TrendingUp className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10" />
            </div>

            <div className="workspace-panel p-6">
               <h4 className="text-[11px] font-black text-[#16325C] uppercase tracking-widest mb-6 border-b border-[#F0F0F0] pb-3">Upcoming Settlements</h4>
               <div className="space-y-4">
                  {[
                    { vendor: 'Bullion Traders Ltd', amount: '₹12.5 L', due: 'In 3 Days' },
                    { vendor: 'Diamond Craft Exports', amount: '₹4.2 L', due: 'Immediate' },
                  ].map((pay, i) => (
                    <div key={i} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer group">
                       <div>
                          <p className="text-[12px] font-bold text-[#16325C] leading-none mb-1">{pay.vendor}</p>
                          <p className="text-[10px] font-black text-[#B8860B]">{pay.amount}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-[9px] font-black uppercase text-stone-400 tracking-tighter mb-1">{pay.due}</p>
                          <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                       </div>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-8 py-3 bg-[#16325C] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#16325C]/20">Go to A/P Ledger</button>
            </div>
         </div>
      </div>
    </div>
  )
}

function ContactInfo({ icon: Icon, label, val }) {
  return (
    <div className="space-y-0.5">
       <span className="text-[9px] font-black text-stone-300 uppercase tracking-widest flex items-center gap-1"><Icon className="w-2.5 h-2.5" /> {label}</span>
       <p className="text-[11px] font-bold text-[#54698D] truncate">{val}</p>
    </div>
  )
}

function PerfPoint({ label, val }) {
  return (
    <div className="flex justify-between items-center text-sm font-bold border-b border-white/5 pb-4 last:border-0 last:pb-0">
       <span className="text-blue-100">{label}</span>
       <span className="text-emerald-400 font-mono font-black italic">{val}</span>
    </div>
  )
}
