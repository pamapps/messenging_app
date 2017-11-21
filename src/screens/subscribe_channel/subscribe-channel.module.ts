import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SubscribeChannelComponent } from './subscribe-channel.component';
import { SubscribeChannelService } from './subscribe-channel.service';

@NgModule({
   imports: [ CommonModule ],
   exports: [],
   declarations: [ SubscribeChannelComponent ],
   providers: [ SubscribeChannelService ]
})
export class SubscribeChannelModule { }