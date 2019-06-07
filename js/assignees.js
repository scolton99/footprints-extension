const before = document.getElementById("pmember").parentElement.parentElement.previousElementSibling;
const parent = before.parentElement;

const input = document.createElement("input");
input.id = "assignee_search";
input.setAttribute("type", "text");
input.setAttribute("autocomplete", "off");
input.style.width = "100%";
input.addEventListener("input", update_assignees);
input.style.borderTopRightRadius = 0;
input.style.borderBottmoRightRadius = 0;
input.style.borderRight = "none";

const td = document.createElement("td");
const tr = document.createElement("tr");

const div = document.createElement("div");
div.style.display = "flex";
div.style.alignItems = "stretch";

const fas = document.createElement("span");
fas.classList.add("fas");
fas.classList.add("fa-search");
fas.style.lineHeight = "27px";
fas.style.paddingLeft = "5px";
fas.style.cursor = "pointer";
fas.style.border = "1px solid #ccc";
fas.style.borderLeft = "none";
fas.style.borderTopRightRadius = "4px";
fas.style.borderBottomRightRadius = "4px";
fas.style.paddingRight = "5px";
fas.addEventListener("click", update_assignees);

div.appendChild(input);
div.appendChild(fas);

td.appendChild(div);
tr.appendChild(td);

parent.insertBefore(tr, before);

// function update_assignees() {
//     const select = document.getElementById("pmember");
//     const children = select.children;

//     const search = document.getElementById("assignee_search").value;

//     for (let i = 0; i < children.length; i++) {
//         if (children[i].textContent.toLowerCase().includes(search.toLowerCase())) {
//             children[i].style.display = "block";
//         } else {
//             children[i].style.display = "none";
//         }
//     }
// }

function update_assignees() {
    const teams = assigneePicker.teams;

    const search = document.getElementById("assignee_search").value;
    const box = document.getElementById("pmember");

    const search_n = search.toLowerCase();

    let matches = [];
    for (let team of teams) {

        for (let i = 0; i < team.memberIds.length; i++) {
            const id = team.memberIds[i].toLowerCase();
            const name = team.memberRealNames[i].toLowerCase();
            const team_name = team.name.toLowerCase();

            if (id.includes(search_n) || name.includes(search_n) || team_name.includes(search_n)) {
                matches.push(team.name);
                break;
            }
        }
    }

    while (box.firstElementChild)
        box.removeChild(box.firstElementChild);

    let elements = [];
    for (let team of matches) {
        let main = document.createElement("option");
        main.value = team;
        main.classList.add("team");
        main.textContent = "+" + team.replace(/__b/g, " ").replace(/__u/g, "-");

        elements.push(main);
    }

    for (let element of elements)
        box.appendChild(element);

    console.log(matches);
}
