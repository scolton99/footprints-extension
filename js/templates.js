const template_search = () => {
  const search_text = document.getElementById("template-search").value.toLowerCase();
  const templates_dom = document.querySelector("select[name='QUICKCREATE']");

  let switched = false;

  for (const template of templates_dom.children) {
    if (template.textContent.toLowerCase().includes(search_text)) {
      if (!switched) {
        template.selected = true;
        switched = true;
      }

      template.style.display = "initial";
    } else {
      template.style.display = "none";
    }
  }
};

const mk_template_search = () => {
  const search_box = document.createElement("input");
  search_box.type = "text";
  search_box.id = "template-search";
  search_box.addEventListener("input", template_search);
  search_box.setAttribute("placeholder", "Search for a template...");
  
  const templates_dom = document.querySelector("select[name='QUICKCREATE']");
  const parent = templates_dom.parentElement;

  parent.insertBefore(search_box, templates_dom);
};

mk_template_search();