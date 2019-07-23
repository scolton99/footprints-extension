const form = document.getElementById("ticket_form");
form.addEventListener("submit",goToThing);

function goToThing() {
    let ticketnum = document.querySelector("#ticket_number").value;

    window.open('https://itsm-fp.northwestern.edu/MRcgi/MRlogin.pl?DL=' + ticketnum + 'DA1');
}

const setByLocation = location => {
    const locationSelector = document.getElementById("location");

    if (location === null)
        location = "unknown";
    
    locationSelector.value = location;
}

chrome.storage.onChanged.addListener((changes, _namespace) => {
    for (const key in changes) {
        if (key === "location") {
            const location = changes.location.newValue;

            setByLocation(location);
        }
    }
});

chrome.storage.local.get({
    location: null
}, values => {
    setByLocation(values.location);
});

document.getElementById("location").addEventListener("change", () => {
    chrome.storage.local.set({
        location: document.getElementById("location").value
    });
});