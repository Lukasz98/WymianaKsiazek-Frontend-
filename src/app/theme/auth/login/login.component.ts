import { Component, OnInit } from '@angular/core';

declare var FB:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;


  constructor() { }

  ngOnInit(): void {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme3');

    window['fbAsyncInit'] = function() {
      FB.init({
        appId      : '259160792393197',
        cookie     : true,
        xfbml      : true,
        version    : 'v8.0'
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }    

  facebookButtonClicked():void {
    FB.login((response)=>
        {
          console.log('submitLogin',response);
          if (response.authResponse)
          {
            console.log('succes');
          }
           else
           {
           console.log('User login failed');
         } 
        });       
  }

  googleButtonClicked():void {  
  }

  instagramButtonClicked():void {  
  }

  logInButtonClicked():void {  
  }

}
