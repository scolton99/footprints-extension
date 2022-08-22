chrome.storage.sync.get({
    tabs: true
}, items => {
    window.addEventListener("load", () => {
        if (items.tabs) {
            const tabsScript = document.createElement("script");
            tabsScript.setAttribute("src", chrome.runtime.getURL('/js/tabs.js'));
            document.documentElement.appendChild(tabsScript);
        }
    });
});
