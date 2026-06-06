import { useState } from 'react'
import { mockInventoryCategories } from '../../../mock'
import { 
  ChevronRight, ChevronDown, Layers, Plus, 
  MoreHorizontal, Gem, Box, Diamond, 
  Edit3, Trash2, FolderPlus, ArrowRight
} from 'lucide-react'
import { clsx } from 'clsx'

export default function CategoryManagement() {
  const [expanded, setExpanded] = useState(['CAT-G'])

  const toggle = (id) => {
    setExpanded(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  return (
    <div className="space-y-4 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-[#16325C] tracking-tight">Category Taxonomy Management</h1>
          <p className="text-[11px] font-bold text-[#54698D] uppercase tracking-wider mt-1">Hierarchical Asset Structure • Nested Groups</p>
        </div>
        <button className="btn-primary-fn !bg-[#16325C] flex items-center gap-2 px-6"><FolderPlus className="w-4 h-4" /> Create New Root</button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
         {/* Category Tree - 7 Cols */}
         <div className="xl:col-span-7 space-y-2">
            <div className="workspace-panel shadow-sm">
               <div className="p-4 border-b border-[#D8DDE6] flex items-center justify-between bg-gray-50/50">
                  <h3 className="text-[11px] font-black text-[#16325C] uppercase flex items-center gap-2">
                    <Layers className="w-4 h-4" /> Global Category Tree
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-stone-400">
                     <span>Double click to reorder</span>
                  </div>
               </div>
               
               <div className="p-4 space-y-3 min-h-[600px]">
                  {mockInventoryCategories.map((cat) => (
                    <div key={cat.id} className="space-y-2">
                       <div 
                         onClick={() => toggle(cat.id)}
                         className={clsx(
                           "flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group",
                           expanded.includes(cat.id) ? "bg-[#16325C] border-[#16325C] text-white shadow-xl" : "bg-white border-[#D8DDE6] text-[#16325C] hover:bg-gray-50"
                         )}
                       >
                          <div className="flex items-center gap-4">
                             {expanded.includes(cat.id) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                             <div className={clsx(
                               "w-10 h-10 rounded-lg flex items-center justify-center border",
                               expanded.includes(cat.id) ? "bg-white/10 border-white/20" : "bg-gray-100 border-transparent"
                             )}>
                                {cat.name.includes('Gold') ? <Gem className="w-5 h-5" /> : cat.name.includes('Silver') ? <Box className="w-5 h-5" /> : <Diamond className="w-5 h-5" />}
                             </div>
                             <div className="flex flex-col">
                                <span className="font-black text-[13px] uppercase tracking-wider">{cat.name}</span>
                                <span className={clsx("text-[9px] font-bold uppercase tracking-widest leading-none", expanded.includes(cat.id) ? "text-blue-200" : "text-stone-400")}>
                                  {cat.sub.length} Active Sub-categories
                                </span>
                             </div>
                          </div>
                          <div className="flex items-center gap-2">
                             <button className={clsx("p-2 rounded-lg transition-colors", expanded.includes(cat.id) ? "hover:bg-white/10 text-white" : "hover:bg-gray-100 text-stone-400")}>
                                <Edit3 className="w-4 h-4" />
                             </button>
                             <button className={clsx("p-2 rounded-lg transition-colors", expanded.includes(cat.id) ? "hover:bg-rose-500/20 text-white" : "hover:bg-rose-50 text-rose-400")}>
                                <Trash2 className="w-4 h-4" />
                             </button>
                             <MoreHorizontal className="w-5 h-5 opacity-40 ml-2" />
                          </div>
                       </div>
                       
                       {expanded.includes(cat.id) && (
                         <div className="ml-14 grid grid-cols-1 md:grid-cols-2 gap-2 pb-4">
                            {cat.sub.map((sub, j) => (
                              <div key={j} className="flex items-center justify-between p-3 bg-white border border-[#D8DDE6] rounded-xl hover:border-[#16325C] transition-all group cursor-pointer shadow-sm">
                                 <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
                                    <span className="text-[11px] font-bold text-[#16325C]">{sub}</span>
                                 </div>
                                 <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1.5 hover:bg-gray-100 rounded text-stone-400"><Edit3 className="w-3 h-3" /></button>
                                    <button className="p-1.5 hover:bg-rose-50 rounded text-rose-400"><Trash2 className="w-3 h-3" /></button>
                                 </div>
                              </div>
                            ))}
                            <button className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-100 rounded-xl text-stone-300 hover:border-[#D8DDE6] hover:text-[#54698D] transition-all font-black text-[10px] uppercase tracking-widest">
                               <Plus className="w-3.5 h-3.5" /> Add Sub-type
                            </button>
                         </div>
                       )}
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Selection Intelligence - 5 Cols */}
         <div className="xl:col-span-5 space-y-4">
            <div className="workspace-panel p-8 bg-[#001D4A] text-white">
               <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6">Taxonomy Intelligence</h3>
               <div className="space-y-8">
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl font-black italic shadow-2xl">65%</div>
                     <div>
                        <p className="text-[14px] font-bold leading-tight uppercase tracking-tight">Main Asset Concentration</p>
                        <p className="text-[10px] text-blue-200 mt-1 font-medium leading-relaxed">The <span className="text-amber-400 font-bold">Gold Jewellery</span> root contains the majority of active SKU volume. Recommend further sub-segmentation.</p>
                     </div>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                     <span className="text-[11px] font-bold text-blue-100 italic">"Hierarchy follows GJEPC standard guidelines"</span>
                     <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
               </div>
            </div>

            <div className="workspace-panel p-6">
               <h4 className="text-[11px] font-black text-[#16325C] uppercase tracking-widest mb-6 border-b border-[#F0F0F0] pb-3">Operational Stats</h4>
               <div className="space-y-4">
                  <StatRow label="Root Categories" value="3" />
                  <StatRow label="Leaf Nodes (SKUs)" value="1,240" />
                  <StatRow label="Orphaned Products" value="None" />
                  <StatRow label="Archived Categories" value="12" />
               </div>
               <button className="w-full mt-8 py-3 bg-gray-50 border border-[#D8DDE6] rounded-xl text-[10px] font-black text-[#54698D] uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2">
                  Validation Suite <ArrowRight className="w-3.5 h-3.5" />
               </button>
            </div>
         </div>
      </div>
    </div>
  )
}

function StatRow({ label, value }) {
  return (
    <div className="flex justify-between items-center text-[12px] font-bold">
       <span className="text-stone-400 uppercase tracking-tighter">{label}</span>
       <span className="text-[#16325C]">{value}</span>
    </div>
  )
}

function CheckCircle2(props) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
