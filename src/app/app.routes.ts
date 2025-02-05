import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: async () => (await import('src/app/features/calendar/index.routes')).routes
  }
];
