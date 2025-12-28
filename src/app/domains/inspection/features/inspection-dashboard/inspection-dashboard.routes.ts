import { Routes } from '@angular/router';

/**
 * INSPECTION DOMAIN - Dashboard Feature Routes
 */
export default [
  {
    path: '',
    loadComponent: () =>
      import('./views/dashboard-page/dashboard-page.view').then(m => m.DashboardPageView)
  }
] as Routes;
