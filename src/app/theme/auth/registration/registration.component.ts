import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {AccountService} from '@app/_services/account.service'
import {MustMatch} from '@app/_helpers/must.match.validator'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public submitted : boolean;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router) {
    
      this.submitted = false;
   }

  ngOnInit(): void {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme6');

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(128)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: MustMatch('password', 'confirmPassword')
      });
  }

  get f() { return this.form.controls; }

  signUpButtonClicked():void { 
    this.submitted = true;
    if(this.form.invalid) {
      return;
    } 
    
    this.accountService.register(this.form.value).pipe(first()).subscribe({
        next: () => {
          // email verification and alert
        },
        error: () => {
          // rejestracja nie powiodła się (zajęty emial?) Jakiś alert pewnie.
        }
    });

  }

}
