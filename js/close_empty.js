const main = document.querySelector(".dialogMainContent");
if (main && main.textContent.indexOf("no matches to") !== -1) {
  window.close();
}