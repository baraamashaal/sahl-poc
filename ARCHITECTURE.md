# SAHL POC - Architecture

## Overview

Multi-domain Angular application consolidating 10 separate apps. Each domain follows the **Georgebyte architecture pattern** internally with modern Angular 21+ signals and standalone components.

---

## Quick Structure

```
src/app/
├── core/                    # App-wide (auth, config, interceptors)
├── shared/                  # App-wide UI (mhr- prefix)
├── shared-kernel/           # Shared business logic across domains
│   └── employee/
│       ├── components/      # Reusable components
│       ├── services/        # Base services
│       ├── helpers/         # Utilities
│       └── types/           # Shared interfaces
│
└── domains/                 # 10 business domains
    ├── tawjeeh/             # Domain 1 (twj- prefix)
    ├── inspection/          # Domain 2 (ins- prefix)
    └── ...                  # 8 more

    Each domain:
    ├── core/                # Domain-specific core
    ├── shared/              # Domain-specific shared
    └── features/            # Georgebyte pattern ⬇️
        └── {feature}/
            ├── components/  # Presentational (inputs/outputs only)
            ├── containers/  # Smart, non-routable
            ├── views/       # Routable pages
            ├── services/    # HTTP & facade
            │   ├── {feature}.service.ts
            │   └── {feature}.facade.ts
            ├── store/       # State management
            │   └── {feature}.store.ts
            ├── helpers/     # Pure functions
            ├── types/       # Interfaces
            └── {feature}.routes.ts
```

---

## Key Patterns

### 1. Georgebyte Feature Structure
Each feature = complete vertical slice:
- **components/** - UI only (presentational)
- **containers/** - Smart, non-routable
- **views/** - Routable pages
- **services/** - HTTP + facade
- **store/** - NgRx Signal Store (scalable for actions/reducers/effects later)

### 2. Facade Pattern
Clean API wrapping store + service:
```typescript
@Injectable({ providedIn: 'root' })
export class EmployeeFacade {
  private store = inject(EmployeeStore);
  private service = inject(EmployeeService);

  employees = this.store.filteredEmployees;
  loading = this.store.loading;

  loadAll() { this.store.loadAll(); }
}
```

### 3. Store Separation
```
store/
├── {feature}.store.ts      # Current: Signal Store
├── {feature}.actions.ts    # Future: Actions
├── {feature}.reducers.ts   # Future: Reducers
└── {feature}.effects.ts    # Future: Effects
```

---

## Naming

### Prefixes
- **shared-kernel**: `mhr-` (ministry)
- **tawjeeh**: `twj-`
- **inspection**: `ins-`

### Files
```
{feature}.service.ts    # EmployeeService
{feature}.facade.ts     # EmployeeFacade
{feature}.store.ts      # EmployeeStore
{feature}.routes.ts     # Routes
```

### Path = Context
Same file names across domains, path provides context:
```typescript
// shared-kernel/employee/services/employee.service.ts
export class EmployeeService { }

// tawjeeh/features/employee/services/employee.service.ts
export class EmployeeService { }

// Use aliases when importing both:
import { EmployeeService as BaseEmployeeService } from '@shared-kernel/employee';
```

---

## Routing (3 Levels)

```typescript
// 1. App → Domains
{ path: 'tawjeeh', loadChildren: () => import('./domains/tawjeeh/tawjeeh.routes') }

// 2. Domain → Features
{ path: 'employee', loadChildren: () => import('./features/employee/employee.routes') }

// 3. Feature → Views
{ path: '', loadComponent: () => import('./views/employee-page/employee-page.view') }
```

**URLs**: `/tawjeeh/employee`, `/inspection/employee`

---

## Data Flow

```
View
  ↓
Facade.method()
  ↓
Store.action() → Service.apiCall() → Store updates
  ↓
View re-renders
```

---

## Adding Feature

```bash
# 1. Structure
mkdir -p domains/tawjeeh/features/reports/{components,views,services,store,types}

# 2. Files
# services/reports.service.ts
# services/reports.facade.ts
# store/reports.store.ts
# views/reports-page/reports-page.view.ts
# reports.routes.ts

# 3. Register
# tawjeeh.routes.ts:
{ path: 'reports', loadChildren: () => import('./features/reports/reports.routes') }
```

---

## Benefits

- ✅ **Scalable** - 10+ domains, clear structure
- ✅ **Maintainable** - Consistent patterns
- ✅ **Testable** - Facade simplifies tests
- ✅ **Team-friendly** - Domain ownership
- ✅ **Future-ready** - Easy to add actions/reducers

---

## Tech Stack

- Angular 21+
- Standalone components
- Signals for state
- @ngrx/signals for stores
- Lazy loading everywhere
- OnPush change detection
