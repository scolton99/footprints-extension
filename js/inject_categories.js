const script = document.createElement("script");
script.setAttribute("src", chrome.runtime.getURL('/js/categories.js'));
document.body.appendChild(script);