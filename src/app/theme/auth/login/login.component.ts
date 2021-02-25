import { Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';

declare var FB:any;
declare const gapi: any;

export class FormInput {
  email: any;
  password: any;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  auth2: any;
  public submit : boolean;
  formInput:FormInput;
  form:any;

  constructor() {
    this.submit = false;
    
  }

  ngOnInit(): void {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme6');

    this.formInput = {
      email: '',
      password : ''
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
        const access_token = urlParams.get('access_token');
        // send token to server
        // service.http.post<any>("faccebook", {access_token})
      }
    });
  }

  facebookButtonClicked():void {
    this.checkLoginState();
       
  }

  logInButtonClicked(form: any):void { 
    this.submit = true;
    if(!form.valid) {
      return;
    } 
    else
    {
      // service.http.post<any>("login", {form.email, form.password};)
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '278922565702-pf3rbcsfd8hrai4imcjp8rbtfot79vp1.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }

  facebookInit() {
    window['fbAsyncInit'] = function () {
      FB.init({
          appId: environment.facebookAppId,
          cookie: true,
          xfbml: true,
          version: 'v9.0'
      });
    };
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        // send token to server
        // service.http.post<any>("google", {profile.getAuthResponse().id_token})

      }, (error) => {
      
    });
  }

  ngAfterViewInit(){
    this.googleInit();
    this.facebookInit();
    
  }

}
