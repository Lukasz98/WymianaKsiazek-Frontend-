import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

import {IOption} from 'ng-select';
import {SelectCityService} from '../../_services/city_search/select-city.service';

import { environment } from '../../../environments/environment';
/*
interface Book {
imgSrc: string,
title: string,
author: string,
price: number,
exchange: number,
desc: string,
city: string,
};
*/
/*
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

interface Offer { // to jest tak na prawde Book, ale na bekendzie nie ma oferty
id: number,
title: string,
author: string,
categoryId: number,
isbn: string,
offers: any[],
category: any
}
*/
interface SearchModel {
address: number,
category: number,
title: string
}

class Address {
id: number;
name: string;
//wojewodztwo: string;
//powiat: string;
//gmina: string;
//offers: number[];
}

interface Category {
id: number,
name: string,
}

interface Book {
id: number,
title: string,
author: string,
category: Category,
isbn: string,
}

interface Offer {
id: number,
content: string,
createdOn: string,
updatedOn: string,
type: boolean,
price: number,
imgName1: string,
imgName2: string,
imgName3: string,
icon: number,

address: Address,
book: Book,
user: any
}
@Component({
  selector: 'app-search-listing',
  templateUrl: './search-listing.component.html',
  styleUrls: ['./search-listing.component.scss', 'style.css', './search.css']
})
export class SearchListingComponent implements OnInit {
  itemLast: number;
  itemFirst: number;
  itemsOnPage = 8;
  currPage = 0;
  pageCount = 0;
  //public books$ : Observable<Book[]>;
  searchString : string;
  cityId: number;
  categoryId: number;
  title: string = ""; 
  books : Offer[] = [];
  booksPage : Offer[] = [];
  //booksPage : Book[] = [];

  simpleOption: Array<IOption>;// = this.selectCityService.getCharacters();  
  characters: Array<IOption>;


  tracking : any;
  timett : any;

// formularz
  stateForm: FormGroup;
  showDropDown = false;
      states :string[];
      cities = ['akapulko', 'pacanowo'];

  categories : Category[];// 'Dowolna kategoria', 'Kryminały', 'Bajki', 'bajki2',  'bajki3', 'bajki4', 'bajki5', 'bajki6', 'bajki7', 'bajki8', 'bajki9', 'bajk10' ];

  showDropDown2 = false;

  myForm: FormGroup;
  submitted: boolean;
  
  opened : number;
  opened2 : number;
//~formularz
apiUrl : string;
  url = 'https://localhost:5001/'; 
  loaded: boolean;
  noResults: boolean;

  constructor(private router:Router, private route: ActivatedRoute, private fb:FormBuilder, private http : HttpClient,  public selectCityService: SelectCityService) {
    this.loaded = false;
    //books$.push(
    this.itemLast = this.itemsOnPage;
    this.itemFirst = 0;
    this.apiUrl = environment.apiUrl;

    //if (this.books.length % this.itemsOnPage)
    //    this.pageCount += 1;

    //this.booksPage.push(this.books[0]);
    //this.booksPage.push(this.books[1]);
    //this.booksPage.push(this.books[2]);
    this.http.get<Category[]>(environment.apiUrl + 'categories').subscribe(
      (response) => {
        console.log("response categories recv");
        console.log(response)
        this.categories = response
      }
    );
  
    this.initForm();
  }

  numSequence(n: number): Array<number> { 
    return Array(n); 
  } 

  previousPage() {
    if (this.currPage == 0)
      return;
    this.changePage(this.currPage - 1);
  }

  nextPage() {
    if (this.currPage == this.pageCount - 1)
      return;
    this.changePage(this.currPage + 1);
  }

  changePage(n) {
    window.scrollTo(0,0);
    console.log(n);
    this.booksPage = [];
    //this.pageCount = this.pageCount + 1;
    //this.pageCount = this.pageCount - 1;
    this.currPage = n;
    for (let i = n * this.itemsOnPage; i < n * this.itemsOnPage + this.itemsOnPage && i < this.books.length; i++) {
      this.booksPage.push(this.books[i]);
    }
  }

  ngOnInit() {
    this.itemLast = this.itemsOnPage;
    this.itemFirst = 0;
    this.title = "";
    this.noResults = false;
    this.route.params.subscribe(params => {
        this.searchString = params['title'];
        this.cityId= params['city'];
        this.categoryId = params['cat'];
        console.log(params);
        console.log(this.cityId);

    this.books = [];
    this.booksPage = [];
    this.itemLast = 0;
    //this.itemsOnPage = 0;
    this.itemFirst = 0;
    this.pageCount = 0;
    this.title = "";
    this.title = "";
    this.noResults = false;
        if (this.searchString && this.searchString !== "null")
            this.title = this.searchString + ", ";
        if (params['cityName'] && params['cityName'] !== 'null' && params['cityName'].length > 1)
            this.title += params['cityName'] + ', ';
        if (params['catName'] && params['catName'] !== 'null')
            this.title += params['catName'];
        let searchModel :SearchModel = {
          address: this.cityId,
          title: this.searchString,
          category: this.categoryId
        };
    this.loaded = false;
        this.http.get<Offer[]>(environment.apiUrl + 'offers/search3?Address=' + this.cityId + '&Title='+ this.searchString + '&Category='+ this.categoryId).subscribe(
          (response) => {
            this.loaded = true;
            this.noResults = false;
            console.log("response categories recv");
            console.log(response)
            this.books = response
            this.pageCount = Math.ceil(this.books.length / this.itemsOnPage);
            this.changePage(0);
          },
          (error) => {
            this.loaded = true;
            this.noResults = true;

          }
        );

    });

  }



  //formularz
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

  closeDropDown2() {
    if (this.opened2)
      this.opened2 = this.opened2 - 1;
    else
      this.showDropDown2 = false;
  }

  onSubmit() {
    console.log(this.stateForm.value);
    this.submitted = true;
    console.log('sumbit');
    console.log(this.stateForm.value.search);
    this.stopTrackingLoop();
    /*
    this.router.navigate(['/wyniki/' 
                            + this.stateForm.value.search + '/'
                            + this.stateForm.value.search2 + '/'
                            + this.stateForm.value.category
    ]);
    */


    this.router.navigate(['/wyniki/' 
                            + this.stateForm.value.search + '/'
                            + this.stateForm.value.search2 + '/'
                            + this.stateForm.value.category + '/'
                            + this.selectCityService.getString(this.stateForm.value.search2) + '/'
                            + this.categories.find( s => s.id == this.stateForm.value.category).name 
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

  //onStrokeSearch(event: any) {
  //  console.log("onstroke");
 // }

  onEnterSearch(event:  KeyboardEvent) {
    this.onSubmit();
  }
  
  onStrokeSearch2(event: any) {
    console.log("onstroke2");
    this.cities = [];
    this.cities.push(event.target.value);
  }

  onEnterSearch2(event:  KeyboardEvent) {
    this.onSubmit();
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
  
  mouseClickSearch() {
    console.log('mouse click');
    this.onSubmit();
  }
  //~formularz

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
          },
          (error) => {
          }
        )
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

}
