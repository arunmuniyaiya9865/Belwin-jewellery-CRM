// --- Master Data ---

export const mockCategories = [
  'Gold Ring', 'Gold Chain', 'Gold Necklace', 'Gold Bangle', 'Gold Coin',
  'Silver Ring', 'Silver Chain', 'Silver Coin', 'Diamond Jewellery'
];

export const mockInventoryCategories = [
  {
    id: 'CAT-G',
    name: 'Gold Jewellery',
    sub: ['Gold Rings', 'Gold Chains', 'Gold Necklaces', 'Gold Bangles', 'Gold Earrings']
  },
  {
    id: 'CAT-S',
    name: 'Silver Articles',
    sub: ['Silver Plates', 'Silver Tumblers', 'Silver Idols', 'Silver Anklets']
  },
  {
    id: 'CAT-D',
    name: 'Diamond Collection',
    sub: ['Diamond Rings', 'Diamond Pendants', 'Diamond Studs']
  }
];

export const mockMetalTypes = [
  'Gold 22K', 'Gold 24K', 'Gold 18K', 'Silver', 'Diamond'
];

export const mockBranches = [
  'Chennai Main', 'Trichy', 'Madurai', 'Coimbatore', 'Salem'
];

export const mockStockStatus = [
  'Available', 'Low Stock', 'Out Of Stock', 'Reserved', 'Damaged'
];

export const mockVendors = [
  { id: 'V-101', name: 'ABC Gold Suppliers', code: 'ABC-G', gst: '33AAABC1234F1Z1' },
  { id: 'V-102', name: 'Premium Bullion', code: 'PRM-B', gst: '33AABBB5678G1Z2' },
  { id: 'V-103', name: 'Sri Jewellery Suppliers', code: 'SRI-J', gst: '33AACCC9012H1Z3' },
  { id: 'V-104', name: 'Diamond Traders', code: 'DIA-T', gst: '33AADDD3456I1Z4' },
];

// --- Product Generator ---

const generateProducts = () => {
  const products = [];
  const items = [
    { prefix: 'RNG', names: ['Solitaire', 'Band', 'Fancy', 'Engagement', 'Cocktail'] },
    { prefix: 'CHN', names: ['Curb', 'Rope', 'Snake', 'Figaro', 'Box'] },
    { prefix: 'NCK', names: ['Choker', 'Long', 'Pendant', 'Mala', 'Bridal'] },
    { prefix: 'BNG', names: ['Kada', 'Screw', 'Pipe', 'Set', 'Thin'] },
  ];

  for (let i = 1; i <= 100; i++) {
    const metal = mockMetalTypes[Math.floor(Math.random() * mockMetalTypes.length)];
    const category = mockCategories[Math.floor(Math.random() * mockCategories.length)];
    const branch = mockBranches[Math.floor(Math.random() * mockBranches.length)];
    const status = mockStockStatus[Math.floor(Math.random() * mockStockStatus.length)];
    const vendor = mockVendors[Math.floor(Math.random() * mockVendors.length)];
    
    // Weight logic based on metal
    let weight = (Math.random() * 50 + 2).toFixed(2);
    if (metal === 'Silver') weight = (Math.random() * 500 + 10).toFixed(2);
    if (metal === 'Diamond') weight = (Math.random() * 5 + 0.5).toFixed(2);

    const qty = Math.floor(Math.random() * 20);
    const purchaseRate = metal.includes('Gold') ? 6400 : metal === 'Silver' ? 90 : 85000;
    const inventoryValue = Math.floor(weight * purchaseRate * (qty || 1));

    products.push({
      id: `PRD-${String(i).padStart(3, '0')}`,
      productCode: `${metal.substring(0, 1)}${category.substring(0, 3)}-${String(i).padStart(3, '0')}`,
      productName: `${metal} ${category} - ${i}`,
      category,
      metalType: metal,
      purity: metal.includes('22K') ? '22K' : metal.includes('24K') ? '24K' : '18K',
      weight: `${weight}g`,
      quantity: qty,
      vendor: vendor.name,
      branch,
      stockStatus: qty === 0 ? 'Out Of Stock' : qty < 5 ? 'Low Stock' : status,
      purchaseRate,
      sellingRate: purchaseRate + 500,
      inventoryValue
    });
  }
  return products;
};

export const mockProducts = generateProducts();

// --- Stats Aggregator (Initial) ---
export const getInventoryStats = (data = mockProducts) => {
  return {
    totalValue: data.reduce((acc, curr) => acc + curr.inventoryValue, 0),
    totalProducts: data.length,
    availableStock: data.filter(p => p.stockStatus === 'Available').length,
    reservedStock: data.filter(p => p.stockStatus === 'Reserved').length,
    lowStock: data.filter(p => p.stockStatus === 'Low Stock').length,
    outOfStock: data.filter(p => p.stockStatus === 'Out Of Stock').length,
    totalVendors: mockVendors.length,
    totalBranches: mockBranches.length
  };
};

export const mockStockTransfers = [
  { id: 'TR-5001', from: 'Chennai Main', to: 'Trichy', product: 'Gold Bangle Set', weight: '45.00g', qty: 2, date: '2025-06-01', status: 'Completed' },
  { id: 'TR-5002', from: 'Trichy', to: 'Madurai', product: 'Diamond Ring', weight: '4.20g', qty: 5, date: '2025-06-03', status: 'In Transit' },
];
