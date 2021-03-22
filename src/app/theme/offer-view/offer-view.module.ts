import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferViewComponent } from './offer-view.component';
import {OfferViewRoutingModule} from './offer-view-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    OfferViewRoutingModule,
    SharedModule
  ],
  declarations: [OfferViewComponent]
})
export class OfferViewModule { }
