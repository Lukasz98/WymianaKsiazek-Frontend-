import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FrmValidationComponent} from './frm-validation.component';

const routes: Routes = [
  {
    path: '',
    component: FrmValidationComponent,
    data: {
      title: 'Form Validation',
      icon: 'icon-layout-sidebar-left',
      caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit - validation',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrmValidationRoutingModule { }
