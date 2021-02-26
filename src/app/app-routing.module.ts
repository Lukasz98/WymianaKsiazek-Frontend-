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
        redirectTo: 'book-search',
        pathMatch: 'full'
      },
      {
        path: 'book-search',
        loadChildren: () => import('./theme/book-search/book-search.module').then(m => m.BookSearchModule)
      },
      {
        path: 'add-book',
        loadChildren: () => import('./theme/add-book/add-book.module').then(m => m.AddBookModule)
      },
      {
        path: 'other/simple-page',
        loadChildren: () => import('./theme/simple-page/simple-page.module').then(m => m.SimplePageModule)
      },
      {
        path: 'form',
        loadChildren: () => import('./theme/forms/forms.module').then(m => m.FormsModule)
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
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


