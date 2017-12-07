//==========================================\\
//Javscript Asset Library - Save and Restore\\
//              By Evan Sellers             \\
//==========================================\\
// This is the asset library that saves and \\
//     loads files for the note editor.     \\
//==========================================\\

var currentOpenNote;
var dbLength;


// Make Assasible On multiple Browser
//window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
//window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
//window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

// Check if browser Supports Storage
if (!window.indexedDB) {
  window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

// Creates the database
var db;
var request = window.indexedDB.open("PolarOS_Notes", 1);

request.onerror = function(event) {
  console.log("error: ");
};

request.onsuccess = function(event) {
  db = request.result;
  console.log("success: "+ db);
  setupExample();
  setupList();
  setupSettings();
};

request.onupgradeneeded = function(event) {
  console.log("updating");
  var db = event.target.result;
  var objectStore = db.createObjectStore("notes", { keyPath: "id" });
  objectStore.transaction.oncomplete = function(event) {
    // Store values in the newly created objectStore.
    var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
      setupList();
      setupSettings();
      updatePos(0);
      window.location.reload(false);
      //window.location = "welcomeScreen.html";
      //window.open(/assets/ports/start.html,'_blank');

  };

};



// Opens the last Note
function openLastNote(wait) {
  setTimeout(function() {
    console.log("Hello");
    var transaction = db.transaction(["notes"]);
    var objectStore = transaction.objectStore("notes");
    var request = objectStore.get("list"); // FIXME change to id
    request.onsuccess = function(event) {
      //var blank = request.result;
      //console.log(blank);
        if (request.result.editedLast.length == 0) {
          window.location = "welcomeScreen.html";
        }
        loadEditor();
        console.log(request.result.editedLast[request.result.editedLast.length - 1])
        openNote(request.result.editedLast[request.result.editedLast.length - 1]);
        blurOverlay(false);

    };
    blurOverlay(false);
    customButtons();
  }, wait);

}

// Makes a example note for the users first note
function setupExample() {
  var timeStamp = timeStampID();
  var newItem = [ {
    id: 0,
    title: "Welcome to PolarOS Notes",
    dateCreated: timeStamp,
    lastUpdated: timeStamp,
    shortHand: "Welcome to PolarOS3 Notes PolarOS notes is a note program with many capibilites. It can take basic notes and include pic...",
    notes: {"ops":[{"insert":"Welcome to PolarOS3 Notes"},{"attributes":{"header":1},"insert":"\n"},{"insert":"PolarOS notes is a note program with many capibilites. It can take basic notes and include picture. You can add code to your notes or quote block. Below we will teach you verything you need to know. Inculding keoard shorcuts, icons and how to use each feature.\n\nCode Block"},{"attributes":{"header":3},"insert":"\n"},{"insert":"Code block allows you to insert code\ninto your notes very easily. It will also\nshow the color syntex of many\nprogramming langues. This includes,\nJavascript, Ruby, Python.\nfunction gatherInfo(i,callback) {" },{"attributes":{"code-block":true},"insert":"\n"},{"insert":" var transaction2 = db.transaction([\"notes\"]);"},{"attributes":{"code-block":true},"insert":"\n"},{"insert":" var objectStore2 = transaction2.objectStore(\"notes\");"},{"attributes":{"code-block":true},"insert":"\n"},{"insert":" var requestNote = objectStore2.get(i);"},{"attributes":{"code-block":true},"insert":"\n"},{"insert":"  requestNote.onsuccess = function(event) {"},{"attributes":{"code-block":true},"insert":"\n"},{"insert":"   callback(requestNote.result);"},{"attributes":{"code-block":true},"insert":"\n"},{"insert":"  };"},{"attributes":{"code-block":true},"insert":"\n"},{"insert":"}"},{"attributes":{"code-block":true},"insert":"\n"},{"insert":"// Code From PolarOS3 Note Program"},{"attributes":{"code-block":true},"insert":"\n"},{"insert":"\nQuote Block"},{"attributes":{"header":3},"insert":"\n"},{"insert":"The quote block allows you to show\nquotes from other and that's about it.\nMy whole life had been designing computers I could never build."},{"attributes":{"blockquote":true},"insert":"\n"},{"insert":"\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t-\tMy Dude Steve Woz"},{"attributes":{"blockquote":true},"insert":"\n"},{"insert":"\nList and Bullets"},{"attributes":{"header":3},"insert":"\n"},{"insert":"Show what yourup to or put some\nstuff in order.\nMilk"},{"attributes":{"list":"bullet"},"insert":"\n"},{"insert":"Apples"},{"attributes":{"list":"bullet"},"insert":"\n"},{"insert":"Orange Soda"},{"attributes":{"list":"bullet"},"insert":"\n"},{"insert":"\nEvan Sellers"},{"attributes":{"list":"ordered"},"insert":"\n"},{"insert":"Matthew Pattrohay"},{"attributes":{"list":"ordered"},"insert":"\n"},{"insert":"Connor Harrison"},{"attributes":{"list":"ordered"},"insert":"\n"},{"insert":"\nLinks"},{"attributes":{"header":3},"insert":"\n"},{"insert":"Link are exactly what you think\nthey are.\n"},{"attributes":{"link":"http://PolarComputersInc.com"},"insert":"This is a link"},{"insert":"\nalso a link\n"},{"attributes":{"link":"http://PolarCOmputersInc.com"},"insert":"http://PolarComputersInc.com/about-polar"},{"insert":"\n\n\n\n"}]}
  } ];
  var transaction = db.transaction(["notes"], "readwrite");
  var objectStore = transaction.objectStore("notes");
  var objectStoreRequest = objectStore.add(newItem[0]);
  console.log("New note added! It's name '" + title + "' I think that a pretty cool name.")
  openNote(length);
  updatePos(0);
};


// Adds a note to the database
function addNote(title) {
  var id = generateNoteID(function(length) {
    var timeStamp = timeStampID();
    var newItem = [ {
      id: length,
      title: title,
      dateCreated: timeStamp,
      lastUpdated: timeStamp,
      notes: "" // FIXME make it just "" nothing is quotes
    } ];
    var transaction = db.transaction(["notes"], "readwrite");
    var objectStore = transaction.objectStore("notes");
    var objectStoreRequest = objectStore.add(newItem[0]);
    console.log("New note added! It's name '" + title + "' I think that a pretty cool name.")
    openNote(length);
  });
};


// time stamp set a date array which makes it easy for sorting files
function timeStampID() {
  var date= new Date();
  var timeStamp = [
    date.getFullYear(), // YYYY
    date.getMonth(), // MM
    date.getDate(), // DD
    date.getHours(), // Hour
    date.getMinutes(), // Minutes
    date.getMilliseconds(),
    date.getDay() // Millisecond
  ];
  return timeStamp;
};

// Calculates the length of the database
function databaseLength(database, callback) {
  var store = db.transaction([database]).objectStore(database);
  var count = store.count();
  count.onsuccess = function() {
     var length = count.result;
     callback(length);
  }
};

// generate note id so each id is unique
function generateNoteID(callback) {
  var length = databaseLength('notes', function(length) {
    console.log(length);
    callback(length);
  });
};

// opens
function openNote(id) {
  //updateNote();
  var transaction = db.transaction(["notes"]);
  var objectStore = transaction.objectStore("notes");
  var request = objectStore.get(id);
  request.onsuccess = function(event) {
    console.log(request.result.title);
    console.log(request.result.notes);
    quill.setContents(request.result.notes);
    var title = "Notes - " + request.result.title;
    console.log(request.result.title);
    console.log(title);
    document.title = title;
    updateTitlePage();
    currentOpenNote = request.result.id;
    setSaveTime(request.result.lastUpdated);
    unexpand();
  };
}

function updateNote() {
  updatePos(currentOpenNote);
  var transaction = db.transaction(["notes"]);
  var objectStore = transaction.objectStore("notes");
  console.log(currentOpenNote);
  var request = objectStore.get(currentOpenNote); // FIXME change to id
  request.onsuccess = function(event) {
    var timeStamp = timeStampID();
    var content = quill.getContents();
    console.log(content);
    console.log(request.result.title);
    var shortHandEject = quill.getText(0, 120) + "...";
    var newItem = [ {
      dateCreated: request.result.dateCreated,
      title: request.result.title,
      id: currentOpenNote,
      shortHand: shortHandEject,
      lastUpdated: timeStamp,
      notes: content // FIXME make it just "" nothing is quotes
    } ];
    var transaction = db.transaction(["notes"], "readwrite");
    var objectStore = transaction.objectStore("notes");
    var objectStoreRequest = objectStore.put(newItem[0]);
    setSaveTime(timeStamp);
  };
};

// Saves the time in editor
function setSaveTime(time) {
  console.log(time);
  var dayName = dayWeek(time[6]);
  var monthName = monthOfYear(time[1]);
  var timeInput = timeCalc(time[3],time[4])
  var inject = "Saved on " + dayName + ", " + monthName + " " + time[2] + " " + time[0] + " at " + timeInput;
  document.getElementById('time').innerHTML = inject;
}

// calcs the time for AM and PM
function timeCalc(hour,min) {
  if (min <= 9) {
    min = "0" + min;
  }
  if (hour >= 12) {
    return ((hour - 12) + ":" + min + " PM");
  }
  if (hour < 12) {
    return (hour + ":" + min + " AM");
  }
}

// Calculates the day of week
function dayWeek(dayNum) {
  var weekday = new Array();
  weekday[0] =  "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  return weekday[dayNum];
}

// Calculates Month of year
function monthOfYear(monthNum) {
  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  return month[monthNum];
}

// Add new Note Enter key on the new Note Page
document.getElementById('newNoteName').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      addNote(document.getElementById('newNoteName').value);
      document.getElementById('newNoteName').value = '';
      newNote(false);
      // Open Note
      return false;
    }
  }
