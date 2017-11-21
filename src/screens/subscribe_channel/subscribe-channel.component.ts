import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SessionDataService } from '../../shared/providers/index';

import { SubscribeChannelService } from './subscribe-channel.service';

declare var componentHandler: any;

@Component({
   styleUrls: [ 'subscribe-channel.component.css' ],
   templateUrl: 'subscribe-channel.component.html'
})

export class SubscribeChannelComponent {
   constructor(private subscribeChannelService: SubscribeChannelService, private router: Router,
      private sessionData: SessionDataService) { }

   channelList: any;

   loading: boolean = false;

   ngOnInit() {
      //Immediately fetch list of channels
      this.fetchList();
   }

   ngAfterViewInit() {
      //Re-initializes material design styling
      componentHandler.upgradeDom();
   }

   fetchList() {
      this.subscribeChannelService.getChannels().subscribe(
         response => {
            //Sets channel list
            this.channelList = response.json();
         }
      );
   }

   subscribeChannel(channelId) {
      //Subscribe new channel
      this.subscribeChannelService.subscribeChannel(channelId).subscribe(
         response => {
            this.loading = false;
            //Response sends back the chatlist with the appended channel upon success
            let chatList = response.json();
            this.sessionData.setChatList(chatList);
         },
         error => { this.loading = false; }
      );
   }

}