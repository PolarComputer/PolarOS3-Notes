//==========================================\\
// Javscript Asset Library - Bottom Message \\
//              By Evan Sellers             \\
//==========================================\\
//  This script changes the message at the  \\
//   bottom of the side bar. It displays    \\
//  random, creative and clever messages.   \\
//==========================================\\


// Main Function that Update the message
function changeBottomMessage() {
  var messageInfo = grabMessage(messageList);
  var message = generateMessage(messageInfo);
  console.log(message);
  document.getElementById('messageBox').innerHTML = message;
}

// Makes the code that gets injected in the html
function generateMessage(message) {
  if ( message.randomInput != false ) {
    var item = grabItem(message.randomInput);
    var inject = ("<div class=ending>" + message.messageFront + item + message.messageBack + "<br><i class='fa " + message.faIcon + " footerMessage' aria-hidden=true></i></div>");
  } else {
    var inject = ("<div class=ending>" + message.messageFront + message.messageBack + "<br><i class='fa " + message.faIcon + " footerMessage' aria-hidden=true></i></div>");
  }
  return inject;
}

// Grabs the objects information for message
function grabMessage(list) {
  var message = list[Math.floor(Math.random() * list.length)];
  return message;
}

// Grabs random item from item list
function grabItem(list) {
  var item = list[Math.floor(Math.random() * list.length)];
  return item;
}



//==============ARRAY STORAGE================\\

// Random item list for injecting in message
var foodList = [ "blueberries", "avacado", "pork", "cherries", "cottage cheese", "corn", "garlic", "tuna" ];
var inventionList = [ "a monkey", "a new moon", "an antigravity machine", "a holographic computer", "a selfie drone", "shoes that sence objects for blind people", "a flying ping pong", "a sushie vending machine", "a flying cookie", "a cookie launcher" ];
var adjectiveList = [ "awesome", "impressive", "breathtaking", "amazing", "splendid", "extraordinary", "marvelous", "legendary" ];
var placeList = [ "Hawaii", "Puerto Rico", "Canary Islands", "Colombia", "Australia", "Tahiti", "Jamaica" ]

// A list of all messages
var messageList = [{
  id: 0,
  messageFront: "Whip up something new. Like ",
  messageBack: "!",
  faIcon: "fa-flask",
  randomInput: inventionList,
}, {
  id: 1,
  messageFront: "Don't get weighed down, make something ",
  messageBack: "!",
  faIcon: "fa-anchor",
  randomInput: adjectiveList,
}, {
  id: 2,
  messageFront: "Need an idea. Why don't you make some ",
  messageBack: " cookies!",
  faIcon: "fa-cutlery",
  randomInput: foodList,
}, {
  id: 3,
  messageFront: "Take a nice shower, ponder, and come back with something ",
  messageBack: "!",
  faIcon: "fa-bath",
  randomInput: adjectiveList,
}, {
  id: 4,
  messageFront: "You should go to ",
  messageBack: " and write your thoughs.",
  faIcon: "fa-globe",
  randomInput: placeList,
}, {
  id: 5,
  messageFront: "Your a rock star!",
  messageBack: "",
  faIcon: "fa-star",
  randomInput: false,
}];

// That's all of my Awesome Code -- coded in Indiana by Evan Sellers
