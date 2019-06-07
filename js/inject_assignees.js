const assignees_script = document.createElement("script");
assignees_script.setAttribute("src", chrome.extension.getURL('/js/assignees.js'));
document.body.appendChild(assignees_script);