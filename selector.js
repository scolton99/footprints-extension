// find selector dropdown
var dropdown = document.getElementsByName("Walk__uin__bLocation")[0];

// to map user input to the value footprints wants
var fpLocation;
var locations = {
    "library": "TSC__b__u__bLibrary",
    "sherman": "TSC__b__u__bSherman"
}

// get from local storage, get the footprints readable value, then
// update the walkin menu
var userInput = chrome.storage.local.get("location", function(storedLocation) {
    storedLocation = storedLocation["location"];
    fpLocation = locations[storedLocation];    
    setMenu(dropdown, fpLocation);
});

// set a given menu with a certain value
function setMenu(menu, targetValue) {
    var opt;
    for (var j = 0; opt = menu.options[j]; j++) {
       if (opt.value === targetValue) {
           menu.selectedIndex = j;
           break;
       }
   }
}
