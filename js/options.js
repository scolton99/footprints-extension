function save_options() {
  var prettyFootprints = document.getElementById('prettyFootprints').checked;
  var popupMessage = document.getElementById('popupMessage').checked;
  var autoRefresh = document.getElementById('autoRefresh').checked;
  var showDownloadCategories = document.getElementById('showDownloadCategories').checked;
  var tabs = document.getElementById('tabs').checked;

  chrome.storage.sync.set({
    prettyFootprints: prettyFootprints,
    popupMessage: popupMessage,
    autoRefresh: autoRefresh,
    showDownloadCategories: showDownloadCategories,
    tabs: tabs
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    prettyFootprints: true,
    popupMessage: false,
    autoRefresh: false,
    showDownloadCategories: false,
    tabs: true
  }, function(items) {
    document.getElementById('prettyFootprints').checked = items.prettyFootprints;
    document.getElementById('popupMessage').checked = items.popupMessage;
    document.getElementById('autoRefresh').checked = items.autoRefresh;
    document.getElementById('showDownloadCategories').checked = items.showDownloadCategories;
    document.getElementById('tabs').checked = items.tabs;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);