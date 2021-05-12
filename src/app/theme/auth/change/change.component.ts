import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/_services/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import { first } from 'rxjs/operators';
import { environment } from "@environments/environment";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '@app/_helpers/must.match.validator';
import { AlertService } from '@app/_services/alert.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnInit {

  form: FormGroup;
  public submitted : boolean;
  token = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
  ) { 
    this.submitted = false;
  }

  ngOnInit(): void {

    document.querySelector('body').setAttribute('themebg-pattern', 'theme6');

    this.form = this.formBuilder.group({
      oldpassword: ['', [Validators.required]],
      newpassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(128)]],
    });
  }

  get f() { return this.form.controls; }

  changeButtonClicked():void { 
    this.submitted = true;
    if(this.form.invalid) {
      return;
    } 

    this.alertService.clear();
    
    this.accountService.changePassword(this.f.oldpassword.value, this.f.newpassword.value)
    .pipe(first())
    .subscribe({
      next: () => {
        this.alertService.success('Hasło zresetowane, możesz się teraz zalogować.', { keepAfterRouteChange: true });
        this.router.navigate(['../login'], { relativeTo: this.route });
          
        // back to login and alert

      },
      error: error => {
        this.alertService.error("Zmiana hasła się nie powiodła.");
          // invalid email alert
      }
    });
  }

}
