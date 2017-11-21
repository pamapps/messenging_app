import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ChatCreationComponent } from './chat-creation.component';
import { ChatCreationService } from './chat-creation.service';

@NgModule({
   imports: [ CommonModule, FormsModule ],
   exports: [],
   declarations: [ ChatCreationComponent ],
   providers: [ ChatCreationService ],
})
export class ChatCreationModule { }
