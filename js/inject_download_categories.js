chrome.storage.sync.get({
    showDownloadCategories: false
}, items => {
    if (items.showDownloadCategories) {
        const i_d_categories = document.createElement("script");
        i_d_categories.setAttribute("src", chrome.extension.getURL('/js/download_categories.js'));
        document.body.appendChild(i_d_categories);
    }
});