import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Offer} from '@app/_models/offer';
import { User } from '@app/_models/user';
import { UserCardService} from '@app/_services/user.card.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {
  
  user: User;

  constructor(private router: Router,
    private userCardService: UserCardService) { }

  ngOnInit(): void {

    this.user = this.userCardService.userValue;

    this.user = {id: '0', email: 'test', firstName: 'e', lastName: 'f', userName: 'user', address: {id: 0, name: "here"},
     offers: [
      { imgSrc: "asd", id: 0, book: {title: "Lalka", author: "Bolesław Prus", category: {id: 0, name: "Bajki"}}, price: 10, type: true,
        content: "To jest skrócony opis. Ipsum lorem kipsum giupsum morem lipsum.",
        address: {id: 0, name: "Podkowice Dolne"}, createdOn: "21.04.2021", updatedOn: "21.04.2021", user: 0
      },
      { imgSrc: "asd", id: 0, book: {title: "Lalka", author: "Bolesław Prus", category: {id: 0, name: "Bajki"}}, price: 10, type: false,
        content: "To jest skrócony opis. Ipsum lorem kipsum giupsum morem lipsum.",
        address: {id: 0, name: "Podkowice Dolne"}, createdOn: "21.04.2021", updatedOn: "21.04.2021", user: 0
      },
      { imgSrc: "asd", id: 0, book: {title: "Lalka", author: "Bolesław Prus", category: {id: 0, name: "Bajki"}}, price: 10, type: true,
        content: "To jest skrócony opis. Ipsum lorem kipsum giupsum morem lipsum.",
        address: {id: 0, name: "Podkowice Dolne"}, createdOn: "21.04.2021", updatedOn: "21.04.2021", user: 0
      },
      { imgSrc: "asd", id: 0, book: {title: "Lalka", author: "Bolesław Prus", category: {id: 0, name: "Bajki"}}, price: 10, type: false,
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
    ]};
  }

}
