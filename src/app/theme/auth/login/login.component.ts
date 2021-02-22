import { Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';

declare var FB:any;
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;
  auth2: any;

  constructor() {}

  ngOnInit(): void {

    window['fbAsyncInit'] = function () {
      FB.init({
          appId: environment.facebookAppId,
          cookie: true,
          xfbml: true,
          version: 'v9.0'
      });
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    
  }
  
  checkLoginState():void {
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {   
        // send token to server
        // service.http.post<any>("facebook", {response.accessToken})
      }
      else {
        var redirect_uri = window.location.href.replace(window.location.hash,'');
        
        window.location.href = "https://www.facebook.com/dialog/oauth?"
          +"scope="+encodeURIComponent("email")
          +"&client_id="+encodeURIComponent(environment.facebookAppId)
          +"&redirect_uri="+encodeURIComponent(redirect_uri)
          +"&response_type="+encodeURIComponent("token");

        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('access_token');
        // send token to server
        // service.http.post<any>("faccebook", {myParam})
      }
    });
  }

  facebookButtonClicked():void {
    this.checkLoginState();
       
  }

  logInButtonClicked():void {  
  }

  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '278922565702-pf3rbcsfd8hrai4imcjp8rbtfot79vp1.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        // send token to server
        // service.http.post<any>("google", {profile.getAuthResponse().id_token})

      }, (error) => {
      
    });
  }

  ngAfterViewInit(){
    this.googleInit();
  }

}
