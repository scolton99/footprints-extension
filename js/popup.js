chrome.storage.sync.get({
    popupMessage: false
}, function(items) {
    if (items.popupMessage) {
        document.cookie = "popupBlockerDisabled=true; path=/MRcgi";
    }
});


