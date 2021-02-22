import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment';

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

  }    

  facebookButtonClicked():void {
    var redirect_url = window.location.href.replace(window.location.hash,'');
        
    window.location.href = "https://www.facebook.com/dialog/oauth?"
       +"scope="+encodeURIComponent("email")
       +"&client_id="+encodeURIComponent(environment.facebookAppId)
       +"&redirect_uri="+encodeURIComponent(redirect_url);   
  }

  googleButtonClicked():void {  
  }

  instagramButtonClicked():void {  
  }

  logInButtonClicked():void {  
  }

}
