import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SessionDataService } from '../../shared/providers/index';

import { ChatCreationService } from './chat-creation.service';

declare var componentHandler: any;

@Component({
   styleUrls: [ 'chat-creation.component.css' ],
   templateUrl: 'chat-creation.component.html'
})

export class ChatCreationComponent {
   constructor(private chatCreationService: ChatCreationService, private router: Router, private sessionData: SessionDataService) { }

   chatTitle: string;
   chatMemberName: string;

   isChannel: boolean = false;
   isGroupChat: boolean = false;

   loading: boolean = false;

   errorText: string = "";

   ngOnInit() { }

   ngAfterViewInit() {
      //Re-initializes material design styling
      componentHandler.upgradeDom();
   }

   createChat() {
      this.loading = true;

      let userId: string = this.sessionData.getUserId();

      //Chat options are all set
      let chatOptions = {
         isChannel: this.isChannel,
         isGroupChat: this.isGroupChat,
         chatTitle: this.chatTitle,
         chatMembers: this.chatMemberName,
         creatorId: userId
      }

      //The chats data is gone over for any errors or invalidities
      if (this.verifyChatData()) {
         this.chatCreationService.createChat(chatOptions).subscribe(
            response => {
               this.loading = false;
               //The chat is added to the local list
               let chat = response.json();
               let chatList = this.sessionData.getStaticChatList();
               chatList.push(chat);
               this.sessionData.setChatList(chatList);
               //The new chat is navigated to
               this.router.navigate([ '/chat', chat.chatId ]);
            },
            error => { this.loading = false; }
         );
      }

   }

   verifyChatData() {
      this.errorText = "";

      if (this.isChannel || this.isGroupChat) {
         if (!this.chatTitle) {
            this.errorText = "Chat name required.";
            return false;
         }
      }
      if (this.isGroupChat || (!this.isChannel && !this.isGroupChat)) {
         if (!this.chatMemberName) {
            this.errorText = "Chat member(s) required."
            return false;
         }
      }

      return true;
   }

}