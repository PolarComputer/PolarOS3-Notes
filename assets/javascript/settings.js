function updateSettings() {
  console.log("hello");
    var newItem = [ {
      id: "settings",
      tool_bar_standard_text_options: document.getElementById("switch3").checked,
      tool_bar_quotes: document.getElementById("switch4").checked,
      tool_bar_code_box: document.getElementById("switch5").checked,
      tool_bar_list_bullets: document.getElementById("switch6").checked,
      tool_bar_super_sub: document.getElementById("switch7").checked,
      tool_bar_images: document.getElementById("switch8").checked,
      tool_bar_link: document.getElementById("switch9").checked,
      tool_bar_clear_format: document.getElementById("switch10").checked,
    } ];
    var transaction = db.transaction(["notes"], "readwrite");
    var objectStore = transaction.objectStore("notes");
    var objectStoreRequest = objectStore.put(newItem[0]);
};

function setupSettings() {
  console.log("hello");
    var newItem = [ {
      id: "settings",
      tool_bar_standard_text_options: true,
      tool_bar_quotes: false,
      tool_bar_code_box: false,
      tool_bar_list_bullets: true,
      tool_bar_super_sub: false,
      tool_bar_images: true,
      tool_bar_link: true,
      tool_bar_clear_format: false,
    } ];
    var transaction = db.transaction(["notes"], "readwrite");
    var objectStore = transaction.objectStore("notes");
    var objectStoreRequest = objectStore.add(newItem[0]);
};

function setToggleBtn() {
  console.log("hello");
  var transaction = db.transaction(["notes"]);
  var objectStore = transaction.objectStore("notes");
  var request = objectStore.get("settings");
  request.onsuccess = function(event) {
    if(request.result.tool_bar_standard_text_options) {
      document.getElementById("switch3").checked = true;
    }
    if(request.result.tool_bar_quotes) {
      document.getElementById("switch4").checked = true;
    }
    if(request.result.tool_bar_code_box) {
      document.getElementById("switch5").checked = true;
    }
    if(request.result.tool_bar_list_bullets) {
      document.getElementById("switch6").checked = true;
    }
    if(request.result.tool_bar_super_sub) {
      document.getElementById("switch7").checked = true;
    }
    if(request.result.tool_bar_images) {
      document.getElementById("switch8").checked = true;
    }
    if(request.result.tool_bar_link) {
      document.getElementById("switch9").checked = true;
    }
    if(request.result.tool_bar_clear_format) {
      document.getElementById("switch10").checked = true;
    }
  };
}

function reloadToolBar() {
  document.querySelectorAll('.ql-toolbar').forEach(function(a) {
    a.remove()
  })
}

function regenrateToolBar(quillInput) {
  var toolbarOptions = quillInput;
  var quill = new Quill('#editor-container', {
    modules: {
      imageResize: {
        modules: [ 'Resize', 'DisplaySize' ],
        displaySize: true,
        displayStyles: {
          backgroundColor: 'rgba(20, 143, 245,.5)',
          border: 'none',
          color: 'white'
        },
        handleStyles: {
          backgroundColor: 'black',
          border: 'none',
          color: "white"
      // other camelCase styles for size display
        }
      },
      imageDrop: true,
      syntax: true,
      toolbar: toolbarOptions,
      history: {
        delay: 2000,
        maxStack: 500,
        userOnly: true
      },
    },
    placeholder: 'Compose an epic...',
    theme: 'snow'  // or 'bubble'
  });
}
