import { useState, useEffect } from 'react'
import { NavLink, useLocation, useNavigate, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'
import { 
  Users, Layers, Wallet, CheckCircle, Package, Receipt, 
  BarChart3, Users2, Megaphone, FileText, ShieldCheck, Settings, 
  Bell, Search, ChevronDown, LogOut, Menu, X, ChevronRight, Gem,
  Grid, Briefcase, Clock, HelpCircle, User
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'
import Breadcrumbs from '../components/Breadcrumbs'

const navStructure = [
  { name: 'Customer Workspace', path: '/crm/customers', icon: Users },
  { name: 'Saving Schemes', path: '/schemes/list', icon: Layers },
  { name: 'Market Rates', path: '/gold-rates/today', icon: BarChart3 },
  { name: 'Daily Collections', path: '/collections/entry', icon: Wallet },
  { name: 'Scheme Maturity', path: '/maturity', icon: CheckCircle },
  { name: 'Inventory & Stock', path: '/inventory', icon: Package },
  { name: 'POS & Billing', path: '/billing/create', icon: Receipt, isFuture: true },
  { name: 'Finance & Ledger', path: '/finance', icon: BarChart3, isFuture: true },
  { name: 'Employee Center', path: '/employees/list', icon: Users2, isFuture: true },
  { name: 'Marketing & SMS', path: '/marketing', icon: Megaphone, isFuture: true },
  { name: 'Global Reports', path: '/reports', icon: FileText, isFuture: true },
  { name: 'Administration', path: '/admin', icon: ShieldCheck, isFuture: true },
  { name: 'App Settings', path: '/settings', icon: Settings, isFuture: true },
]

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [futureMessage, setFutureMessage] = useState(null)
  
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white text-[#16325C] border-r border-[#D8DDE6]">
      {/* Brand Area */}
      <div className="h-14 flex items-center px-4 bg-white border-b border-[#D8DDE6] shrink-0">
        <div className="w-8 h-8 bg-[#16325C] rounded flex items-center justify-center shrink-0 shadow-lg">
          <Gem className="w-5 h-5 text-white" />
        </div>
        {isSidebarOpen && (
          <div className="ml-3 overflow-hidden">
            <p className="font-bold text-[14px] tracking-tight whitespace-nowrap text-[#16325C]">BELLWIN JEWELS</p>
            <p className="text-[9px] font-black text-[#0070D2] uppercase tracking-wider mt-0.5">Financial Enterprise</p>
          </div>
        )}
      </div>

      {/* App Launcher Simulation */}
      <div className="p-3 border-b border-[#D8DDE6]">
        <button className="flex items-center gap-3 w-full p-2 hover:bg-slate-100 rounded text-slate-500 hover:text-[#16325C] transition-all">
          <Grid className="w-4 h-4" />
          {isSidebarOpen && <span className="text-[11px] font-bold uppercase tracking-widest">App Launcher</span>}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5 custom-scrollbar">
        {navStructure.map((item) => {
          const isActive = location.pathname.startsWith(item.path.split('/')[1] === '' ? '---' : '/' + item.path.split('/')[1]) || (item.path === '/' && location.pathname === '/')
          
          return (
            <NavLink
              key={item.name}
              to={item.isFuture ? location.pathname : item.path}
              onClick={(e) => {
                if (item.isFuture) {
                  e.preventDefault();
                  setFutureMessage(item.name);
                  setTimeout(() => setFutureMessage(null), 3000);
                }
              }}
              className={({ isActive }) => clsx(
                "flex items-center p-2.5 rounded transition-all group relative",
                !item.isFuture && isActive 
                  ? "bg-[#0070D2] text-white shadow-sm" 
                  : "text-[#54698D] hover:bg-slate-50 hover:text-[#16325C]",
                item.isFuture && "opacity-70 grayscale-[0.5]"
              )}
            >
              <item.icon className={clsx("w-4 h-4 shrink-0", !item.isFuture && isActive ? "text-white" : "group-hover:text-[#0070D2]")} />
              {isSidebarOpen && (
                <div className="flex-1 flex items-center justify-between ml-3 overflow-hidden">
                  <span className="text-[12px] font-bold truncate">{item.name}</span>
                  {item.isFuture && (
                    <span className="text-[8px] font-black bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded uppercase tracking-tighter shrink-0">Soon</span>
                  )}
                </div>
              )}
              {!item.isFuture && isActive && isSidebarOpen && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r" />
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Future Update Toast */}
      <AnimatePresence>
        {futureMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-24 left-4 right-4 z-[100] bg-[#16325C] text-white p-3 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10"
          >
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
               <Clock className="w-4 h-4 text-blue-300" />
            </div>
            <div>
               <p className="text-[11px] font-bold leading-tight">{futureMessage}</p>
               <p className="text-[9px] text-blue-200 mt-0.5 uppercase font-black tracking-widest">Available in future update</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-[#D8DDE6] space-y-1">
        <button className="flex items-center gap-3 w-full p-2 text-[#54698D] hover:text-[#16325C] hover:bg-slate-50 rounded transition-all">
          <HelpCircle className="w-4 h-4" />
          {isSidebarOpen && <span className="text-[12px] font-bold">Documentation</span>}
        </button>
        <div className="pt-2 flex items-center gap-3 px-2 border-t border-[#D8DDE6] mt-2">
           <div className="w-8 h-8 rounded bg-[#16325C]/10 text-[#16325C] flex items-center justify-center text-[11px] font-black shrink-0">
             {user?.name?.[0] || 'A'}
           </div>
           {isSidebarOpen && (
             <div className="flex-1 overflow-hidden">
                <p className="text-[11px] font-black truncate leading-none uppercase tracking-tighter text-[#16325C]">{user?.name || 'User'}</p>
                <button onClick={handleLogout} className="text-[9px] font-bold text-slate-500 hover:text-rose-500 transition-colors uppercase">Sign Out</button>
             </div>
           )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F1F3F6] flex">
      <aside className={clsx(
        "hidden lg:flex flex-col fixed inset-y-0 left-0 z-50 transition-all duration-200 shadow-sm border-r border-[#D8DDE6]",
        isSidebarOpen ? "w-[240px]" : "w-[60px]"
      )}>
        <SidebarContent />
      </aside>

      <div className={clsx(
        "flex-1 flex flex-col min-w-0 transition-all duration-200",
        isSidebarOpen ? "lg:pl-[240px]" : "lg:pl-[60px]"
      )}>
        {/* Compact Salesforce Header */}
        <header className="h-[50px] bg-white border-b border-[#D8DDE6] flex items-center justify-between px-4 sticky top-0 z-40">
           <div className="flex items-center gap-4 flex-1">
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="hidden lg:block p-1 text-stone-400 hover:text-stone-700">
                <Menu className="w-4 h-4" />
              </button>
              <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-1 text-stone-400">
                <Menu className="w-5 h-5" />
              </button>
              
              <div className="relative max-w-lg w-full hidden md:block">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search Customers, Schemes, or Invoices..." 
                  className="w-full bg-[#F3F5F9] border border-transparent focus:bg-white focus:border-primary/30 h-8 pl-9 pr-4 rounded text-[12px] transition-all outline-none" 
                />
              </div>
           </div>

           <div className="flex items-center gap-3">
              <div className="hidden xl:flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded border border-yellow-200">
                 <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                 <span className="text-[10px] font-black text-yellow-800 uppercase tracking-tighter">Gold Spot: ₹7,240</span>
              </div>
              <button className="p-1.5 text-stone-400 hover:text-stone-700 relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
              </button>
              <button className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </button>
           </div>
        </header>

        {/* Workspace Area */}
        <main className="p-4 flex-1">
           <Breadcrumbs />
           <div className="animate-in fade-in duration-500">
            <Outlet />
           </div>
        </main>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden fixed inset-0 bg-[#16325C]/20 backdrop-blur-sm z-[60]" />
            <motion.aside initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }} className="lg:hidden fixed inset-y-0 left-0 w-[240px] z-[70] shadow-2xl">
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
