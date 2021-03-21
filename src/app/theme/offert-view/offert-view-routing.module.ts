import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OffertViewComponent} from './offert-view.component';

const routes: Routes = [
  {
    path: '',
    component: OffertViewComponent,
    data: {
      title: 'Oferta',
      icon: 'icon-layout-sidebar-left',
      caption: 'podgląd oferty',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffertViewRoutingModule { }
