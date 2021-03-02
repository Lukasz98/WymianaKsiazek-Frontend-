import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-search-listing',
  templateUrl: './search-listing.component.html',
  styleUrls: ['./search-listing.component.scss']
})
export class SearchListingComponent implements OnInit {

  searchString : string;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(
                      params => {
                                 //console.log(params);
                                 this.searchString = params.searchString;
                                 //console.log(this.orderby);
                      }
    );
  }

}
