import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IsLoggedInGuard } from './app-routing.guards.service';

import { ChatComponent } from '../screens/chat/chat.component';
import { ChatCreationComponent } from "../screens/chat_creation/chat-creation.component";
import { LoginComponent } from '../screens/login/login.component';
import { NewUserComponent } from '../screens/new_user/new-user.component';
import { SubscribeChannelComponent } from '../screens/subscribe_channel/subscribe-channel.component';

//These set the pages routes and set which ones are guarded
const routes: Routes = [
   {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full'
   },
   {
      path: 'chat/:id',
      component: ChatComponent,
      canActivate: [
         IsLoggedInGuard
      ]
   },
   {
      path: 'chat-creation',
      component: ChatCreationComponent,
      canActivate: [
         IsLoggedInGuard
      ]
   },
   {
      path: 'login',
      component: LoginComponent
   },
   {
      path: 'new-user',
      component: NewUserComponent
   },
   {
      path: 'subscribe-channel',
      component: SubscribeChannelComponent,
      canActivate: [
         IsLoggedInGuard
      ]
   }
];

@NgModule({
   imports: [ RouterModule.forRoot(routes) ],
   exports: [ RouterModule ]
})
export class AppRoutingModule { }