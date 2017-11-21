import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SessionDataService } from '../../providers/index';

@Component({
   selector: 'side-pane',
   styleUrls: [ './side-pane.component.css' ],
   templateUrl: './side-pane.component.html'
})
export class SidePaneComponent {

   chatList: any;
   username: string;

   constructor(private router: Router, private sessionData: SessionDataService) { }

   ngOnInit() {
      //Static values are first fetched, additional changes are subscribed
      this.username = this.sessionData.getStaticUsername();
      this.chatList = this.sessionData.getStaticChatList();

      this.sessionData.getUsername().subscribe(
         response => { this.username = response }
      );
      this.sessionData.getChatList().subscribe(
         response => { this.chatList = response; }
      );
   }

   createNewChat() {
      //Sends to the create a chat page
      this.router.navigate([ '/chat-creation' ]);
   }

   firstLogin() {
      //Navigates the user to the first chat on their list
      this.router.navigate([ '/chat', this.chatList[ 0 ].id ]);
   }

   logout() {
      //Logs the user out and sends them to the login page
      this.sessionData.logout();
      this.router.navigate([ '/login' ]);
   }

   navigateChat(id: string) {
      //Navigates the user to the hat page clicked
      this.router.navigate([ '/chat', id ]);
   }

   subscribeChannel() {
      //Navigates the user to the subscribe channel page
      this.router.navigate([ '/subscribe-channel' ]);
   }
}