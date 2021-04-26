import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
//import { TestModel } from '../../models/testmodel';
//import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
//import * as _ from 'lodash';
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
import 'rxjs/add/operator/map'; 
////import {HttpModule} from '@angular/http';
//import {serialize} from 'json-typescript-mapper';

import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import {createAutoCorrectedDatePipe, createNumberMask, emailMask} from 'text-mask-addons/dist/textMaskAddons';

import { AccountService } from '@app/_services/account.service';

interface ImgResponse {
fileName: string;
}

interface DD {
userId: string,
id: string,
title: string,
body: string
}

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss', './search.css' ],

})
export class AddBookComponent implements OnInit {

  //public dds$ : Observable<DD[]>;
  form: FormGroup;
  //stateForm2: FormGroup;
  //restForm : FormGroup;

  showDropDown = false;
  showDropDown2 = false;
  titles = ['Alabama', 'Alaska',  'Arizona', 'Arkansas', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'District of Columbia', 'Florida'
          , 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky'
            , 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
              'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
                'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
                  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington',
                     'West Virginia', 'Wisconsin', 'Wyoming'];

  authors = [ 'Hawaje' ];
  categories = [ 'Dowolna kategoria', 'Alabama', 'Alaska',  'Arizona', 'Arkansas', 'California', 'Colorado' ];

  //myForm: FormGroup;
  imgForm1 : FormGroup;
  imgForm2 : FormGroup;
  imgForm3 : FormGroup;
  img1Loaded : boolean;
  img2Loaded : boolean;
  img3Loaded : boolean;
  submitted: boolean;
  titleBlank: boolean;
  authorBlank: boolean;
  priceBlank: boolean;


  opened : number;
  opened2 : number;

  imageSrc1 : string;
  imageSrc2 : string;
  imageSrc3 : string;

  offerThumbnail = 1;
  
  //constructor(private http : HttpClient,private router:Router, private fb:FormBuilder ) {
  constructor(private router:Router, private fb:FormBuilder,  private accountService: AccountService, private http : HttpClient ) {
    this.initForm();

    this.imgForm1 = this.fb.group({ fileSource: [null] });
    this.imgForm2 = this.fb.group({ fileSource: [null] });
    this.imgForm3 = this.fb.group({ fileSource: [null] });

    this.img1Loaded = true;
    this.img2Loaded = true;
    this.img3Loaded = true;
//this.accountService.logout();
    console.log(this.accountService.accountValue.accessToken);
    this.accountService.logout(this.accountService.accountValue.accessToken);
    console.log(this.accountService.account);//.value.token);
  }
 
  initForm(): FormGroup {
    return this.form = this.fb.group({ 
                               title: [null], author: [null], category: [0], description: [null], 
                               fileName1: [null],
                               fileName2: [null], 
                               fileName3: [null],
                               exchange: [null],
                               price: [null],
                               thumbnailNum: [this.offerThumbnail]
                       
                       });
  }

  setThumbnail(n) {
    this.offerThumbnail = n;
    this.form.value.thumbnailNum = n;
  }
  
  getSearchValue() {
    return this.form.value.title;
  }

  getSearchValue2() {
    return this.form.value.author;
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
    const url = 'https://jsonplaceholder.typicode.com/posts'
    //this.dds$ = this.http.get<DD[]>(url)
     //          .do(console.log)
    //           .map(data => _.values(data));
    //.map(data =>data)
  }

  onSubmit() {
    this.submitted = true;
    this.titleBlank = !this.form.value.title;
    this.authorBlank = !this.form.value.author;
    if (!this.img1Loaded || !this.img2Loaded || !this.img3Loaded)
      return;
    if (this.titleBlank || this.authorBlank)
      return;
    console.log(this.form.value);
    //this.http.get('http://ip.jsontest.com/?callback=showMyIP').map(res =>res.json());
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
    this.form.patchValue({"title": value});
    this.showDropDown = false;
  }

