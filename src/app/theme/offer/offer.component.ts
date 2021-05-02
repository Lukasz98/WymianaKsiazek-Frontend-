import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {

  offerData = { "id": 1, "content": "Opis ogloszonka pobrany z serwerka",
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

  constructor() { }

  ngOnInit(): void {
  }

}
