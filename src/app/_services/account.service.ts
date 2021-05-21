import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize, first } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Account } from '../_models/account';
import { Router } from '@angular/router';
import {User} from "../_models/user";
import { UserService } from './user.service';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountSubject: BehaviorSubject<Account>;
  public account: Observable<Account>;
  public loged = false;

  constructor(private http: HttpClient, private router: Router) {
    this.accountSubject = new BehaviorSubject<Account>(JSON.parse(localStorage.getItem('account')));
    this.account =this.accountSubject.asObservable();
    //this.account = this.accountSubject.asObservable();
       console.log(this.refreshTokenTimeout);
   }

   public get accountValue(): Account {
     return  this.accountSubject.value;
   }

   public refreshTokenTimeout;

   private startRefreshTokenTimer() {

       // set a timeout to refresh the token a minute before it expires
       //var exp = new Date(this.accountValue.expires);
       //console.log(exp);
       //const timeout = exp.getTime() - Date.now() - (14 * 60 * 1000);
       //console.log(new Date(Date.now() + timeout));
       //console.log(this.refreshTokenTimeout);
       //this.refreshTokenTimeout = setTimeout(() => this.refreshToken(this.accountValue.refreshToken).subscribe(), timeout);
       setInterval(()=>{this.refreshToken(this.accountValue.refreshToken).subscribe()}, 14 * 60 * 1000);
       //console.log(this.refreshTokenTimeout);
   }

   refreshToken(token: string) {
      return this.http.post<any>(`${baseUrl}users/token/refresh`, {token})
        .pipe(map((account) => {
            this.accountSubject.next(account);
            console.log(this.accountValue.expires);
            localStorage.setItem('account', JSON.stringify(account));
            //this.startRefreshTokenTimer();
            return account;
        }));
    }

    private stopRefreshTokenTimer() {
      clearTimeout(this.refreshTokenTimeout);
    }

   login(email: string, password:string) {
     return this.http.post<any>(`${baseUrl}users/token`, {email, password})
     .pipe(map(account => {
        this.accountSubject.next(account);
        localStorage.setItem('account', JSON.stringify(account));
        this.startRefreshTokenTimer();
        return account;
     }));
   }

   logout(token) {
  console.log("logo");
    return this.http.post<any>(`${baseUrl}users/signout`, {token}).pipe(
      finalize(() => {
        this.loged = false;
        this.stopRefreshTokenTimer();
        this.accountSubject.next(null);
        localStorage.removeItem('account');
        localStorage.removeItem('user');
      })
    );
   }

   register(account: User) {
    return this.http.post<any>(`${baseUrl}users/register`, account);
   }

   facebookLogin(accessToken: string) {
    return this.http.post<any>(`${baseUrl}login/facebook`, {accessToken})
     .pipe(map(account => {
        this.accountSubject.next(account);
        localStorage.setItem('account', JSON.stringify(account));
        this.startRefreshTokenTimer();
        return account;
     }));
   }

   googleLogin(token: string) {
     return this.http.post<any>(`${baseUrl}login/google`, {token})
     .pipe(map(account => {
      this.accountSubject.next(account);
      localStorage.setItem('account', JSON.stringify(account));
      this.startRefreshTokenTimer();
      return account;
    }));
   }

   verifyEmail(token: string) {
    return this.http.post(`${baseUrl}verify-email`, { token });
}

   forgotPassword(email: string) {
    return this.http.post(`${baseUrl}user/resetpassword/sendemail`, { email });
   }

   resetPassword(password: string, token: string) {
    return this.http.post(`${baseUrl}reset-password`, {token, password});
   }

   changePassword(oldPassword: string, newPassword: string)
   {
     return this.http.post(`${baseUrl}user/changepassword`, {oldPassword, newPassword});
   }
}
