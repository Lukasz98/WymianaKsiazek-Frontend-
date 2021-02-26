import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {AccountService} from '../../../_services/account.service'

export class FormInput {
  email: any;
  password: any;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public submit : boolean;
  formInput:FormInput;
  form:any;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router) {
    
      this.submit = false;
   }

  ngOnInit(): void {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme6');

    this.formInput = {
      email: '',
      password : ''
    };
  }

  signUpButtonClicked(form: any):void { 
    this.submit = true;
    if(!form.valid) {
      return;
    } 
    
    this.accountService.register(form.value).pipe(first()).subscribe({
        next: () => {
          // navigate to profile page probably
        },
        error: () => {
          // rejestracja nie powiodła się (zajęty emial?) Jakiś alert pewnie.
        }
    });

  }

}
