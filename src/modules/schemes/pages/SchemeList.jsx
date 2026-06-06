import { useState } from 'react'
import { Link } from 'react-router-dom'
import { mockSchemes } from '../../../mock'
import { 
  Plus, Search, Filter, Layers, Download, 
  FileSpreadsheet, Users, Wallet, CheckCircle, 
  AlertCircle, ChevronRight, MoreVertical, TrendingUp
} from 'lucide-react'
import { clsx } from 'clsx'

export default function SchemeList() {
  const [searchTerm, setSearchTerm] = useState('')

  const stats = [
    { label: 'Total Schemes', value: '08', icon: Layers, color: 'blue' },
    { label: 'Active Members', value: '1,426', icon: Users, color: 'emerald' },
    { label: 'Collection Target', value: '₹1.2 Cr', icon: Wallet, color: 'amber' },
    { label: 'Pending Maturities', value: '42', icon: Clock, color: 'rose' },
  ]

  return (
    <div className="space-y-4 pb-10">
      {/* Page Header */}
      <div className="bg-white border-b border-[#D8DDE6] -mx-4 -mt-4 mb-4 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-[#FF8C00] rounded flex items-center justify-center text-white shadow-lg">
                <Layers className="w-6 h-6" />
             </div>
             <div>
               <p className="text-[11px] font-bold text-[#54698D] uppercase tracking-wider leading-none mb-1">Financial Products</p>
               <h1 className="text-[20px] font-bold text-[#16325C] leading-none">Scheme Management</h1>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/schemes/create" className="btn-primary-fn flex items-center gap-2">
              <Plus className="w-4 h-4" /> Create Scheme
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="workspace-panel p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-[#54698D] uppercase tracking-wider mb-1">{stat.label}</p>
              <h3 className="text-xl font-black text-[#16325C]">{stat.value}</h3>
            </div>
            <div className={`p-2 rounded bg-gray-50 text-stone-400`}>
              <stat.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white p-3 rounded border border-[#D8DDE6] shadow-sm">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Filter by Scheme Name or Code..." 
              className="w-full h-8 pl-10 pr-4 bg-[#F3F5F9] border border-transparent focus:bg-white focus:border-primary/30 rounded text-[12px] outline-none" 
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-action flex items-center gap-2"><Filter className="w-3.5 h-3.5" /> Filters</button>
          <button className="btn-action flex items-center gap-2"><Download className="w-3.5 h-3.5" /> Export</button>
        </div>
      </div>

      {/* Data Table */}
      <div className="workspace-panel overflow-hidden">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Scheme Name</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Monthly App</th>
                <th className="text-right">Members</th>
                <th className="text-right">Target</th>
                <th className="text-right">Achieved</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockSchemes.map((scheme) => (
                <tr key={scheme.id} className="hover:bg-[#F3F5F9] transition-colors group">
                  <td className="font-mono text-[11px] font-black text-[#0070D2]">{scheme.id}</td>
                  <td>
                    <Link to={`/schemes/${scheme.id}`} className="font-bold text-[#16325C] hover:text-[#0070D2] hover:underline whitespace-nowrap">
                      {scheme.name}
                    </Link>
                  </td>
                  <td className="text-[#54698D]">{scheme.type}</td>
                  <td className="font-bold">{scheme.duration}</td>
                  <td className="font-bold font-mono">₹{scheme.amount.toLocaleString()}</td>
                  <td className="text-right text-[#0070D2] font-black">{scheme.members}</td>
                  <td className="text-right font-mono font-bold text-gray-400">{scheme.target}</td>
                  <td className="text-right font-bold font-mono text-emerald-600">{scheme.achieved}</td>
                  <td>
                    <span className="status-badge-fn bg-emerald-50 text-emerald-700 border-emerald-100">
                      {scheme.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link to="/schemes/enrollment" className="text-[#0070D2] p-1.5 hover:bg-white rounded" title="Enroll Customer">
                        <UserPlus className="w-4 h-4" />
                      </Link>
                      <button className="text-[#54698D] p-1.5 hover:bg-white rounded"><MoreVertical className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function Clock(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  )
}

function UserPlus(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="16" x2="22" y1="11" y2="11"/></svg>
  )
}
