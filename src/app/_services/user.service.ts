import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from '@app/_models/offer';
import { User } from "@app/_models/user";
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import {AccountService} from "@app/_services/account.service";

const baseUrl = environment.apiUrl + "/api";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private http: HttpClient, private router: Router, private accountService:AccountService) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
     return this.userSubject.value;
  }

  update(params) {
    return this.http.put(`${baseUrl}/${this.userValue.id}`, params)
        .pipe(map((user: User) => {
            // update the current account if it was updated
            if (user.id === this.userValue.id) {
                // publish updated account to subscribers
                user = { ...this.userValue, ...user };
                this.userSubject.next(user);
            }
            return user;
    }));
  }

  delete() {
    return this.http.delete(`${baseUrl}/${this.userValue.id}`)
        .pipe(finalize(() => {
            this.accountService.logout(this.accountService.accountValue.refreshToken);
        }));
  }

  getUser(userId:string)
  {
    return this.http.get<any>(`${baseUrl}/Offer/Profile/${userId}`)
    .subscribe(user => {
      this.userSubject.next(user);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    });
  }

  
}
