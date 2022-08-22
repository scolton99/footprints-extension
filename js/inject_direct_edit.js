function injectDirectEditStyles(url) {
  var elem = document.createElement('link');
  elem.rel = 'stylesheet';
  elem.setAttribute('href', url);
  document.body.appendChild(elem);
}

function injectDirectEdit() {
  chrome.storage.sync.get({
    dark: false
  }, items => {
    if (!items.dark)
      return;
    
    injectDirectEditStyles(chrome.runtime.getURL('css/direct_edit.css'));
  });
}

window.addEventListener("DOMContentLoaded", injectDirectEdit);
