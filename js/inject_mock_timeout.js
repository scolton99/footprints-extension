const script = document.createElement("script");
script.setAttribute("src", chrome.extension.getURL('/js/mock_timeout.js'));
document.documentElement.appendChild(script);