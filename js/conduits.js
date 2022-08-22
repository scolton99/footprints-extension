// Broken in Manifestv3
// const conduits = ({fixconduits}) => {
//     if (!fixconduits) return;

//     const iframe = document.querySelector("iframe[src='https://automate.northwestern.edu/open/conduits-woc/']");
//     iframe.style.display = "none";

//     const setup_fsm = async (frame, {fsmstaff}) => {
//         const res = await fetch("https://cors-anywhere.herokuapp.com/automate.northwestern.edu:443/open/conduits-woc/", {
//             headers: {
//                 'X-Requested-With': 'fpext'
//             }
//         });

//         const blob = await res.blob();

//         const cssreq = await fetch("https://cors-anywhere.herokuapp.com/automate.northwestern.edu:443/open/conduits-woc/template/conduits-woc.css?v=1.0", {
//             headers: {
//                 'X-Requested-With': 'fpext'
//             }
//         });

//         const css = await cssreq.text();

//         frame.setAttribute("src", URL.createObjectURL(blob));

//         frame.addEventListener("load", () => {
//             frame.style.display = "block";
//             remove_entries(frame, fsmstaff, css);

//             window.setTimeout(() => {
//                 frame.setAttribute("height", frame.contentDocument.documentElement.offsetHeight);
//             }, 100);
//         });
//     };

//     const remove_entries = (frame, fsmstaff, css) => {
//         const style = frame.contentDocument.createElement("style");
//         style.setAttribute("type", "text/css");
//         style.textContent = css;

//         frame.contentDocument.body.appendChild(style);

//         const wocs = Array.from(frame.contentDocument.querySelectorAll("div#wrapper td:nth-of-type(2)"));

//         wocs.forEach(woc => {
//             if (fsmstaff.includes(woc.textContent)) {
//                 woc.style.color = "#AAA";
//                 woc.nextElementSibling.style.color = "#AAA";
//             }
//         });
//     };

//     chrome.storage.local.get({
//         fsmstaff: []
//     }, setup_fsm.bind(null, iframe));
// };

// chrome.storage.sync.get({
//     fixconduits: true
// }, conduits);