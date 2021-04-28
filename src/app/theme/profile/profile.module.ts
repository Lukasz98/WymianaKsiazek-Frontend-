import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {DataTablesModule} from 'angular-datatables';
import {TinymceModule} from 'angular2-tinymce';

import {SearchFilterPipe } from './filter-pipe';
import { ApiService } from './api.service';
import { LetterBoldPipe } from './letter-bold.pipe';
import { ClickOutsideDirective } from './dropdown.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    SharedModule,
    TinymceModule,
    DataTablesModule,
    HttpClientModule
  ],
  providers: [ApiService],
  declarations: [
    ProfileComponent,
    SearchFilterPipe,
    LetterBoldPipe,
    ClickOutsideDirective
  ]
})
export class ProfileModule { }
