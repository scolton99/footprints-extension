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
        const walk_in_location = document.getElementById("Walk__uin__bLocation");

        chrome.storage.sync.get({
            showLocationWarning: true
        }, ({ showLocationWarning }) => {
            if (showLocationWarning) {

                if ((location === "unknown" || location === null) && walk_in_location.value === "" && walk_in_location.tagName === "SELECT") {
                    walk_in_location.style.backgroundColor = "#d66";
                    walk_in_location.addEventListener("change", (() => {
                        document.getElementById("Walk__uin__bLocation").style.backgroundColor = null;
                    }).bind(walk_in_location));
        
                    return;
                }
            }  
        });
        
        if (walk_in_location.tagName === "SELECT" && location !== "unknown" && location !== null) {
            fpLocation = locations[location];
            dropdown.value = fpLocation;
        }
    });
}

let request_type = document.getElementById("Request__bType");

request_type.value = "Service__bRequest";