  selectValue2(value) {
    this.form.patchValue({"author": value});
    this.showDropDown2 = false;
  }

  onStrokeSearch(event: any) {
    //if (event.target.value) { 
    //console.log("onstroke");
    //console.log(event.target.value);
    this.titles = [];
    this.titles.push(event.target.value);
    //}
  }

  onStrokeSearch2(event: any) {
    this.authors = [];
    this.authors.push(event.target.value);
  }

 
  mouseClickSearch() {
    console.log('mouse click');
    this.onSubmit();
  }
  
  onFileChange(event) {
    if(event.target.files && event.target.files.length) {
      const reader = new FileReader();
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      if (!this.imageSrc1) {
      console.log("tutej");
        reader.onload = () => {
          this.imageSrc1 = reader.result as string;
          this.img1Loaded = false;
         
          //console.log(this.imgForm1.value);
          this.imgForm1.patchValue({ fileSource: reader.result });
          this.http.post<ImgResponse>('https://localhost:5001/api/Img/addImg', this.imgForm1.value)
                         .subscribe((res) => {
                                     this.img1Loaded = true;
                                     console.log(res);
                                     this.form.patchValue({
                                       fileName1: res.fileName
                                     });
                         });
        };
      }
      else if (!this.imageSrc2) {
        reader.onload = () => {
          this.imageSrc2 = reader.result as string;
          this.img2Loaded = false;

          this.imgForm2.patchValue({ fileSource: reader.result });
          this.http.post<ImgResponse>('https://localhost:5001/api/Img/addImg', this.imgForm2.value)
                         .subscribe(res => {
                                     this.img2Loaded = true;
                                     console.log(res);
                                     this.form.patchValue({
                                       fileName2: res.fileName
                                     });
                         });
        };
      }
      else if (!this.imageSrc3) {
        reader.onload = () => {
          this.imageSrc3 = reader.result as string;
          this.img3Loaded = false;

          this.imgForm3.patchValue({ fileSource: reader.result });
          this.http.post<ImgResponse>('https://localhost:5001/api/Img/addImg', this.imgForm3.value)
                         .subscribe(res => {
                                     this.img3Loaded = true;
                                     console.log(res);
                                     this.form.patchValue({
                                       fileName3: res.fileName
                                     });
                         });
        };
      }
    }
  }


  delImg1() {
    this.imageSrc1 = "";
    //this.form.value.fileSource1 = "";
    this.form.patchValue({ fileSource1: "" });
    //this.img1Loaded = false;
    if (this.offerThumbnail == 1) {
        if (this.imageSrc2) {
          this.offerThumbnail = 2;   
        }
        else if (this.imageSrc3) {
          this.offerThumbnail = 3;   
        }
        else {
          this.offerThumbnail = 1;   
        }
        this.form.patchValue({ thumbnailNum: this.offerThumbnail });
    }
  }

  delImg2() {
    this.imageSrc2 = "";
    //this.form.value.fileSource2 = "";
    this.form.patchValue({ fileSource2: "" });
    //this.img2Loaded = false;
  
    if (this.offerThumbnail == 2) {
        if (this.imageSrc1) {
          this.offerThumbnail = 1;   
        }
        else if (this.imageSrc3) {
          this.offerThumbnail = 3;   
        }
        else {
          this.offerThumbnail = 1;   
        }
        this.form.patchValue({ thumbnailNum: this.offerThumbnail });
    }
  }
  
  delImg3() {
    this.imageSrc3 = "";
    //this.form.value.fileSource3 = "";
    this.form.patchValue({ fileSource3: "" });
    //this.img3Loaded = false;
  
    if (this.offerThumbnail == 3) {
        if (this.imageSrc1) {
          this.offerThumbnail = 1;   
        }
        else if (this.imageSrc2) {
          this.offerThumbnail = 2;   
        }
        else {
          this.offerThumbnail = 1;   
        }
        this.form.patchValue({ thumbnailNum: this.offerThumbnail });
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
