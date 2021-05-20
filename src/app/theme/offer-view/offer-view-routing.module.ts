import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OfferViewComponent} from './offer-view.component';

const routes: Routes = [
  {
    path: '',
    component: OfferViewComponent,
    data: {
      title: 'Wymień Książkę - Oferta',
      icon: 'icon-layout-sidebar-left',
      caption: 'Podgląd oferty',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferViewRoutingModule { }
