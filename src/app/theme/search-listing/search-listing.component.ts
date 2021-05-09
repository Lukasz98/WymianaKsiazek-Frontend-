import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

import {IOption} from 'ng-select';
import {SelectCityService} from '../../_services/city_search/select-city.service';

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
  
  /*
  books : Book[] = [
    { imgSrc: "asd", title: "Lalka", author: "Bolesław Prus", price: 10, exchange: 1,
      desc: "To jest skrócony opis. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Podkowice Dolne"
    },
    { imgSrc: "asd", title: "Krzyżacy", author: "Henryk Sienkiewicz", price: 15, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Bonifacy", author: "Henryk Sienkiewicz", price: 20, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Bogdaniacy", author: "Henryk Sienkiewicz", price: 25, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Belchioracy", author: "Henryk Sienkiewicz", price: 30, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Benedyktiacy", author: "Henryk Sienkiewicz", price: 35, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Baldwiniacy", author: "Henryk Sienkiewicz", price: 35, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Beniaminiacy", author: "Henryk Sienkiewicz", price: 35, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Bernardiacy", author: "Henryk Sienkiewicz", price: 35, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Błażejacy", author: "Henryk Sienkiewicz", price: 35, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Boguchwalacy", author: "Henryk Sienkiewicz", price: 40, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    }
  ];
*/
  books : Offer[] = [];
  booksPage : Offer[] = [];

  simpleOption: Array<IOption>;// = this.selectCityService.getCharacters();  
  characters: Array<IOption>;

// formularz
  stateForm: FormGroup;
  showDropDown = false;
      states = ['Alabama', 'Alaska',  'Arizona', 'Arkansas', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'District of Columbia', 'Florida'
          , 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky'
            , 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
              'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
                'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
                  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington',
                     'West Virginia', 'Wisconsin', 'Wyoming'];

      cities = ['akapulko', 'pacanowo'];

  categories = [ 'Dowolna kategoria', 'Kryminały', 'Bajki', 'bajki2',  'bajki3', 'bajki4', 'bajki5', 'bajki6', 'bajki7', 'bajki8', 'bajki9', 'bajk10' ];

  showDropDown2 = false;

  myForm: FormGroup;
  submitted: boolean;
  
  opened : number;
  opened2 : number;
//~formularz

  url = 'https://localhost:5001/'; 

  constructor(private route: ActivatedRoute, private fb:FormBuilder, private http : HttpClient,  public selectCityService: SelectCityService) {
    //books$.push(
    this.itemLast = this.itemsOnPage;
    this.itemFirst = 0;
    

    //if (this.books.length % this.itemsOnPage)
    //    this.pageCount += 1;

    //this.booksPage.push(this.books[0]);
    //this.booksPage.push(this.books[1]);
    //this.booksPage.push(this.books[2]);
  
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
    
    

    this.route.params.subscribe(params => {
        this.searchString = params['title'];
        this.cityId= params['city'];
        this.categoryId = params['cat'];
        console.log(params);

        this.http.get<Offer[]>(this.url + 'api/Offer/offers/' + this.searchString).subscribe(
          (response) => {
            console.log("response categories recv");
            console.log(response)
            this.books = response
            this.pageCount = Math.ceil(this.books.length / this.itemsOnPage);
            this.changePage(0);
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

  onStrokeSearch(event: any) {
    console.log("onstroke");
  }

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

}
