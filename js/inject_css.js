function injectStyles(url) {
  chrome.storage.sync.get({
    prettyFootprints: true
  }, function(items) {
    if (!items.prettyFootprints && url.endsWith('fp-material.css'))
      return;

    if (!document.body) {
      setTimeout(injectStyles.bind(null, url), 10);
      return;
    }

    var elem = document.createElement('link');
    elem.rel = 'stylesheet';
    elem.setAttribute('href', url);
    document.body.appendChild(elem);
  });
}

function injectAll() {
  injectStyles(chrome.extension.getURL('vendor/fontawesome/css/all.min.css'));
  injectStyles(chrome.extension.getURL('css/fp-material.css'));
  injectStyles(chrome.extension.getURL('css/fixify.css'));
  injectStyles(chrome.extension.getURL('css/attachments.css'));
}

injectAll();
