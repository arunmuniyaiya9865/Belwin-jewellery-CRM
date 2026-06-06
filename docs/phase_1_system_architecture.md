# Phase 1: System Architecture

## 1. High-Level Architecture
The system follows a **Layered Monolith (Clean Architecture)** approach for the backend and a **Modular Flux-based Architecture** for the frontend.

```mermaid
graph TD
    subgraph "Presentation Layer (React + Vite)"
        UI[User Interface]
        State[Redux / React Query]
    end

    subgraph "Application Layer"
        Routes[Express Routes]
        Controllers[API Controllers]
    end

    subgraph "Business Logic Layer (Services)"
        BS[Business Services]
        Validators[Input Validation]
    end

    subgraph "Data Access Layer (Repositories)"
        Repo[Mongoose Repositories]
    end

    subgraph "Database Layer"
        DB[(MongoDB)]
    end

    UI --> State
    State --> Routes
    Routes --> Controllers
    Controllers --> BS
    BS --> Repo
    Repo --> DB
```

## 2. Frontend Architecture (React)
Path: `src/`

- `app/`: Global providers, store configuration.
- `layouts/`: Shared layouts (Dashboard Layout, Auth Layout).
- `routes/`: Centralized routing logic.
- `modules/`: Feature-sliced modules (e.g., `modules/crm`, `modules/inventory`). Each module has its own `components`, `hooks`, `services`.
- `components/`: UI-Library (Atomic components).
- `services/`: API client configuration.
- `store/`: Global state (Redux slices).

## 3. Backend Architecture (Node/Express)
Path: `src/`

- `config/`: Environment variables, DB connection.
- `controllers/`: Request handling (no business logic here).
- `services/`: Core business logic.
- `repositories/`: Database abstraction/queries.
- `models/`: Mongoose schemas.
- `middlewares/`: Auth, error handling, logging.
- `routes/`: API endpoint definitions.

## 4. Database Schema (ER Diagram)

```mermaid
erDiagram
    BRANCH ||--o{ USER : contains
    BRANCH ||--o{ CUSTOMER : has
    USER ||--o{ ROLE : assigned
    ROLE ||--o{ PERMISSION : allows

    CUSTOMER ||--o{ DOCUMENT : provides
    CUSTOMER ||--o{ NOMINEE : names
    CUSTOMER ||--o{ ENROLLMENT : joins

    SCHEME ||--o{ ENROLLMENT : governs
    ENROLLMENT ||--o{ COLLECTION : pays

    PRODUCT ||--o{ CATEGORY : belongs_to
    PRODUCT ||--o{ STOCK_MOVEMENT : tracks
    VENDOR ||--o{ PRODUCT : supplies

    ENROLLMENT ||--o{ MATURITY : results_in
    MATURITY ||--o{ INVOICE : used_for

    INVOICE ||--o{ INVOICE_ITEM : contains
    INVOICE ||--o{ PAYMENT : settles
```

## 5. Performance & Indexing Strategy
- **Indexes:** Compound indexes on `branchId` + `customerId` for fast lookups. TTL indexes for temporary tokens.
- **Aggregation:** Heavy use of MongoDB Aggregation Pipeline for Reporting.
- **Caching:** Redis (future phase) for gold rates and dashboard stats.
