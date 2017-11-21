const express = require('express')
const uuid = require('uuid/v4')
const app = express()
const port = 3000

//Counters are stored here due to using local memory instead of backend persistence
// A fully featured version would utilize the database i system itself for this
var chatCounter = 6;
var messageCounter = 0;
var userCounter = 0;

//Before any request handling, header access options are set to allow access for the local project
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type, userToken');
   res.header('Access-Control-Expose-Headers', 'userToken');

   next();
});


app.get('/', (request, response) => {
   console.log("HI")
   response.send('Hello from Express!')
})

//The local list of users is loaded in at startup to be accessable, in a fully featured version the databse would otherwise just be accessed upon the needed action
var userList = require("./users.json");

//The login post call
app.post('/login', (request, response) => {
   var body = '';

   request.on('data', function (data) {
      body += data;
   });

   request.on('end', function () {
      var post = JSON.parse(body);

      //Here the ist is manually gone through
      for (var i = 0; i < userList.length; i++) {
         if (userList[ i ].username === post.username && userList[ i ].password === post.password) {
            //A random token is generated for this login session
            let token = uuid();

            //The token is stored on the user object so that the user can be found via this token later
            userList[ i ].lastToken = token;

            //The token is added to the response header so that the application can then use it for future calls
            response.header('userToken', token);

            //The response sends back the logged in user's id
            response.send(userList[ i ].userId)

            //The function is finished
            return;
         }
      }

      //If the above did not find a user, then the user is either not registered or has the wrong password
      response.status(400).send('Incorrect username or password');
   });
})

app.post('/createNewUser', (request, response) => {
   var body = '';

   request.on('data', function (data) {
      body += data;
   });

   request.on('end', function () {
      var post = JSON.parse(body);

      var newUser = {
         "username": "",
         "userId": "",
         "password": "",
         "email": "",
         "lastToken": ""
      }

      newUser.username = post.username;
      newUser.password = post.password;
      newUser.email = post.email;

      newUser.userId = userCounter.toString();

      userList.push(newUser);
      userCounter = userCounter + 1;

      //A success is logged
      response.send("Success");
   });
})

//This function will return the id of the user making the call
function getUserId(request) {
   //The user's token is fetched off the request header
   var chatUserToken = request.headers.usertoken;

   //The user list is searched through to find the user via the token
   var currentUser = userList.find((user) => {
      return user.lastToken === chatUserToken;
   });

   //The id of the matched user is returned
   return currentUser.userId;
}

function getRelevantChats(requestUserId) {
   var relevantChats = chatList.filter((chat) => {
      for (var i = 0; i < chat.userIds.length; i++) {
         if (chat.userIds[ i ] === requestUserId)
            return true;
      }
      return false;
   })

   for (var i = 0; i < relevantChats.length; i++) {
      if (!relevantChats[ i ].isGroupChat & !relevantChats[ i ].isChannel) {
         var otherUser = relevantChats[ i ].userIds.find((userId) => {
            return userId != requestUserId;
         })

         var otherUsername = userList.find((user) => {
            return user.userId === otherUser;
         });

         relevantChats[ i ].chatTitle = otherUsername.username;
      }
   }

   return relevantChats;
}




var chatList = require("./chats.json");

app.post('/createNewChat', (request, response) => {
   var body = '';

   request.on('data', function (data) {
      body += data;
   });

   request.on('end', function () {
      var post = JSON.parse(body);

      var newChat = {
         "chatTitle": "",
         "chatId": "",
         "userIds": [],
         "creatorId": "",
         "isChannel": null,
         "isGroupChat": null
      }

      newChat.isChannel = post.isChannel;

      if (!newChat.isChannel) {
         let chatMembers = post.chatMembers.split(" ");
         for (var i = 0; i < chatMembers.length; i++) {
            let matchedUser = userList.find((user) => {
               return user.username === chatMembers[ i ];
            });

            if (matchedUser)
               newChat.userIds.push(matchedUser.userId)
            else
               response.status(400).send('Invalid username: ' + chatMembers[ i ]);
         }

         newChat.isGroupChat = post.isGroupChat;
      }

      newChat.chatTitle = post.chatTitle;

      if (!newChat.isGroupChat & !newChat.isChannel)
         newChat.chatTitle = post.chatMembers;

      newChat.creatorId = post.creatorId;
      newChat.userIds.push(post.creatorId);
      newChat.chatId = chatCounter.toString();

      chatList.push(newChat);
      chatCounter = chatCounter + 1;

      response.send(newChat);
   });
})

app.post('/leaveChat', (request, response) => {
   var body = '';

   request.on('data', function (data) {
      body += data;
   });

   request.on('end', function () {
      var post = JSON.parse(body);

      var requestUserId = getUserId(request);

      var leftChatIndex = chatList.findIndex((chat) => {
         return chat.chatId == post.chatId;
      })

      chatList[ leftChatIndex ].userIds = chatList[ leftChatIndex ].userIds.filter((chatUserId) => {
         return requestUserId != chatUserId;
      })

      var relevantChats = getRelevantChats(requestUserId);

      response.send(relevantChats);
   });
})

app.get('/chatList', (request, response) => {
   var requestUserId = getUserId(request);

   var relevantChats = getRelevantChats(requestUserId);

   response.send(relevantChats)
})

app.get('/channelList', (request, response) => {
   var requestUserId = getUserId(request);

   var unsubscribedChannels = chatList.filter((chat) => {
      if (chat.isChannel) {
         for (var i = 0; i < chat.userIds.length; i++) {
            if (chat.userIds[ i ] === requestUserId)
               return false;
         }
         return true;
      } else {
         return false;
      }
   })

   response.send(unsubscribedChannels)
})

app.post('/subscribeChannel', (request, response) => {
   var body = '';

   request.on('data', function (data) {
      body += data;
   });

   request.on('end', function () {
      var post = JSON.parse(body);

      var requestUserId = getUserId(request);

      var subscribedChatIndex = chatList.findIndex((chat) => {
         return chat.chatId == post.chatId;
      })

      chatList[ subscribedChatIndex ].userIds.push(requestUserId);

      var relevantChats = getRelevantChats(requestUserId);

      response.send(relevantChats);
   });
})


var messageList = require("./messages.json");

function fetchingMessages(chatData) {
   var relevantMessages = messageList.filter((message) => {
      return message.chatId === chatData.chatId;
   })

   return relevantMessages;
}

function sendingMessage(wss, messageData) {
   messageData.messageID = messageCounter.toString();
   messageCounter = messageCounter + 1;

   messageList.push(messageData[ 0 ]);

   wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(messageData));
   });
}

var WSS = require('ws').Server;
var wss = new WSS({ port: 8081 });
wss.on('connection', function (socket) {

   socket.on('message', function (message) {
      var parsedMessage = JSON.parse(message);

      switch (parsedMessage.type) {
         case "fetchMessages":
            var messages = JSON.stringify(fetchingMessages(parsedMessage.data));
            socket.send(messages);
            break;
         case "sendingMessage":
            sendingMessage(wss, parsedMessage.data);
            break;
      }


   });

   socket.on('close', function () {
   });

});



app.listen(port, (err) => {
   if (err) {
      return console.log('something bad happened', err)
   }

   console.log(`server is listening on ${port}`)
})