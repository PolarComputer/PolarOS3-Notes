//==========================================\\
// Javscript Asset Library - Bottom Message \\
//              By Evan Sellers             \\
//==========================================\\
//   This script makes functions callable   \\
// from the elctron main frame. This allows \\
//         for shorcuts and menus.          \\
//==========================================\\


const {remote} = require('electron')
const {Menu, MenuItem} = remote

const menu = new Menu()
menu.append(new MenuItem({label: 'MenuItem1', click() { console.log('item 1 clicked') }}))
menu.append(new MenuItem({type: 'separator'}))
menu.append(new MenuItem({label: 'MenuItem2', type: 'checkbox', checked: true}))

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  menu.popup(remote.getCurrentWindow())
}, false)