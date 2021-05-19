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
//import {SelectOptionService} from '../../shared/elements/select-option.service';
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
import 'rxjs/add/operator/map'; 
////import {HttpModule} from '@angular/http';
//import {serialize} from 'json-typescript-mapper';

import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import {createAutoCorrectedDatePipe, createNumberMask, emailMask} from 'text-mask-addons/dist/textMaskAddons';

import { AccountService } from '@app/_services/account.service';
import {Subscription} from 'rxjs/Subscription';
import { environment } from '../../../environments/environment';
import { UserService } from '@app/_services/user.service';

interface ImgResponse {
fileName: string;
}

interface DD {
userId: string,
id: string,
title: string,
body: string
}

interface Category {
id: number,
name: string,
books: any[]
}

interface SendOffer {
content: string,
addressId: number,
type: boolean,
price: number,
title: string,
author: string,
categoryId: number
}

interface BookTest {
title: string,
author: string,
isbn: string,
categoryId: number
}
interface SendOffer2 {
content: string,
price: number,
type: boolean,
book: BookTest,
addressId: number
//token: string
imgName1: string,
imgName2: string,
imgName3: string,
icon: number
}

interface Offer {
id: number,
title: string,
author: string,
categoryId: number,
isbn: string,
offers: any[],
category: any,
}

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss', './search.css' ],

})
export class AddBookComponent implements OnInit {

  form: FormGroup;

  showDropDown = false;
  showDropDown2 = false;
  
  titles : string[];//any[]; 
  authors : string[];//any[] ;
  
  categories : Category[] = [];

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
  cityBlank: boolean;


  opened : number;
  opened2 : number;

  imageSrc1 : string;
  imageSrc2 : string;
  imageSrc3 : string;

  offerThumbnail = 1;
  url = 'https://localhost:5001/';
  
  private dataSub: Subscription = null;
  simpleOption: Array<IOption>;// = this.selectCityService.getCharacters();
  characters: Array<IOption>;



  constructor(private router:Router, private fb:FormBuilder,  private accountService: AccountService, private http : HttpClient, 
                public selectCityService: SelectCityService,
                private userService: UserService
                ) {
    this.initForm();

    this.imgForm1 = this.fb.group({ fileSource: [null] });
    this.imgForm2 = this.fb.group({ fileSource: [null] });
    this.imgForm3 = this.fb.group({ fileSource: [null] });

    this.img1Loaded = true;
    this.img2Loaded = true;
    this.img3Loaded = true;
    //this.accountService.logout(this.accountService.accountValue.accessToken);
    //console.log(this.accountService);
    //if (this.accountService.accountValue) {
    //  console.log(this.accountService.accountValue.accessToken);
    //  this.accountService.logout(this.accountService.accountValue.accessToken);
    //  console.log(this.accountService.account);//.value.token);
    //}
    this.http.get<Category[]>(environment.apiUrl + 'categories').subscribe(
      (response) => {
        console.log("response categories recv");
        console.log(response)
        this.categories = response
      }
    );
  }
 
  ngOnInit() {
    /* 
    this.http.get<Category[]>(this.url + 'api/Offer/categories').subscribe(
      (response) => {
        console.log("response categories recv");
        console.log(response)
        this.categories = response
      }
    );
*/

    this.simpleOption = this.selectCityService.getCharacters();
        this.dataSub = this.selectCityService.loadCharacters().subscribe((options) => {
           this.characters = options;
    });


  }


  initForm(): FormGroup {
    return this.form = this.fb.group({ 
                               title: [null], author: [null], categoryId: [0], content: [null], 
                               fileName1: [null],
                               fileName2: [null], 
                               fileName3: [null],
                               type: [0],
                               price: [0],
                               thumbnailNum: [this.offerThumbnail],
                               addressId: [null]
                       });
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



  onSubmit() {
    console.log(this.accountService);
    if (this.accountService.accountValue) {
      console.log(this.accountService.accountValue.accessToken);
    //  this.accountService.logout(this.accountService.accountValue.accessToken);
      console.log(this.accountService.account);//.value.token);
      //console.log(AccountService.account);//.value.token);
    }
    



    this.submitted = true;
    this.titleBlank = !this.form.value.title;
    this.authorBlank = !this.form.value.author;
    this.cityBlank = !this.form.value.addressId;
    console.log(this.form.value.addressId);
    if (!this.img1Loaded || !this.img2Loaded || !this.img3Loaded)
      return;
    if (this.titleBlank || this.authorBlank || this.cityBlank)
      return;
    console.log(this.form.value);
    console.log('sumbit');

let tmp : SendOffer2 = {
content: this.form.value.content,
price : this.form.value.price,
type : this.form.value.type,
book : {
title : this.form.value.title,
author : this.form.value.author,
isbn : '',
categoryId : this.form.value.categoryId
},
addressId  : this.form.value.addressId,
  
imgName1 :  this.form.value.fileName1,
imgName2 :  this.form.value.fileName2,
imgName3 :  this.form.value.fileName3,
icon : this.offerThumbnail
};
    console.log(tmp);
    


let token = this.accountService.accountValue.accessToken;
    if(this.accountService.accountValue)
    {
        console.log(this.userService.userValue);//.token;
        //token = this.userService.userValue.token;
    }
    let headers: HttpHeaders = new HttpHeaders();
    //headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    
    headers = headers.append('Content-Type', "application/json");
    //headers = headers.append('Content-Type', "application/json-patch+json");
    headers = headers.append('Authorization', 'Bearer ' + token);
    //this.user = this.userService.userValue;
   console.log(headers); 
    //const headers2 = {'Content-Type': "application/json",  'Authorization': token};
    //const headers2 = { 'Authorization': token};
    /*
    this.http.post(environment.apiUrl + 'offer/addoffer2', tmp, { 'headers': headers2, withCredentials=true});//this.form.value)
                         .subscribe((res) => {
                                     console.log(res);
    });
   */ 
    //this.http.post<SendOffer2>(environment.apiUrl + 'offer/addoffer', tmp, { 'headers': headers})//this.form.value)
    //this.http.post<SendOffer2>(environment.apiUrl + 'offer/addoffer', tmp)//this.form.value)
    this.http.post(environment.apiUrl + 'offer/addoffer2', tmp, {responseType: 'text'})
                         .subscribe((res) => {
                                     console.log(res);
    });
    
/*
    let tmp : SendOffer;// = { content: '', addressId: 0, type: false, price: 0 };
    tmp.content = this.form.value.content;
    tmp.addressId= this.form.value.addressId;
    tmp.type = this.form.value.type;
    tmp.price = this.form.value.price;
    tmp.title = this.form.value.title;
    tmp.author = this.form.value.author;
    tmp.categoryId = this.form.value.categoryId;

    console.log(tmp);
    this.http.post<SendOffer>(this.url + 'api/Offer/addoffers', tmp)//this.form.value)
                         .subscribe((res) => {
                                     console.log(res);
    });
*/
/*
interface BookTest {
title: string,
author: string,
isbn: string,
categoryId: number
}
interface SendOffer2 {
content: string,
price: number,
type: boolean,
book: BookTest,
addressId: number
}
*/
  }

  selectValue(value) {
    this.form.patchValue({"title": value.title});
    this.showDropDown = false;
  }

  selectValue2(value) {
    this.form.patchValue({"author": value.author});
    this.showDropDown2 = false;
  }

  onStrokeSearch(event: any) {
    this.stopTrackingLoop();
    this.startTrackingLoop(event.target.value, 'titles');
  }

  onStrokeSearch2(event: any) {
    this.stopTrackingLoop();
    this.startTrackingLoop(event.target.value, 'authors');
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
    
      let addImgUrl = environment.apiUrl + 'addImg';

      if (!this.imageSrc1) {
      console.log("tutej");
        reader.onload = () => {
          this.imageSrc1 = reader.result as string;
          this.img1Loaded = false;
         
          //console.log(this.imgForm1.value);
          this.imgForm1.patchValue({ fileSource: reader.result });
          //this.http.post<ImgResponse>('https://localhost:5001/api/Img/addImg', this.imgForm1.value)
          this.http.post<ImgResponse>(addImgUrl, this.imgForm1.value)
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
          //this.http.post<ImgResponse>('https://localhost:5001/api/Img/addImg', this.imgForm2.value)
          this.http.post<ImgResponse>(addImgUrl, this.imgForm2.value)
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
          //this.http.post<ImgResponse>('https://localhost:5001/api/Img/addImg', this.imgForm3.value)
          this.http.post<ImgResponse>(addImgUrl, this.imgForm3.value)
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

  tracking : any;
  
  startTrackingLoop(val: string, path: string) {
      if (val.length < 2)
        return;
      this.tracking = setInterval(() => {
        console.log(val);
        
        //const url2 = 'https://localhost:5001/api/Offer/' + path + '/' + val;
        let getName = 'title';
        if (path == 'authors')
            getName = 'author';
        let url = environment.apiUrl + "offers/" + path + '?' + getName + '=' + val;
        //this.http.get<Offer[]>(url).subscribe(
        this.http.get<string[]>(url).subscribe(
          (response) => {
            console.log("response offers recv");
            console.log(response)
            if (path == 'titles') {
              this.titles = response;
            }
            else 
              this.authors = response;
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
}

