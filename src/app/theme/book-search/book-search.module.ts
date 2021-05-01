import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookSearchComponent } from './book-search.component';
import {BookSearchRoutingModule} from './book-search-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
//import { TestService } from '../../services/test.service';
import { BrowserModule } from '@angular/platform-browser';

//import { NgSelectModule } from '@ng-select/ng-select';
import {SelectModule} from 'ng-select';
import {SelectCityService} from '../../_services/city_search/select-city.service';
import {TagInputModule} from 'ngx-chips';
import {SearchFilterPipe } from './filter-pipe';

import { ApiService } from './api.service';

import { LetterBoldPipe } from './letter-bold.pipe';
import { ClickOutsideDirective } from './dropdown.directive';
import {CityFilterPipe } from '../../_services/city_search/data-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    BookSearchRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    //BrowserModule,
    HttpClientModule,
    SelectModule,
    TagInputModule
  ],
  providers: [ApiService, SelectCityService],
  declarations: [
    BookSearchComponent,
    SearchFilterPipe,
    LetterBoldPipe,
    ClickOutsideDirective,

    CityFilterPipe
  ]
})
export class BookSearchModule { }
