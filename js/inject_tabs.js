chrome.storage.sync.get({
    tabs: true
}, items => {
    if (items.tabs) {
        const tabsScript = document.createElement("script");
        tabsScript.setAttribute("src", chrome.extension.getURL('/js/tabs.js'));
        document.documentElement.appendChild(tabsScript);
    }
});