import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ServerCallerService } from '../../shared/providers/index';

import { IChatSocketInteraction } from '../../interfaces/index';

@Injectable()
export class ChatService {

   constructor(private call: ServerCallerService) { }

   destroyConnection() {
      //Provides area to destroy connection
      this.call.destroyWebSocketSubscriber();
   }

   getConversation(chatId: string) {
      //Gets specific conversation
      let chatData = {
         chatId: chatId
      };

      let call: IChatSocketInteraction = {
         type: "fetchMessages",
         data: chatData
      }

      this.call.sendSocketMessage(call);
   }

   leaveChat(chatId) {
      //Allows user to leave this specific chat
      let chatData: any = {
         chatId: chatId
      };

      chatData = JSON.stringify(chatData);

      return this.call.postCall("leaveChat", chatData);
   }

   sendMessage(chatId: string, text: string, userId: string, username: string) {
      //Sends user's chat message
      let date = new Date().toString();

      let messageData = [ {
         sender: username,
         timestamp: date,
         text: text,
         messageID: null,
         senderID: userId,
         chatId: chatId
      }]

      let call: IChatSocketInteraction = {
         type: "sendingMessage",
         data: messageData
      }

      this.call.sendSocketMessage(call);
   }

   subscribeSocket() {
      //Starts socket subscription
      return this.call.subscribeSocket();
   }
}