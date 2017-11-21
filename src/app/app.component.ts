import { Component } from '@angular/core';

import { SessionDataService } from '../shared/providers/sessiondata-storage.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: [ './app.component.css' ]
})
export class AppComponent {
   title = 'app';

   username;

   constructor(private sessionData: SessionDataService){}

   //Username is subscribed to as this will not re-init between logouts but needs to update
   ngOnInit(){
      this.sessionData.getUsername().subscribe(
         response => this.username = response
      )
   }
}
