// Code here handles what happens when a user submits a new character on the form.
// Effectively it takes the form inputs then sends it to the server to save in the DB.
$(document).ready(function() {
  /* global moment */

  // messageontainer holds all of our posts
  var blogContainer = $(".message-container");
  // Click events for the edit and delete buttons
  $("#message-send").on("click", sendMessage);
  $(document).on("click", "message-delete", deleteMessage);

  // varible to hold messages
  var messeges;
  
  // The code below handles the case where we want to get messages from a specific person
  // Looks for a query param in the url for convo_id
  var url = window.location.search;
  console.log(url);
  var convoId = url.split("=")[1];;
  // if (url.indexOf("?convo_id=") !== -1) {
  //   convoId = url.split("=")[1];
  //   geMesseges(convoId);
  //   return 
  // }
  // // If there's no convoId we just get all posts as usual
  // else {
  //   geMesseges();
  // }

  // This function grabs messeges from the database and updates the view
  // function getMessages(convoId)) {
  //   convoId = convo || "";
  //   if (convoId) {
  //     convoId = "/?convo_id=" + convoId;
  //   }
  //   $.get("/api/messeges" + convoId, function(data) {
  //     console.log("Posts", data);
  //     messeges = data;
  //     if (!messeges || !messeges.length) {
  //       displayEmpty(convo);
  //     }
  //     else {
  //       initializeRows();
  //     }
  //   });
  // }

  // when user clicks add-btn
  function sendMessage() {
    event.preventDefault();
    // Getting jQuery references to the message body, sender & receiver data
    var messageBody = $("#message-body").val().trim();
    var senderName = $("#sender-name").text().trim();
    var receiverName = $("#receiver-name").text().trim();

    // make a newMessage Obj
    var newMessage = {
      senderName: senderName,
      receiverName: receiverName,
      body: messageBody,
      convoID: convoId
    };

    // send an AJAX POST-request with jQuery
    $.post("/api/new/message", newMessage)
      // on success, run this callback
    .done(function(data) {
      // log the data we found
      console.log(data);
      // tell the user we're adding a character with an alert window
      alert("Message Sent");
    });

    // empty each message box by replacing the value with an empty string
    $("#message-body").val("");
    };

    function deleteMessage() {
    };
});
