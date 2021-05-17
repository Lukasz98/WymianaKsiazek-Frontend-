import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookSearchComponent} from './book-search.component';

//import {FormSelectComponent} from '../forms/form-select/form-select.component';

const routes: Routes = [
  {
    path: '',
    component: BookSearchComponent,
    data: {
      title: 'Szukaj',
      icon: 'icon-layout-sidebar-left',
      caption: 'wyszukiwanie ogłoszeń',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookSearchRoutingModule { }
