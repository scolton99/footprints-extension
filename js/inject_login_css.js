function injectLoginStyles(url) {
  var elem = document.createElement('link');
  elem.rel = 'stylesheet';
  elem.setAttribute('href', url);
  document.body.appendChild(elem);
}

function injectLogin() {
  chrome.storage.sync.get({
    dark: false
  }, items => {
    if (!items.dark)
      return;
    
    injectLoginStyles(chrome.extension.getURL('css/login.css'));
    injectLoginStyles(chrome.extension.getURL('css/login_dark.css'));
  
    document.querySelector("div#logoTopLogin > img").src = chrome.extension.getURL('img/ITSM-Brand-Dark.png');    
  });
}

window.addEventListener("DOMContentLoaded", injectLogin);
