// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Message" model that matches up with DB
var Message = sequelize.define("messages", {
  senderName: Sequelize.STRING,
  receiverName: Sequelize.STRING,
  senderID: Sequelize.STRING,
  receiverID: Sequelize.STRING,
  body: Sequelize.STRING,
  convoID: Sequelize.STRING,
}, {
  timestamps: true
});

// Syncs with DB
Message.sync();

// Makes the Character Model available for other files (will also create a table)
module.exports = Message;
