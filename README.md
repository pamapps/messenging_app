# Rayne Schaffer
# Interview Project - Chat App

# Description
   This is a chat application done via a web format. The project is made to run locally on a development machine.
   The chat application allows multiple windows/tabs on the same machine to operate as separate clients.
   Some test data is loaded from JSON files. There is no persistence added as everything is in local memory so new data will disappear on server stop.

# Functionality
   Users may login or create a login identity.
   They may create a chat with other user(s) or create a channel.
   They may chat across these chats in near real time.
   They may subscribe to a channel.
   They may leave chats/channels.

# How to Run
   Have node and npm installed.
   Navigate to the root directory in terminal. Run "npm install". After that is finished, run "npm start".
   Have another terminal open, navigate to the server folder. Run "node server.js".

   Pre-made users "test-user" and "test-user-friend" have chats in place. Both of them have a password of "password".
   Pre-made users "example-user-[1-4]" also exist with a password of "password" as well.

# Technologies Used
   The application is written in Typescript and uses the Angular framework.
   Material design lite is utilized for styling.
   The server is written with Express for NodeJS.