chrome.storage.sync.get({
  enableCards: true
}, function(items) {

  if (!items.enableCards){
    document.getElementById("ContentWrapper").setAttribute('style', 'display:block !important; top: 0px !important; left: 0px !important; margin: 0 auto; position: initial !important');
    return;
  }

    const script = document.createElement("script");
    script.setAttribute("src", chrome.extension.getURL('/js/cards.js'));
    document.body.appendChild(script);
});
