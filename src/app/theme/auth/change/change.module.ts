import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeRoutingModule } from './change-routing.module';
import { ChangeComponent } from './change.component';

import {CustomFormsModule} from 'ngx-custom-validators';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ChangeComponent],
  imports: [
    CommonModule,
    ChangeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule
  ]
})
export class ChangeModule { }
