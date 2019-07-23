// find selector dropdown
var dropdown = document.getElementsByName("Walk__uin__bLocation")[0];

// to map user input to the value footprints wants
var fpLocation;
var locations = {
    "library": "TSC__b__u__bLibrary",
    "sherman": "TSC__b__u__bSherman",
};

// get from local storage, get the footprints readable value, then
// update the walkin menu
if (dropdown) {
    chrome.storage.local.get({
        location: "unknown",
    }, ({ location }) => {
        chrome.storage.sync.get({
            showLocationWarning: true
        }, ({ showLocationWarning }) => {
            if ((location === "unknown" || location === null) && showLocationWarning) {
                const warning = document.createElement("span");
                warning.textContent = "FP Extension location not selected!";
                warning.style.marginTop = "10px";
                warning.style.fontSize = "1.1em";
                warning.style.fontWeight = "bold";
                warning.style.color = "red";
                warning.style.display = "block";
    
                const ref = document.querySelector("fieldset > div.cell[title='Location']");
                ref.appendChild(warning);
    
                return;
            }
    
            fpLocation = locations[location];
            dropdown.value = fpLocation;
        })
        
    });
}

let request_type = document.getElementById("Request__bType");

request_type.value = "Service__bRequest";