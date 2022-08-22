const assignees_script = document.createElement("script");
assignees_script.setAttribute("src", chrome.runtime.getURL('/js/assignees.js'));
document.body.appendChild(assignees_script);

if (window.location.href.includes("MRcheckbox")) {
    var elem = document.createElement('link');
    elem.rel = 'stylesheet';
    elem.setAttribute('href', chrome.runtime.getURL('vendor/fontawesome/css/all.min.css'));
    document.body.appendChild(elem);

    var elem2 = document.createElement('link');
    elem2.rel = 'stylesheet';
    elem2.setAttribute('href', chrome.runtime.getURL('css/assignees.css'));
    document.body.appendChild(elem2);
}