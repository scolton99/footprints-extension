clean_up();
handle_errors();
let tickets = document.getElementsByClassName("x-grid3-row");
transform();

async function clean_up(){
    //Disable FP auto refresh so we can inject our own
    //quickEditUpdateInProgress = true;

    let trash = document.body.children;

    while(trash.length > 1){
        if(trash[0].id !== "ContentWrapper"){
            trash[0].remove();
        }else{
            trash[1].remove();
        }
    }
    document.getElementById("footer").remove();
    document.getElementById("PopUpAlert").remove();
    document.getElementById("checkback").remove();

    document.body.removeAttribute("onkeypress");
    document.body.removeAttribute("class");
    document.body.removeAttribute("id");

}

function handle_errors(){
  let maybe_error;

  try{
    maybe_error = document.getElementsByClassName("pageHeader")[0].textContent;

    switch (maybe_error) {
      case "Login Error":
        create_relog();
        break;

      case "FootPrints Service Core Error":
        let msg = document.getElementsByClassName("dialogMainContent")[0].innerText;
        create_error(msg);
        break;
    }
  }
  catch{
  }
}

function transform(){

    if(document.getElementsByClassName("x-grid-empty").length === 1){
        no_tickets();
    } else {
        document.body.prepend(create_container(tickets.length, 3));
    }

    create_modal();
    create_navbar();
    init_navbar();
    setTimeout("create_offset()", 150);
    setTimeout("$('[data-toggle=\"tooltip\"]').tooltip()", 500);

}

function no_tickets(){
    let parent = document.getElementById("grid-ct").parentNode;

    let banner;

    switch (document.getElementsByClassName("x-grid-empty")[0].textContent){
        case "There were no matches to your query.":
            banner = create_banner("There were no matches to your query", "alert-danger");
            break;
        case "You do not have any Issues assigned to you.":
            banner = create_banner("Congratulations! Your personal queue is empty!", "alert-success");
            break;
    }

    document.getElementById("grid-ct").remove();
    parent.appendChild(banner);
}

function highlight(card){
    card.classList.remove("shadow-sm");
    card.classList.add("shadow");
}

function lowlight(card){
    card.classList.remove("shadow");
    card.classList.add("shadow-sm");
}

function signout(){
    location.href="/MRcgi/MRlogout.pl?USER=" + document.quickSearch.USER.value + "&MRP="+ document.quickSearch.MRP.value + "&PROJECTID=" + document.quickSearch.PROJECTID.value + "&LASTID=" + document.quickSearch.LASTID.value;
}

function prefs(){
    location.href="/MRcgi/MRpreferences_page.pl?USER=" + document.quickSearch.USER.value + "&MRP="+ document.quickSearch.MRP.value + "&PROJECTID=" + document.quickSearch.PROJECTID.value + "&LASTID=" + document.quickSearch.LASTID.value;
}

function init_navbar(){
    document.getElementById("go_home").href = '/MRcgi/MRhomepage.pl?USER="' + document.quickSearch.USER.value + "&MRP="+ document.quickSearch.MRP.value + "&PROJECTID=" + document.quickSearch.PROJECTID.value + "&LASTID=" + document.quickSearch.LASTID.value;

    let reports = document.getElementById("tb_kb_report").parentElement.parentElement.children;
    let report_menu = document.getElementById("reports_drop");
    let report;

    while(reports.length !== 0){
        report = reports[0].firstChild
        report.classList = "dropdown-item";

        report_menu.appendChild(report);
        reports[0].remove();
    }

    let searches = document.getElementsByName("dropDown")[0];
    searches.lastChild.removeAttribute("onchange");
    searches.lastChild.removeAttribute("style");
    searches.lastChild.classList = "custom-select";
    searches.lastChild.setAttribute("onchange", "if(this.selectedIndex != -1) processDisplayDropdown();")

    document.getElementById("searches_div").prepend(searches);

    let loaded = document.getElementsByClassName("pagination")[0].firstElementChild.textContent;
    let total = document.getElementsByClassName("pagination")[0].children[1].textContent.split(' ')[2];

    document.getElementById("count_badge").textContent = loaded + ' / ' + total;

    const searchby = document.quickSearch.WSEARCH.value;
    const indicate = document.getElementById("query_drop");

    if (searchby === "KEYWORD"){
        indicate.children[1].classList.add("active");
        indicate.children[0].classList.remove("active");
    } else {
        indicate.children[0].classList.add("active");
        indicate.children[1].classList.remove("active");
    }

    document.getElementById("search_input").value = document.quickSearch.SEARCHS.value;

    let username = document.getElementsByClassName("breadcrumbdarkblue")[0].textContent.split(' ')[1];
    document.getElementById("username").textContent = "Welcome, " + username + "!";

    document.getElementById("search_input").onkeypress = function(e) { if(e.keyCode === 13) { do_search(); return false;}}
}

