import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

import { SessionDataService } from './sessiondata-storage.service';

@Injectable()
export class ServerCallerService {

   private chatSocket;
   private urlBase;
   private ws: WebSocket;

   constructor(private http: Http, private sessionData: SessionDataService) {
      //fetches the base to use for the URL from sessiondataservice. that leaves a single place to change it
      this.urlBase = this.sessionData.getUrlBase();
   }

   private addCustomHeader() {
      //This puts the user token into the header in the options returned
      let userToken = this.sessionData.getUserToken();

      return new RequestOptions({ headers: new Headers({ userToken: userToken }) });
   }

   createWebSocketConnection() {
      //creates a new websocket on 8081 port
      this.ws = new WebSocket("ws://localhost:8081");
      let observable = Observable.create(
         (obs: Observer<MessageEvent>) => {
            this.ws.onmessage = obs.next.bind(obs);
            this.ws.onerror = obs.error.bind(obs);
            this.ws.onclose = obs.complete.bind(obs);
            return this.ws.close.bind(this.ws);
         }
      );
      let observer = {
         //sets the next functionality
         next: (data: Object) => {
            //if the websocket is open then the data is sent through
            //else the websocket is still opening and will try again momentarily
            if (this.ws.readyState === WebSocket.OPEN)
               this.ws.send(JSON.stringify(data));
            else
               setTimeout(() => this.chatSocket.next(data), 500)
         },
      };

      //creates the subject to interact with the websocket
      this.chatSocket = Subject.create(observer, observable);

      return this.chatSocket;
   }

   destroyWebSocketSubscriber(){
      //Destroys websocket interaction
      if(this.chatSocket)
         this.chatSocket.complete();
   }

   loginUser(username: string, password: string) {

   }

   getCall(url: string) {
      //Basic get call sent here
      let options = this.addCustomHeader();
      return this.http.get(this.urlBase + url, options);
   }

   postCall(url: string, data: any) {
      //Basic post call sent here
      let options = this.addCustomHeader();
      return this.http.post(this.urlBase + url, data, options);
   }

   sendSocketMessage(message){
      //Sends data through the websocket
      this.chatSocket.next(message);
   }

   subscribeSocket(){
      //Sends the websocket object to subscribe to
      return this.chatSocket;
   }

}