// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var Message = require("../models/messenger.js");
var base32 = require('hi-base32');

// Routes
// =============================================================
module.exports = function(app) {

  // Search for Specific Character (or all characters) then provides JSON
  app.get("/api/messeges/convo_id?", function(req, res) {

    // If the user provides a specific character in the URL...
    if (req.params.convo_id) {

      // Then display the JSON for ONLY that character.
      // (Note how we're using the ORM here to run our searches)
      Message.findConvo({
        where: {
          convoID: req.params.convo_id,
        }
      }).then(function(result) {
        return res.json(result);
      });
    }

    // Otherwise...
    else {
      // Otherwise display the latest conversation on the sender
      Message.findLatest({})
        .then(function(result) {
          return res.json(result);
        });
    }

  });

  // If a user sends data to add a new message...
  app.post("/api/new/message", function(req, res) {

    // Take the request...
    var message = req.body;
    // Create string to encode
    var convoUsers = message.senderName + "&" + message.senderName;
    // // Create a unique convoID by encoding to base32
    convoID = base32.encode(convoUsers);

    // Create a unique userID's by encoding to base32
    var senderID = base32.encode(message.senderName);
    var receiverID = base32.encode(message.receiverName);

    // Add message toi DB using sequelize
    Message.create({
      senderName: message.senderName,
      receiverName: message.receiverName,
      senderID: senderID,
      receiverID: receiverID,
      body: message.body,
      convoID: convoID,
    });

  });
};
