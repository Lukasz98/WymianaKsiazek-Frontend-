import { Component, OnInit } from '@angular/core';
import {Book} from '@app/_models/book';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  constructor() { }

  books : Book[] = [
    { imgSrc: "asd", title: "Lalka", author: "Bolesław Prus", price: 10, exchange: 1,
      desc: "To jest skrócony opis. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Podkowice Dolne"
    },
    { imgSrc: "asd", title: "Krzyżacy", author: "Henryk Sienkiewicz", price: 15, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Bonifacy", author: "Henryk Sienkiewicz", price: 20, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Bogdaniacy", author: "Henryk Sienkiewicz", price: 25, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Belchioracy", author: "Henryk Sienkiewicz", price: 30, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Benedyktiacy", author: "Henryk Sienkiewicz", price: 35, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Baldwiniacy", author: "Henryk Sienkiewicz", price: 35, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Beniaminiacy", author: "Henryk Sienkiewicz", price: 35, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Bernardiacy", author: "Henryk Sienkiewicz", price: 35, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Błażejacy", author: "Henryk Sienkiewicz", price: 35, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Boguchwalacy", author: "Henryk Sienkiewicz", price: 40, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    }
  ];

  ngOnInit(): void {
  }

}
