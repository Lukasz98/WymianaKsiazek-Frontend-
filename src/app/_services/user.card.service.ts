import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/_models/user';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

const baseUrl = environment.apiUrl + "/api";

@Injectable({
  providedIn: 'root'
})
export class UserCardService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('seller')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
     return this.userSubject.value;
  }

  getUser(userId:string)
  {
    return this.http.get<any>(`${baseUrl}/Offer/Profile/${userId}`)
    .subscribe(user => {
      this.userSubject.next(user);
      localStorage.setItem('seller', JSON.stringify(user));
      return user;
    });
  }
}
