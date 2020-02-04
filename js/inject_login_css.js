function injectLoginStyles(url) {
  var elem = document.createElement('link');
  elem.rel = 'stylesheet';
  elem.setAttribute('href', url);
  document.body.appendChild(elem);
}

function injectLogin() {
  injectLoginStyles(chrome.extension.getURL('css/login.css'));

  document.querySelector("div#logoTopLogin > img").src = chrome.extension.getURL('img/ITSM-Brand-Dark.png');
}

window.addEventListener("DOMContentLoaded", injectLogin);
