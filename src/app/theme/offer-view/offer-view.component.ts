import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
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
interface Address {
id: number,
name: string
}

interface Category {
id: number,
name: string
}

interface Book {
id: number,
title: string,
author: string,
isbn: string,
category: Category
}

interface Offer {
id: number,
content: string,
createdOn: string,
updatedOn: string,
type: boolean,
price: number,
address: Address,
book: Book,
user: number
}

@Component({
  selector: 'app-offer-view',
  templateUrl: './offer-view.component.html',
  styleUrls: ['./offer-view.component.scss', 'style.css']
})
export class OfferViewComponent implements OnInit {

offerData : Offer;

imageSrc1 = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.galleries.smcloud.net%2Ft%2Fgalleries%2Fgf-69dd-mFo5-3Nuy_sowa-guma-664x442-nocrop.jpg&f=1&nofb=1";
imageSrc2 = "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fbooklips.pl%2Fwp-content%2Fuploads%2F2015%2F07%2Fsowa-karta-biblioteczna2.jpg&f=1&nofb=1";
imageSrc3 = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fjanadamski.eu%2Fwp-content%2Fuploads%2F2017%2F08%2FSowy_20.jpg&f=1&nofb=1";
mainImageSrc = this.imageSrc1;

  constructor(private route: ActivatedRoute, private http : HttpClient ) {
    //this.offerData.content = "opis";
    //this.offerData.type = false;




    //const url = 'http://localhost:40403/api.php?title=asd';
    //const url = 'http://localhost:5000/Offer/1';
    const url = 'https://localhost:5001/api/Offer/1';
    this.http.get<Offer>(url).subscribe(
      (response) => {
        console.log("response recv");
        console.log(response)
        this.offerData = response
        console.log(this.offerData);
   //console.log(this.d);
    //for (let i = 0; i < this.d.title.length; i++) {
    //    console.log(i);
    //}
        }
     );
  }

  setMainImg(n: number) {
    if (n == 1)
        this.mainImageSrc = this.imageSrc1;
    else if (n == 2)
        this.mainImageSrc = this.imageSrc2;
    else if (n == 3)
        this.mainImageSrc = this.imageSrc3;
        
  }


  ngOnInit() {
    //this.route.queryParams.subscribe(
    //                  params => {
    //                             this.searchString = params.searchString;
    //                  }
    //);
  }

}
