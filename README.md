# PolarOS Notes
This program will be built on top the Electron framework. With a Chrome headless browser and Node to interact with the application and website. Most code will be located on one page to be-able to have a blurred glass look. The program will be a flat clean notes application. It will store the data in the browser database, like a cache. The HTML frame work I am building with be used on futrue projects so it will have to be carefully constructed. There will be a main editor and when you click a button it will open a side bar and make the editor smaller.

## Function List
 - `expand()` - opens side bar
 - `unexpand()` - closes the side bar
 - `openNote(id)` - opens a note with the id
 - `updateNote()` - save current open note
 - `addNote(name)` - adds note to database
    - `generateID()` - makes an id for a new note
 - `settingsOpen(boolean)` - opens or closes settings
 - `addNotePage(boolean)` - open or closes the new menu page
 - `openListNotes()` - generates the list of saved notes
    - `gatherInfo(i,callback_)` - get info about a current note in a for loop
 - `changeBottomMessage()` - adds a clever message at the bottom of the note page
      - `generateMessage(message)` - makes the html for the message
      - `grabMessage(list)` - grabs random message from list
      - `grabItem(list)` - grabs a random item to insert in message
 - `updatePos(id)` - adds the note id to the end of the array to keep a record of last updated notes
 - `updateTimeStampPos(id)` - updates the time stamp of the note
 - `openLastNote(wait)` - opens the last edited note when the application start
 - `timeStampID()` - makes an array with time info to make sorting by date easy
 - `timeCalc()` - calculates time of the day so it display AM or PM and isnt in military time.
 - `init()` - creates database for first-time setup

## Flow Chart
![alt text](/assets/Diagram2.png?raw=true "Logo Title Text 1")


## Used API and Components
- Font Awesome (Icons)
- Google Font API (Open Sans)
- Bootstrap (HTML frame Work)
- Angular (HTML frame Work)
- jquery
- Quill.js by Quill
  - highlight JS by Quill (for code snippets)
  - katex CSS (colors for code snippets)
  - quill-image-drop-module by kensnyder
  - quill-image-resize-module by kensnyder
  - jQuery-Suggester by kensnyder
- CSS toggle switch by Marcus Burnette (I did a lot of editing)
- Month and Day organiser by w3schools.com
- Chrome Framework by Google
- Electron Framework by Atom
- IndexedDB by Mozilla (storage)
- electron-compilers (compiling it)
- Node.js
- electron-vibrancy by arkenthera (Mac transparenty)

## What to take a look at
 - Any files in `assets/javscript`
 - the `index.html` most of the javascript running the UI is located there.

## Welcome Note For first Time users
Welcome to PolarOS3 Notes
PolarOS notes is a note program with many capibilites. It can take basic notes and include picture. You can add code to your notes or quote block. Below we will teach you verything you need to know. Inculding keoard shorcuts, icons and how to use each feature.

Code Block
Code block allows you to insert code
into your notes very easily. It will also
show the color syntex of many
programming langues. This includes,
Javascript, Ruby, Python.
function gatherInfo(i,callback) {
  var transaction2 = db.transaction(["notes"]);
  var objectStore2 = transaction2.objectStore("notes");
  var requestNote = objectStore2.get(i);
    requestNote.onsuccess = function(event) {
      callback(requestNote.result);
    };
}
// Code From PolarOS3 Note Program

Quote Block
The quote block allows you to show
quotes from other and that's about it.
My whole life had been designing computers I could never build.
																	-	My Dude Steve Woz

List and Bullets
Show what yourup to or put some
stuff in order.
Milk
Apples
Orange Soda

Evan Sellers
Matthew Pattrohay
Connor Harrison

Links
Link are exactly what you think
they are.
This is a link
also a link
http://PolarComputersInc.com/about-polar
