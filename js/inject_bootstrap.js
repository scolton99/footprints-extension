chrome.storage.sync.get({
  enableCards: true
}, function(items) {
  if (!items.enableCards){
    return;
  }
    inject();
});

function inject(){
    let link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css";
    link.crossorigin="anonymous";
    document.head.appendChild(link);

    let popper = document.createElement("script");

    popper.type = 'text/javascript';
    popper.async = true;
    popper.src = "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js";
    popper.crossorigin="anonymous";
    popper.onload = function() {
        //Load popper.js first
        let jquery = document.createElement("script");

        jquery.type = 'text/javascript';
        jquery.async = true;
        jquery.src = "https://code.jquery.com/jquery-3.5.1.slim.min.js";
        jquery.onload = function() {
            //load jQuery before bootstrap js
            let bootjs = document.createElement("script");

            bootjs.type = 'text/javascript';
            bootjs.async = false;
            bootjs.src = "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js";
            bootjs.crossorigin="anonymous";
            document.head.appendChild(bootjs);
        }

        jquery.crossorigin="anonymous";
        document.head.appendChild(jquery);
    }

    document.head.appendChild(popper);
}
