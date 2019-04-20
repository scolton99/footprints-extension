const before = document.getElementById("pmember").parentElement.parentElement.previousElementSibling;
const parent = before.parentElement;

const input = document.createElement("input");
input.id = "assignee_search";
input.setAttribute("type", "text");
input.setAttribute("autocomplete", "off");
input.style.width = "100%";
input.addEventListener("input", update_assignees);

const td = document.createElement("td");
const tr = document.createElement("tr");

td.appendChild(input);
tr.appendChild(td);

parent.insertBefore(tr, before);

function update_assignees() {
    const select = document.getElementById("pmember");
    const children = select.children;

    const search = document.getElementById("assignee_search").value;

    for (let i = 0; i < children.length; i++) {
        if (children[i].textContent.toLowerCase().includes(search.toLowerCase())) {
            children[i].style.display = "block";
        } else {
            children[i].style.display = "none";
        }
    }
}