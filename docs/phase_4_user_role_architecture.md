# Phase 4: User Role & Permission Matrix

## 1. Role Definitions

| Role | Responsibility |
| :--- | :--- |
| **Super Admin** | Full system access, multi-branch visibility, configuration. |
| **Branch Manager** | Branch-specific operations, approvals, local reporting. |
| **Sales Executive** | CRM, Billing (read/create), Inventory view. |
| **Cashier** | Billing, Collections, Cash entry. |
| **Collection Exec.** | Field collection tracking, receipts. |
| **Accountant** | Ledgers, Payroll, Financial reports. |

## 2. Permission Matrix

| Module | Super Admin | Manager | Sales | Cashier | Accountant |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Dashboard** | Full | Branch | Limited | Limited | Limited |
| **CRM** | CRUD | CRUD | CRUD | View | View |
| **Billing** | Full | Full | Create | Create | View |
| **Inventory** | Full | CRUD | View | View | View |
| **Finance** | Full | View | - | - | Full |
| **User Management** | Full | - | - | - | - |
| **Approvals** | Full | Branch | - | - | - |

## 3. Implementation Logic
- **RBAC:** Role-Based Access Control.
- **Hook:** `usePermission('VIEW_INVENTORY')` checks current user role against permission table.
- **Route Guard:** Protected routes based on role.
