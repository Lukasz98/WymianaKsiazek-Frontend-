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
import {AddressService} from "@app/_services/address.service";
import { ChatService } from '@app/_services/chat.service';
import {AuthGuard} from '@app/_helpers/auth.guard';

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
  form2: FormGroup;
  showCities = false;
  states = [];

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private userService: UserService,
    private addressService: AddressService,
    public chatService: ChatService,
    private guard: AuthGuard
  ) {

    this.guard.canActivate(this.route.snapshot, this.router.routerState.snapshot);

    if(this.accountService.accountValue)
    {
      this.userService.getUser(this.accountService.accountValue.id);
      this.user = this.userService.userValue;
    } 
    
    if(this.chatService.contactsValue.length == 0)
    {
        this.chatService.getContacts(this.accountService.accountValue.id);
        //this.activeContact = this.chatService.contactsValue[0];
        //this.chatService.getMessages(this.activeContact.id);
    }
  }

  ngOnInit() {

    if(!this.accountService.accountValue)
    {
      this.router.navigate(['/szukaj']);
    }
    else
    {
      this.user = this.userService.userValue;
      this.user.address = {id: 0, name: ""};
    }

    if(this.chatService.contactsValue.length == 0)
    {
      this.chatService.getContacts(this.accountService.accountValue.id);
      //this.activeContact = this.chatService.contactsValue[0];
      //this.chatService.getMessages(this.activeContact.id);
    }

    if(this.chatService.contactsValue.length != 0)
    {
      this.activeContact = this.chatService.contactsValue[0];
      console.log(this.chatService.contactsValue);
      if(this.chatService.contactsValue[0])
        this.chatService.getMessages(this.activeContact.id);
    }

    this.form = this.formBuilder.group({
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      email: [this.user.email],
      userName: [this.user.userName],
      address: [this.user.address.name]
    });

    this.form2 = this.formBuilder.group({
      send: ['']
    });
  }

  offerViewClicked(offer:Offer)
  {
    this.router.navigate([`/oferta`], {queryParams: {id : offer.id}});
  }

  choseContact(contact: Contact)
  {
      this.activeContact = contact;
      this.chatService.getMessages(contact.id);
  }

  openDropDown() {
    this.showCities = true;
    this.opened = 2;
  }

  getSearchValue() {
    //this.addressService.getAddresses(this.form.value.address);
    //this.states = this.addressService.addressesValue;
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
    console.log(event);
    this.stopTrackingLoop();
    this.startTrackingLoop();
  }

  toggleEditProfile() {
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editProfile = !this.editProfile;
  }

  addOffer() {
    this.router.navigateByUrl('/dodaj-ogloszenie');
  }

  logOut() {
    this.accountService.logout(this.accountService.accountValue.refreshToken).pipe(first()).
    subscribe({
      next: () => {
        this.router.navigate(['/szukaj']);

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

  get f() { return this.form2.controls; }

  sendMessage()
  {
      this.chatService.sendMessage(this.accountService.accountValue.id, this.activeContact.id, this.f.send.value);
      console.log(this.f.send.value);
      this.form = this.formBuilder.group({
        send: ['']
    });
  }

}
