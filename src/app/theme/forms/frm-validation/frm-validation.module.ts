import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrmValidationRoutingModule } from './frm-validation-routing.module';
import { FrmValidationComponent } from './frm-validation.component';
import {CustomFormsModule} from 'ngx-custom-validators';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FrmValidationRoutingModule,
    SharedModule,
    CustomFormsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [FrmValidationComponent]
})
export class FrmValidationModule { }
