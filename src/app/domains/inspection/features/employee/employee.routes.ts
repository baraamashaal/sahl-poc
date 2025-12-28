import { Routes } from '@angular/router';

/**
 * INSPECTION DOMAIN - Employee Feature Routes
 * Location: domains/inspection/features/employee/
 */
export default [
  {
    path: '',
    loadComponent: () =>
      import('./views/employee-page/employee-page.view').then(m => m.EmployeePageView)
  }
] as Routes;
