import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { SessionDataService } from '../../shared/providers';

import { ChatService } from './chat.service';

declare var componentHandler: any;

@Component({
   styleUrls: [ 'chat.component.css' ],
   templateUrl: 'chat.component.html'
})

export class ChatComponent {
   messages: any;
   sendingMessage: string;

   private chat: any;
   private chatName: string;
   private chatId: string;

   isChannel: boolean;
   isChatOwner: boolean;
   canSendChannelMessage: boolean;

   private userId;
   private username;

   constructor(private activeRoute: ActivatedRoute, private chatService: ChatService, private router: Router, private sessionDataService: SessionDataService) { }

   ngOnInit() {
      //First basic user data is collected
      this.userId = this.sessionDataService.getUserId();
      this.username = this.sessionDataService.getStaticUsername();

      //A subscription is added on component init that will watch for new messages and then add them to the chat
      this.chatService.subscribeSocket().subscribe(
         response => {
            let data = JSON.parse(response.data);
            if (this.messages != null)
               this.messages.push(data[ 0 ]);
            else
               this.messages = data;
         });

      //This will run with the parameters passed to the route when navigating
      //It runs everytime a different chat is seleced, even if from another chat
      this.activeRoute.params.forEach((params: Params) => {
         //First any previous that may be around is destroyed
         this.chatService.destroyConnection();

         //The basic chat data is filled in the the page variables
         this.chatId = params.id;
         this.chat = this.sessionDataService.getChat(this.chatId);
         this.chatName = this.chat.chatTitle;
         this.isChannel = this.chat.isChannel;

         //The user is checked to see if they are the chat owner
         this.isChatOwner = (this.chat.creatorId === this.userId) ? true : false;

         //The user is checked to see if they can send messages in the current chat if it is a channel
         this.canSendChannelMessage = (this.isChannel && this.isChatOwner);

         this.initChat();
      });
   }

   ngAfterViewInit() {
      //Re-initializes material design styling
      componentHandler.upgradeDom();
   }

   initChat() {
      //Clears out any previous messages
      this.messages = null;

      //Runs function to fetch the current chat conversation
      this.chatService.getConversation(this.chatId);
   }

   leaveChat(){
      //Starts process for user to leave a chat
      this.chatService.leaveChat(this.chatId).subscribe(
         response => {
            let chatList = response.json();
            //Upon success, chat list is reset with the left chat missing
            this.sessionDataService.setChatList(chatList);
            //The user is routed away from the chat they just left and is placed at the first of their other chats if they have some
            if (chatList[ 0 ])
               this.router.navigate([ '/chat', chatList[ 0 ].chatId ]);
            else
               //If they dont have any current chats they are directed to the chat creation screen
               this.router.navigate([ '/chat-creation' ]);
         }
      );
   }

   ngOnDestroy() {
      //When the component is left an destroyed, the connection is cleaned up as well
      this.chatService.destroyConnection();
   }

   sendMessage() {
      //Sending a message sends all the appropriate message data
      this.chatService.sendMessage(this.chatId, this.sendingMessage, this.userId, this.username);
      //The message is cleared out after sending
      this.sendingMessage = "";
   }
}