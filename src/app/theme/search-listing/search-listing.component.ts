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
  itemsOnPage = 3;
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
    { imgSrc: "asd", title: "Krzyżacy", author: "Henryk Sienkiewicz", price: 20, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Krzyżacy", author: "Henryk Sienkiewicz", price: 25, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Krzyżacy", author: "Henryk Sienkiewicz", price: 30, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Krzyżacy", author: "Henryk Sienkiewicz", price: 35, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Krzyżacy", author: "Henryk Sienkiewicz", price: 40, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    }
  ];

  booksPage : Book[] = [];

  constructor(private route: ActivatedRoute) {
    //books$.push(
    this.itemLast = 3;
    this.itemFirst = 0;

    this.pageCount = Math.ceil(this.books.length / this.itemsOnPage);

    //if (this.books.length % this.itemsOnPage)
    //    this.pageCount += 1;

    this.booksPage.push(this.books[0]);
    this.booksPage.push(this.books[1]);
    this.booksPage.push(this.books[2]);
  }

  numSequence(n: number): Array<number> { 
    return Array(n); 
  } 

  changePage(n) {
    console.log(n);
    this.booksPage = [];
    for (let i = n * this.itemsOnPage; i < n * this.itemsOnPage + this.itemsOnPage && i < this.books.length; i++) {
      this.booksPage.push(this.books[i]);
    }
  }

  ngOnInit() {
    this.itemLast = 3;
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
