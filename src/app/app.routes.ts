import { Routes } from '@angular/router';

/**
 * Root Application Routes
 *
 * Routes are organized by:
 * 1. Static pages (home, 404)
 * 2. Domain routes (lazy loaded)
 *
 * Each domain is lazy loaded for optimal performance
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent)
  },

  // DOMAIN ROUTES (Lazy Loaded)
  {
    path: 'tawjeeh',
    loadChildren: () =>
      import('./domains/tawjeeh/tawjeeh.routes')
  },
  {
    path: 'inspection',
    loadChildren: () =>
      import('./domains/inspection/inspection.routes')
  },
  // Add remaining 8 domains here:
  // {
  //   path: 'labour-accommodation',
  //   loadChildren: () => import('./domains/labour-accommodation/labour-accommodation.routes')
  // },

  // 404 Page
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
