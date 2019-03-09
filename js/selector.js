// find selector dropdown
var dropdown = document.getElementsByName("Walk__uin__bLocation")[0];

// to map user input to the value footprints wants
var fpLocation;
var locations = {
    "library": "TSC__b__u__bLibrary",
    "sherman": "TSC__b__u__bSherman",
	"infocommons": "Info__bCommons"
};

// get from local storage, get the footprints readable value, then
// update the walkin menu
if (dropdown) {
    chrome.storage.local.get("location", function(storedLocation) {
        storedLocation = storedLocation["location"];
        fpLocation = locations[storedLocation];
        dropdown.value = fpLocation;
    });
}

let request_type = document.getElementById("Request__bType");

request_type.value = "Service__bRequest";