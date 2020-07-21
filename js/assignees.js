const pmember = document.getElementById("pmember");

if (pmember) {
    const before = pmember.parentElement.parentElement.previousElementSibling;
    const parent = before.parentElement;
    
    const input = document.createElement("input");
    input.id = "assignee_search";
    input.setAttribute("type", "text");
    input.setAttribute("autocomplete", "off");
    input.style.width = "100%";
    input.addEventListener("input", update_assignees);
    input.style.borderTopRightRadius = 0;
    input.style.borderBottomRightRadius = 0;
    input.style.borderRight = "none";
    input.setAttribute("placeholder", "Search for a NetID, name, or team name");
    
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
    fas.style.border = "1px solid #444";
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
                const team_name = team.name.toLowerCase().replace(/__b/g, " ").replace(/__u/g, "-");
    
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
    }    
}

function pickup_ticket(remove_others){
    const user_netid = document.regform.USER.value;
    const user_num = assigneePicker.teams[173].memberIds.indexOf(user_netid);
    const user_name = assigneePicker.teams[173].memberRealNames[user_num];

    let assignee = document.createElement("option");
    assignee.value = user_netid;
    assignee.textContent = user_name;

    if(remove_others){
        assigneePicker.box2.innerHTML = '';
    }

    assigneePicker.box2.appendChild(assignee);
}

function assign_my_team(){
    const user_netid = document.regform.USER.value;
    const teams = assigneePicker.teams;

    let user_team;

    for (let team of teams) {
        if (team.memberIds.indexOf(user_netid) > 0){
            user_team = team.name;
            break;
        }
    }

    let main = document.createElement("option");
    main.value = user_team;
    main.textContent = user_team.replace(/__b/g, " ").replace(/__u/g, "-");

    assigneePicker.box2.appendChild(main);
}
