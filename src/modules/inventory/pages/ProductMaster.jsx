import { useState, useMemo } from 'react'
import { 
  mockProducts, mockCategories, mockMetalTypes, 
  mockBranches, mockVendors, mockStockStatus 
} from '../../../mock'
import { 
  Search, Filter, Plus, FileDown, MoreHorizontal,
  Gem, Printer, Download, Package, Scale, MapPin, 
  ChevronDown, ArrowUpRight, History, X,
  ArrowUpDown, CheckCircle2, AlertCircle
} from 'lucide-react'
import { clsx } from 'clsx'

export default function ProductMaster() {
  // --- States ---
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    category: 'All',
    metal: 'All',
    branch: 'All',
    vendor: 'All',
    status: 'All'
  })
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // --- Logic: Filtering ---
  const filteredProducts = useMemo(() => {
    return mockProducts.filter(prd => {
      const matchesSearch = 
        prd.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prd.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prd.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prd.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prd.branch.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = filters.category === 'All' || prd.category === filters.category;
      const matchesMetal = filters.metal === 'All' || prd.metalType === filters.metal;
      const matchesBranch = filters.branch === 'All' || prd.branch === filters.branch;
      const matchesVendor = filters.vendor === 'All' || prd.vendor === filters.vendor;
      const matchesStatus = filters.status === 'All' || prd.stockStatus === filters.status;

      return matchesSearch && matchesCategory && matchesMetal && matchesBranch && matchesVendor && matchesStatus;
    });
  }, [searchTerm, filters]);

  // --- Logic: Sorting ---
  const sortedProducts = useMemo(() => {
    const sortableItems = [...filteredProducts];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredProducts, sortConfig]);

  // --- Logic: Pagination ---
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const clearFilters = () => {
    setFilters({ category: 'All', metal: 'All', branch: 'All', vendor: 'All', status: 'All' });
    setSearchTerm('');
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Header Area */}
      <div className="bg-white border-b border-[#D8DDE6] -mx-4 -mt-4 mb-4 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 bg-[#B8860B] rounded flex items-center justify-center text-white shadow-lg">
              <Package className="w-6 h-6" />
           </div>
           <div>
             <p className="text-[11px] font-bold text-[#54698D] uppercase tracking-wider leading-none mb-1">Stock Master</p>
             <h1 className="text-[20px] font-bold text-[#16325C] leading-none">Functional Inventory Registry</h1>
           </div>
        </div>
        <div className="flex items-center gap-2">
           <button className="btn-action flex items-center gap-2 px-3 py-1.5 font-black uppercase text-[10px] tracking-widest"><Printer className="w-3.5 h-3.5" /> Label Print</button>
           <button className="btn-primary-fn !bg-[#16325C] flex items-center gap-2 px-6"><Plus className="w-4 h-4" /> Add Product</button>
        </div>
      </div>

      {/* Persistent Filter Bar */}
      <div className="workspace-panel p-4 space-y-4 shadow-sm border-[#D8DDE6]">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[300px]">
             <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
             <input 
               type="text" 
               placeholder="Search by Code, Name, SKU, Category, Vendor or Branch..." 
               className="w-full h-10 pl-10 pr-10 bg-[#F3F5F9] border border-transparent focus:bg-white focus:border-primary/30 rounded-xl text-[11px] font-medium outline-none transition-all shadow-inner" 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
             {searchTerm && <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#16325C]"><X className="w-4 h-4" /></button>}
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
             <FilterDropdown label="Category" value={filters.category} options={['All', ...mockCategories]} onChange={(v) => setFilters(f => ({...f, category: v}))} />
             <FilterDropdown label="Metal" value={filters.metal} options={['All', ...mockMetalTypes]} onChange={(v) => setFilters(f => ({...f, metal: v}))} />
             <FilterDropdown label="Branch" value={filters.branch} options={['All', ...mockBranches]} onChange={(v) => setFilters(f => ({...f, branch: v}))} />
             <FilterDropdown label="Status" value={filters.status} options={['All', ...mockStockStatus]} onChange={(v) => setFilters(f => ({...f, status: v}))} />
             <button onClick={clearFilters} className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-xl border border-transparent hover:border-rose-200 transition-all" title="Clear All">
                <X className="w-4 h-4" />
             </button>
          </div>
        </div>

        {/* Filter Chips Display */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-50">
           <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-8 mr-2">Quick Stats:</p>
           <div className="flex items-center gap-4">
              <span className="text-[11px] font-bold text-[#16325C]">{filteredProducts.length} <span className="text-stone-400">Items matching current logic</span></span>
              <span className="text-[11px] font-bold text-emerald-600">₹{filteredProducts.reduce((a,c) => a + c.inventoryValue, 0).toLocaleString()} <span className="text-stone-400 font-medium italic">Filtered Value pool</span></span>
           </div>
        </div>
      </div>

      {/* Main Data Registry */}
      <div className="workspace-panel overflow-hidden border-[#D8DDE6]">
        <div className="overflow-x-auto">
          <table className="enterprise-table">
            <thead className="sticky top-0 z-20 shadow-sm">
              <tr>
                <th className="cursor-pointer group" onClick={() => requestSort('id')}>
                  <div className="flex items-center gap-2">UID {sortConfig.key === 'id' && <ArrowUpDown className="w-3 h-3 text-primary" />}</div>
                </th>
                <th>Item Specification</th>
                <th className="cursor-pointer" onClick={() => requestSort('category')}>Category</th>
                <th className="text-right cursor-pointer" onClick={() => requestSort('weight')}>Net Weight</th>
                <th className="text-right cursor-pointer" onClick={() => requestSort('quantity')}>Qty</th>
                <th>Supplier & Branch</th>
                <th className="text-right">Valuation</th>
                <th className="text-center">Stock Status</th>
                <th className="text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((prd) => (
                  <tr key={prd.id} className="hover:bg-blue-50/20 transition-all group">
                    <td><span className="font-mono font-bold text-[#54698D] text-[11px]">{prd.id}</span></td>
                    <td>
                      <div className="flex flex-col">
                         <span className="font-black text-[#16325C] tracking-tight">{prd.productName}</span>
                         <span className="text-[10px] font-mono font-bold text-stone-300 uppercase italic">{prd.productCode}</span>
                      </div>
                    </td>
                    <td>
                      <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-100/50 text-indigo-700 rounded-md text-[10px] font-black uppercase tracking-tighter">
                        {prd.category}
                      </span>
                    </td>
                    <td className="text-right font-mono font-black italic text-[#16325C]">{prd.weight}</td>
                    <td className="text-right">
                       <span className={clsx(
                         "font-mono font-black text-lg",
                         prd.quantity < 5 ? "text-rose-600" : "text-[#16325C]"
                       )}>{prd.quantity}</span>
                    </td>
                    <td>
                       <div className="flex flex-col text-[10px] font-bold uppercase tracking-tight">
                          <span className="text-[#B8860B]">{prd.vendor}</span>
                          <span className="text-stone-400 mt-0.5 flex items-center gap-1"><MapPin className="w-2.5 h-2.5" /> {prd.branch}</span>
                       </div>
                    </td>
                    <td className="text-right">
                       <div className="flex flex-col items-end">
                          <span className="font-mono font-black text-[#16325C]">₹{prd.inventoryValue.toLocaleString()}</span>
                          <span className="text-[9px] font-bold text-stone-300 uppercase">Book Value</span>
                       </div>
                    </td>
                    <td className="text-center">
                       <StatusBadge status={prd.stockStatus} />
                    </td>
                    <td className="text-right">
                       <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 hover:bg-white rounded border border-transparent hover:border-[#D8DDE6] text-[#54698D] shadow-sm"><ArrowUpRight className="w-3.5 h-3.5" /></button>
                          <button className="p-2 hover:bg-white rounded border border-transparent hover:border-[#D8DDE6] text-[#54698D] shadow-sm"><History className="w-3.5 h-3.5" /></button>
                       </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="py-20 text-center">
                     <div className="flex flex-col items-center justify-center text-stone-300">
                        <Search className="w-12 h-12 mb-4 opacity-10" />
                        <p className="text-[12px] font-black uppercase tracking-[0.2em]">No products match the selected filters</p>
                        <button onClick={clearFilters} className="mt-4 text-[#0070D2] font-black text-[10px] uppercase hover:underline">Reset Inventory View</button>
                     </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Pagination Bar */}
        <div className="p-4 border-t border-[#D8DDE6] flex flex-col md:flex-row items-center justify-between bg-gray-50/50 gap-4">
           <div className="flex items-center gap-6">
              <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">
                 Registry Volume: <span className="text-[#16325C]">{filteredProducts.length}</span> / {mockProducts.length}
              </p>
              <div className="h-4 w-[1px] bg-gray-200" />
              <button className="text-[10px] font-black text-[#0070D2] uppercase tracking-widest flex items-center gap-2 hover:underline">
                 <Download className="w-3 h-3" /> Export Filtered Dataset
              </button>
           </div>
           
           <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 bg-white border border-[#D8DDE6] rounded-xl text-[#54698D] hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-white transition-all shadow-sm"
              >
                 <ChevronDown className="w-4 h-4 rotate-90" />
              </button>

              <div className="flex gap-1">
                 {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                   const pg = i + 1;
                   return (
                     <button 
                       key={pg} 
                       onClick={() => setCurrentPage(pg)}
                       className={clsx(
                         "w-10 h-10 rounded-xl text-[11px] font-black transition-all",
                         currentPage === pg ? "bg-[#16325C] text-white shadow-xl scale-110" : "bg-white border border-[#D8DDE6] text-[#54698D] hover:bg-gray-50"
                       )}
                     >
                       {pg}
                     </button>
                   );
                 })}
                 {totalPages > 5 && <span className="w-10 h-10 flex items-center justify-center text-stone-400">...</span>}
              </div>

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 bg-white border border-[#D8DDE6] rounded-xl text-[#54698D] hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-white transition-all shadow-sm"
              >
                 <ChevronDown className="w-4 h-4 -rotate-90" />
              </button>
           </div>
        </div>
      </div>
    </div>
  )
}

