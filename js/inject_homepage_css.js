function injectHomepageStyles(url) {
  var elem = document.createElement('link');
  elem.rel = 'stylesheet';
  elem.setAttribute('href', url);
  document.body.appendChild(elem);
}

function injectHomepage() {
}

window.addEventListener("DOMContentLoaded", injectHomepage);
