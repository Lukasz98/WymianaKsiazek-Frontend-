import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
//import { CustomValidators } from 'ngx-custom-validators';
//import { TestModel } from '../../models/testmodel';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import * as _ from 'lodash';
//import 'rxjs/add/operator/map'
import 'rxjs/Rx';

import {IOption} from 'ng-select';
import {SelectCityService} from '../../_services/city_search/select-city.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/first';
//import { TestService} from '../../services/test.service'; 
//import 'rxjs/add/operator/map'; 
//import {HttpModule} from '@angular/http';
//import {serialize} from 'json-typescript-mapper';

import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import {Subscription} from 'rxjs/Subscription';
import { environment } from '../../../environments/environment';

interface DD {
userId: string,
id: string,
title: string,
body: string
}

class TitleCandidate {
status: number;
//status2: number;
title: Array<string>;
}

class Addresss {
id: number;
name: string;
wojewodztwo: string;
powiat: string;
gmina: string;
offers: number[];
}

interface Category {
id: number,
name: string,
books: any[]
}

interface Offer {
id: number,
title: string,
author: string,
categoryId: number,
isbn: string,
offers: any[],
category: any
}






@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss', './search.css' ],

})
export class BookSearchComponent implements OnInit {

  stateForm: FormGroup;
  showDropDown = false;
  cities : Addresss[];
  categories = [];// 'Dowolna kategoria', 'Kryminały', 'Bajki', 'bajki2',  'bajki3', 'bajki4', 'bajki5', 'bajki6', 'bajki7', 'bajki8', 'bajki9', 'bajk10' ];
  //states : Offer[];
  states : string[];
  showDropDown2 = false;

  submitted: boolean;
  
  private dataSub: Subscription = null;
  simpleOption: Array<IOption>;// = this.selectCityService.getCharacters();  
  characters: Array<IOption>;

  opened : number;
  opened2 : number;
  url = 'https://localhost:5001/address/'; 
  tracking : any;
  timett : any;

  //booksPage : Offer[] = [];
  booksPage : Offer[] = [
    {id:1, title:'tytul',author:'autor',categoryId:2,isbn:null,offers:null,category:null}
  ];


  constructor(private router:Router, private fb:FormBuilder, private http : HttpClient, public selectCityService: SelectCityService) {
    console.log(environment.apiUrl);
    const bookName = new FormControl('', Validators.required);
    this.initForm();
    //const url = 'https://localhost:5001/api/Offer/categories';
    this.http.get<Category[]>(environment.apiUrl + 'categories').subscribe(
      (response) => {
        console.log("response categories recv");
        console.log(response)
        this.categories = response
      }
    );
   /* 
    this.http.get<Offer[]>(environment.apiUrl + 'offers').subscribe(
      (response) => {
        console.log("response offers recv");
        console.log(response)
        this.booksPage = response
      }
    );
    */
  }
 
  initForm(): FormGroup {
    return this.stateForm = this.fb.group({ search: [null], search2: [null], category: [0] });
  }
  
  getSearchValue() {
    return this.stateForm.value.search;
  }

  getSearchValue2() {
    return this.stateForm.value.search2;
  }

  openDropDown() {
    console.log("showDropDown");
    this.showDropDown = true;
    this.opened = 2;
  }
  
  openDropDown2() {
    console.log("showDropDown2");
    this.showDropDown2 = true;
    this.opened2 = 2;
  }

  closeDropDown() {
    if (this.opened)
      this.opened = this.opened - 1;
    else
      this.showDropDown = false;
  }
  
  art() {
    console.log("gasg");}
    closeDropDown2() {
    console.log("zamykam");
    console.log(this.opened2);
    if (this.opened2)
      this.opened2 = this.opened2 - 1;
    else
      this.showDropDown2 = false;
  }
  

  ngOnInit() {
    this.simpleOption = this.selectCityService.getCharacters();
        this.dataSub = this.selectCityService.loadCharacters().subscribe((options) => {
           this.characters = options;
         });

    //const url = 'http://localhost:8000/api.php?title=asd';
    
  }

  onSubmit() {
    console.log(this.stateForm.value);
    this.submitted = true;
    console.log('sumbit');
    console.log(this.stateForm.value.search);
    this.stopTrackingLoop();
    this.router.navigate(['/search-listing/' 
                            + this.stateForm.value.search + '/'
                            + this.stateForm.value.search2 + '/'
                            + this.stateForm.value.category
    ]);
  }

  selectValue(value) {
    this.stateForm.patchValue({"search": value});
    console.log("select value");
    this.showDropDown = false;
  }

  selectValue2(value) {
    this.stateForm.patchValue({"search2": value});
    console.log("select2 value");
    this.showDropDown2 = false;
  }



  startTrackingLoop() {
      if (this.stateForm.value.search.length < 2)
        return;
      this.tracking = setInterval(() => {
        console.log(this.stateForm.value.search);
        
        const url = environment.apiUrl + 'offers/titles?title=' + this.stateForm.value.search;
        //const url2 = 'https://localhost:5001/api/Offer/offers/' + this.stateForm.value.search;
        //this.http.get<Offer[]>(url).subscribe(
        this.http.get<string[]>(url).subscribe(
          (response) => {
            console.log("response offers recv");
            console.log(response)
            this.states = response
          }
        );
  
        clearInterval(this.tracking);
        this.tracking = null;
      }, 2000);
  }

  stopTrackingLoop() {
    clearInterval(this.tracking);
    this.tracking = null;
  }

  onStrokeSearch(event: any) {
    this.stopTrackingLoop();
    this.startTrackingLoop();
  }

  onEnterSearch(event:  KeyboardEvent) {
    this.onSubmit();
  }
  
  onStrokeSearch2(event: any) {
    console.log("onstroke2");
    this.stopTrackingLoop();
    this.startTrackingLoop();
  }

  onStrokeSearch3(event: any) {
    if (this.selectCityService.queryDone && event.target.value.length >= 3)
      return;
    this.selectCityService.queryDone = false;
    if (event.target.value.length >= 3) {
        this.selectCityService.doQuery(event.target.value).subscribe( (response) => { 
          console.log(response);
          SelectCityService.PLAYER_ONE = response;// as Address[];
          this.simpleOption = this.selectCityService.getCharacters();
          console.log(this.simpleOption);
        });
        this.selectCityService.queryDone = true;
    }
    this.simpleOption = this.selectCityService.getCharacters();
  }

  onEnterSearch2(event:  KeyboardEvent) {
    this.onSubmit();
  }
  
  mouseClickSearch() {
    console.log('mouse click');
    this.onSubmit();
  }
   
}



