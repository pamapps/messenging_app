import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { IsLoggedInGuard } from './app-routing.guards.service';

import { FormatterService } from '../shared/providers/formatter.service';
import { ServerCallerService } from '../shared/providers/server-caller.service';
import { SessionDataService } from '../shared/providers/sessiondata-storage.service';
import { SidePaneModule } from '../shared/subcomponents/side_pane/side-pane.module';

import { ChatModule } from "../screens/chat/chat.module";
import { ChatCreationModule } from "../screens/chat_creation/chat-creation.module";
import { LoginModule } from "../screens/login/login.module";
import { NewUserModule } from "../screens/new_user/new-user.module";
import { SubscribeChannelModule } from "../screens/subscribe_channel/subscribe-channel.module";

@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,

      SidePaneModule,

      ChatModule,
      ChatCreationModule,
      LoginModule,
      NewUserModule,
      SubscribeChannelModule
   ],
   providers: [ FormatterService, ServerCallerService, IsLoggedInGuard, SessionDataService ],
   bootstrap: [ AppComponent ]
})
export class AppModule { }
