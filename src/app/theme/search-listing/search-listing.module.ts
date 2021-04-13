import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchListingComponent } from './search-listing.component';
import {SearchListingRoutingModule} from './search-listing-routing.module';
import {SharedModule} from '../../shared/shared.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
//import { TestService } from '../../services/test.service';
import { BrowserModule } from '@angular/platform-browser';

import {SelectModule} from 'ng-select';
import {SelectOptionService} from '../../shared/elements/select-option.service';
import {TagInputModule} from 'ngx-chips';
import {SearchFilterPipe } from './filter-pipe';

import { ApiService } from './api.service';

import { LetterBoldPipe } from './letter-bold.pipe';
import { ClickOutsideDirective } from './dropdown.directive';

@NgModule({
  imports: [
    CommonModule,
    SearchListingRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    //BrowserModule,
    HttpClientModule,
    SelectModule,
    TagInputModule
  ],
  providers: [ApiService],
  declarations: [
    SearchListingComponent,
    SearchFilterPipe,
    LetterBoldPipe,
    ClickOutsideDirective
    ]
})


export class SearchListingModule { }
