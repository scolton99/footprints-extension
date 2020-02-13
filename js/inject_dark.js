function inject() {
  chrome.storage.sync.get({
    dark: false
  }, items => {
    if (!items.dark)
      return;

    if (!document.body) {
      setTimeout(inject, 10);
      return;
    }

    for (const url of ["css/homepage.css"])

    var elem = document.createElement('link');
    elem.rel = 'stylesheet';
    elem.setAttribute('href', url);
    document.body.appendChild(elem);
  });
}

inject();