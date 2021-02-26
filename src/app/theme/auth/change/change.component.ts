import { Component, OnInit } from '@angular/core';

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

  constructor() { }

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
    else
    {
      // change password maybe idk.
    }
  }

}
