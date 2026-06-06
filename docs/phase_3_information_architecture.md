# Phase 3: Information Architecture

## 1. Navigation Hierarchy (Sidebar)

- **Dashboard** (`/`)
- **CRM** (`/crm`)
    - Customer List
    - Premium Members
    - Communication Logs
- **Schemes** (`/schemes`)
    - All Schemes
    - Active Enrollments
    - Scheme Rules
- **Collections** (`/collections`)
    - Collection Entry
    - Defaulters List
    - Daily Report
- **Maturity** (`/maturity`)
    - Pending Maturity
    - Settlement Desk
- **Inventory** (`/inventory`)
    - Products
    - Categories
    - Stock Transfer
- **Billing & POS** (`/billing`)
    - New Invoice
    - Invoice History
    - Buyback/Exchange
- **Finance** (`/finance`)
    - Ledgers
    - Expenses
    - Income Statement
- **Employees** (`/employees`)
    - Directory
    - Payroll
- **Marketing** (`/marketing`)
    - Campaigns
    - Segments
- **Reports** (`/reports`)
    - Sales Report
    - Inventory Audit
- **Administration** (`/admin`)
    - Users & Roles
    - Branches
    - Settings

## 2. Route Mapping Structure
```javascript
<Routes>
  <Route element={<MainLayout />}>
    <Route path="/" element={<Dashboard />} />
    <Route path="/crm/*" element={<CRMModule />} />
    <Route path="/schemes/*" element={<SchemesModule />} />
    {/* ... other modules */}
  </Route>
</Routes>
```

## 3. Global Page Layout
- **Header:** Gold Rate ticker, Branch Selector, Notifications, Profile.
- **Sidebar:** Dynamic based on permissions.
- **Main Area:** Breadcrumbs + Page Title + Action Buttons (e.g., "Add New").
- **Content:** Cards/Tables/Forms.
