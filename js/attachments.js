let attachments = document.querySelectorAll("table#attachments_summary a");

attachments.forEach(function (e) {
  console.log("Found attachment " + e.id);

  let oldEvent = e.getAttribute("onclick");

  let parts = oldEvent.split("(");
  let dirtyArgs = parts[1].split(", ");

  let args = [];

  for (let i = 0; i < dirtyArgs.length; i++) {
    args[i] = dirtyArgs[i].replace(/'/g, "")
  }

  let url = args[0] + "?" + args[1];
  let x = new XMLHttpRequest();
  x.open("GET", url, true);
  x.onload = (function(f, uri) {
    console.log("Attachment probing completed.");

    let type = this.getResponseHeader("Content-Type");
    if (type.startsWith("image/")) {
      console.log("Attachment is an image. Processing...");

      window["fallback"] = window["fallback"] || {};
      window["imageData"] = window["imageData"] || {};

      let nLink = f.cloneNode(true);
      f.parentNode.replaceChild(nLink, f);

      nLink.style.padding = "8px";
      nLink.dataset.imgId = f.id;
      nLink.dataset.url = uri;
      nLink.addEventListener("mouseover", previewAttachment);

      (new Image()).src = uri;
    } else {
      console.log("Not converting. Attachment is " + type);
    }
  }).bind(x, e, url);
  x.send();

  console.log("Beginning attachment probe...");
  console.log("Probe URL: " + url);
});

function previewAttachment(e) {
  let link = e.currentTarget;

  let image = document.createElement("IMG");
  image.setAttribute("src", link.dataset.url);
  image.setAttribute("alt", "Attachment");
  image.style.maxWidth = (e.clientX - 30) + "px";
  image.style.maxHeight = (e.clientY - 30) + "px";

  let container = document.createElement("DIV");
  container.appendChild(image);
  container.style.position = "fixed";
  container.style.padding = "10px";
  container.style.border = "1px solid #ccc";
  container.style.backgroundColor = "#fff";
  container.style.boxShadow = "0px 0px 3px 1px rgba(0, 0, 0, 0.2)";
  container.style.pointerEvents = "none";
  container.style.left = (e.clientX - (container.offsetWidth)) + "px";
  container.style.top = (e.clientY - container.offsetHeight) + "px";
  
  document.body.appendChild(container);

  e.currentTarget["mousemovelistener"] = movePreview.bind(e.currentTarget, container);
  e.currentTarget["mouseoutlistener"] = closePreview.bind(e.currentTarget, container);
  
  e.currentTarget.addEventListener("mousemove", e.currentTarget["mousemovelistener"]);
  e.currentTarget.addEventListener("mouseout", e.currentTarget["mouseoutlistener"]);
}

function movePreview(cont, e) {
  cont.style.left = (e.clientX - (cont.offsetWidth)) + "px";
  cont.style.top = (e.clientY - cont.offsetHeight) + "px";
  
  let img = cont.firstElementChild;
  img.style.maxWidth = (e.clientX - 30) + "px";
  img.style.maxHeight = (e.clientY - 30) + "px";
}

function closePreview(cont, e) {
  cont.parentElement.removeChild(cont);
  this.removeEventListener("mouseout", this.mouseoutlistener);
  this.removeEventListener("mousemove", this.mousemovelistener);
}
