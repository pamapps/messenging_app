import { Injectable } from '@angular/core';

import { ServerCallerService } from '../../shared/providers/index';

@Injectable()
export class SubscribeChannelService {

   private getChannelsUrl = "channelList";
   private subscribeChannelUrl = "subscribeChannel";

   constructor(private call: ServerCallerService) { }

   getChannels(){
      //Simple get call
      return this.call.getCall(this.getChannelsUrl);
   }

   subscribeChannel(chatId){
      //Data rounded up into object
      let chatData: any = {
         chatId: chatId
      };

      chatData = JSON.stringify(chatData);

      //Simple post call
      return this.call.postCall(this.subscribeChannelUrl, chatData);
   }
}