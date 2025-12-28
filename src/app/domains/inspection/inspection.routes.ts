import { Routes } from '@angular/router';

/**
 * INSPECTION DOMAIN ROUTES
 *
 * Aggregates all feature routes within Inspection domain.
 * Location: domains/inspection/
 */
export default [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/inspection-dashboard/inspection-dashboard.routes')
  },
  {
    path: 'employee',
    loadChildren: () => import('./features/employee/employee.routes')
  }
] as Routes;
