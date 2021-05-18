import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Użytkownik',
      caption: 'użytkownik',
      status: false
    },
    children: [
      {
        path: 'logowanie',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'rejestracja',
        loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule)
      },
      {
        path: 'forgot',
        loadChildren: () => import('./forgot/forgot.module').then(m => m.ForgotModule)
      },
      { //TODO: delete it and make real with services
        path: 'zmiana-hasła',
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
