let attachments = document.querySelectorAll("table#attachments_summary a");

attachments.forEach(function (e) {
    if (e.textContent !== "Download") {
        return;
    }

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

    let query_param_tuples = args[1].split('&');
    const allowed_query_keys = ["USER","PROJECTID","MRP","EXT_LINK","CUSTM","SOLUTIONS_FROM_OTHER_PROJ","ORIGINAL_PROJECT","MR","ATTACHMENT_NAME","SESS_ID"];
    let final_qp = [];
    for (let i = 0; i < query_param_tuples.length; i++) {
        const key_val = query_param_tuples[i].split("=");
        if (allowed_query_keys.includes(key_val[0].toUpperCase()))
            final_qp.push(key_val);
    }

    let fin_q_str = "";
    for (let i = 0; i < final_qp.length; i++) {
        fin_q_str += final_qp[i][0] + "=" + final_qp[i][1];
        if (i + 1 < final_qp.length) {
            fin_q_str += "&";
        }
    }

    // The final URL is made up of the first original argument (the URL) + the query string (Second arg)
    let url = args[0] + "?" + fin_q_str;

    // Check file extension...
    let pathBits = args[0].match(/Attachment\.pl\/(.*)/);
    if (pathBits.length === 0) {
        // File has no discernable extension and cannot be previewed
        return;
    }

    // Get the matched part of the above regex and split it by "."
    let possibleExtensions = pathBits[1].split(".");
    let extension = possibleExtensions[possibleExtensions.length - 1].toLowerCase();

    const image_extensions = ["jpg", "jpeg", "jfi", "jfif", "jpe", "jif", "gif", "png", "svg", "bmp", "dib", "ico"];
    const text_extensions = ["csv", "txt", "text", "json"];

    if (image_extensions.includes(extension)) {
        let nLink = e.cloneNode(true);
        e.parentNode.replaceChild(nLink, e);

        nLink.dataset.imgId = e.id;
        nLink.dataset.url = url;
        nLink.style.position = "relative";
        nLink.classList.add("fp-attachment");

        let previewImage = document.createElement("IMG");
        previewImage.setAttribute("src", url);
        previewImage.setAttribute("alt", "Attachment");
        previewImage.style.maxWidth = "700px";
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
        container.style.pointerEvents = "none";

        nLink.appendChild(container);
    } else if (text_extensions.includes(extension)) {
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
            container.style.pointerEvents = "none";

            nLink.appendChild(container);
        }).bind(x, e);
        x.send();
    }
});
