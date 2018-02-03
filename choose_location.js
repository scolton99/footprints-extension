// ask user where they are, must be either "library" or "sherman"
var user_location = null;
var msg = "Where are you working? Enter 'sherman' or 'library'.";

function select(ips) {
    console.log(ips);

    for (var ip in ips) {
        console.log("IP: " + ip);
        if (!ips.hasOwnProperty(ip))
            continue;
        console.log("Tested!");

        if (ip.startsWith("129.105.22")) {
            user_location = "library";
            break;
        } else if (ip.startsWith("129.105.188")) {
            user_location = "sherman";
            break;
        }
    }

    if (user_location == null) {
        while (true) {
            user_location = window.prompt(msg);
            if (user_location === "sherman" || user_location === "library") {
                break;
            } else {
                msg = "Invalid location supplied. Enter 'sherman' or 'library'."
            }
        }
    }
}

// Taken from https://stackoverflow.com/questions/18572365/get-local-ip-of-a-device-in-chrome-extension
function getLocalIPs(callback) {
    var ips = [];

    var RTCPeerConnection = window.RTCPeerConnection ||
        window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

    var pc = new RTCPeerConnection({
        // Don't specify any stun/turn servers, otherwise you will
        // also find your public IP addresses.
        iceServers: []
    });
    // Add a media line, this is needed to activate candidate gathering.
    pc.createDataChannel('');

    // onicecandidate is triggered whenever a candidate has been found.
    pc.onicecandidate = function(e) {
        if (!e.candidate) { // Candidate gathering completed.
            pc.close();
            callback(ips);
            return;
        }
        var ip = /^candidate:.+ (\S+) \d+ typ/.exec(e.candidate.candidate)[1];
        if (ips.indexOf(ip) == -1) // avoid duplicate entries (tcp/udp)
            ips.push(ip);
    };
    pc.createOffer(function(sdp) {
        pc.setLocalDescription(sdp);
    }, function onerror() {});
}

getLocalIPs(select);

// save to chrome storage -- note this overwrites previous value,
// which handles the user working in different locations
chrome.storage.local.set({
    "location" : user_location
}, function(result) {
    console.log("Set location to", user_location);
});