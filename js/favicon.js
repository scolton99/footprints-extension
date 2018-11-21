function favicon() {
    const icons = document.querySelectorAll("link[rel~='icon']");

    for (let i = 0; i < icons.length; i++) {
        icons[i].parentElement.removeChild(icons[i]);
    }

    const img_apple57 = chrome.extension.getURL('img/apple-icon-57x57.png');
    const img_apple60 = chrome.extension.getURL('img/apple-icon-60x60.png');
    const img_apple72 = chrome.extension.getURL('img/apple-icon-72x72.png');
    const img_apple76 = chrome.extension.getURL('img/apple-icon-76x76.png');
    const img_apple114 = chrome.extension.getURL('img/apple-icon-114x114.png');
    const img_apple120 = chrome.extension.getURL('img/apple-icon-120x120.png');
    const img_apple144 = chrome.extension.getURL('img/apple-icon-144x144.png');
    const img_apple152 = chrome.extension.getURL('img/apple-icon-152x152.png');
    const img_apple180 = chrome.extension.getURL('img/apple-icon-180x180.png');

    const img_android = chrome.extension.getURL('img/android-icon-192x192.png');

    const img_favicon32 = chrome.extension.getURL('img/favicon-32x32.png');
    const img_favicon96 = chrome.extension.getURL('img/favicon-96x96.png');
    const img_favicon16 = chrome.extension.getURL('img/favicon-16x16.png');

    const apple57 = document.createElement("LINK");
    apple57.setAttribute("rel", "apple-touch-icon");
    apple57.setAttribute("type", "image/png");
    apple57.setAttribute("sizes", "192x192");
    apple57.setAttribute("href", img_apple57);

    const apple60 = document.createElement("LINK");
    apple60.setAttribute("rel", "apple-touch-icon");
    apple60.setAttribute("type", "image/png");
    apple60.setAttribute("sizes", "192x192");
    apple60.setAttribute("href", img_apple60);

    const apple72 = document.createElement("LINK");
    apple72.setAttribute("rel", "apple-touch-icon");
    apple72.setAttribute("type", "image/png");
    apple72.setAttribute("sizes", "192x192");
    apple72.setAttribute("href", img_apple72);

    const apple76 = document.createElement("LINK");
    apple76.setAttribute("rel", "apple-touch-icon");
    apple76.setAttribute("type", "image/png");
    apple76.setAttribute("sizes", "192x192");
    apple76.setAttribute("href", img_apple76);

    const apple114 = document.createElement("LINK");
    apple114.setAttribute("rel", "apple-touch-icon");
    apple114.setAttribute("type", "image/png");
    apple114.setAttribute("sizes", "192x192");
    apple114.setAttribute("href", img_apple114);

    const apple120 = document.createElement("LINK");
    apple120.setAttribute("rel", "apple-touch-icon");
    apple120.setAttribute("type", "image/png");
    apple120.setAttribute("sizes", "192x192");
    apple120.setAttribute("href", img_apple120);

    const apple144 = document.createElement("LINK");
    apple144.setAttribute("rel", "apple-touch-icon");
    apple144.setAttribute("type", "image/png");
    apple144.setAttribute("sizes", "192x192");
    apple144.setAttribute("href", img_apple144);

    const apple152 = document.createElement("LINK");
    apple152.setAttribute("rel", "apple-touch-icon");
    apple152.setAttribute("type", "image/png");
    apple152.setAttribute("sizes", "192x192");
    apple152.setAttribute("href", img_apple152);

    const apple180 = document.createElement("LINK");
    apple180.setAttribute("rel", "apple-touch-icon");
    apple180.setAttribute("type", "image/png");
    apple180.setAttribute("sizes", "192x192");
    apple180.setAttribute("href", img_apple180);

    const android = document.createElement("LINK");
    android.setAttribute("rel", "icon");
    android.setAttribute("type", "image/png");
    android.setAttribute("sizes", "192x192");
    android.setAttribute("href", img_android);

    const favicon32 = document.createElement("LINK");
    favicon32.setAttribute("rel", "icon");
    favicon32.setAttribute("type", "image/png");
    favicon32.setAttribute("sizes", "32x32");
    favicon32.setAttribute("href", img_favicon32);

    const favicon16 = document.createElement("LINK");
    favicon16.setAttribute("rel", "icon");
    favicon16.setAttribute("type", "image/png");
    favicon16.setAttribute("sizes", "16x16");
    favicon16.setAttribute("href", img_favicon16);

    const favicon96 = document.createElement("LINK");
    favicon96.setAttribute("rel", "icon");
    favicon96.setAttribute("type", "image/png");
    favicon96.setAttribute("sizes", "96x96");
    favicon96.setAttribute("href", img_favicon96);

    document.head.appendChild(apple57);
    document.head.appendChild(apple60);
    document.head.appendChild(apple72);
    document.head.appendChild(apple76);
    document.head.appendChild(apple114);
    document.head.appendChild(apple120);
    document.head.appendChild(apple144);
    document.head.appendChild(apple152);
    document.head.appendChild(apple180);

    document.head.appendChild(android);

    document.head.appendChild(favicon32);
    document.head.appendChild(favicon16);
    document.head.appendChild(favicon96);
}

window.addEventListener("DOMContentLoaded", favicon);
