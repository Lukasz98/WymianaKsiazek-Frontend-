import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/_services/account.service';
import {Router} from '@angular/router';
import { first } from 'rxjs/operators';
import { environment } from "../../../../environments/environment";

export class FormInput {
  password: any;
  rpassword: any;
}

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnInit {

  formInput : FormInput;
  public submit : boolean;
  form:any;

  constructor(
    private router: Router,
    private accountService: AccountService
  ) { 
    this.submit = false;
  }

  ngOnInit(): void {

    document.querySelector('body').setAttribute('themebg-pattern', 'theme6');

    this.formInput = {
      password: '',
      rpassword: ''
    };
  }

  changeButtonClicked(form: any):void { 
    this.submit = true;
    if(!form.valid) {
      return;
    } 
    
    this.accountService.resetPassword(form.value.password)
    .pipe(first())
    .subscribe({
      next: () => {
          
        // back to login and alert

        //this.router.navigateByUrl(environment.apiUrl + "/auth/login");
      },
      error: error => {
        
          // invalid email alert
      }
    });
  }

}
