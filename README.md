# SAHL POC - Multi-Domain Angular Application

Ministry of Human Resources (MHR) - Consolidating 10 separate applications into one unified platform.

## 🏗️ Architecture: Shared Kernel + Multi-Domain

This project implements a production-ready architecture for consolidating multiple applications:

- **Shared Kernel Pattern (DDD)** - Common employee logic across all domains
- **Domain-Driven Design** - Each app is an independent bounded context
- **Georgebyte Pattern** - components/containers/services structure
- **Signal-Based State** - Modern reactive state with @ngrx/signals
- **Component Prefixes** - Each domain has unique prefix (twj-, ins-, lab-)

### 📖 Documentation

- **[FINAL-ARCHITECTURE.md](./FINAL-ARCHITECTURE.md)** ⭐ - **START HERE** - Complete architecture overview
- [MULTI-APP-ARCHITECTURE.md](./MULTI-APP-ARCHITECTURE.md) - Multi-app consolidation guide
- [DOMAIN-VS-FEATURE.md](./DOMAIN-VS-FEATURE.md) - Understanding domain vs feature

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4.

## 🚀 Quick Start

### Install Dependencies

```bash
npm install
```

### Development Server

To start a local development server, run:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Explore the Domains

Navigate to the implemented domains:
- **Tawjeeh**: `/tawjeeh` or `/tawjeeh/employees`
- **Inspection**: `/inspection` or `/inspection/employees`

Each domain demonstrates:
- Shared kernel employee logic (mhr-employee-card component)
- Domain-specific API services
- Signal-based state management
- Component prefixes (twj-, ins-)

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## 📁 Project Structure

```
src/app/
├── core/          # Singleton services (auth, error handling)
├── shared/        # Reusable UI components, directives, pipes
├── domains/       # Business domains (DDD)
│   └── user-management/
│       ├── features/      # Feature modules
│       ├── domain/        # Domain layer
│       └── infrastructure/# API clients, adapters
├── layout/        # App layout components
└── pages/         # Static pages (home, 404)
```

## 🎯 Key Features

- ✅ **Angular 21** with standalone components
- ✅ **Signals** for reactive state management
- ✅ **@ngrx/signals** for advanced state management
- ✅ **Lazy loading** for optimal performance
- ✅ **OnPush change detection** everywhere
- ✅ **Strict TypeScript** for type safety
- ✅ **Clean Architecture** with DDD principles
- ✅ **Accessibility ready** (WCAG AA)

## ✅ What's Implemented

- ✅ **Shared Kernel** - Employee model, base API, reusable card component
- ✅ **Tawjeeh Domain** (twj- prefix) - Dashboard, employee management
- ✅ **Inspection Domain** (ins- prefix) - Dashboard, employee inspection
- ✅ **Lazy Loading** - All domains lazy loaded
- ✅ **Signal Stores** - Each domain has its own signal-based store
- ✅ **TypeScript Path Aliases** - Clean imports with @app/, @shared-kernel/

## 🚀 Next Steps

Add your remaining **8 domains** following the same pattern:
1. Choose a 3-letter prefix (e.g., `lab-` for Labour Accommodation)
2. Create domain folder structure
3. Extend EmployeeBaseApiService for domain-specific APIs
4. Create domain components with domain prefix
5. Add routes

See [FINAL-ARCHITECTURE.md](./FINAL-ARCHITECTURE.md) for step-by-step guide.

## 🛠️ Technology Stack

- **Angular 21** - Latest framework version
- **TypeScript 5.9** - Strict type checking
- **@ngrx/signals** - Signal-based state management
- **RxJS 7.8** - Reactive programming
- **Vitest 4.0** - Testing framework
- **SCSS** - Styling

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
