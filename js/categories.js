const service_families = fbConfig.fields.Service__bFamily;
const services = fbConfig.fields.Service;
const categories = fbConfig.fields.Category;

const cat_map = {};

const sep = " → ";

if (document.querySelector("select[name='Service__bFamily']")) {
    const f_sf = {choices: service_families.choices, dependencies: service_families.dependencies};
    const f_s = {choices: services.choices, dependencies: services.dependencies};
    const f_c = {choices: categories.choices, dependencies: categories.dependencies};

    for (let i = 0; i < service_families.choices.length; i++) {

        const service_family = service_families.choices[i].id;
        const service_family_n = document.querySelector("option[value='" + service_family + "']").textContent;

        if (typeof (service_families.dependencies[service_family]) === "undefined" || typeof (service_families.dependencies[service_family]["Service"]) === "undefined" || service_families.dependencies[service_family]["Service"].length === 0) {
            cat_map[service_family_n] = {
                "service_family": service_family,
                "service": null,
                "category": null,
                "sub_category": null
            };

            continue;
        }

        for (let j = 0; j < service_families.dependencies[service_family]["Service"].length; j++) {

            const service = service_families.dependencies[service_family]["Service"][j];
            const service_n = document.querySelector("option[value='" + service + "']").textContent;

            if (typeof (services.dependencies[service]) === "undefined" || typeof (services.dependencies[service]["Category"]) === "undefined" || services.dependencies[service]["Category"].length === 0) {
                const save_str = service_family_n + sep + service_n;
                cat_map[save_str] = {
                    "service_family": service_family,
                    "service": service,
                    "category": null,
                    "sub_category": null
                };

                continue;
            }

            for (let k = 0; k < services.dependencies[service]["Category"].length; k++) {

                const category = services.dependencies[service]["Category"][k];
                const category_n = document.querySelector("option[value='" + category + "']").textContent;

                if (typeof (categories.dependencies[category]) === "undefined" || typeof (categories.dependencies[category]["Sub__uCategory"]) === "undefined" || categories.dependencies[category]["Sub__uCategory"].length === 0) {
                    const save_str = service_family_n + sep + service_n + sep + category_n;
                    cat_map[save_str] = {
                        "service_family": service_family,
                        "service": service,
                        "category": category,
                        "sub_category": null
                    };

                    continue;
                }

                for (let l = 0; l < categories.dependencies[category]["Sub__uCategory"].length; l++) {

                    const sub_category = categories.dependencies[category]["Sub__uCategory"][l];
                    const sub_category_n = document.querySelector("option[value='" + sub_category + "']").textContent;

                    const save_str = service_family_n + sep + service_n + sep + category_n + sep + sub_category_n;
                    cat_map[save_str] = {
                        "service_family": service_family,
                        "service": service,
                        "category": category,
                        "sub_category": sub_category
                    };

                }

            }

        }

    }

    window.pick_cat = function() {
        const search = document.querySelector("#category_search").value;
        const preview = document.querySelector("#category_preview");

        if (search === "") {
            preview.value = "";
            return;
        }

        const terms = search.split(" ");

        const service_family_dropdown = document.querySelector("select[name='Service__bFamily']");
        const service_dropdown = document.querySelector("select[name='Service']");
        const category_dropdown = document.querySelector("select[name='Category']");
        const sub_category_dropdown = document.querySelector("select[name='Sub__uCategory']");

        let matches = [];

        while (preview.firstChild)
            preview.removeChild(preview.firstChild);

        for (const key of Object.keys(cat_map)) {
            let has = true;

            for (const term of terms) {
                has = has && key.toLowerCase().includes(term.toLowerCase());
            }

            if (has) {
                matches.push(key);
            }
        }

        let found = false;

        for (let i = 0; i < matches.length; i++) {
            const key = matches[i];

            if (!found) {
                found = true;
                service_family_dropdown.value = cat_map[key].service_family;
                const service_family_event = new Event("change", {bubbles: true});
                service_family_dropdown.dispatchEvent(service_family_event);

                if (cat_map[key].service != null) {
                    service_dropdown.value = cat_map[key].service;
                    const service_event = new Event("change", {bubbles: true});
                    service_dropdown.dispatchEvent(service_event);
                }

                if (cat_map[key].category != null) {
                    category_dropdown.value = cat_map[key].category;
                    const category_event = new Event("change", {bubbles: true});
                    category_dropdown.dispatchEvent(category_event);
                }

                if (cat_map[key].sub_category != null) {
                    sub_category_dropdown.value = cat_map[key].sub_category;
                    const sub_category_event = new Event("change", {bubbles: true});
                    sub_category_dropdown.dispatchEvent(sub_category_event);
                }
            }

            const option = document.createElement("option");
            option.setAttribute("value", key);
            option.textContent = key;

            preview.appendChild(option);
        }
    };

    window.pick_cat_preview = function() {
        const preview = document.querySelector("#category_preview");
        const key = preview.value;

        const service_family_dropdown = document.querySelector("select[name='Service__bFamily']");
        const service_dropdown = document.querySelector("select[name='Service']");
        const category_dropdown = document.querySelector("select[name='Category']");
        const sub_category_dropdown = document.querySelector("select[name='Sub__uCategory']");

        service_family_dropdown.value = cat_map[key].service_family;
        const service_family_event = new Event("change", {bubbles: true});
        service_family_dropdown.dispatchEvent(service_family_event);

        if (cat_map[key].service != null) {
            service_dropdown.value = cat_map[key].service;
            const service_event = new Event("change", {bubbles: true});
            service_dropdown.dispatchEvent(service_event);
        }

        if (cat_map[key].category != null) {
            category_dropdown.value = cat_map[key].category;
            const category_event = new Event("change", {bubbles: true});
            category_dropdown.dispatchEvent(category_event);
        }

        if (cat_map[key].sub_category != null) {
            sub_category_dropdown.value = cat_map[key].sub_category;
            const sub_category_event = new Event("change", {bubbles: true});
            sub_category_dropdown.dispatchEvent(sub_category_event);
        }
    };

    const tr = document.querySelector("div.cell[title='Service Family']").parentElement.parentElement.parentElement.parentElement;
    const tbody = tr.parentElement;

    const search_box = document.createElement("input");
    search_box.id = "category_search";
    search_box.setAttribute("type", "text");
    search_box.style.width = "98.6%";
    search_box.setAttribute("autocomplete", "off");

    const preview = document.createElement("select");
    preview.id = "category_preview";
    preview.style.width = "98.6%";
    preview.style.marginBottom = "3px";
    preview.addEventListener("change", window.pick_cat_preview);

    const n_tr = document.createElement("tr");
    const n_td = document.createElement("td");

    search_box.addEventListener("input", window.pick_cat);

    n_td.appendChild(preview);
    n_td.appendChild(search_box);

    n_tr.appendChild(n_td);

    tbody.insertBefore(n_tr, tr);
}