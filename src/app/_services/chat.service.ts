import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '@app/_models/contact';
import { Message } from '@app/_models/message';
import * as signalR from '@microsoft/signalr'
import { environment } from '@environments/environment';
import { Angular2TinymceLibService } from 'angular2-tinymce';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccountService } from './account.service';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private messagesSentSubject: BehaviorSubject<Array<Message>>;
  public messagesSent: Observable<Array<Message>>;

  private messagesRecvSubject: BehaviorSubject<Array<Message>>;
  public messagesRecv: Observable<Array<Message>>;

  private contactsSubject: BehaviorSubject<Array<Contact>>;
  public contacts: Observable<Array<Contact>>;

  private messagesSubject: BehaviorSubject<Array<Message>>;
  public messages: Observable<Array<Message>>;

  public get messagesSentValue(): Array<Message> {
     return this.messagesSentSubject.value;
  }

  public get messagesRecvValue(): Array<Message> {
    return this.messagesRecvSubject.value;
 }
 public get messagesValue(): Array<Message> {
  return this.messagesSubject.value;
}

 public get contactsValue(): Array<Contact> {
  return this.contactsSubject.value;
}

  private connection;

  constructor(private http: HttpClient, private router: Router, private accountService: AccountService) {
    
    this.messagesSentSubject = new BehaviorSubject<Array<Message>>([]);
    this.messagesSent = this.messagesSentSubject.asObservable();

    this.messagesRecvSubject = new BehaviorSubject<Array<Message>>([]);
    this.messagesRecv = this.messagesRecvSubject.asObservable();

    this.contactsSubject = new BehaviorSubject<Array<Contact>>([]);
    this.contacts = this.contactsSubject.asObservable();

    this.messagesSubject = new BehaviorSubject<Array<Message>>([]);
    this.messages = this.messagesSentSubject.asObservable();

    this.connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)
      .withUrl(`${baseUrl}chat`, {accessTokenFactory: () => this.accountService.accountValue.accessToken})
      .build();

      this.connection.start().then(function () {
        console.log('Połączenie nawiązane poprawnie');
      });

      this.connection.on("ReceiveMessage", (message: Message) => {
        message.sent = false;
        console.log(message);
        this.messagesRecvValue.push(message);
        this.messagesValue.push(message);
      });
   }

   sendMessage(from: string, sendTo: string, message : string)
   {
     var msg = {senderId: from, recipientId: sendTo, messageText: message, sentOn: Date(), id: '0', sent:true}
     this.messagesSentValue.push(msg);
     this.messagesValue.push(msg);
     this.connection.invoke("SendMessage", from, sendTo, message).catch(err => console.log(err));
   }

   clear()
   {
     this.messagesSentSubject.next([]);
     this.messagesRecvSubject.next([]);
     this.messagesSubject.next([]);
   }

   getRecvMes(userId:string)
   {
    return this.http.get<any>(`${baseUrl}chat/recv/${userId}`)
    .subscribe(messages => {
      this.messagesRecvSubject.next(messages);
      this.messagesRecvValue.forEach(item => item.sent = false);
      return messages;
    });
   }

   getSentMes(userId:string)
   {
    return this.http.get<any>(`${baseUrl}chat/sent/${userId}`)
    .subscribe(messages => {
      this.messagesSentSubject.next(messages);
      this.messagesSentValue.forEach(item => item.sent = true);
      //console.log(messages);
      return messages;
    });
   }

   getContacts(userId:string)
   {
    return this.http.get<any>(`${baseUrl}chat/contacts/${userId}`)
    .subscribe(contacts => {
      this.contactsSubject.next(contacts);
      return contacts;
    });
   }

   getMessages(userId:string)
   {
    this.getSentMes(userId);
    this.getRecvMes(userId);
     var msg = this.messagesSentValue.concat(this.messagesRecvValue);
      msg.sort((a, b) => {
        return <any>new Date(a.sentOn) - <any>new Date(b.sentOn);
      });
     this.messagesSubject.next(msg);
     //return msg;
   }
}
