import { useState } from 'react'
import { mockProducts, mockCustomers } from '../../../mock'
import { Search, ShoppingCart, User, Trash2, CreditCard } from 'lucide-react'

export default function PosBilling() {
  const [cart, setCart] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState(mockCustomers[0])

  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: Math.random() }])
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0)
  const gst = subtotal * 0.03 // 3% GST for jewellery

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-160px)]">
      {/* Product Selection */}
      <div className="lg:col-span-2 flex flex-col gap-6 overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products by code or name..." 
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
          <div className="flex gap-2">
            {['Gold', 'Diamond', 'Silver'].map(cat => (
              <button key={cat} className="px-4 py-2 bg-white border border-gray-100 rounded-lg text-sm font-medium hover:border-primary transition-all">
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-4 pb-6">
          {mockProducts.map((product) => (
            <div 
              key={product.id}
              onClick={() => addToCart(product)}
              className="bg-white border border-gray-100 rounded-xl p-3 cursor-pointer hover:shadow-lg hover:border-primary transition-all group"
            >
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-50 mb-3">
                <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <h4 className="font-bold text-sm text-gray-900 truncate">{product.name}</h4>
              <p className="text-xs text-gray-500">{product.purity} • {product.weight}</p>
              <p className="text-sm font-bold text-primary mt-2">₹{product.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cart & Checkout */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 font-bold text-gray-900">
              <ShoppingCart className="w-5 h-5 text-primary" />
              Current Order
            </div>
            <button className="text-xs font-bold text-rose-500" onClick={() => setCart([])}>Clear</button>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">{selectedCustomer.name}</p>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{selectedCustomer.type} Member</p>
            </div>
            <button className="text-xs font-bold text-primary">Change</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.map((item, i) => (
            <div key={item.cartId} className="flex justify-between items-start animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                  <img src={item.image} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 leading-tight">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.weight}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">₹{item.price.toLocaleString()}</p>
                <button 
                  onClick={() => setCart(cart.filter(c => c.cartId !== item.cartId))}
                  className="text-gray-400 hover:text-rose-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {cart.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-gray-300 py-10">
              <ShoppingCart className="w-12 h-12 mb-2 opacity-10" />
              <p className="text-sm font-medium">Cart is empty</p>
            </div>
          )}
        </div>

        <div className="p-6 bg-gray-50 space-y-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 border-b border-gray-200 pb-3">
            <span>GST (3%)</span>
            <span>₹{gst.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xl font-black text-gray-900 pt-1">
            <span>Total</span>
            <span>₹{(subtotal + gst).toLocaleString()}</span>
          </div>
          
          <button className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-4 hover:bg-primary-dark transition-all active:scale-95 shadow-lg shadow-primary/20">
            <CreditCard className="w-5 h-5" />
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  )
}
