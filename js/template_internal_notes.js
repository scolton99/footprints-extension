const save_internal_notes = () => {
  const notes_box = document.getElementById("Internal__bNotes");
  chrome.storage.local.set({
    last_internal_notes: notes_box.value
  });
};

const load_internal_notes = () => {
  chrome.storage.local.get({
    last_internal_notes: null
  }, data => {
    if (data.last_internal_notes === null || data.last_internal_notes === "")
      return;
    
    const notes_box = document.getElementById("Internal__bNotes");

    if (notes_box.value === data.last_internal_notes) {
      console.debug("Values are the same. Not appending internal notes.");
      return;
    } else if(notes_box.value === "") {
      console.debug("Empty value. New ticket.");
      return;
    } else {
      console.info("Restoring old internal notes in addition to message.");
    }

    const in_append = "\r\n\r\n" + data.last_internal_notes;

    notes_box.value += in_append;
  });
}

const qit_button = document.querySelector("select[name='QUICKCREATE'] + table > tbody > tr > td > a[title='Submit']");
if (qit_button) {
  qit_button.addEventListener("click", save_internal_notes);
  load_internal_notes();
}