async function get_full_desc(button, ticket_num){
    let loading = document.createElement('span');
    loading.classList = "spinner-border spinner-border-sm ml-2";

    button.appendChild(loading);

    let mrp = document.quickSearch.MRP.value;
    let usr = document.quickSearch.USER.value;

    Ext.get('desc-body')
        .load({url: '/MRcgi/MRAjaxShowDescriptions.pl?USER=' + usr + '&MRP=' + mrp + '&MR=' + ticket_num + '&PROJECTID=1',
            callback: function(el, success) {
                if(success){
                    let desc = document.getElementById("desc-body").firstElementChild;
                    document.getElementById("descm_title").textContent = desc.firstElementChild.textContent;
                    desc.firstElementChild.remove();
                    document.getElementById("descm_body").innerHTML = desc.innerHTML;
                    document.getElementById("descm_edit").setAttribute("onclick", "goToEdit(" + ticket_num + ", 1);");

                    $("#desc_modal").modal('show');

                    button.lastChild.remove();

                    console.log("Fetched " + ticket_num);
                }
            }
        });
}

function get_ticket_num(ticket){
    return ticket.rows[0].getElementsByClassName("x-grid3-td-hpColHeading_mr")[0].firstElementChild.firstElementChild.textContent;
}

function get_title(ticket){
    return ticket.rows[0].getElementsByClassName("x-grid3-td-hpColHeading_title")[0].firstElementChild.firstElementChild.textContent;
}

function get_description(ticket){
    let desc = ticket.rows[0].getElementsByClassName("x-grid3-td-hpColHeading_title")[0].firstChild.childNodes[1].textContent;

    if(desc.length === 1){
      desc = 'Enable "Collapsed Description in Title" within your prefs to show previews!';
    }

    if(typeof desc === undefined){
      desc = 'Enable "Collapsed Description in Title" within your prefs to show previews!';
    }

    return desc;
}

function get_status(ticket){
  let status;

  try{
    status = ticket.rows[0].getElementsByClassName("x-grid3-td-hpColHeading_status")[0].firstChild.textContent;

  }
  catch{
    status = "DISABLED";
  }
    return status;
}

function get_last_edit(ticket){
    return ticket.rows[0].getElementsByClassName("x-grid3-td-hpColHeading_datetimeago")[0].firstChild.textContent;
}

function get_priority(ticket){
  let priority;

  try {
    priority = ticket.rows[0].getElementsByClassName("x-grid3-td-hpColHeading_priority")[0].firstChild.textContent;
  }
  catch{
    priority = "DISABLED";
  }

  return priority;
  }

function dept_support(ticket){
  let support;

  try{
    support = ticket.rows[0].getElementsByClassName("x-grid3-td-hpColHeading_Departmental__bSupport")[0].firstChild.textContent;

    if(support === '-'){
        support = "none";
    }
  }
  catch{
    support = "DISABLED";
  }

    return support;
}

function badge_type(ticket){
    const badges = {
        LOW: 'badge-success',
        MEDIUM: 'badge-warning',
        HIGH: 'badge-danger',
        CRITICAL: 'badge-dark',
        EXTENDED: 'badge-primary',
        DISABLED: 'badge-light'
    }

    let priority = get_priority(ticket);
    let badge = badges.LOW;

    switch(priority){
        case "SR-MED":
        case "I-MEDIUM":
            badge = badges.MEDIUM;
            break;
        case "SR-HIGH":
        case "I-HIGH":
            badge = badges.HIGH;
            break;
        case "I-CRITICAL":
            badge = badges.CRITICAL;
            break;
        case "EXTENDED":
            badge = badges.EXTENDED;
            break;
        case "DISABLED":
            badge = badges.DISABLED;
            break;
    }

    return badge;
}

function copy_ticket_num(badge) {
    let copyText = document.createElement('input');
    let num = badge.textContent;

    document.body.appendChild(copyText);
    copyText.value = num;

    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");

    document.body.lastChild.remove();

    badge.textContent = "Copied!";

    badge.setAttribute("onmouseleave", "restore_badge(this," + num + ")");
}

async function restore_badge(badge, ticket_num) {
    badge.textContent = ticket_num;
    badge.removeAttribute("onmouseleave");
}

