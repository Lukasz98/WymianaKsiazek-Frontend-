import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from '@app/_models/offer';
import { User } from "@app/_models/user";
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private offerSubject: BehaviorSubject<Offer>;
  public offer: Observable<Offer>;

  constructor(private http: HttpClient, private router: Router) {
    this.offerSubject = new BehaviorSubject<Offer>(null);
    this.offer = this.offerSubject.asObservable();
  }

  public get offerValue(): Offer {
     return this.offerSubject.value;
  }

  update(params) {
    return this.http.put(`${baseUrl}Offer/${this.offerValue.id}`, params)
        .pipe(map((offer: Offer) => {
            // update the current account if it was updated
            if (offer.id === this.offerValue.id) {
                // publish updated account to subscribers
                offer = { ...this.offerValue, ...offer };
                this.offerSubject.next(offer);
            }
            return offer;
    }));
  }

  delete(id) {
    return this.http.delete(`${baseUrl}Offer/${id}`);
  }

  getOffer(offerId:string)
  {
    return this.http.get<any>(`${baseUrl}Offer/${offerId}`)
    .subscribe(offer => {
      this.offerSubject.next(offer);
      return offer;
    });
  }
}
