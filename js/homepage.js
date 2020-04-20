function injectHomepageStyles(url) {
  var elem = document.createElement('link');
  elem.rel = 'stylesheet';
  elem.setAttribute('href', url);
  document.body.appendChild(elem);
}

function injectHomepage() {
  if (!document.body) 
    return window.setTimeout(injectHomepage, 10);

  injectHomepageStyles(chrome.extension.getURL('vendor/fontawesome/css/all.min.css'));

  chrome.storage.sync.get({
    dark: false
  }, items => {
    if (!items.dark)
      return;
      
    window.addEventListener("DOMContentLoaded", fix_homepage);
    injectHomepageStyles(chrome.extension.getURL('css/homepage.css'));
  });
}

const arrows = () => {
  const l = document.querySelectorAll("img[src='/MRimg/previous.png']");
  const l_fade = document.querySelectorAll("img[src='/MRimg/previous_faded.png']");
  const r = document.querySelectorAll("img[src='/MRimg/next.png']");
  const r_fade = document.querySelectorAll("img[src='/MRimg/next_faded.png']");

  if (l.length !== 0) remove_and_inject(l, "caret-left", false);
  if (l_fade.length !== 0) remove_and_inject(l_fade, "caret-left", true);
  if (r.length !== 0) remove_and_inject(r, "caret-right", false);
  if (r_fade.length !== 0) remove_and_inject(r_fade, "caret-right", true);

  const refresh = document.querySelectorAll("img[src='/MRimg/refresh_header.png']");
  if (refresh.length !== 0) remove_and_inject(refresh, "redo-alt", false);

  const action = document.querySelectorAll("img[src='/MRimg/gettingstarted.png']");
  if (action.length !== 0) remove_and_inject(action, "bullseye", false);
}

const remove_and_inject = (els, dir, fade) => {
  for (const el of els) {
    el.style.display = "none";
    const span = document.createElement("span");
    span.classList.add("fas", `fa-${dir}`);
    span.classList.add("navarrow");
  
    if (fade) span.classList.add("disabled");
  
    el.parentElement.insertBefore(span, el);
  }
}

const fix_homepage = () => {
  const logo = document.querySelector("div#Logo > img");
  logo.src = chrome.extension.getURL('img/ITSM-Brand-Dark.png');

  if (!document.getElementById("splitbutton1-button"))
    return window.setTimeout(fix_homepage, 10);

  document.getElementById("splitbutton1-button").style.backgroundImage = "url(\"" + chrome.extension.getURL('img/split-button-arrow-dark.png') + "\")";

  const style = document.createElement("style");
  style.textContent = "div#QuickSearchMenu div.bd > ul.first-of-type > li.yuimenuitem.yuimenuitem-checked { background-image: url(\"" + chrome.extension.getURL("img/menuitem_checkbox.png") + "\"); }";
  document.body.appendChild(style);

  injectHomepage();
  arrows();
}

injectHomepage();