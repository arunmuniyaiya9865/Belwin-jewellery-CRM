import { useState } from 'react'
import { Link } from 'react-router-dom'
import { mockCustomers } from '../../../mock'
import { 
  Search, UserPlus, Filter, MoreVertical, ExternalLink, 
  Download, FileSpreadsheet, Users, UserCheck, UserX, Star, 
  LayoutGrid, List, ChevronLeft, ChevronRight, FileDown
} from 'lucide-react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

export default function CustomerList() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCustomers = mockCustomers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  )

  return (
    <div className="space-y-4 pb-10">
      {/* Salesforce Page Header */}
      <div className="bg-white border-b border-[#D8DDE6] -mx-4 -mt-4 mb-4 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-[#7B68EE] rounded flex items-center justify-center text-white shadow-lg">
                <Users className="w-6 h-6" />
             </div>
             <div>
               <p className="text-[11px] font-bold text-[#54698D] uppercase tracking-wider leading-none mb-1">Customer Workspace</p>
               <h1 className="text-[20px] font-bold text-[#16325C] leading-none">All Active Customers</h1>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-action flex items-center gap-2 px-3 py-1.5"><FileDown className="w-3.5 h-3.5" /> Export</button>
            <Link to="/crm/customers/create" className="btn-primary-fn flex items-center gap-2">
              <UserPlus className="w-3.5 h-3.5" /> New Customer
            </Link>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col lg:flex-row gap-3 items-center justify-between bg-white p-3 rounded border border-[#D8DDE6] shadow-sm">
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <p className="text-[12px] font-bold text-[#54698D] whitespace-nowrap">{filteredCustomers.length} Items • Sorted by Name</p>
          <div className="h-4 w-[1px] bg-gray-200 hidden lg:block" />
          <div className="relative w-full lg:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search target record..." 
              className="w-full h-8 pl-10 pr-4 bg-[#F3F5F9] border border-transparent focus:bg-white focus:border-primary/30 rounded text-[12px] outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
           <button className="btn-action !p-2"><Filter className="w-4 h-4" /></button>
           <button className="btn-action !p-2"><Settings className="w-4 h-4" /></button>
        </div>
      </div>

      {/* High Density Table */}
      <div className="workspace-panel overflow-hidden rounded">
        <div className="overflow-x-auto min-h-[600px]">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th className="w-10"><input type="checkbox" className="rounded border-gray-300" /></th>
                <th>UID</th>
                <th>Legal Name</th>
                <th>Mobile Number</th>
                <th>Branch / Location</th>
                <th>Tier</th>
                <th className="text-right">Avergae Bal</th>
                <th className="text-right">Outstanding</th>
                <th>Status</th>
                <th className="text-right font-bold text-[#0070D2]">View</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-[#F3F5F9] transition-colors group">
                  <td><input type="checkbox" className="rounded border-gray-300" /></td>
                  <td className="font-mono text-[11px] text-[#0070D2] font-black">{customer.id}</td>
                  <td>
                    <Link to={`/crm/customers/${customer.id}`} className="font-bold text-[#0070D2] hover:underline whitespace-nowrap">
                      {customer.name}
                    </Link>
                  </td>
                  <td>{customer.phone}</td>
                  <td>{customer.branch}</td>
                  <td>
                    <div className="flex items-center gap-1.5 uppercase text-[10px] font-black">
                      <Star className={clsx("w-3 h-3", customer.tier === 'Gold' ? 'text-amber-500 fill-amber-500' : 'text-stone-300')} />
                      {customer.tier}
                    </div>
                  </td>
                  <td className="text-right font-mono font-bold">₹{customer.balance.toLocaleString()}</td>
                  <td className="text-right text-rose-600 font-mono font-bold">
                    {customer.outstanding > 0 ? `₹${customer.outstanding.toLocaleString()}` : '0.00'}
                  </td>
                  <td>
                    <span className={clsx(
                      "status-badge-fn",
                      customer.status === 'Active' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-gray-50 text-gray-500 border-gray-200"
                    )}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <Link 
                      to={`/crm/customers/${customer.id}`}
                      className="text-[#0070D2] p-1.5 hover:bg-white rounded transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dense Pagination */}
        <div className="p-3 bg-gray-50/50 border-t border-[#D8DDE6] flex items-center justify-between">
           <div className="flex items-center gap-4 text-[12px] text-[#54698D]">
              <p>Show 50 records</p>
              <div className="h-3 w-[1x] bg-gray-300" />
              <p>1 - {filteredCustomers.length} of 1,248 items</p>
           </div>
           <div className="flex items-center gap-1">
              <button className="btn-action p-1.5 disabled:opacity-30"><ChevronLeft className="w-4 h-4" /></button>
              <button className="btn-action px-3 py-1 font-bold text-[#16325C]">1</button>
              <button className="btn-action px-3 py-1">2</button>
              <button className="btn-action px-3 py-1">3</button>
              <button className="btn-action p-1.5"><ChevronRight className="w-4 h-4" /></button>
           </div>
        </div>
      </div>
    </div>
  )
}

function Settings(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  )
}
