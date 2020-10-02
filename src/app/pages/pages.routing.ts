import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';



const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard], // este es un guard que tenemos que implementar con Lazy Load, para comprobar que la ruta no solo se puede activar (CanActivate) si no que se puede cargar.
    loadChildren: () => import('./child-routes.module').then(m => m.ChildRoutesModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule {}
