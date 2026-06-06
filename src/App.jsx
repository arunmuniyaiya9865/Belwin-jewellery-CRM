import { Routes, Route, Navigate } from 'react-router-dom'

// Layouts & Guards
import MainLayout from './layouts/MainLayout'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './components/ProtectedRoute'

// Core Modules
import CustomerList from './modules/crm/pages/CustomerList'
import CustomerRegistration from './modules/crm/pages/CustomerRegistration'
import CustomerProfile from './modules/crm/pages/CustomerProfile'
import SchemeList from './modules/schemes/pages/SchemeList'
import SchemeCreate from './modules/schemes/pages/SchemeCreate'
import SchemeEnrollment from './modules/schemes/pages/SchemeEnrollment'
import MembershipDetail from './modules/schemes/pages/MembershipDetail'
import CollectionDashboard from './modules/collections/pages/CollectionDashboard'
import CollectionEntry from './modules/collections/pages/CollectionEntry'
import PendingInstallments from './modules/collections/pages/PendingInstallments'
import OverdueMembers from './modules/collections/pages/OverdueMembers'
import ReceiptHistory from './modules/collections/pages/ReceiptHistory'

// Rate Management
import GoldRateToday from './modules/rates/pages/GoldRateToday'
import SilverRate from './modules/rates/pages/SilverRate'
import HistoricalRates from './modules/rates/pages/HistoricalRates'
import RateAnalytics from './modules/rates/pages/RateAnalytics'

// Maturity Management
import MaturityDashboard from './modules/maturity/pages/MaturityDashboard'
import UpcomingMaturity from './modules/maturity/pages/UpcomingMaturity'
import MaturityProcessing from './modules/maturity/pages/MaturityProcessing'
import RedemptionManagement from './modules/maturity/pages/RedemptionManagement'
import RenewalManagement from './modules/maturity/pages/RenewalManagement'
import SettlementLedger from './modules/maturity/pages/SettlementLedger'

// Inventory Management
import InventoryDashboard from './modules/inventory/pages/InventoryDashboard'
import ProductMaster from './modules/inventory/pages/ProductMaster'
import CategoryManagement from './modules/inventory/pages/CategoryManagement'
import PurchaseEntry from './modules/inventory/pages/PurchaseEntry'
import BranchTransfer from './modules/inventory/pages/BranchTransfer'
import StockAdjustment from './modules/inventory/pages/StockAdjustment'
import VendorManagement from './modules/inventory/pages/VendorManagement'

import PosBilling from './modules/billing/pages/PosBilling'
import LedgerList from './modules/finance/pages/LedgerList'

