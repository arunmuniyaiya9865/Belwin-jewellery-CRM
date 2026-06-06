import { mockProducts } from '../../../mock'
import { Plus, Package, Search, Tag } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ProductList() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-sm text-gray-500">Track and manage your jewellery stock across all categories.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockProducts.map((product, i) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card-premium group"
          >
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur shadow-sm rounded-lg text-[10px] font-bold uppercase">
                {product.purity}
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase mb-1">
                <Tag className="w-3 h-3" />
                {product.category}
              </div>
              <h3 className="font-bold text-gray-900 truncate">{product.name}</h3>
              <p className="text-xs text-gray-500 mt-1">Weight: {product.weight}</p>
              
              <div className="mt-4 flex items-center justify-between">
                <p className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</p>
                <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                  <Package className="w-3 h-3" />
                  {product.stock} in stock
                </div>
              </div>
            </div>
            
            <div className="p-4 pt-0">
              <button className="w-full py-2 bg-gray-50 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">
                Quick Edit
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
