import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ServerCallerService, SessionDataService } from '../../shared/providers/index';

@Injectable()
export class LoginService {

   private url = "login";
   private username: string;

   constructor(private http: Http, private call: ServerCallerService, private router: Router, private sessionData: SessionDataService) { }

   loginUser(username: string, password: string) {
      //Data is put into object
      this.username = username;

      let loginData: any = {
         username: username,
         password: password
      };

      loginData = JSON.stringify(loginData);

      //A subject is created to be passed back
      //This is done so that other actions can be completed on the subscribed response before being sent to component
      let responder = new Observable((observer) => {

         this.http.post("http://localhost:3000/login", loginData).subscribe(
            response => {
               //The token is fetched off the header and set for the session's storage
               let token = response.headers.get('userToken');

               this.sessionData.setUserToken(token);

               observer.next(response);
            },
            error => {
               observer.error(error);
            }
         )

         return observer;
      })

      return responder;
   }

   successfulLogin(userId) {
      //A simple get call to fetch the chat list. This function is called from the component on a successful login
      this.call.getCall("chatList").subscribe(
         response => {
            let chatList = response.json();

            //The websocket is connection is started here upon login
            this.call.createWebSocketConnection();

            //Relevant data is set in session storage
            this.sessionData.setChatList(chatList);
            this.sessionData.setUsername(this.username);
            this.sessionData.setUserId(userId);

            //If the user has pre-existing chats, they are sent to the first of them
            //If they dont, they are directed to the create chat screen
            if (chatList[ 0 ])
               this.router.navigate([ '/chat', chatList[ 0 ].chatId ]);
            else
               this.router.navigate([ '/chat-creation' ]);
         }
      )
   }
}