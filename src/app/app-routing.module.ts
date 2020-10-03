import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';

const routes: Routes = [

  {path: '',  redirectTo: '/superadmin', pathMatch: 'full'},
  
  { path: 'super-admin', loadChildren: () => import('./layouts/super-admin/super-admin.module').then(m => m.SuperAdminModule) }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    scrollPositionRestoration: 'top',
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
