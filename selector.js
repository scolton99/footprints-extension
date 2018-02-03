// find selector dropdown
var dropdown = document.getElementsByName("Walk__uin__bLocation")[0];

// possible locations
var opt;
var locations = [
    "TSC__b__u__bLibrary",
    "TSC__b__u__bSherman",
    "Residence__bHall"
]

// set location to saved value
var current_location = locations[0];
for (var j = 0; opt = dropdown.options[j]; j++) {
   if (opt.value === current_location) {
       dropdown.selectedIndex = j;
       break;
   }
}

