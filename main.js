const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu;
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Notes",
    transparent: true,
    titleBarStyle: 'hidden',
  })




  const menuTemplate = [{
    label: 'NoteApp',
    submenu: [{
      label: "About Polar Notes",
      click: () => {
        console.log("about clicked");
      }
    }, {
      label: "version 1.0.0 Beta",
      enable: false,
    }, {
      type: 'separator'
    }, {
      label: "settings",
      click: () => {
        webFunctionCmd("settingMenuOpen()");
      },
      accelerator: 'CmdOrCtrl+4',
    }, {
      label: "Close Menu",
      click: () => {
        webFunctionCmd("escAnyMenu()");
      },
      accelerator: 'Esc',
    }, {
      label: "quit",
      click: () => {
        app.quit();
      },
      accelerator: 'CmdOrCtrl+Q',
    }]
  }, {

    label: 'File',
    submenu: [{
      label: "New Note",
      click: () => {
        webFunctionCmd("newNote(true)");
      },
      accelerator: 'CmdOrCtrl+N',
    }, {
      label: "Save",
      click: () => {
        webFunctionCmd("updateNote()");
      },
      accelerator: 'CmdOrCtrl+S',
    }, {
      type: 'separator'
    }, {
      label: "My Notes",
      click: () => {
        webFunctionCmd("invertExpand()");
      },
      accelerator: 'CmdOrCtrl+E',
    }]


  }];
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
function webFunctionCmd(command) {
  mainWindow.webContents.send('function', command)
}