function FilterDropdown({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
       <button 
         onClick={() => setOpen(!open)}
         className={clsx(
            "flex items-center gap-3 bg-white border px-4 py-2.5 rounded-xl text-[11px] font-bold transition-all shadow-sm whitespace-nowrap group",
            value !== 'All' ? "border-[#16325C] bg-[#16325C] text-white" : "border-[#D8DDE6] text-[#54698D] hover:border-[#16325C]"
         )}
       >
          <span className={clsx("uppercase text-[9px] font-black tracking-tighter opacity-60", value !== 'All' ? "text-blue-100" : "text-stone-400")}>{label}:</span>
          <span className="truncate max-w-[80px]">{value}</span>
          <ChevronDown className={clsx("w-3 h-3 opacity-40 group-hover:opacity-100 transition-transform", open && "rotate-180")} />
       </button>
       
       {open && (
         <>
           <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
           <div className="absolute top-full left-0 mt-2 w-56 max-h-64 overflow-y-auto bg-white border border-[#D8DDE6] rounded-2xl shadow-2xl z-40 p-2 custom-scrollbar">
              {options.map((opt) => (
                <button 
                  key={opt}
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className={clsx(
                    "w-full text-left px-4 py-2.5 rounded-xl text-[11px] font-medium transition-all flex items-center justify-between group",
                    value === opt ? "bg-blue-50 text-[#16325C] font-black" : "text-[#54698D] hover:bg-gray-50"
                  )}
                >
                  {opt}
                  {value === opt && <div className="w-1.5 h-1.5 rounded-full bg-[#16325C]" />}
                </button>
              ))}
           </div>
         </>
       )}
    </div>
  )
}

function StatusBadge({ status }) {
  const styles = {
    'Available': 'bg-emerald-50 text-emerald-700 border-emerald-200 icon-success',
    'Low Stock': 'bg-amber-50 text-amber-700 border-amber-200 icon-warning',
    'Out Of Stock': 'bg-rose-50 text-rose-700 border-rose-200 icon-danger',
    'Reserved': 'bg-blue-50 text-blue-700 border-blue-200 icon-info',
    'Damaged': 'bg-stone-50 text-stone-600 border-stone-200 icon-default'
  }
  
  return (
    <div className={clsx("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border shadow-sm", styles[status] || styles['Available'])}>
       {status === 'Available' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
       <span className="text-[10px] font-black uppercase tracking-tighter">{status}</span>
    </div>
  )
}
