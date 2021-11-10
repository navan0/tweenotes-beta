document.getElementById("editor").contentEditable = true;

var ce = document.querySelector('#editor')
ce.addEventListener('paste', function (e) {
  e.preventDefault()
  var text = e.clipboardData.getData('text/plain')
  document.execCommand('insertText', false, text)
})


document.body.onload = function() {

  chrome.storage.sync.get("data", function(items) {
    if (!chrome.runtime.error) {

      document.getElementById("editor").innerText = items.data;
      // console.log("got", items.data);
    }
  });
}


document.getElementById('editor').addEventListener('keyup', myFunction);
const regex = /(?<=# ).*/;
let m;


function myFunction() {
  var text = document.getElementById('editor').innerText;
  // console.log("data", text);
  chrome.storage.sync.set({"data": text }, function() {
    if ((m = regex.exec(text)) !== null) {
        m.forEach((match, groupIndex) => {
            console.log(`Found match, group ${groupIndex}: ${match}`);
        });
    }
    document.onkeyup = function(e) {
      if (e.which == 191){
        // console.log("yes yes")
      }
    }
  });

}

function surroundSelection() {
    var span = document.createElement("span");
    span.style.fontWeight = "bold";
    span.style.color = "green";

    if (document.getSelection) {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var range = sel.getRangeAt(0).cloneRange();
            range.surroundContents(span);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
}

// document.onselectionchange = function() {
//
//   // console.log("hello from select");
// }

document.getElementById('home').addEventListener('click', changeHome);
var json = [{
  "id" : "1",
  "date"   : "Mon,  Nov 10, 7:00 PM",
  "title": "Design proposal for suparna",
  "cover": "Mon",
  "text": "Vann sambavam text"
},
{
"id" : "2",
"date"   : "Fri,  Nov 12, 8:30 PM",
"title": "Tweenotes meeting",
"cover": "Friday",
"text": "Vann sambavam text"
}];
var wrapper = document.getElementById("cards");
var editor = document.getElementById("editor");

function changeHome(){
  console.log("from tree");

  var elements = document.getElementsByClassName('notes');
  console.log(elements.length);
  elements[0].style.visibility = 'hidden';

  var myHTML = '';

  for (var i = 0; i < json.length; i++) {
    var obj = json[i];
      const card = `
      <div class="card-media">
      <div class="card-media-object-container">
        <div class="card-media-object" style="background-image: url(https://i.ibb.co/tqFYtkV/cold-smooth-tasty.png);">
          <div class="centered">${obj.cover}</div>

        </div>

      </div>
      <div class="card-media-body">
      <div class="card-media-body-top">
      <span class="subtle">${obj.date}</span>
        <div class="card-media-body-top-icons u-float-right">
      </div>
      </div>
      <span class="card-media-body-heading">${obj.title}</span>
      <div class="card-media-body-supporting-bottom">
        <span class="card-media-body-supporting-bottom-text subtle">Last updated ${obj.date}</span>
      </div>
      </div>
    </div>
    `

    myHTML += card;
  }
  wrapper.innerHTML = myHTML

  var userSelection = document.getElementsByClassName('card-media-body');
  for (var i = 0; i < 2; i++) {
    userSelection[i].id =  i
    userSelection[i].addEventListener("click", clickCard);
  }
}


function clickCard(event){
  var elems = document.getElementsByClassName('container');
  for (var i=0;i<elems.length;i+=1){
  elems[i].style.display = 'none';
  }
  var text = json[event.target.id];
  const texr = JSON.stringify(json[event.target.id])
  document.getElementById("editor").innerText = text.text;
  document.getElementById("editor").style.visibility = 'visible';

}
