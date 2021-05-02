import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBookComponent } from './add-book.component';
import {AddBookRoutingModule} from './add-book-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
//import { TestService } from '../../services/test.service';
import { BrowserModule } from '@angular/platform-browser';

import {SelectModule} from 'ng-select';
import {SelectOptionService} from '../../shared/elements/select-option.service';
import {SelectCityService} from '../../_services/city_search/select-city.service';
import {TagInputModule} from 'ngx-chips';
import {SearchFilterPipe } from './filter-pipe';

import { ApiService } from './api.service';

import { LetterBoldPipe } from './letter-bold.pipe';
import { ClickOutsideDirective } from './dropdown.directive';

import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  imports: [
    CommonModule,
    AddBookRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    //BrowserModule,
    HttpClientModule,
    SelectModule,
    TagInputModule,
    TextMaskModule
  ],
  providers: [ApiService, SelectCityService],
  declarations: [
    AddBookComponent,
    SearchFilterPipe,
    LetterBoldPipe,
    ClickOutsideDirective
  ]
})
export class AddBookModule { }