function create_relog(){
  document.getElementById("ContentWrapper").setAttribute('style', 'display:block !important; top: 0px !important; left: 0px !important; margin: 0 auto; position: initial !important');
}

function create_error(msg){
  document.getElementById("ContentWrapper").setAttribute('style', 'display:block !important; top: 0px !important; left: 0px !important; margin: 0 auto; position: initial !important');
}

function create_banner(text, type){
    let banner = document.createElement('div');
    banner.classList = "m-4 alert " + type;
    banner.textContent = text;

    return banner;
}

function create_row(){
    let row = document.createElement('div');
    row.classList = "card-deck mb-3";

    return row;
}

function create_card(){
    let curr_ticket = tickets[0].firstChild;
    let ticket_num = get_ticket_num(curr_ticket);

    let card = document.createElement('div');
    card.classList = "card shadow-sm";
    if(get_priority(curr_ticket) === "I-CRITICAL"){
        card.classList.add("border-danger")
    }
    card.setAttribute("onmouseover", "highlight(this)");
    card.setAttribute("onmouseout" , "lowlight(this)");

    let card_body = document.createElement('div');
    card_body.classList = "card-body";

    let card_text = document.createElement('p');
    card_text.classList = "card-text";
    card_text.textContent = get_description(curr_ticket);

    let num_badge = document.createElement('span');
    num_badge.textContent = ticket_num;
    num_badge.classList = "badge " + badge_type(curr_ticket) + " float-right user-select-none";
    num_badge.setAttribute("onclick", "copy_ticket_num(this)");

    let status_badge = document.createElement('span');
    status_badge.textContent = get_status(curr_ticket);
    status_badge.classList = "badge badge-secondary float-left mr-1 my-1";

    let dept_badge = document.createElement('span');
    let support = dept_support(curr_ticket);
    if(support !== "none"){
        dept_badge.textContent = support;
        dept_badge.classList = "badge badge-info float-left mr-1 my-1";
    }

    let badge_div = document.createElement('div');
    badge_div.appendChild(status_badge);
    badge_div.appendChild(dept_badge);

    let edit_button = document.createElement('button');
    edit_button.classList = "btn btn-sm btn-outline-primary mr-2";
    edit_button.textContent = "Edit";
    edit_button.setAttribute("onclick", "goToEdit(" + ticket_num + ", 1);");

    let modal_button = document.createElement('button');
    modal_button.classList = "btn btn-sm btn-outline-secondary mr-2";
    modal_button.textContent = "Full Description";
    modal_button.setAttribute("onclick", "get_full_desc(this, "+ ticket_num + ")");

    let details_button = document.createElement('button');
    details_button.classList = "btn btn-sm btn-outline-secondary mr-2";
    details_button.textContent = "Details";
    details_button.setAttribute("onclick", "goToDetails(" + ticket_num + ", 1);");

    let button_div = document.createElement('div');
    button_div.classList = "card-text ml-2 my-2";
    button_div.appendChild(edit_button);
    button_div.appendChild(details_button);

    let card_header = document.createElement('h5');
    card_header.textContent = get_title(curr_ticket);
    card_header.classList = "card-header";

    let card_footer = document.createElement('div');
    card_footer.classList = "card-footer";

    let last_edit = document.createElement('small');
    last_edit.classList = "text-muted";
    last_edit.textContent = "Last edit " + get_last_edit(curr_ticket);

    button_div.appendChild(edit_button);
    button_div.appendChild(details_button);
    button_div.appendChild(modal_button);

    card_header.appendChild(badge_div);

    card_body.appendChild(card_text);

    card_footer.appendChild(last_edit);
    card_footer.appendChild(num_badge);

    card.appendChild(card_header);
    card.appendChild(card_body);
    card.appendChild(button_div);
    card.appendChild(card_footer);

    tickets[0].classList = "parsed";

    return card;
}

function create_modal(){
    let modal_shim = document.createElement('div');

    modal_shim.innerHTML = '<div class="modal fade" id="desc_modal" tabindex="-1" role="dialog"> <div class="modal-dialog modal-dialog-centered modal-lg"> <div class="modal-content"> <div class="modal-header"> <h6 class="modal-title" id="descm_title">Modal title</h6> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body"> <div class="d-flex justify-content-center" id="descm_body"> <div class="spinner-border" role="status"> <span class="sr-only">Loading...</span> </div> </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Close</button> <button type="button" class="btn btn-primary" id="descm_edit">Edit</button> </div> </div> </div> </div>';

    let modal = modal_shim.firstChild;

    document.body.appendChild(modal);
}

