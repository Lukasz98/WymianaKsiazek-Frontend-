import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileCardComponent } from './profile-card.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileCardComponent,
    data: {
      title: 'Profile-Card'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileCardRoutingModule { }
