import { Component, OnInit } from '@angular/core';
import {Offer} from '@app/_models/offer';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  constructor() { }

  books : Offer[] = [
      { imgSrc: "asd", id: 0, book: {title: "Lalka", author: "Bolesław Prus", category: {id: 0, name: "Bajki"}}, price: 10, type: true,
        content: "To jest skrócony opis. Ipsum lorem kipsum giupsum morem lipsum.",
        address: {id: 0, name: "Podkowice Dolne"}, createdOn: "21.04.2021", updatedOn: "21.04.2021", user: 0
      },
      { imgSrc: "asd", id: 0, book: {title: "Lalka", author: "Bolesław Prus", category: {id: 0, name: "Bajki"}}, price: 10, type: true,
        content: "To jest skrócony opis. Ipsum lorem kipsum giupsum morem lipsum.",
        address: {id: 0, name: "Podkowice Dolne"}, createdOn: "21.04.2021", updatedOn: "21.04.2021", user: 0
      },
      { imgSrc: "asd", id: 0, book: {title: "Lalka", author: "Bolesław Prus", category: {id: 0, name: "Bajki"}}, price: 10, type: true,
        content: "To jest skrócony opis. Ipsum lorem kipsum giupsum morem lipsum.",
        address: {id: 0, name: "Podkowice Dolne"}, createdOn: "21.04.2021", updatedOn: "21.04.2021", user: 0
      },
      { imgSrc: "asd", id: 0, book: {title: "Lalka", author: "Bolesław Prus", category: {id: 0, name: "Bajki"}}, price: 10, type: true,
        content: "To jest skrócony opis. Ipsum lorem kipsum giupsum morem lipsum.",
        address: {id: 0, name: "Podkowice Dolne"}, createdOn: "21.04.2021", updatedOn: "21.04.2021", user: 0
      },
      { imgSrc: "asd", id: 0, book: {title: "Lalka", author: "Bolesław Prus", category: {id: 0, name: "Bajki"}}, price: 10, type: true,
        content: "To jest skrócony opis. Ipsum lorem kipsum giupsum morem lipsum.",
        address: {id: 0, name: "Podkowice Dolne"}, createdOn: "21.04.2021", updatedOn: "21.04.2021", user: 0
      },
      { imgSrc: "asd", id: 0, book: {title: "Lalka", author: "Bolesław Prus", category: {id: 0, name: "Bajki"}}, price: 10, type: true,
        content: "To jest skrócony opis. Ipsum lorem kipsum giupsum morem lipsum.",
        address: {id: 0, name: "Podkowice Dolne"}, createdOn: "21.04.2021", updatedOn: "21.04.2021", user: 0
      }
  ];

  ngOnInit(): void {
  }

}
