import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddBookComponent} from './add-book.component';

import {FormSelectComponent} from '../forms/form-select/form-select.component';

const routes: Routes = [
  {
    path: '',
    component: AddBookComponent,
    data: {
      title: 'Add Book',
      icon: 'icon-layout-sidebar-left',
      caption: 'add book page',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddBookRoutingModule { }
