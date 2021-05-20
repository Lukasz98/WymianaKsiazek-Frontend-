import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { User } from '../../_models/user';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/pl';
import { AccountService } from '@app/_services/account.service';
import {OfferService} from '@app/_services/offer.service';
registerLocaleData(localeFr, 'pl');

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
class Address {
id: number;
name: string

}

class Category {
id: number;
name: string;
}

class Book {
id: number;
title: string;
author: string;
isbn: string;
category: Category
constructor()
{
this.category = new Category();
}
}

class Offer {
id: number;
content: string;
createdOn: string;
updatedOn: string;
type: boolean;
price: number;
address: Address;
book: Book;
user: User;
imgName1: string = "";
imgName2: string = "";
imgName3: string = "";
icon: number

constructor()
{
this.book = new Book();
this.address = new Address();
}
}

@Component({
  selector: 'app-offer-view',
  templateUrl: './offer-view.component.html',
  styleUrls: ['./offer-view.component.scss', 'style.css']
})
export class OfferViewComponent implements OnInit {

offerData : Offer = new Offer();
deleteOffer: Boolean;
loged:Boolean;

//imageSrc1 = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.galleries.smcloud.net%2Ft%2Fgalleries%2Fgf-69dd-mFo5-3Nuy_sowa-guma-664x442-nocrop.jpg&f=1&nofb=1";
//imageSrc2 = "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fbooklips.pl%2Fwp-content%2Fuploads%2F2015%2F07%2Fsowa-karta-biblioteczna2.jpg&f=1&nofb=1";
//imageSrc3 = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fjanadamski.eu%2Fwp-content%2Fuploads%2F2017%2F08%2FSowy_20.jpg&f=1&nofb=1";
imageSrc1 : string;
imageSrc2 : string;
imageSrc3 : string;
mainImageSrc = this.imageSrc1;

  constructor(private route: ActivatedRoute, private http : HttpClient, private accountService: AccountService, private offerService: OfferService, private router: Router) {
    this.loged = false;
    //this.offerData.content = "opis";
    //this.offerData.type = false;
/*
this.offerData = { "id": 1, "content": "Opis ogloszonka pobrany z serwerka",
"createdOn": "2021-03-17T12:21:12.3162045",
"updatedOn": "2021-03-17T12:21:12.3164304",
"type": true,
"price": 10,
"address": {
"id": 1,
"name": "torun"
},
"book": {
"id": 1,
"title": "Głód",
"author": "Martin Caparros",
"isbn": "91283691236",
"category": {
"id": 5,
"name": "Literatura faktu, reportaż"
}
},
"user": null
};
*/

    //const url = 'http://localhost:40403/api.php?title=asd';
    //const url = 'http://localhost:5000/Offer/1';
    //const url = 'https://localhost:5001/api/Offer/35';
   //console.log(this.d);
    //for (let i = 0; i < this.d.title.length; i++) {
    //    console.log(i);
    //}
  }

  setMainImg(n: number) {
    if (n == 1)
        this.mainImageSrc = this.offerData.imgName1;
    else if (n == 2)
        this.mainImageSrc = this.offerData.imgName2;
    else if (n == 3)
        this.mainImageSrc = this.offerData.imgName3;
        
  }
loaded: boolean;
  id;
apiUrl : string;
  ngOnInit() {
    this.apiUrl = environment.apiUrl;
    this.route.params.subscribe(
                      params => {
                    
                    const url = environment.apiUrl + 'offer/' + params['id'];
                    this.id = params['id'];
                    this.http.get<Offer>(url).subscribe(
                      (response) => {
                        console.log("response recv");
                        console.log(response)
                        this.offerData = response;
                        if(this.accountService.accountValue)
                        {
                          this.loged = true;
                          this.deleteOffer = this.accountService.accountValue.id === this.offerData.user.id;
                        }
                        //console.log(this.offerData);
                        
                        //this.imageSrc1 = "assets/images/brak_zdjecia.png";
                        //this.mainImageSrc = "assets/images/brak_zdjecia.png";
                        if (this.offerData.imgName1 && (this.offerData.icon == 0 || this.offerData.icon == 1))
                            this.mainImageSrc = this.offerData.imgName1;
                        else if (this.offerData.imgName2 && this.offerData.icon == 2)
                            this.mainImageSrc = this.offerData.imgName2;
                        else if (this.offerData.imgName3 && this.offerData.icon == 3)
                            this.mainImageSrc = this.offerData.imgName3;
                        this.loaded = true; 
                        //this.mainImageSrc = this.imageSrc1;
                        }
                     );
              }
    );
  }

  sendMessage(user:User)
  {
      this.router.navigate(['/wiadomości'], {queryParams: {
        userId: user.id,
        userName: user.userName
      }})
  }

  deleteOff()
  {
    this.offerService.delete(this.id).pipe()
    .subscribe(
      () => {
        this.router.navigate(['/profil']);
      }
    );
  }

  toDate(str) {
    if (str)
    return new Date(str).toDateString();
  }

}
