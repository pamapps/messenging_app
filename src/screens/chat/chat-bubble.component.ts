import { Component, Input } from '@angular/core';

import { FormatterService } from '../../shared/providers/index';

import { IChatMessage } from '../../interfaces/index';

@Component({
   selector: 'chat-bubble',
   styleUrls: [ 'chat-bubble.component.css' ],
   templateUrl: 'chat-bubble.component.html'
})

export class ChatBubbleComponent {
   //The chat component itself handles the logic of if the message is from this user
   @Input() fromSelf: boolean;
   @Input() message: IChatMessage;

   private displayMessage: IChatMessage;

   constructor(private formatter: FormatterService) { }

   ngOnInit() { 
      //The date is formatted proper to be viewed by the user
      let dateTransfer = new Date(this.message.timestamp);
      let displayDate = this.formatter.formatChatDate(dateTransfer);

      this.displayMessage = this.message;
      this.displayMessage.timestamp = displayDate;
   }
}