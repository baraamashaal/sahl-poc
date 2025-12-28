import { Routes } from '@angular/router';

/**
 * TAWJEEH DOMAIN - Employee Feature Routes
 * Location: domains/tawjeeh/features/employee/
 */
export default [
  {
    path: '',
    loadComponent: () =>
      import('./views/employee-page/employee-page.view').then(m => m.EmployeePageView)
  }
] as Routes;
