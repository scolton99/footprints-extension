// ask user where they are, must be either "library" or "sherman"
var user_location = null;
var msg = "Where are you working? Enter 'sherman', 'library', or 'infocommons'.";

function select(ips) {
    for (var i = 0; i < ips.length; i++) {
        console.log("IP: " + ips[i]);

        if (ips[i].startsWith("129.105.22")) {
            user_location = "library";
            break;
		} else if (ips[i].startsWith("129.105.29") || ips[i].startsWith("129.105.104")) {
			user_location = "infocommons";
        } else if (ips[i].startsWith("129.105.188")) {
            user_location = "sherman";
            break;
        }
    }

    if (user_location == null) {
        while (true) {
            user_location = window.prompt(msg);
            if (user_location === "sherman" || user_location === "library" || user_location === "infocommons") {
                break;
            } else {
                msg = "Invalid location supplied. Enter 'sherman', 'library', or 'infocommons'."
            }
        }
    }

    // save to browser storage -- note this overwrites previous value,
    // which handles the user working in different locations
    if (chrome) {
        chrome.storage.local.set({
            "location" : user_location
        }, function(result) {
            console.log("Set location to", user_location);
        });
    } else {
        browser.storage.local.set({
            "location" : user_location
        }, function(result) {
            console.log("Set location to", user_location);
        });
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

