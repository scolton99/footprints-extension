const form = document.getElementById("regform_id");

if (form) {
    const buttons = form.querySelectorAll("button:not([type])");

    for (const button of buttons)
        button.setAttribute('type', 'button');
}
