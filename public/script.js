window.onload = function(){
  var converter = showdown.Converter();
  var p = document.getElementById("pad");
  var m = document.getElementById("markdown");
  var prev;

  var convertText = function(){
    var text = p.value;
    prev = text;
    var html = converter.makeHtml(text);
    m.innerHTML = html;
  }

  //To check change is made or not without clicking on the textarea.
  var checkChange = function(){
    if(prev!=p.value){
      return true;
    }
    return false;
  }

//To check for change in textarea every second and if change occurs then update it without users clicking the textarea
  setInterval(function(){
    if(checkChange()){
      convertText();
    }
  }, 1000);

  p.addEventListener('input', convertText);

  //opens a sharejs document with the given name and filetype and a handle to the document is passed to the callback
  //pathname is the name after the .com in the url
   if(document.location.pathname.length > 1){
        // implement share js
        var documentName = document.location.pathname.substring(1);
        //creates a new document every time a new page is open
        sharejs.open(documentName, 'text', function(error, doc) {
          //Attaching the textarea to this object. This keeps our textarea in sync
            doc.attach_textarea(p);
            convertText();
        });
    }

    //convert on page load
    convertText();

}
