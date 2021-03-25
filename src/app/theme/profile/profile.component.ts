import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@app/_services/account.service';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '@app/_services/alert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class ProfileComponent implements OnInit {

  editProfile = true;
  editProfileIcon = 'icofont-edit';
  account: any;
  form: FormGroup;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {
    this.account = this.accountService.accountValue;
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      username: [''],
      address: ['']
    });

  }

  toggleEditProfile() {
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editProfile = !this.editProfile;
  }

  addOffer() {
    this.router.navigateByUrl('/add-book');
  }

  logOut() {
    this.accountService.logout();
  }

  deleteAccount() {
    this.accountService.delete();
  }

  saveChanges() {
      this.accountService.update(this.form.value).pipe(first())
      .subscribe({
        next: () => {
           this.account = this.accountService.accountValue;
            this.toggleEditProfile();
          },

        error: error => {
          this.alertService.error(error);
        }
      });
  }

}
