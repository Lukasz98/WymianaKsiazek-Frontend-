import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@app/_services/account.service';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '@app/_services/alert.service';
import { Book } from '@app/_models/book';

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

  books : Book[] = [
    { imgSrc: "asd", title: "Lalka", author: "Bolesław Prus", price: 10, exchange: 1,
      desc: "To jest skrócony opis. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Podkowice Dolne"
    },
    { imgSrc: "asd", title: "Krzyżacy", author: "Henryk Sienkiewicz", price: 15, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Bonifacy", author: "Henryk Sienkiewicz", price: 20, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Bogdaniacy", author: "Henryk Sienkiewicz", price: 25, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Belchioracy", author: "Henryk Sienkiewicz", price: 30, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Benedyktiacy", author: "Henryk Sienkiewicz", price: 35, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Baldwiniacy", author: "Henryk Sienkiewicz", price: 35, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Beniaminiacy", author: "Henryk Sienkiewicz", price: 35, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Bernardiacy", author: "Henryk Sienkiewicz", price: 35, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Błażejacy", author: "Henryk Sienkiewicz", price: 35, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    },
    { imgSrc: "asd", title: "Boguchwalacy", author: "Henryk Sienkiewicz", price: 40, exchange: 0,
      desc: "To jest skrócony opis 2. Ipsum lorem kipsum giupsum morem lipsum.",
      city: "Nadkowice Górne"
    }
  ];

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
    this.accountService.logout(this.accountService.accountValue.refreshToken).pipe(first()).
    subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },

      error: error => console.log(error)
    })
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
