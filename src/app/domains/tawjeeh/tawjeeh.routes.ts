import { Routes } from '@angular/router';

/**
 * TAWJEEH DOMAIN ROUTES
 *
 * Aggregates all feature routes within Tawjeeh domain.
 * Location: domains/tawjeeh/
 */
export default [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes')
  },
  {
    path: 'employee',
    loadChildren: () => import('./features/employee/employee.routes')
  }
] as Routes;
