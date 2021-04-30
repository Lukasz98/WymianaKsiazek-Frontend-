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
import {Contact} from "@app/_models/contact";
import {Message} from "@app/_models/message";

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
  
  contacts: Array<Contact>;
  activeContact: Contact;
  opened : number;
  editProfile = true;
  editProfileIcon = 'icofont-edit';
  user: User;
  form: FormGroup;
  showCities = false;
  states = ['Alabama', 'Alaska',  'Arizona', 'Arkansas', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'District of Columbia', 'Florida'
          , 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky'
            , 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
              'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
                'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
                  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington',
                     'West Virginia', 'Wisconsin', 'Wyoming'];

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
    this.contacts = [{userId: "0", userName: "Tomek", messages: [{sender_id: "0", recv_id: "1", text: "hello", date: "21.04.2021", status: true}]},
    {userId: "1", userName: "nieTomek", messages: [{sender_id: "0", recv_id: "1", text: "hello", date: "21.04.2021", status: true}]},
    {userId: "2", userName: "teżnieTomek", messages: [{sender_id: "0", recv_id: "1", text: "hello", date: "21.04.2021", status: true}]},
    {userId: "3", userName: "równieżnieTomek", messages: [{sender_id: "0", recv_id: "1", text: "hello", date: "21.04.2021", status: true}]},
    {userId: "4", userName: "takżenieTomek", messages: [{sender_id: "0", recv_id: "1", text: "hello", date: "21.04.2021", status: true}]},
    {userId: "5", userName: "takTomek", messages: [{sender_id: "0", recv_id: "1", text: "hello", date: "21.04.2021", status: true}]}];
    this.activeContact = this.contacts[this.contacts.length - 1];
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

    this.user.address = {id: 0, name: ""};

    this.form = this.formBuilder.group({
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      email: [this.user.email],
      userName: [this.user.userName],
      address: [this.user.address.name]
    });
  }

  choseContact(contact: Contact)
  {
      this.activeContact = contact;
  }

  openDropDown() {
    this.showCities = true;
    this.opened = 2;
  }

  getSearchValue() {
    return this.form.value.address;
  }

  closeDropDown() {
    if (this.opened)
      this.opened = this.opened - 1;
    else
      this.showCities = false;
  }

  selectValue(value) {
    this.form.patchValue({"address": value});
    this.showCities = false;
  }

  tracking : any;

  startTrackingLoop() {
    this.tracking = setInterval(() => {
      clearInterval(this.tracking);
      this.tracking = null;
    }, 2000);
  }

  stopTrackingLoop() {
    clearInterval(this.tracking);
    this.tracking = null;
  }

  timett : any;
  onStrokeSearch(event: any) {
    
    this.stopTrackingLoop();
    this.startTrackingLoop();
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
