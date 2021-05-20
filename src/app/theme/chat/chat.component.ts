import { Component, OnInit } from '@angular/core';
import { Message } from '@app/_models/message';
import { environment } from '@environments/environment';
import {ChatService} from '@app/_services/chat.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '@app/_services/account.service';
import { ActivatedRoute, Router} from '@angular/router';
import { AuthGuard } from '@app/_helpers/auth.guard';

const baseUrl = environment.apiUrl;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  form:FormGroup;


  constructor(private formBuilder: FormBuilder, 
    public chatService: ChatService, 
    private accountService: AccountService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private guard: AuthGuard) { 

    this.guard.canActivate(this.route.snapshot, this.router.routerState.snapshot);

    this.chatService.clear();
    this.route.queryParams.subscribe(
      params => {
        this.userId = params['userId'];
        this.userName = params['userName'];
      }
    );
  }

  get f() { return this.form.controls; }

  private userId;
  public userName;

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      send: ['']
    });

    
  }

  sendMessage()
  {
      this.chatService.sendMessage(this.accountService.accountValue.id, this.userId, this.f.send.value);
      console.log(this.f.send.value);
      this.form = this.formBuilder.group({
        send: ['']
    });
  }

}
