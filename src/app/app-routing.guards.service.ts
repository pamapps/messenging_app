import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { SessionDataService } from '../shared/providers/sessiondata-storage.service';

@Injectable()
export class IsLoggedInGuard implements CanActivate {

   constructor(private router: Router, private sessionData: SessionDataService) { }

   //A basic function to check is a user is properly logged in by the presence of a username
   //Any user not logged is routed to the login page
   canActivate() {
      if (this.sessionData.getStaticUsername())
         return true;
      else {
         this.router.navigate([ '/login' ]);
         return false;
      }
   }
}
