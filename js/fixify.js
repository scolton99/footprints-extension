function fixify() {
  const descIfr = document.querySelector("#descrpt_ifr");
  
  const descDoc = descIfr.contentDocument;
  let nodes = descDoc.body.getElementsByTagName("*");
  
  for (let i = 0; i < nodes.length; i++) {
    let l = nodes[i].style.length;

    for (let j = 0; j < l; j++) {
      if (nodes[i].style[j] !== "font-family" && nodes[i].style[j] !== "font-size")
        continue;

      nodes[i].style[nodes[i].style[j]] = "";
    }

    nodes[i].removeAttribute("_mce_style");
    nodes[i].removeAttribute("face");
  }
  
  descDoc.body.style.fontFamily = "Verdana, Arial, Helvetica, sans-serif";
  descDoc.body.style.fontSize = "13px";
}

(function setupFixify() {
  let tr = document.querySelector("#IssueInformation_ecTable table.inlineDialogHeading.indented tr");
  if (!tr) {
    window.setTimeout(setupFixify, 500);
    return;
  }

  let before = tr.firstElementChild.nextElementSibling;

  let td = document.createElement("TD");
  let div = document.createElement("DIV");
  div.classList.add("btn-sm");

  let i = document.createElement("SPAN");
  i.classList.add("fas");
  i.classList.add("fa-wrench");

  div.addEventListener("click", fixify);  
  div.appendChild(i);
  div.setAttribute("title", "Fixify");

  td.appendChild(div);

  tr.insertBefore(td, before);
})();
