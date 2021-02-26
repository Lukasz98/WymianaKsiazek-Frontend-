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
////import {HttpModule} from '@angular/http';
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
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],

})
export class AddBookComponent implements OnInit {

  public dds$ : Observable<DD[]>;
  stateForm: FormGroup;
  stateForm2: FormGroup;
  restForm : FormGroup;

  showDropDown = false;
  showDropDown2 = false;
      states = ['Alabama', 'Alaska',  'Arizona', 'Arkansas', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'District of Columbia', 'Florida'
          , 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky'
            , 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
              'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
                'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
                  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington',
                     'West Virginia', 'Wisconsin', 'Wyoming'];

  states2 = [ 'Hawaje' ];

  myForm: FormGroup;
  submitted: boolean;
  
  opened : number;
  opened2 : number;

  imageSrc : string;

  constructor(private http : HttpClient,private router:Router, private fb:FormBuilder ) {
    const bookName = new FormControl('', Validators.required);
    this.myForm = new FormGroup({
      bookName: new FormControl()
    });
    this.restForm = new FormGroup({
      description: new FormControl()
    });
    this.initForm();
    this.initForm2();
  }
 
  initForm(): FormGroup {
    return this.stateForm = this.fb.group({ search: [null] });
  }
 
  initForm2(): FormGroup {
    return this.stateForm2 = this.fb.group({ search2: [null] });
  }
  
  getSearchValue() {
    return this.stateForm.value.search;
  }

  getSearchValue2() {
    return this.stateForm2.value.search;
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


  ngOnInit() {
    //const url = 'http://ip.jsontest.com/';
    //const url = 'http://date.jsontest.com'; 
    const url = 'https://jsonplaceholder.typicode.com/posts'
    //this.dds$ = this.http.get<DD[]>(url)
    //           .do(console.log)
    //           .map(data => _.values(data));
    //.map(data =>data)
    //console.log(this.dds$);
  }

  onSubmit() {
    console.log(this.stateForm.value.search);
    console.log(this.stateForm2.value.search2);
    console.log(this.restForm.value.description);
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

 selectValue2(value) {
  this.stateForm2.patchValue({"search2": value});
  console.log("select value");
  this.showDropDown2 = false;
 }

  onStrokeSearch(event: any) {
    //if (event.target.value) { 
    console.log("onstroke");
    //console.log(event.target.value);
    this.states = [];
    this.states.push(event.target.value);
    //}
  }

  onStrokeSearch2(event: any) {
    //if (event.target.value) { 
    console.log("onstroke2");
    //console.log(event.target.value);
    this.states2 = [];
    this.states2.push(event.target.value);
    //}
  }

 
  //mouseClickSearch(event : MouseEvent) {
  mouseClickSearch() {
    console.log('mouse click');
    this.onSubmit();
  }

  onFileChange(event) {
    if(event.target.files && event.target.files.length) {
      const reader = new FileReader();
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        //this.myForm.patchValue({
        //  fileSource: reader.result
        //});                                                                  
      };
    }
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
