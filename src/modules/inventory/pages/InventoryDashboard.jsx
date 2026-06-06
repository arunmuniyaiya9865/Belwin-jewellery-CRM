import { useMemo } from 'react'
import { 
  mockProducts, getInventoryStats, 
  mockStockTransfers, mockCategories, mockMetalTypes, mockStockStatus
} from '../../../mock'
import { 
  Package, TrendingUp, AlertTriangle, ArrowRightLeft,
  ShoppingBag, ShieldCheck, BarChart3, Database,
  ArrowUpRight, ArrowDownRight, Clock, MapPin,
  ChevronRight, Box, Gem, Landmark, PieChart as PieChartIcon
} from 'lucide-react'
import { clsx } from 'clsx'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts'
import { useNavigate } from 'react-router-dom'

export default function InventoryDashboard() {
  const navigate = useNavigate()
  
  // --- Dynamic Stats ---
  const stats = useMemo(() => getInventoryStats(mockProducts), [])

  // --- Dynamic Analytics Data ---
  const compositionData = useMemo(() => {
    return [
      { name: 'Gold', value: mockProducts.filter(p => p.metalType.includes('Gold')).length, color: '#B8860B' },
      { name: 'Diamond', value: mockProducts.filter(p => p.metalType.includes('Diamond')).length, color: '#0070D2' },
      { name: 'Silver', value: mockProducts.filter(p => p.metalType.includes('Silver')).length, color: '#94A3B8' },
    ];
  }, []);

  const statusData = useMemo(() => {
    return mockStockStatus.map(status => ({
      name: status,
      count: mockProducts.filter(p => p.stockStatus === status).length
    }));
  }, []);

  const branchData = useMemo(() => {
    const branches = ['Chennai Main', 'Trichy', 'Madurai', 'Coimbatore', 'Salem'];
    return branches.map(b => ({
      name: b,
      value: mockProducts.filter(p => p.branch === b).reduce((a,c) => a + c.inventoryValue, 0)
    }));
  }, []);

  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-[#16325C] tracking-tight">Enterprise Inventory Intelligence</h1>
          <p className="text-[11px] font-bold text-[#54698D] uppercase tracking-wider mt-1">Real-time Stock Aggregation • Global Assets</p>
        </div>
        <div className="flex items-center gap-2">
           <button onClick={() => navigate('/inventory/audit')} className="btn-action flex items-center gap-2"><Database className="w-4 h-4" /> Run Audit</button>
           <button onClick={() => navigate('/inventory/purchase')} className="btn-primary-fn !bg-[#16325C] px-8">Purchase Intake</button>
        </div>
      </div>

      {/* KPI Ribbon - Dynamically Calculated */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-3">
         {[
           { label: 'Asset Value', value: `₹${(stats.totalValue / 10000000).toFixed(2)} Cr`, icon: Landmark, color: 'text-[#16325C]' },
           { label: 'Available', value: stats.availableStock, icon: Package, color: 'text-emerald-600' },
           { label: 'Reserved', value: stats.reservedStock, icon: Clock, color: 'text-indigo-600' },
           { label: 'Low Stock', value: stats.lowStock, icon: AlertTriangle, color: 'text-amber-600' },
           { label: 'Out of Stock', value: stats.outOfStock, icon: ShoppingBag, color: 'text-rose-600' },
           { label: 'Total SKUs', value: stats.totalProducts, icon: Database, color: 'text-slate-500' },
           { label: 'Vendors', value: stats.totalVendors, icon: ShieldCheck, color: 'text-blue-500' },
           { label: 'Branches', value: stats.totalBranches, icon: MapPin, color: 'text-rose-500' },
         ].map((kpi, i) => (
           <div key={i} className="workspace-panel p-4 flex flex-col justify-between group cursor-default transition-all hover:border-[#16325C]/30 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                 <p className="text-[9px] font-black text-[#54698D] uppercase tracking-tighter leading-none">{kpi.label}</p>
                 <kpi.icon className={clsx("w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity", kpi.color)} />
              </div>
              <h3 className={clsx("text-lg font-black tracking-tight", kpi.color)}>{kpi.value}</h3>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
         
         {/* Charts & Analytics - 8 Cols */}
         <div className="xl:col-span-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* Stock Composition (Dynamic) */}
               <div className="workspace-panel p-6 h-[380px] flex flex-col">
                  <h4 className="text-[11px] font-black text-[#16325C] uppercase tracking-wider mb-8 flex items-center gap-2">
                    <PieChartIcon className="w-4 h-4 text-[#B8860B]" /> SKU Metal Distribution
                  </h4>
                  <div className="flex-1 w-full flex items-center gap-8">
                     <div className="w-48 h-48 shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                           <PieChart>
                              <Pie
                                 data={compositionData}
                                 cx="50%"
                                 cy="50%"
                                 innerRadius={50}
                                 outerRadius={75}
                                 paddingAngle={8}
                                 dataKey="value"
                                 stroke="none"
                              >
                                 {compositionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                 ))}
                              </Pie>
                              <Tooltip 
                                 contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '11px', fontWeight: 'bold' }}
                              />
                           </PieChart>
                        </ResponsiveContainer>
                     </div>
                     <div className="space-y-4 flex-1">
                        {compositionData.map((item, i) => (
                           <div key={i} className="flex justify-between items-center group cursor-pointer p-2 hover:bg-gray-50 rounded-xl transition-all">
                              <div className="flex items-center gap-3">
                                 <div className="w-3 h-3 rounded-md shadow-sm" style={{ backgroundColor: item.color }} />
                                 <span className="text-[11px] font-bold text-[#54698D] uppercase tracking-tight">{item.name}</span>
                              </div>
                              <span className="text-[12px] font-black text-[#16325C]">{Math.round((item.value / stats.totalProducts) * 100)}%</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Status Distribution (Dynamic) */}
               <div className="workspace-panel p-6 h-[380px] flex flex-col">
                  <h4 className="text-[11px] font-black text-[#16325C] uppercase tracking-wider mb-8">Stock Health Analysis</h4>
                  <div className="flex-1 w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={statusData}>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                           <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 'bold' }} />
                           <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                           <Tooltip 
                               cursor={{ fill: '#f8fafc' }}
                               contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '11px', fontWeight: 'bold' }}
                           />
                           <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={32}>
                              {statusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={
                                  entry.name === 'Available' ? '#10b981' : 
                                  entry.name === 'Low Stock' ? '#f59e0b' : 
                                  entry.name === 'Out Of Stock' ? '#ef4444' : '#6366f1'
                                } />
                              ))}
                           </Bar>
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
               </div>
            </div>

            {/* Branch Transfers Table (Dynamic) */}
            <div className="workspace-panel overflow-hidden border-[#D8DDE6]">
               <div className="p-4 border-b border-[#D8DDE6] bg-gray-50/50 flex items-center justify-between">
                  <h3 className="text-[12px] font-black text-[#16325C] uppercase flex items-center gap-2 tracking-wide">
                    <ArrowRightLeft className="w-4 h-4 text-rose-500" /> Cross-Branch Logistics
                  </h3>
                  <button onClick={() => navigate('/inventory/transfers')} className="text-[10px] font-black text-[#0070D2] uppercase hover:underline">Full Logistics Log</button>
               </div>
               <div className="overflow-x-auto">
                  <table className="enterprise-table">
                    <thead>
                      <tr>
                        <th>Transit Ref</th>
                        <th>Origin → Destination</th>
                        <th>Inventory Node</th>
                        <th>Log Date</th>
                        <th>Workflow Status</th>
                      </tr>
                    </thead>
                    <tbody>
                       {mockStockTransfers.map((tr, i) => (
                         <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                           <td><span className="font-mono font-bold text-[#54698D] text-[11px]">{tr.id}</span></td>
                           <td>
                              <div className="flex items-center gap-2 text-[11px] font-bold text-[#16325C] tracking-tight">
                                 <span>{tr.from}</span>
                                 <ChevronRight className="w-3 h-3 text-stone-300" />
                                 <span>{tr.to}</span>
                              </div>
                           </td>
                           <td>
                              <div className="flex flex-col">
                                 <span className="font-bold text-[#54698D] leading-tight text-[12px]">{tr.product}</span>
                                 <span className="text-[9px] font-bold text-stone-400 uppercase italic">{tr.weight} • {tr.qty} Pcs</span>
                              </div>
                           </td>
                           <td className="text-[11px] font-black text-[#16325C]">{tr.date}</td>
                           <td>
                              <span className={clsx(
                                "px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-widest leading-none shadow-sm inline-block",
                                tr.status === 'Completed' ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                                "bg-blue-50 text-blue-700 border border-blue-100 animate-pulse"
                              )}>
                                {tr.status}
                              </span>
                           </td>
                         </tr>
                       ))}
                    </tbody>
                  </table>
               </div>
            </div>
         </div>

         {/* Intel Sidebar - 4 Cols */}
         <div className="xl:col-span-4 space-y-4">
            <div className="workspace-panel p-6 bg-[#001D4A] text-white shadow-2xl relative overflow-hidden">
               <div className="relative z-10 space-y-8">
                  <div>
                    <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none mb-2">Audit Compliance</h4>
                    <p className="text-xl font-bold tracking-tight">Inventory Integrity Score</p>
                  </div>
                  
                  <div className="space-y-6">
                     <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 group hover:border-emerald-400/50 transition-all cursor-pointer">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                           <ShieldCheck className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                           <p className="text-[13px] font-bold leading-tight">Last Global Reconciliation</p>
                           <p className="text-[10px] text-blue-200 mt-1 uppercase font-bold italic">99.8% Accuracy • 01 Jun 2025</p>
                        </div>
                     </div>
                  </div>

                  <div className="pt-2">
                     <button className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-900/50 hover:bg-blue-500 transition-all flex items-center justify-center gap-2">
                        <Database className="w-4 h-4" /> Trigger Global Stock-Take
                     </button>
                  </div>
               </div>
               <BarChart3 className="absolute -bottom-10 -right-10 w-40 h-40 opacity-10" />
            </div>

            {/* Branch Asset Distribution (Dynamic) */}
            <div className="workspace-panel shadow-sm p-6 overflow-hidden">
               <h4 className="text-[11px] font-black text-[#16325C] uppercase mb-8 flex items-center gap-2">
                 <Landmark className="w-4 h-4 text-stone-400" /> Asset Value Heatmap
               </h4>
               <div className="space-y-6">
                  {branchData.map((branch, i) => {
                    const percentage = Math.round((branch.value / stats.totalValue) * 100);
                    return (
                      <div key={i} className="space-y-2 group">
                         <div className="flex justify-between items-center text-[10px] font-black">
                            <span className="text-stone-500 uppercase tracking-tighter truncate max-w-[150px]">{branch.name}</span>
                            <span className="text-[#16325C] font-mono">₹{(branch.value / 100000).toFixed(1)} L</span>
                         </div>
                         <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100 flex shadow-inner">
                            <div className={clsx(
                              "h-full rounded-full transition-all duration-1000",
                              i === 0 ? "bg-[#B8860B]" : i === 1 ? "bg-[#16325C]" : "bg-emerald-500"
                            )} style={{ width: `${percentage}%` }} />
                         </div>
                      </div>
                    );
                  })}
               </div>
            </div>

            <div className="workspace-panel p-5 border-dashed border-2 flex flex-col items-center justify-center text-center py-10 bg-gray-50/30 group hover:bg-rose-50/30 hover:border-rose-200 transition-all cursor-pointer">
               <AlertTriangle className="w-10 h-10 text-stone-200 mb-2 group-hover:text-rose-500 transition-colors" />
               <p className="text-[10px] font-black font-mono text-stone-400 group-hover:text-rose-700 uppercase tracking-widest leading-none">
                  Critical Low Stock: <span className="text-rose-600 font-black">{stats.lowStock} Items</span>
               </p>
               <button onClick={() => navigate('/inventory/products')} className="mt-4 text-[9px] font-black text-rose-500 underline opacity-0 group-hover:opacity-100 transition-opacity">Review Shortfall</button>
            </div>
         </div>

      </div>
    </div>
  )
}
