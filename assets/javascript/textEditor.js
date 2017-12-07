//==========================================\\
//  Javscript Asset Library - Text Editor   \\
//              By Evan Sellers             \\
//==========================================\\
//   This script setups the editor and add  \\
//  alls the custom atrubittes for it. The  \\
//      editor is sourced by quill.js       \\
//==========================================\\

var quill;
var customButton;
var toolbar;

// Imports Code Colors for code editor
hljs.configure({   // optionally configure hljs
  languages: ['javascript', 'ruby', 'python']
});


var icons = Quill.import('ui/icons');
icons['clean'] = '';
icons['link'] = '';
icons['image'] = '';
icons['code-block'] = '';
icons['blockquote'] = '';
//icons['color-picker'] = '';


// Loads editor settings from databse
function loadEditor() {
  var transaction = db.transaction(["notes"]);
  var objectStore = transaction.objectStore("notes");
  var request = objectStore.get("settings");
  request.onsuccess = function(event) {
    var toolbarOptions = [[{ 'header': [1, 2, 3, false] }]];
    if(request.result.tool_bar_standard_text_options) {
      toolbarOptions.push(['bold', 'italic', 'underline', 'strike']);
    }
    if(request.result.tool_bar_quotes) {
      toolbarOptions.push(['blockquote']);
    }
    if(request.result.tool_bar_code_box) {
      toolbarOptions.push(['code-block']);
    }
    if(request.result.tool_bar_list_bullets) {
      toolbarOptions.push([{ 'list': 'ordered'}, { 'list': 'bullet' }]);
    }
    if(request.result.tool_bar_super_sub) {
      toolbarOptions.push([{ 'script': 'sub'}, { 'script': 'super' }]);
    }
    if(request.result.tool_bar_images) {
      toolbarOptions.push(['image']);
    }
    if(request.result.tool_bar_link) {
      toolbarOptions.push(['link']);
    }
    if(request.result.tool_bar_clear_format) {
      toolbarOptions.push(['clean']);
    }
    toolbarOptions.push(['undo']);
    toolbarOptions.push(['redo']);
    toolbarOptions.push(['save']);
    toolbarOptions.push(['expand']);

    quill = new Quill('#editor-container', {
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

    // Creates the custom buttons
    var toolbar = quill.getModule('toolbar');
      toolbar.addHandler('expand', function() {
        console.log('expand')
      }
    );

    var toolbar = quill.getModule('toolbar');
      toolbar.addHandler('expand', function() {
        console.log('undo')
      }
    );

    var toolbar = quill.getModule('toolbar');
      toolbar.addHandler('save', function() {
        console.log('save')
      }
    );

    var toolbar = quill.getModule('toolbar');
      toolbar.addHandler('redo', function() {
        console.log('redo')
      }
    );

    var customButton = document.querySelector('.ql-expand');
      customButton.addEventListener('click', function() {
        expand();
      }
    );

    var customButton = document.querySelector('.ql-undo');
      customButton.addEventListener('click', function() {
        quill.history.undo();
      }
    );

    var customButton = document.querySelector('.ql-redo');
      customButton.addEventListener('click', function() {
        quill.history.redo();
      }
    );

    var customButton = document.querySelector('.ql-save');
      customButton.addEventListener('click', function() {
        updateNote();
      }
    );


  };
};
