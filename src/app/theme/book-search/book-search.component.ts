import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
//import { TestModel } from '../../models/testmodel';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import * as _ from 'lodash';
import 'rxjs/add/operator/map'
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
import 'rxjs/add/operator/map'; 
import {HttpModule} from '@angular/http';
import {serialize} from 'json-typescript-mapper';

import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

interface DD {
userId: string,
id: string,
title: string,
body: string
}

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],

})
export class BookSearchComponent implements OnInit {

  public dds$ : Observable<DD[]>;
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


  myForm: FormGroup;
  submitted: boolean;
  
  opened : number;

  constructor(private http : HttpClient,private router:Router, private fb:FormBuilder ) {
    const bookName = new FormControl('', Validators.required);
    this.myForm = new FormGroup({
      bookName: new FormControl()
    });
    this.initForm();
  }
 
  initForm(): FormGroup {
    return this.stateForm = this.fb.group({ search: [null] });
  }
  
  getSearchValue() {
    return this.stateForm.value.search;
  }

  openDropDown() {
    console.log("showDropDown");
    this.showDropDown = true;
    this.opened = 2;
  }
  
  closeDropDown() {
    if (this.opened)
      this.opened = this.opened - 1;
    else
      this.showDropDown = false;
  }

  ngOnInit() {
    //const url = 'http://ip.jsontest.com/';
    //const url = 'http://date.jsontest.com'; 
    const url = 'https://jsonplaceholder.typicode.com/posts'
    this.dds$ = this.http.get<DD[]>(url)
               .do(console.log)
               .map(data => _.values(data));
    //.map(data =>data)
    console.log(this.dds$);
  }

  onSubmit() {
    console.log(this.stateForm.value.search);
    this.submitted = true;
    //this.http.get('http://ip.jsontest.com/?callback=showMyIP').map(res =>res.json());
    //console.log(this.myForm);
    console.log('sumbit');
    //if (this.myForm.value.bookName) {
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

  onStrokeSearch(event: any) {
    //if (event.target.value) { 
    console.log("onstroke");
    //console.log(event.target.value);
    this.states = [];
    this.states.push(event.target.value);
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
