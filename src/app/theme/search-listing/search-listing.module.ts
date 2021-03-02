import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchListingComponent } from './search-listing.component';
import {SearchListingRoutingModule} from './search-listing-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SearchListingRoutingModule,
    SharedModule
  ],
  declarations: [SearchListingComponent]
})
export class SearchListingModule { }
