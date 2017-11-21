import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';

declare var componentHandler: any;

@Component({
   styleUrls: [ './login.component.css' ],
   templateUrl: './login.component.html'
})
export class LoginComponent {

   loading: boolean = false;

   username: string;
   password: string;

   errorText: string = "";

   constructor(private loginService: LoginService, private router: Router) { }

   ngOnInit() { }

   ngAfterViewInit() {
      //Re-initializes material design styling
      componentHandler.upgradeDom();
   }

   login() {
      //Checks is username and password are present
      if(this.username && this.password){
         this.loading = true;

         this.loginService.loginUser(this.username, this.password).subscribe(
            (response: any) => { 
               this.loading = false;
               //A successful login stops the loading and is passed back to service
               this.loginService.successfulLogin(response.text());
            },
            error => {
               this.loading = false;
               //The error message is shown to the user
               this.errorText = error.text();
            }
         );
      }
   }

   newUser(){
      //User is sent to new user page
      this.router.navigate([ '/new-user' ]);
   }
}