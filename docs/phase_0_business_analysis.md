# Phase 0: Business Analysis - Jewellery CRM + ERP

## 1. Executive Summary
The Jewellery CRM + ERP system is designed to automate the end-to-end operations of a modern jewellery retail and savings business. It bridges the gap between customer relationship management and operational ERP (Inventory, Finance, Billing).

## 2. Core Business Engine (Primary Workflow)
The system revolves around the **Customer Lifecycle**:

1.  **Lead/Customer Registration:** capturing KYC and contact details.
2.  **Scheme Enrollment:** Customer joins a Gold Saving Scheme or Chit Fund.
3.  **Installment Collection:** Regular monthly/weekly payments tracked via POS or Collection App.
4.  **Maturity Processing:** Calculating final bonus, gold weight, or cash value at the end of the term.
5.  **Jewellery Purchase:** Redeeming the matured amount for physical jewellery.
6.  **POS & Billing:** Generating the final invoice, handling old gold exchange, and tax (GST).
7.  **Accounting:** Updating ledgers, cash books, and bank records.

## 3. Module Inter-dependencies

| Module | Depends On | Provides To |
| :--- | :--- | :--- |
| **CRM** | - | Schemes, Billing, Marketing |
| **Schemes** | CRM | Collections, Maturity |
| **Collections** | Schemes | Finance, Maturity |
| **Maturity** | Collections | Billing, Finance |
| **Inventory** | Purchasing | Billing, POS |
| **Billing** | CRM, Inventory, Maturity | Finance, Reporting |
| **Finance** | Billing, Collections, HR | Reporting, Administration |

## 4. Key Business Rules
- **Gold Rates:** Must be updated globally and affect all pending scheme calculations and billing.
- **KYC Compliance:** Mandatory documents for high-value transactions and scheme enrollments.
- **Branch Isolation:** Each branch manages its own inventory and collections, but Super Admin sees consolidated data.
- **Audit Logging:** Every financial transaction and permission change must be logged.

## 5. Success Metrics (KPIs)
- Total Collection vs. Targeted Collection.
- Scheme Churn Rate (drop-outs).
- Inventory Turnover Ratio.
- Customer Acquisition Cost (CAC) via Marketing module.
