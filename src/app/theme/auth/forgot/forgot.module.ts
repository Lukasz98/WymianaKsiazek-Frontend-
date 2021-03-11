import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotRoutingModule } from './forgot-routing.module';
import { ForgotComponent } from './forgot.component';

import {CustomFormsModule} from 'ngx-custom-validators';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AlertModule } from '@app/theme/alert/alert.module';


@NgModule({
  declarations: [ForgotComponent],
  imports: [
    CommonModule,
    ForgotRoutingModule,
    AlertModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule
  ]
})
export class ForgotModule { }
