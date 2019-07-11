(() => {
    const service_families = fbConfig.fields.Service__bFamily;
    const services = fbConfig.fields.Service;
    const categories = fbConfig.fields.Category;

    const get_categories_string = () => {
        const f_sf = {choices: service_families.choices, dependencies: service_families.dependencies};
        const f_s = {choices: services.choices, dependencies: services.dependencies};
        const f_c = {choices: categories.choices, dependencies: categories.dependencies};

        const f_data = {service_families: f_sf, services: f_s, categories: f_c};

        return JSON.stringify(f_data);
    };

    const add_dnld_button = () => {
        const ref = document.querySelector("#controlPanelHolder > #controlPanel > table > tbody > tr > td");
        const container = document.createElement("td");
        const data = btoa(get_categories_string());
        container.innerHTML = `<table style="vertical-align: text-bottom; display: inline;" width="1%" cellpadding="0" cellspacing="0" border="0"><tbody><tr><td nowrap="" style="border: none;"><a download="categories.json" id="goButtonLink" title="Download" class="button" href="data:application/json;base64,${data}" style="color: #4E2A84;" tabindex="1" onfocus="document.getElementById('goButton').onmouseover();" onblur="document.getElementById('goButton').onmouseout();"><div id="goButton" class="button_off" onmousedown="mousedownButton('goButton');" onmouseup="highlightButton(false, 'goButton');" onmouseover="highlightButton(true, 'goButton');" onmouseout="highlightButton(false, 'goButton');" style=""><img src="/MRimg/save.png" alt="Submit" border="0" align="absmiddle" id="goButton_image"> <span id="goButton_textSpan" style=" font-weight: bold;  height: 18px; cursor: pointer;">DOWNLOAD CATEGORIES.JSON</span></div></a></td></tr></tbody></table>`;
        ref.parentElement.insertBefore(container, ref.nextSibling);
    };

    add_dnld_button();
})();