function create_navbar(){
    let navbar_shim = document.createElement('div');

    navbar_shim.innerHTML = '<div class="fixed-top" id="navwhole"> <div class="collapse" id="hidden_opts"> <div class="bg-light p-4"> <h4 id="username" class="mb-3">Welcome, $User!</h4> <button type="button" class="btn btn-danger" onclick="signout()">Sign Out</button> <button type="button" class="btn btn-outline-secondary" onclick="prefs()">Preferences</button> </div> </div> <nav class="border-top border-bottom border-secondary navbar navbar-expand-md navbar-light bg-light" id="justbar"> <a class="navbar-brand" href="#"><strong>ITSM</strong></a> <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navnav"> <span class="navbar-toggler-icon"></span> </button> <div class="collapse navbar-collapse" id="navnav"> <div class="navbar-nav"> <a class="nav-item nav-link" id="go_home">Home</a> <a class="nav-item nav-link active" onclick="goToCreate(1);">New Issue</a> <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="#" id="reports" role="button" data-toggle="dropdown">Reports</a> <div class="dropdown-menu" id="reports_drop"> </div> </li> </div> <div class="col-5" id="searches_div"> </div> <div class="btn-group" role="group"> <button class="btn btn-sm btn-outline-secondary" type="button" onclick="processDisplayDropdown(true)"> Refresh </button> <button class="btn btn-sm btn-outline-secondary" type="button" onclick="document.prevpage.submit()"><span>«</span></button> <button class="btn btn-sm btn-outline-secondary" type="button" onclick="document.nextpage.submit()"><span>»</span></button> </div> <span class=" ml-1 badge badge-secondary" data-toggle="tooltip" data-placement="bottom" title="Tickets Loaded / Total" id="count_badge">$count</span> </div> <form class="form-inline my-2 mr-2"> <div class="input-group"> <input type="text" class="form-control" id="search_input" placeholder="Search..."> <div class="input-group-append"> <button class="btn btn-outline-secondary" type="button" onclick="goto_ticket()">Ticket</button> <button class="btn btn-outline-secondary" type="button" onclick="do_search()">Query</button> <button class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" type="button" data-toggle="dropdown"></button> <div class="dropdown-menu" id="query_drop"> <a class="dropdown-item" onclick="update_search(this)">Title</a> <a class="dropdown-item" onclick="update_search(this)">Keyword</a> </div> </div> </div> </form> <button class="btn btn-outline-info" type="button" data-toggle="collapse" data-target="#hidden_opts"> 🛠 </button> </nav> </div>';

    let navbar = navbar_shim.firstChild;

    document.body.prepend(navbar);
}

function create_offset(){
    let bar_height = parseInt(window.getComputedStyle(document.getElementById("justbar")).height);

    let offset = bar_height + (0.25 * bar_height);

    document.body.style.paddingTop = offset + "px";
}

function create_container(size, columns){
    let fragment = document.createDocumentFragment();

    let container = document.createElement('div');
    container.classList = "container mb-4";
    container.id = "cards";

    let spare = size % columns;
    let rows = (size - spare) /  columns;

    for(let i = 0; i < rows; i++){
        let row = create_row();

        for(let j = 0; j < columns; j++){
            row.appendChild(create_card());
        }

        container.appendChild(row);
    }

    if(spare){
        let row = create_row();

        for(let i = 0; i < spare; i++){
            row.appendChild(create_card());
        }

        container.appendChild(row);
    }

    container.style.maxWidth = "5000px";

    fragment.appendChild(container);

    return fragment;
}

function goto_ticket(){
    goToDetails(document.getElementById("search_input").value , 1);
}

function do_search(){
  let query = document.getElementById("search_input").value;

  if (query.match(/^\d{6,7}$/)) {
    goToDetails(query, 1);
  }else if (query === ""){
    let uh_oh = confirm('You are about to ask FootPrints to return the ENTIRE ticket database. Proceed?');
    if(uh_oh){
      document.quickSearch.SEARCHS.value = query;
      document.quickSearch.submit();
    }
  }else{
    document.quickSearch.SEARCHS.value = query;
    document.quickSearch.submit();
  }
}

function update_search(option){
    let searchby = option.textContent.toUpperCase();
    document.quickSearch.WSEARCH.value = searchby;

    const indicate = document.getElementById("query_drop");

    if (searchby === "KEYWORD"){
        indicate.children[1].classList.add("active");
        indicate.children[0].classList.remove("active");
    } else {
        indicate.children[0].classList.add("active");
        indicate.children[1].classList.remove("active");
    }
}
