import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NewUserComponent } from './new-user.component';
import { NewUserService } from './new-user.service';

@NgModule({
   imports: [ CommonModule, FormsModule ],
   exports: [],
   declarations: [ NewUserComponent ],
   providers: [ NewUserService ],
})
export class NewUserModule { }