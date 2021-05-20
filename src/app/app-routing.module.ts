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
        redirectTo: 'szukaj',
        pathMatch: 'full'
      },
      {
        path: 'szukaj',
        loadChildren: () => import('./theme/book-search/book-search.module').then(m => m.BookSearchModule)
      },
      {
        path: 'dodaj-ogloszenie',
        loadChildren: () => import('./theme/add-book/add-book.module').then(m => m.AddBookModule)
      },
      {
        path: 'oferta/:id',
        loadChildren: () => import('./theme/offer-view/offer-view.module').then(m => m.OfferViewModule)
      },
      {
        path: 'wyniki/:title/:city/:cat/:cityName/:catName',
        loadChildren: () => import('./theme/search-listing/search-listing.module').then(m => m.SearchListingModule)
      },
      {
        path: 'profil',
        loadChildren: () => import('./theme/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'profile-card',
        loadChildren: () => import('./theme/profile-card/profile-card.module').then(m => m.ProfileCardModule)
      },
      {
        path: 'wiadomości',
        loadChildren: () => import('./theme/chat/chat.module').then(m => m.ChatModule)
      }
      /*
      ,
      {
        path: 'offer',
        loadChildren: () => import('./theme/offer/offer.module').then(m => m.OfferModule)
      }
      */
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'użytkownik',
        loadChildren: () => import('./theme/auth/auth.module').then(m => m.AuthModule)
      }
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


