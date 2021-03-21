import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffertViewComponent } from './offert-view.component';
import {OffertViewRoutingModule} from './offert-view-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    OffertViewRoutingModule,
    SharedModule
  ],
  declarations: [OffertViewComponent]
})
export class OffertViewModule { }
