import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChangeComponent} from './change.component';

const routes: Routes = [
  {
    path: '',
    component: ChangeComponent,
    data: {
      title: 'Zmiana Hasła',
      caption: 'zmiana hasła'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeRoutingModule { }
