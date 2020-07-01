const script = document.createElement("script");
script.setAttribute("src", chrome.extension.getURL('/js/cards.js'));
document.body.appendChild(script);