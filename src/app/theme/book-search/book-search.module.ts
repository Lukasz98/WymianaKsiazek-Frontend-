import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookSearchComponent } from './book-search.component';
import {BookSearchRoutingModule} from './book-search-routing.module';
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
    BookSearchRoutingModule,
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
    BookSearchComponent,
    SearchFilterPipe,
    LetterBoldPipe,
    ClickOutsideDirective
  ]
})
export class BookSearchModule { }
