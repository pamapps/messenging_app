import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

@NgModule({
   imports: [ CommonModule, FormsModule, HttpModule ],
   exports: [],
   declarations: [ LoginComponent ],
   providers: [ LoginService ],
})
export class LoginModule { }
