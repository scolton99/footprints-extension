let b = document.querySelector("a#pauseunpauseLink")



if (document.getElementById("pauseunpause_image") && typeof(document.getElementById("pauseunpause_image").parentElement.dataset.state) === "undefined")
  document.getElementById("pauseunpause_image").parentElement.dataset.state = "pause";

if (b)
  b.addEventListener("click", function() {
      var theImage = document.getElementById("pauseunpause_image").parentElement;
      
      if (theImage.dataset.state === "play") {
          theImage.dataset.state = "pause";
      }
      else {
          theImage.dataset.state = "play";
      }
  });