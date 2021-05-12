import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { AccountService } from '@app/_services/account.service';
import { AlertService } from '@app/_services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  form: FormGroup;
  public submitted : boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { 
    
    this.submitted = false;
  }

  ngOnInit(): void {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme6');

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    
  }

  get f() { return this.form.controls; }

  changeButtonClicked():void { 
    this.submitted = true;
    if(this.form.invalid) {
      return;
    }

    this.accountService.forgotPassword(this.f.email.value)
    .pipe(first())
    .subscribe({
      next: () => {
        this.alertService.success("Na podany adres e-mail wysłaliśmy dalsze instrukcje.");
        this.router.navigate(["/auth/login"]);
          // email with instructions
      },
      error: error => {
        this.alertService.error("Przypomnienie hasła nie powiodło się. Upewnij się, czy wpisałeś poprawny adres e-mail.");
          // invalid email alert
      }
    });
  }

}
