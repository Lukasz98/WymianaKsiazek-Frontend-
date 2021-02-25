import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

export class FormInput {
  email: any;
}

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  formInput : FormInput;
  public submit : boolean;
  form:any;

  constructor(
    private router: Router
  ) { 
    this.submit = false;
  }

  ngOnInit(): void {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme6');

    this.formInput = {
      email: ''
    };
    
  }

  changeButtonClicked(form: any):void { 
    this.submit = true;
    if(!form.valid) {
      return;
    } 
    else
    {
      // send mail (service)

      this.router.navigate(['login']);
    }
  }

}
