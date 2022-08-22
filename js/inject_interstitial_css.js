function injectInterstitialStyles(url) {
  var elem = document.createElement('link');
  elem.rel = 'stylesheet';
  elem.setAttribute('href', url);
  document.body.appendChild(elem);
}

function injectInterstitial() {
  chrome.storage.sync.get({
    dark: false
  }, items => {
    if (!items.dark)
      return;

    if (document.forms.LOGIN)
      return;
    
    injectInterstitialStyles(chrome.runtime.getURL('css/interstitial.css'));
    injectInterstitialStyles(chrome.runtime.getURL('css/loading.css'));
  });
}

window.addEventListener("DOMContentLoaded", injectInterstitial);
