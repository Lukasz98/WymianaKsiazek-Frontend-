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
import {SelectOptionService} from '../../shared/elements/select-option.service';
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

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss', './search.css' ],

})
export class BookSearchComponent implements OnInit {

  //public dds$ : Observable<DD[]>;
  stateForm: FormGroup;
public testData : TitleCandidate;
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

  submitted: boolean;
  
  opened : number;
  opened2 : number;

  //constructor(private http : HttpClient,private router:Router, private fb:FormBuilder ) {
  constructor(private router:Router, private fb:FormBuilder, private http : HttpClient ) {
    //this.testData =
    const bookName = new FormControl('', Validators.required);
    this.initForm();
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
art(){console.log("gasg");}
  closeDropDown2() {
    console.log("zamykam");
    console.log(this.opened2);
    if (this.opened2)
      this.opened2 = this.opened2 - 1;
    else
      this.showDropDown2 = false;
  }

  ngOnInit() {
    //const url = 'http://ip.jsontest.com/';
    //const url = 'http://date.jsontest.com'; 
    //const url = 'https://jsonplaceholder.typicode.com/posts'
    const url = 'http://localhost:8000/api.php?title=asd';
    //this.dds$ = this.http.get<DD[]>(url)
    
    //let val = this.http.get<TitleCandidate>(url)
    //           .do(console.log)
    //           .map(data => _.values(data));
    //console.log(val);
    //.map(data =>data)
    //console.log(this.dds$);
 /*   
    let status = 0;
    
    this.http.get<TitleCandidate>(url).subscribe(
    (response) => {
        console.log("response recv");
        console.log(response)
        this.d = response
        }
     );
*/




    //{
    //  data => {
    //    status = data.status;
    //  }
      //,
      //error: error => {
      //    console.error('There was an error!', error);
      //}
    //}
    //);
    //console.log(this.d);
  
  }

  onSubmit() {
    //console.log(this.d);
    console.log(this.stateForm.value);
    this.submitted = true;
    //this.http.get('http://ip.jsontest.com/?callback=showMyIP').map(res =>res.json());
    console.log('sumbit');
    //if( this.myForm.value.bookName[0].value)
      //console.log('ruteruje');
      //var inputVal = this.myForm.value.bookName[0].value;
      //if (!inputVal) {
      //  console.log(inputVal);
      //}
      //this.router.navigate(['/other/simple-page']); 
    //}
    //else if (this.autocompleteItems.length) {
    //    console.log("autocompleteItems");

    //}
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


tracking : any;

startTrackingLoop() {
  this.tracking = setInterval(() => {
    console.log(this.stateForm.value.search);
    clearInterval(this.tracking);
    this.tracking = null;
    }, 2000);
}

stopTrackingLoop() {
  clearInterval(this.tracking);
  this.tracking = null;
}

timett : any;
  onStrokeSearch(event: any) {
    
    this.stopTrackingLoop();
    this.startTrackingLoop();

    //   console.log("tu");
    //console.log(this.timett);
    //this.timett = setTimeout(()=> {
    //   console.log("timeout");
    // }, 3000);
    //if (event.target.value) { 
    /*
    console.log("onstroke");
    
    const url = 'http://localhost:40403/api.php?title=asd';
    this.http.get<TitleCandidate>(url).subscribe(
    (response) => {
        console.log("response recv");
        console.log(response)
        this.testData = response
        console.log(this.testData);
        }
     );
   

   */
     
   // this.states = [];
    //for (let i = 0; i < this.d.title.length; i++) {
    //    console.log(i);
    //}
    //console.log(event.target.value);
    //this.states = [];
    //this.states.push(event.target.value);
    //}
  }

  onEnterSearch(event:  KeyboardEvent) {
    //const inputChar = String.fromCharCode(event).charCode;
    //console.log(inputChar);
    //console.log(event.charCode);
    //console.log(event.target);
    //console.log(parseInt(event.target.value));
    //if (event.target.value == 0x0d) {
    //    console.log("enter");
    //}
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
  
  //mouseClickSearch(event : MouseEvent) {
  mouseClickSearch() {
    console.log('mouse click');
    this.onSubmit();
  }
    

}



/*
  //members: TestModel[];
  //public data:any = [];
  //selectedOption : '0';
  //simpleOption : '0';
  //autocompleteItems = [];
     //this.data = this.testserv.GetAllMembers().subscribe((members) => {  
    //   console.log(members)
    //this.members = members  
    //});
    //this.data = this.testserv.GetAllMembers().subscribe((members) => {  
 


*/
