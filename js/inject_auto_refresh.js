window.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get({
        autoRefresh: false
    }, items => {
        if (items.autoRefresh) {
            const script = document.createElement("script");
            script.setAttribute("src", chrome.runtime.getURL('/js/auto_refresh.js'));
            document.body.appendChild(script);
        }
    });
});
