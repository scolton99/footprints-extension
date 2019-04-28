const oldTimeout = window.setTimeout;
window.setTimeout = function(callback, timeout) {
    if (timeout === 900000 || timeout === 1800000 || timeout === 3600000) {
        console.log("cancelling " + callback.name);
        return;
    }

    console.log("setting timeout of " + timeout + "ms for " + callback.name + " with ID " + oldTimeout(callback, timeout));
};