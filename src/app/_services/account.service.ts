import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Account } from '../_models/account';
import { Router } from '@angular/router';

const baseUrl = `apiUrl/auth`;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSubject: BehaviorSubject<Account>;
  public currentUser: Observable<Account>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<Account>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): Account {
     return this.currentUserSubject.value;
   }

   login(email: string, password:string) {
     return this.http.post<any>(`${baseUrl}/login`, {email, password})
     .pipe(map(account => {
        this.currentUserSubject.next(account);
        localStorage.setItem('user', JSON.stringify(account));
        return account;
     }));
   }

   register(account: Account) {
    return this.http.post<any>(`${baseUrl}/register`, account);
   }

   facebookLogin(accessToken: string) {
    return this.http.post<any>(`${baseUrl}/login/facebook`, {accessToken})
     .pipe(map(account => {
        this.currentUserSubject.next(account);
        localStorage.setItem('user', JSON.stringify(account));
        return account;
     }));
   }

   googleLogin(token: string) {
     return this.http.post<any>(`${baseUrl}/login/google`, {token})
     .pipe(map(account => {
      this.currentUserSubject.next(account);
      localStorage.setItem('user', JSON.stringify(account));
      return account;
    }));
   }

   forgotPassword(email: string) {
    return this.http.post(`${baseUrl}/forgot-password`, { email });
   }

   resetPassword(token: string, password: string) {
    return this.http.post(`${baseUrl}/reset-password`, { token, password});
   }
}
