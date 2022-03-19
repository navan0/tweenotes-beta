document.getElementById("editor").contentEditable = true;

document.getElementById('editor').addEventListener('keyup', limitFunction);


function limitFunction() {
  chrome.storage.local.get("data", function(items) {
      if (!chrome.runtime.error) {
          var editor_div = document.getElementById('editor');
	        //console.log(items.data.line, items.data.text);
          console.log(editor_div.children.length);
          lines = items.data.text.split('\n');
          var lineLength = editor_div.children.length;
          var pageLength = Math.floor(lines.length/34);
          document.getElementById("page").innerText = "P" + pageLength + ", L" + lineLength
          var rawQuotient = lines.length/34;
          var remainder = 17 % 34;
          var quotient = rawQuotient - remainder;
          //console.log(lines.length, remainder);
      }
  });

}


var ce = document.querySelector('#editor')
ce.addEventListener('paste', function (e) {
  e.preventDefault()
  var text = e.clipboardData.getData('text/plain')
  document.execCommand('insertText', false, text)
})


document.body.onload = function() {

  chrome.storage.local.get("data", function(items) {
      if (!chrome.runtime.error) {
	  var editor_div = document.getElementById('editor');
          lines = items.data.text.split('\n');
	  console.log(lines)
	  document.getElementById("editor").innerText = items.data.text;
          var lineLength = editor_div.children.length;
          var pageLength = Math.floor(lines.length/34);
          document.getElementById("page").innerText = "P" + pageLength + ", L" + lineLength
      }
  });
}


document.getElementById('editor').addEventListener('keyup', myFunction);
const regex = /(?<=# ).*/;
let m;


function myFunction() {
    var text = document.getElementById('editor').innerText;

    console.log(text.split('\n'))
    chrome.storage.local.set(
        {
            "data": {
                "text": text,
                "line": text.split(/\r\n|\r|\n/).length
            }
        }
    );
}



