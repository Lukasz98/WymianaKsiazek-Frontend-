import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Address } from '@app/_models/address';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private addressesSubject:BehaviorSubject<Array<Address>>;
  private addresses:Observable<Array<Address>>;

  constructor(private http: HttpClient, private router: Router) {
    this.addressesSubject = new BehaviorSubject<Array<Address>>(null);
    this.addresses = this.addressesSubject.asObservable();
  }

  public get addressesValue(): Array<Address> {
    return this.addressesSubject.value;
  }

  getAddresses(address:string)
  {
    return this.http.get<any>(`${baseUrl}/Address/${address}`)
    .subscribe(addresses => {
      this.addressesSubject.next(addresses);
      return addresses;
    });
  }
}
