import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import {CustomFormsModule} from 'ngx-custom-validators';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AlertModule } from '@app/theme/alert/alert.module';


@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    CustomFormsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
  ]
})
export class RegistrationModule { }
