import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Offer } from '@app/_models/offer';
import {OfferService} from "@app/_services/offer.service";

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {

  offerData:Offer;

imageSrc1 = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.galleries.smcloud.net%2Ft%2Fgalleries%2Fgf-69dd-mFo5-3Nuy_sowa-guma-664x442-nocrop.jpg&f=1&nofb=1";
imageSrc2 = "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fbooklips.pl%2Fwp-content%2Fuploads%2F2015%2F07%2Fsowa-karta-biblioteczna2.jpg&f=1&nofb=1";
imageSrc3 = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fjanadamski.eu%2Fwp-content%2Fuploads%2F2017%2F08%2FSowy_20.jpg&f=1&nofb=1";
mainImageSrc = this.imageSrc1;

setMainImg(n: number) {
  if (n == 1)
      this.mainImageSrc = this.imageSrc1;
  else if (n == 2)
      this.mainImageSrc = this.imageSrc2;
  else if (n == 3)
      this.mainImageSrc = this.imageSrc3;
      
}

offerId:string;

  constructor(private offerService:OfferService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route
      .paramMap
      .subscribe(params => {
        this.offerId = params['id'];
    });

    this.offerService.getOffer(this.offerId);

    this.offerData = this.offerService.offerValue;

  }
}
