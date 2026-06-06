import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginStart, loginSuccess } from '../store/authSlice'
import { motion } from 'framer-motion'
import { ShieldCheck, Gem, Sparkles, TrendingUp, AlertCircle, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }

    setIsLoading(true)
    dispatch(loginStart())

    // Simulate network delay
    setTimeout(() => {
      const mockUser = {
        name: "Admin User",
        role: "Super Admin",
        branch: "Main Branch",
        email: email
      }
      dispatch(loginSuccess(mockUser))
      setIsLoading(false)
      navigate('/')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex bg-gray-50 overflow-hidden">
      {/* Left Pane: Branding & Features (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-secondary relative overflow-hidden flex-col justify-center p-20 text-white">
        {/* Animated Background Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 space-y-12">
          <div>
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-primary/20">
              <Gem className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-heading font-black tracking-tight leading-[1.1]">
              Jewellery CRM <br />
              <span className="text-primary-light">& ERP System</span>
            </h1>
            <p className="text-stone-400 mt-6 text-xl max-w-md">
              The only enterprise-grade intelligence platform built for modern jewellery businesses.
            </p>
          </div>

          <div className="space-y-8">
            {[
              { icon: Sparkles, title: "Smart Schemes", desc: "Automate gold accumulation and chit fund collections." },
              { icon: TrendingUp, title: "Real-time Analytics", desc: "Live gold rates integrated with your POS and inventory." },
              { icon: ShieldCheck, title: "Enterprise Security", desc: "Role-based access control and detailed audit trails." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="flex items-start gap-4"
              >
                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                  <feature.icon className="w-6 h-6 text-primary-light" />
                </div>
                <div>
                  <h4 className="font-bold text-white">{feature.title}</h4>
                  <p className="text-stone-500 text-sm mt-1">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-20">
          <p className="text-stone-600 text-xs font-bold uppercase tracking-widest">
            Trusted by 500+ Retail Outlets Worldwide
          </p>
        </div>
      </div>

      {/* Right Pane: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative">
        {/* Subtle pattern for light mode background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#B8860B_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-heading font-black text-gray-900 tracking-tight">Welcome Back</h2>
            <p className="text-gray-500 mt-2">Sign in to access your Jewellery ERP dashboard</p>
          </div>

          <div className="glass-panel p-8 rounded-3xl !border-gray-100 !bg-white shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-medium"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </motion.div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="name@company.com"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none text-gray-900 font-medium"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Password</label>
                  <button type="button" className="text-xs font-bold text-primary hover:underline">Forgot Password?</button>
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none text-gray-900 font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3 ml-1">
                <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                <label htmlFor="remember" className="text-sm text-gray-500 font-medium cursor-pointer">Remember this device</label>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/30 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In to ERP'
                )}
              </button>
            </form>
          </div>

          <div className="mt-12 text-center text-gray-400">
            <p className="text-xs font-bold uppercase tracking-widest">
              v2.4.0 • &copy; 2026 Bellwin Jewels ERP
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
