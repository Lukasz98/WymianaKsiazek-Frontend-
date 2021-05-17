import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AccountService } from '../_services/account.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private accountService: AccountService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const account = this.accountService.accountValue;
        const isLoggedIn = account && account.accessToken;
        const isApiUrl = req.url.startsWith(environment.apiUrl);
        console.log("tiu");
        console.log(req);
        console.log(account);
        if (isLoggedIn && isApiUrl)
        {
            req = req.clone(
                {
                    setHeaders: {

                    //'Content-Type': 'application/json',
                    Authorization: `Bearer ${account.accessToken}`
                    //Authorization: `Bearer ${account.refreshToken}`
                    //setHeaders: {Authorization: `Bearer ${account.accessToken}`}
}
                }
            );
        }
        console.log(req);
        return next.handle(req);
    }

}
