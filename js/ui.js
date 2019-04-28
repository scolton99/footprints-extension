const form = document.getElementById("ticket_form");
form.addEventListener("submit",goToThing);

function goToThing() {
    let ticketnum = document.querySelector("#ticket_number").value;

    window.open('https://itsm-fp.northwestern.edu/MRcgi/MRlogin.pl?DL=' + ticketnum + 'DA1');
}