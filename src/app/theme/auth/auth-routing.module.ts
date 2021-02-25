import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Authentication',
      status: false
    },
    children: [
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'forgot',
        loadChildren: () => import('./forgot/forgot.module').then(m => m.ForgotModule)
      },
      { //TODO: delete it and make real with services
        path: 'change',
        loadChildren: () => import('./change/change.module').then(m => m.ChangeModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
