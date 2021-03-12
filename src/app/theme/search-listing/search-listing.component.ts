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
  selector: 'app-search-listing',
  templateUrl: './search-listing.component.html',
  styleUrls: ['./search-listing.component.scss', 'style.css']
})
export class SearchListingComponent implements OnInit {
  itemLast: number;
  itemFirst: number;
  itemsOnPage = 8;
  currPage = 0;
  pageCount = 0;
  //public books$ : Observable<Book[]>;
  searchString : string;
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

  booksPage : Book[] = [];

  constructor(private route: ActivatedRoute) {
    //books$.push(
    this.itemLast = this.itemsOnPage;
    this.itemFirst = 0;

    this.pageCount = Math.ceil(this.books.length / this.itemsOnPage);

    //if (this.books.length % this.itemsOnPage)
    //    this.pageCount += 1;

    this.changePage(0);
    //this.booksPage.push(this.books[0]);
    //this.booksPage.push(this.books[1]);
    //this.booksPage.push(this.books[2]);
  }

  numSequence(n: number): Array<number> { 
    return Array(n); 
  } 

  previousPage() {
    if (this.currPage == 0)
      return;
    this.changePage(this.currPage - 1);
  }

  nextPage() {
    if (this.currPage == this.pageCount - 1)
      return;
    this.changePage(this.currPage + 1);
  }

  changePage(n) {
    window.scrollTo(0,0);
    console.log(n);
    this.booksPage = [];
    //this.pageCount = this.pageCount + 1;
    //this.pageCount = this.pageCount - 1;
    this.currPage = n;
    for (let i = n * this.itemsOnPage; i < n * this.itemsOnPage + this.itemsOnPage && i < this.books.length; i++) {
      this.booksPage.push(this.books[i]);
    }
  }

  ngOnInit() {
    this.itemLast = this.itemsOnPage;
    this.itemFirst = 0;
    this.route.queryParams.subscribe(
                      params => {
                                 //console.log(params);
                                 this.searchString = params.searchString;
                                 //console.log(this.orderby);
                      }
    );
  }

}
