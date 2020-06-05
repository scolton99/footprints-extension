chrome.contextMenus.removeAll();

chrome.contextMenus.create({
    id: "ticket",
    title: "Jump to ticket",
    type: 'normal',
    contexts: ['selection']
});

chrome.contextMenus.onClicked.addListener(function({selectionText}, tab) {
    const ticketnum = selectionText.trim();
    chrome.tabs.create({
        windowId: tab.windowId,
        index: tab.index + 1,
        openerTabId: tab.id,
        url : 'https://itsm-fp.northwestern.edu/MRcgi/MRlogin.pl?DL=' + ticketnum + 'DA1',
        active : true});
});

chrome.omnibox.onInputEntered.addListener(text => {
    const ticketnum = text.trim();
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: 'https://itsm-fp.northwestern.edu/MRcgi/MRlogin.pl?DL=' + ticketnum + 'DA1'});
    });
});

chrome.runtime.onMessage.addListener(async (request, _sender, sendResponse) => {
    if (request === "getIP") {
        const {ip: IP} = await fetch('https://api.ipify.org/?format=json').then(response => response.json());
        sendResponse(IP);

        chrome.storage.local.get({
            location: null
        }, values => {
            if (values.location === null || values.location === "unknown") {
                let location = "unknown";

                if (IP.startsWith("129.105.22")) {
                    location = "library";
                } else if (IP.startsWith("129.105.188")) {
                    location = "sherman";
                }

                chrome.storage.local.set({
                    location: location
                });

                return true;
            }
        });
    }
});

const setBadge = value => {
    switch (value) {
        case "sherman": {
            chrome.browserAction.setBadgeText({text: "S"});
            chrome.browserAction.setBadgeBackgroundColor({color: "#7A00CE"});
            break;
        }
        case "library": {
            chrome.browserAction.setBadgeText({text: "L"});
            chrome.browserAction.setBadgeBackgroundColor({color: "#7A00CE"});
            break;
        }
        case "unknown": {
            chrome.browserAction.setBadgeText({text: "U"});
            chrome.browserAction.setBadgeBackgroundColor({color: "#FF0000"});
            break;
        }
        case null: {
            chrome.browserAction.setBadgeText({text: ""});
            break;
        }
    }                           
}

chrome.storage.onChanged.addListener((changes, _namespace) => {
    for (const key in changes) {
        if (key === "location") {
            const location = changes[key].newValue;

            updateBadge();
        }
        
        if (key === "showLocationWarning") {
            updateBadge();
        }
    }
});

const updateBadge = () => {
    chrome.storage.local.get({
        location: null
    }, values => {
        const location = values.location;
    
        chrome.storage.sync.get({
            showLocationWarning: true
        }, values2 => {
            if (values2.showLocationWarning && location !== null) {
                setBadge(location);
            } else if (!values2.showLocationWarning) {
                setBadge(null);
            }
        });
    });
}

const updateFSM = async () => {
    const res = await fetch("https://cors-anywhere.herokuapp.com/www.feinberg.northwestern.edu/it/about/our-staff.html");
    const str = await res.text();
    const parser = new DOMParser();
    const fsmdoc = parser.parseFromString(str, 'text/html');

    const fsmstaff = Array.from(fsmdoc.querySelectorAll("div.info > p > strong")).map(x => x.textContent.replace("  ", " "));

    chrome.storage.local.set({
        fsmstaff: fsmstaff
    });
}

updateBadge();
updateFSM();