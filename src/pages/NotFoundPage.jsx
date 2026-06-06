import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Ghost } from 'lucide-react'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        <div className="relative mb-8 flex justify-center">
          <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full" />
          <div className="relative p-8 bg-white rounded-3xl shadow-2xl border border-gray-100">
            <Ghost className="w-20 h-20 text-primary animate-bounce" />
          </div>
        </div>

        <h1 className="text-6xl font-black text-gray-900 mb-4 tracking-tighter">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Page Lost in the Vault</h2>
        <p className="text-gray-500 mb-10 text-lg">
          The module you are looking for might have been moved or doesn't exist in this branch.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate('/')}
            className="btn-primary flex items-center justify-center gap-2 py-4 px-8 rounded-2xl shadow-lg shadow-primary/20"
          >
            <Home className="w-5 h-5" />
            Go to Dashboard
          </button>
          <button 
            onClick={() => navigate(-1)}
            className="px-8 py-4 bg-white border border-gray-200 rounded-2xl text-gray-700 font-bold hover:bg-gray-50 shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  )
}
