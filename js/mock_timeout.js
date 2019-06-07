const oldTimeout = window.setTimeout;
window.setTimeout = function(callback, timeout) {
    if (timeout === 900000 || timeout === 1800000 || timeout === 3600000) {
        return;
    }
    
    oldTimeout(callback, timeout);
};