import { Injectable } from '@angular/core';

import { ServerCallerService } from '../../shared/providers/index';

@Injectable()
export class ChatCreationService {

   private url = "createNewChat";

   constructor(private call: ServerCallerService) { }

   createChat(options){
      //Simple post call to server
      let chatData = JSON.stringify(options);

      return this.call.postCall(this.url, chatData);
   }
}