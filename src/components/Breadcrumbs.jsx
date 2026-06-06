import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumbs() {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  if (location.pathname === '/') return null

  return (
    <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 mb-6 py-1">
      <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
        <Home className="w-3.5 h-3.5" />
        Dashboard
      </Link>
      
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
        const isLast = index === pathnames.length - 1
        
        // Formatter for readable titles
        const title = name.replace(/-/g, ' ').replace(/:/g, '')

        return (
          <div key={name} className="flex items-center gap-2">
            <ChevronRight className="w-3.5 h-3.5 opacity-30" />
            {isLast ? (
              <span className="text-gray-900 truncate max-w-[150px]">{title}</span>
            ) : (
              <Link to={routeTo} className="hover:text-primary transition-colors">
                {title}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
