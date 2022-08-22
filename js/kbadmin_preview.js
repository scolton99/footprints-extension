const check_preview = () => {
  const preview = document.getElementById("preview");

  if (!preview || preview.textContent === "") {
    window.setTimeout(check_preview, 50);
    return;
  }

  preview.style.margin = "auto";
  preview.style.maxWidth = "1250px";

  preview.querySelectorAll("script").forEach(x => {
    if (x.textContent === "") {
      const sct = document.createElement("script");
      sct.src = x.src;
      document.body.appendChild(sct);
    } else {
      // Broken in Manifestv3
      // eval(x.textContent);
    }
  });
};

check_preview();