$(document).ready(function () {

  // Initialize the PubNub API connection.

  var pubnub = PUBNUB.init({

    publish_key: 'pub-c-9edca0ea-43d0-4b01-91df-c2f3a6de1126',

    subscribe_key: 'sub-c-738c5968-c2bf-11e7-ab0e-622c225d95ed'

  });

 

  // Grab references for all of our elements.

  var messageContent = $('#messageContent'),

      sendMessageButton = $('#sendMessageButton'),

      messageList = $('#messageList');

 

  // Handles all the messages coming in from pubnub.subscribe.

  function handleMessage(message) {

    var messageEl = $("<li class='message'>"

        + "<span class='username'>" + message.username + ": </span>"

        + message.text

        + "</li>");

    messageList.append(messageEl);

    messageList.listview('refresh');

 

    // Scroll to bottom of page

    $("html, body").animate({ scrollTop: $(document).height() - $(window).height() }, 'slow');

  };

 

  // Compose and send a message when the user clicks our send message button.

  sendMessageButton.click(function (event) {

    var message = messageContent.val();

 

    if (message != '') {

      pubnub.publish({

        channel: 'chat',

        message: {

          username: 'test',

          text: message

        }

      });

 

      messageContent.val("");

    }

  });

 

  // Also send a message when the user hits the enter button in the text area.

  messageContent.bind('keydown', function (event) {

    if((event.keyCode || event.charCode) !== 13) return true;

    sendMessageButton.click();

    return false;

  });

 

  // Subscribe to messages coming in from the channel.

  pubnub.subscribe({

    channel: 'chat',

    message: handleMessage

  });

});