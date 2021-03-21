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
        path: 'offert-view',
        loadChildren: () => import('./theme/offert-view/offert-view.module').then(m => m.OffertViewModule)
      },
      {
        path: 'search-listing',
        loadChildren: () => import('./theme/search-listing/search-listing.module').then(m => m.SearchListingModule)
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


