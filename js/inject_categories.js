const script = document.createElement("script");
script.setAttribute("src", chrome.extension.getURL('/js/categories.js'));
document.body.appendChild(script);