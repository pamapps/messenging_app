import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SessionDataService } from '../../shared/providers/index';

import { NewUserService } from './new-user.service';

declare var componentHandler: any;

@Component({
   styleUrls: [ 'new-user.component.css' ],
   templateUrl: 'new-user.component.html'
})

export class NewUserComponent {
   constructor(private newUserService: NewUserService, private router: Router, private sessionData: SessionDataService) { }

   username: string;
   email: string;
   password: string;
   verifPassword: string;

   loading: boolean = false;

   errorText: string = "";

   ngOnInit() { }

   ngAfterViewInit() {
      //Re-initializes material design styling
      componentHandler.upgradeDom();
   }

   createNewUser() {
      this.loading = true;

      //Data is collected into object
      let userOptions = {
         username: this.username,
         email: this.email,
         password: this.password
      }

      //Data is verified
      if (this.verifyUserData()) {
         this.newUserService.createNewUser(userOptions).subscribe(
            response => {
               //If the user is successfully made they are sent back to the login screen
               this.loading = false;
               this.router.navigate([ '/login' ]);
            },
            error => { this.loading = false; }
         );
      }

   }

   verifyUserData() {
      this.errorText = "";

      if (!this.username) {
         this.errorText = "Username required.";
         return false;
      } else if (!this.email) {
         this.errorText = "Email required.";
         return false;
      } else if (!this.password) {
         this.errorText = "Password required.";
         return false;
      } else if (this.password != this.verifPassword) {
         this.errorText = "Password must match.";
         return false;
      }

      return true;
   }
}