// Dashboard Preview
import DashboardPreview from './pages/DashboardPreview'

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected ERP Routes */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route index element={<DashboardPreview />} />


        {/* CRM Module */}
        <Route path="crm">
          <Route path="customers" element={<CustomerList />} />
          <Route path="customers/create" element={<CustomerRegistration />} />
          <Route path="customers/:id" element={<CustomerProfile />} />
          <Route path="customers/:id/edit" element={<Placeholder title="Edit Customer Profile" />} />
          <Route path="loyalty" element={<Placeholder title="Global Loyalty Dashboard" />} />
          <Route path="logs" element={<Placeholder title="Communication Logs" />} />
        </Route>


        {/* Schemes Module */}
        <Route path="schemes">
          <Route path="list" element={<SchemeList />} />
          <Route path="create" element={<SchemeCreate />} />
          <Route path="enrollment" element={<SchemeEnrollment />} />
          <Route path="membership/:id" element={<MembershipDetail />} />
          <Route path="analytics" element={<Placeholder title="Scheme Financial Analytics" />} />
          <Route path=":id" element={<Placeholder title="Scheme Configuration View" />} />
          <Route path=":id/edit" element={<Placeholder title="Edit Scheme Configuration" />} />
        </Route>

        {/* Collections Module */}
        <Route path="collections">
          <Route index element={<CollectionDashboard />} />
          <Route path="entry" element={<CollectionEntry />} />
          <Route path="pending" element={<PendingInstallments />} />
          <Route path="overdue" element={<OverdueMembers />} />
          <Route path="defaulters" element={<Placeholder title="Defaulter Management" />} />
          <Route path="receipts" element={<ReceiptHistory />} />
        </Route>


        {/* Inventory Management Module */}
        <Route path="inventory">
          <Route index element={<InventoryDashboard />} />
          <Route path="products" element={<ProductMaster />} />
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="stock" element={<Placeholder title="Live Stock Overview" />} />
          <Route path="purchase" element={<PurchaseEntry />} />
          <Route path="inward" element={<Placeholder title="Stock Inward" />} />
          <Route path="outward" element={<Placeholder title="Stock Outward" />} />
          <Route path="transfers" element={<BranchTransfer />} />
          <Route path="adjustments" element={<StockAdjustment />} />
          <Route path="vendors" element={<VendorManagement />} />
          <Route path="alerts" element={<Placeholder title="Low Stock Alerts" />} />
          <Route path="audit" element={<Placeholder title="Internal Stock Audit" />} />
          <Route path="analytics" element={<Placeholder title="Inventory Data Intelligence" />} />
        </Route>

        {/* Billing Module */}
        <Route path="billing">
          <Route path="create" element={<PosBilling />} />
          <Route path="history" element={<Placeholder title="Invoice History" />} />
          <Route path="exchange" element={<Placeholder title="Old Gold Exchange" />} />
          <Route path="buyback" element={<Placeholder title="Buyback Desk" />} />
        </Route>

        {/* Maturity Management Module */}
        <Route path="maturity">
          <Route index element={<MaturityDashboard />} />
          <Route path="upcoming" element={<UpcomingMaturity />} />
          <Route path="process" element={<MaturityProcessing />} />
          <Route path="redemption" element={<RedemptionManagement />} />
          <Route path="renewal" element={<RenewalManagement />} />
          <Route path="settlements" element={<SettlementLedger />} />
          <Route path="analytics" element={<Placeholder title="Maturity Analytics" />} />
        </Route>

        {/* Rate Management Module */}
        <Route path="gold-rates">
          <Route index element={<GoldRateToday />} />
          <Route path="today" element={<GoldRateToday />} />
          <Route path="silver" element={<SilverRate />} />
          <Route path="history" element={<HistoricalRates />} />
          <Route path="analytics" element={<RateAnalytics />} />
        </Route>

        {/* Finance Module */}
        <Route path="finance">
          <Route path="ledger" element={<LedgerList />} />
          <Route path="income" element={<Placeholder title="Income Statement" />} />
          <Route path="expenses" element={<Placeholder title="Expense Tracking" />} />
          <Route path="cashbook" element={<Placeholder title="Petty Cash Book" />} />
        </Route>

        {/* HR Module */}
        <Route path="employees">
          <Route path="list" element={<Placeholder title="Employee Directory" />} />
          <Route path="attendance" element={<Placeholder title="Shift Attendance" />} />
          <Route path="salary" element={<Placeholder title="Payroll Generation" />} />
        </Route>

        {/* Marketing Module */}
        <Route path="marketing">
          <Route path="campaigns" element={<Placeholder title="Campaign Analytics" />} />
          <Route path="sms" element={<Placeholder title="Sms Center" />} />
          <Route path="whatsapp" element={<Placeholder title="WhatsApp API" />} />
        </Route>

        {/* Admin Module */}
        <Route path="admin">
          <Route path="users" element={<Placeholder title="User Management" />} />
          <Route path="roles" element={<Placeholder title="Role Permissions" />} />
          <Route path="branches" element={<Placeholder title="Branch Network" />} />
        </Route>

        {/* System Settings */}
        <Route path="settings" element={<Placeholder title="System Settings" />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

function Placeholder({ title }) {
  return (
    <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-sm text-center">
      <h2 className="text-2xl font-black text-gray-900 mb-2 truncate">{title}</h2>
      <p className="text-gray-500 font-medium">This interface is being optimized for jewellery enterprise workflows.</p>
      <div className="mt-8 flex justify-center">
        <div className="w-16 h-1 h-1 bg-primary/20 rounded-full animate-pulse" />
      </div>
    </div>
  )
}

export default App
