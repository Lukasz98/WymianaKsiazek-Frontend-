import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat.component';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    data: {
      title: 'Wiadomości',
      caption: 'wiadomości'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
