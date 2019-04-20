chrome.contextMenus.removeAll();
chrome.contextMenus.create({
    id: "ticket",
    title: "Jump to ticket",
    type: 'normal',
    contexts: ['selection']
});
chrome.contextMenus.onClicked.addListener(function({selectionText}, tab) {
    const ticketnum = selectionText.trim();
    chrome.tabs.create({
        windowId: tab.windowId,
        index: tab.index + 1,
        openerTabId: tab.id,
        url : 'https://itsm-fp.northwestern.edu/MRcgi/MRlogin.pl?DL=' + ticketnum + 'DA1',
        active : true});
});
chrome.omnibox.onInputEntered.addListener(text => {
    const ticketnum = text.trim();
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: 'https://itsm-fp.northwestern.edu/MRcgi/MRlogin.pl?DL=' + ticketnum + 'DA1'});
    });
});