// ask user where they are, must be either "library" or "sherman"
var user_location;
var msg = "Where are you working? Enter 'sherman' or 'library'."
while (true) {
    user_location = window.prompt(msg);
    if (user_location === "sherman" || user_location === "library") {
        break;
    } else {
        msg = "Invalid location supplied. Enter 'sherman' or 'library'."
    }
}

// save to chrome storage -- note this overwrites previous value,
// which handles the user working in different locations
chrome.storage.local.set({
    "location" : user_location
}, function(result) {
    console.log("Set location to", user_location);
});