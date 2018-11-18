function updateValues() {
  console.log("SWITCHING SEARCH TYPE");
  
  const els = document.getElementsByName("ANDOR");
  for (let i = 0; i < els.length; i++) {
    if (els[i].value === "or") {
      els[i].checked = true;
      break;
    }
  }
  
  document.getElementsByName("SELECTCONTACT")[0].submit();
  return false;
}

const button = document.querySelector("[title='GO']");
button.setAttribute("href","javascript:void(0);");
button.addEventListener("click", updateValues);

document.onkeypress = function() {
  if (window.event)
    keyPressed = window.event.keyCode;
  else if (e)
    keyPressed = e.which;
  else
    return true;

  if (keyPressed == 13) {
    updateValues();
    return false;
  }
  else
    return true;
}

document.getElementsByName("SELECTCONTACT")[0].addEventListener("submit", updateValues());