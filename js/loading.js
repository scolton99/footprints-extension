const add_spinner = () => {
  if (!document.body)
    return window.setTimeout(add_spinner, 10);
  
  const spinner = document.createElement("div");
  spinner.classList.add("lds-dual-ring");
  document.body.appendChild(spinner);
}

add_spinner();