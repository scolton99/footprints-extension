window.refr = function() {
    let data = new FormData();

    const projectid = document.querySelector("input[name='PROJECTID']").value;
    if (projectid !== "1") return;

    const savedname = document.querySelector("select[name='SAVEDNAME']").value;
    if (savedname === "-1") return;

    data.append("USER", document.querySelector("input[name='USER']").value);
    data.append("PROJECTID", projectid);
    data.append("DOWHAT", "search");
    data.append("WRITECACHE", "0");
    data.append("USECACHEURL", "1");
    data.append("MAXMININC", "");
    data.append("KEEP_DIRTY_FILTER", "");
    data.append("SAVEDNAME", savedname);
    data.append("NEW_SORT_FIELD", "");
    data.append("NEW_SORT_DIR", "");
    data.append("MRP", document.querySelector("input[name='MRP']").value);

    let x = new XMLHttpRequest();
    x.open("POST", "https://itsm-fp.northwestern.edu/MRcgi/MRhomepage.pl", true);
    x.responseType = "document";
    x.onload = function() {
        let nscript = x.responseXML.querySelector("style + script[language='javascript']");
        document.getElementById("grid-ct").innerHTML = "";
        eval.call(window, nscript.innerText);

        let pagination = document.querySelector(".pagination");
        pagination.innerHTML = "<span>1 - " + mrNumbers.length + "</span><span class='quiet'> of " + mrNumbers.length + "</span>";
    };
    x.send(data);
};

window.setTimeout(refr, 120000);