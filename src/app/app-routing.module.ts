import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './layout/admin/admin.component';
import {AuthComponent} from './layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'other/simple-page',
        pathMatch: 'full'
      },
      {
        path: 'other/simple-page',
        loadChildren: () => import('./theme/simple-page/simple-page.module').then(m => m.SimplePageModule)
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./theme/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./theme/profile/profile.module').then(m => m.ProfileModule)
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'home/dashboard/default'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
