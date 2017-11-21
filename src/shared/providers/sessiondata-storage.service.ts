import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class SessionDataService {

   //Holds basic info for the overall app
   private username: string = "";
   private userId: string = "";
   private chatList: any = null;

   //Subscription services for items that need to be updated when they change
   private chatSub;
   private usernameSub;

   //Holds the session token of the user's login
   private userToken: string = "";

   //The base URL for the calls
   private urlBase = "http://localhost:3000/";

   constructor() {
      this.chatSub = new Subject;
      this.usernameSub = new Subject;
   }

   getChatList() {
      //Fetches the chat list subscription
      this.chatSub.next(this.chatList);

      return this.chatSub;
   }

   setChatList(chatList) {
      //Sets the new chat list and pushes it through the subscriptions
      this.chatSub.next(chatList);
      this.chatList = chatList;
   }

   getStaticChatList(){
      //Gets a static version of the current chat list
      return this.chatList;
   }

   getChat(id: string) {
      //Gets the chat data based on the id
      let matchedChat = this.chatList.find((chat) => {
         return chat.chatId == id;
      });

      if (matchedChat)
         return matchedChat;
      else
         return null;
   }

   getUrlBase() {
      //Returns the base URL
      return this.urlBase;
   }

   getUserId() {
      //Returns a statis userId
      return this.userId;
   }

   setUserId(id: string) {
      //Sets the userId
      this.userId = id;
   }

   getUsername() {
      //Fetches the username subscription
      this.usernameSub.next(this.username);

      return this.usernameSub;
   }

   getStaticUsername(){
      //Gets a static version of the current username
      return this.username;
   }

   setUsername(username: string) {
      //Sets the username and pushes the new one through the subscription
      this.usernameSub.next(username)
      this.username = username;
   }

   getUserToken(){
      //Gets the current usertoken
      return this.userToken;
   }

   setUserToken(token){
      //Sets the usertoken
      this.userToken = token;
   }

   logout() {
      //Clears out all held data
      this.username = "";
      this.usernameSub.next(this.username);
      this.userToken = "";
      this.chatList = [];
      this.chatSub.next(this.chatList);
   }
}