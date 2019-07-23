const setLocation = async () => {
    chrome.runtime.sendMessage("getIP");
}

setLocation();