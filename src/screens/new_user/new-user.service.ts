import { Injectable } from '@angular/core';

import { ServerCallerService } from '../../shared/providers/index';

@Injectable()
export class NewUserService {

   private url = "createNewUser";

   constructor(private call: ServerCallerService) { }

   createNewUser(options){
      //Simple post call to create new user
      let userData = JSON.stringify(options);

      return this.call.postCall(this.url, userData);
   }
}