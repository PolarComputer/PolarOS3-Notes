//==========================================\\
//   Javscript Asset Library - Note List    \\
//              By Evan Sellers             \\
//==========================================\\
//  This script adds the list to the side.  \\
//==========================================\\



// to prevent call backfunctions
function addList() {

}

// set auto generatate the last edited list
function setupList() {
  var list = [ {id: "list", editedLast: []}];
  var transaction = db.transaction(["notes"], "readwrite");
  var objectStore = transaction.objectStore("notes");
  var objectStoreRequest = objectStore.add(list[0]);
}

// Updates the last edited file and put it at the front of the array
function updatePos(id) {
  var transaction = db.transaction(["notes"]);
  var objectStore = transaction.objectStore("notes");
  var request = objectStore.get("list"); // FIXME change to id
  request.onsuccess = function(event) {
    console.log(request.result.editedLast.length);
    console.log(request.result.editedLast);
    var array = request.result.editedLast;
    var list = removeArray(array, id);
    console.log(list);
    list.push(id);
    console.log(list);
    var list = [ {id: "list", editedLast: list}];
    var transaction = db.transaction(["notes"], "readwrite");
    var objectStore = transaction.objectStore("notes");
    var objectStoreRequest = objectStore.put(list[0]);
  };
}

// removes a value from an array
function removeArray(array,value) {
  for (var i=array.length-1; i>=0; i--) {
      if (array[i] === value) {
          array.splice(i, 1);
          break;
      }
  }
  return array;
}

// updates time stamp
function updateTimeStampPos(id) {
  var transaction = db.transaction(["notes"]);
  var objectStore = transaction.objectStore("notes");
  console.log(currentOpenNote);
  var request = objectStore.get(currentOpenNote); // FIXME change to id
  request.onsuccess = function(event) {
    var timeStamp = timeStampID();
    var content = quill.getContents();
    console.log(content);
    var newItem = [ {
      id: currentOpenNote,
      lastUpdated: timeStamp,
      notes: content // FIXME make it just "" nothing is quotes
    } ];
    var transaction = db.transaction(["notes"], "readwrite");
    var objectStore = transaction.objectStore("notes");
    var objectStoreRequest = objectStore.put(newItem[0]);
    setSaveTime(timeStamp);
  };
};
