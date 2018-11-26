let attachments = document.querySelectorAll("table#attachments_summary a");

attachments.forEach(function (e) {
    console.log("Found attachment " + e.id);

    const oldEvent = e.getAttribute("onclick");

    // Get the arguments to the function call in the existing onclick attr
    const arguments = oldEvent.split("(")[1];

    // Split the arguments to the function into a list of arguments
    const dirtyArgs = arguments.split(", ");

    // Clean up the arguments
    let args = [];
    for (let i = 0; i < dirtyArgs.length; i++) {
        // Get rid of the single quotes in all the arguments
        args[i] = dirtyArgs[i].replace(/'/g, "")
    }

    // The final URL is made up of the first original argument (the URL) + the query string (Second arg)
    let url = args[0] + "?" + args[1];

    console.log("Checking type...");

    // Check file extension...
    let pathBits = args[0].match(/Attachment\.pl\/(.*)/);
    if (pathBits.length === 0) {
        // File has no discernable extension and cannot be previewed
        console.log("Not converting. Unable to determine attachment type.");
        return;
    }

    // Get the matched part of the above regex and split it by "."
    let possibleExtensions = pathBits[1].split(".");
    let extension = possibleExtensions[possibleExtensions.length - 1].toLowerCase();

    const image_extensions = ["jpg", "jpeg", "jfi", "jfif", "jpe", "jif", "gif", "png", "svg", "bmp", "dib", "ico"];
    const text_extensions = ["csv", "txt", "text", "json"];

    if (image_extensions.includes(extension)) {
        console.log("Attachment is an image. Processing...");

        let nLink = e.cloneNode(true);
        e.parentNode.replaceChild(nLink, e);

        nLink.dataset.imgId = e.id;
        nLink.dataset.url = url;
        nLink.style.position = "relative";
        nLink.classList.add("fp-attachment");

        let previewImage = document.createElement("IMG");
        previewImage.setAttribute("src", url);
        previewImage.setAttribute("alt", "Attachment");
        previewImage.style.maxWidth = "65vw";
        previewImage.style.maxHeight = "80vh";

        let container = document.createElement("DIV");
        container.classList.add("container");
        container.appendChild(previewImage);
        container.style.position = "absolute";
        container.style.padding = "10px";
        container.style.border = "1px solid #ccc";
        container.style.backgroundColor = "#fff";
        container.style.boxShadow = "0px 0px 3px 1px rgba(0, 0, 0, 0.2)";
        container.style.boxSizing = "border-box";
        container.style.right = "0";
        container.style.bottom = "100%";

        nLink.appendChild(container);
    } else if (text_extensions.includes(extension)) {
        console.log("Attachment is plaintext. Processing...");

        let x = new XMLHttpRequest();
        x.open("GET", url, true);
        x.onload = (function(e) {
            let nLink = e.cloneNode(true);
            e.parentNode.replaceChild(nLink, e);

            nLink.dataset.imgId = e.id;
            nLink.dataset.url = url;
            nLink.style.position = "relative";
            nLink.classList.add("fp-attachment");

            let previewText = document.createElement("PRE");
            previewText.textContent = this.responseText;
            previewText.style.maxWidth = "65vw";
            previewText.style.maxHeight = "80vh";
            previewText.style.overflowY = "auto";
            previewText.style.padding = "5px";

            let container = document.createElement("DIV");
            container.classList.add("container");
            container.appendChild(previewText);
            container.style.position = "absolute";
            container.style.padding = "5px";
            container.style.border = "1px solid #ccc";
            container.style.backgroundColor = "#fff";
            container.style.boxShadow = "0px 0px 3px 1px rgba(0, 0, 0, 0.2)";
            container.style.boxSizing = "border-box";
            container.style.right = "0";
            container.style.bottom = "100%";

            nLink.appendChild(container);
        }).bind(x, e);
        x.send();

        console.log("Attachment conversion scheduled.");
    } else {
        console.log("Not converting. Type not allowed (" + extension + ").");
    }
});
