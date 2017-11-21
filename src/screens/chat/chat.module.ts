import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ChatBubbleComponent } from './chat-bubble.component';
import { ChatComponent } from './chat.component';
import { ChatService } from './chat.service';

@NgModule({
   imports: [ CommonModule, FormsModule ],
   exports: [],
   declarations: [ ChatBubbleComponent, ChatComponent ],
   providers: [ ChatService ],
})
export class ChatModule { }
