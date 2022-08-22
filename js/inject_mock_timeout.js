const script = document.createElement("script");
script.setAttribute("src", chrome.runtime.getURL('/js/mock_timeout.js'));
document.documentElement.appendChild(script);