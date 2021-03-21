import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/Observable";

interface Book {
imgSrc: string,
title: string,
author: string,
price: number,
exchange: number,
desc: string,
city: string,
};

@Component({
  selector: 'app-offert-view',
  templateUrl: './offert-view.component.html',
  styleUrls: ['./offert-view.component.scss', 'style.css']
})
export class OffertViewComponent implements OnInit {

imageSrc1 = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.galleries.smcloud.net%2Ft%2Fgalleries%2Fgf-69dd-mFo5-3Nuy_sowa-guma-664x442-nocrop.jpg&f=1&nofb=1";
imageSrc2 = "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fbooklips.pl%2Fwp-content%2Fuploads%2F2015%2F07%2Fsowa-karta-biblioteczna2.jpg&f=1&nofb=1";
imageSrc3 = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fjanadamski.eu%2Fwp-content%2Fuploads%2F2017%2F08%2FSowy_20.jpg&f=1&nofb=1";
mainImageSrc = this.imageSrc1;

  constructor(private route: ActivatedRoute) {

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
