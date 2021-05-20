import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@app/_services/account.service';
import { first } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@app/_services/alert.service';
import { UserService } from '@app/_services/user.service';
import { ChatService } from '@app/_services/chat.service';

declare var FB:any;
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  auth2: any;
  public submitted : boolean;
  form:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private userService: UserService,
    private chatService: ChatService
  ) {

    this.submitted = false;
  }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme6');

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
  });

  /*

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));*/
    
  }
  
  /*
  checkLoginState():void {
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {   
        this.accountService.facebookLogin(response.accessToken)
        .pipe(first())
        .subscribe({
          next: () => {
            // navigate to profile page probably
          },
          error: error => {
            // logowanie nie powiodło się alert
          }
        });
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

        this.accountService.facebookLogin(access_token)
        .pipe(first())
        .subscribe({
          next: () => {
            // navigate to profile page probably
          },
          error: error => {
            this.alertService.error(error);
            // logowanie nie powiodło się alert
          }
        });
      }
    });
  }

  facebookButtonClicked():void {
    this.checkLoginState();
       
  }

  */
  logInButtonClicked():void { 
    this.submitted = true;

    if(this.form.invalid) {
      return;
    }

    this.accountService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                  // navigate to profile page probably
                  this.userService.getUser(this.accountService.accountValue.id);
                  this.chatService.clear();
                  this.chatService.getContacts(this.accountService.accountValue.id);
                  this.chatService.init();
                  this.router.navigate(["/szukaj"]);
                },
                error: error => {
                  this.alertService.error("Logowanie się nie powiodło. Upewnij się że adres e-mail oraz hasło są poprawne.");
                  // logowanie nie powiodło się (zły email albo hasło) alert
                }
            });
  }

  /*

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

        this.accountService.googleLogin(googleUser.getAuthResponse().id_token)
        .pipe(first())
        .subscribe({
          next: () => {
            // navigate to profile page probably
          }
        })

      }, error => {
        this.alertService.error(error);
        // logowanie nie powiodło się  alert
    });
  }

  ngAfterViewInit(){
    this.googleInit();
    this.facebookInit();
  }

  */
}
