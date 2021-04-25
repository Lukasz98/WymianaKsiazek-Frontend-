import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@app/_services/account.service';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '@app/_services/alert.service';
import { UserService } from '@app/_services/user.service';
import { Offer } from '@app/_models/offer';
import {Book} from "@app/_models/book";
import {Category} from "@app/_models/category";
import {User} from "@app/_models/user";

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
  user: User;
  form: FormGroup;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private userService: UserService
  ) {
    
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      username: [''],
      address: ['']
    });

    this.userService.getUser(this.accountService.accountValue.id);
    this.user = this.userService.userValue;
    this.user.offers = [
      { imgSrc: "asd", id: 0, book: {title: "Lalka", author: "Bolesław Prus", category: {id: 0, name: "Bajki"}}, price: 10, type: true,
        content: "To jest skrócony opis. Ipsum lorem kipsum giupsum morem lipsum.",
        address: {id: 0, name: "Podkowice Dolne"}, createdOn: "21.04.2021", updatedOn: "21.04.2021", user: 0
      },
      { imgSrc: "asd", id: 0, book: {title: "Lalka", author: "Bolesław Prus", category: {id: 0, name: "Bajki"}}, price: 10, type: false,
        content: "To jest skrócony opis. Ipsum lorem kipsum giupsum morem lipsum.",
        address: {id: 0, name: "Podkowice Dolne"}, createdOn: "21.04.2021", updatedOn: "21.04.2021", user: 0
      },
      { imgSrc: "asd", id: 0, book: {title: "Lalka", author: "Bolesław Prus", category: {id: 0, name: "Bajki"}}, price: 10, type: true,
        content: "To jest skrócony opis. Ipsum lorem kipsum giupsum morem lipsum.",
        address: {id: 0, name: "Podkowice Dolne"}, createdOn: "21.04.2021", updatedOn: "21.04.2021", user: 0
      },
      { imgSrc: "asd", id: 0, book: {title: "Lalka", author: "Bolesław Prus", category: {id: 0, name: "Bajki"}}, price: 10, type: false,
        content: "To jest skrócony opis. Ipsum lorem kipsum giupsum morem lipsum.",
        address: {id: 0, name: "Podkowice Dolne"}, createdOn: "21.04.2021", updatedOn: "21.04.2021", user: 0
      },
      { imgSrc: "asd", id: 0, book: {title: "Lalka", author: "Bolesław Prus", category: {id: 0, name: "Bajki"}}, price: 10, type: true,
        content: "To jest skrócony opis. Ipsum lorem kipsum giupsum morem lipsum.",
        address: {id: 0, name: "Podkowice Dolne"}, createdOn: "21.04.2021", updatedOn: "21.04.2021", user: 0
      },
      { imgSrc: "asd", id: 0, book: {title: "Lalka", author: "Bolesław Prus", category: {id: 0, name: "Bajki"}}, price: 10, type: true,
        content: "To jest skrócony opis. Ipsum lorem kipsum giupsum morem lipsum.",
        address: {id: 0, name: "Podkowice Dolne"}, createdOn: "21.04.2021", updatedOn: "21.04.2021", user: 0
      }
    ];

    this.user.address = {id: 0, name: "Here"};
  }

  toggleEditProfile() {
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editProfile = !this.editProfile;
  }

  addOffer() {
    this.router.navigateByUrl('/add-book');
  }

  logOut() {
    this.accountService.logout(this.accountService.accountValue.refreshToken).pipe(first()).
    subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },

      error: error => console.log(error)
    })
  }

  deleteAccount() {
    this.userService.delete();
  }

  saveChanges() {
      this.userService.update(this.form.value).pipe(first())
      .subscribe({
        next: () => {
           this.user = this.userService.userValue;
            this.toggleEditProfile();
          },

        error: error => {
          this.alertService.error(error);
        }
      });
  }

}
