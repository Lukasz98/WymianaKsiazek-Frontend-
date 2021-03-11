import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeRoutingModule } from './change-routing.module';
import { ChangeComponent } from './change.component';

import {CustomFormsModule} from 'ngx-custom-validators';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AlertModule } from '@app/theme/alert/alert.module';


@NgModule({
  declarations: [ChangeComponent],
  imports: [
    CommonModule,
    ChangeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    AlertModule,
  ]
})
export class ChangeModule { }
