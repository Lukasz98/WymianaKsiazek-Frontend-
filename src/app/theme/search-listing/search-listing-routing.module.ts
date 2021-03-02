import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchListingComponent} from './search-listing.component';

const routes: Routes = [
  {
    path: '',
    component: SearchListingComponent,
    data: {
      title: 'Wyszukiwania',
      icon: 'icon-layout-sidebar-left',
      caption: 'wyszukiwania',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchListingRoutingModule { }
