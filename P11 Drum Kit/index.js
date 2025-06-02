for (var i = 0;i < document.querySelectorAll(".drum").length;i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", function() {
    // var audio = new Audio("./sounds/tom-1.mp3");
    // audio.play();
    // console.log(this.style.color = "white");
    playSound(this.innerHTML);
    makeAnimation(this.innerHTML);
  });
}

document.addEventListener("keydown",function(event){
  playSound(event.key);
  makeAnimation(event.key);
});

function playSound(key){
  switch(key){
    case "w":
      var audio = new Audio("./sounds/tom-1.mp3");
      audio.play();
      break;
    case "a":
      var audio = new Audio("./sounds/tom-2.mp3");
      audio.play();
      break;
    case "s":
      var audio = new Audio("./sounds/tom-3.mp3");
      audio.play();
      break;
    case "d":
      var audio = new Audio("./sounds/tom-4.mp3");
      audio.play();
      break;
    case "j":
      var audio = new Audio("./sounds/snare.mp3");
      audio.play();
      break;
    case "k":
      var audio = new Audio("./sounds/crash.mp3");
      audio.play();
      break;
    case "l":
      var audio = new Audio("./sounds/kick-bass.mp3");
      audio.play();
      break;
    default:
      console.log(this.innerHTML);
  }
}

function makeAnimation(event){
  var activeButton = document.querySelector("." + event);
  activeButton.classList.add("pressed");
  setTimeout(function(){
    activeButton.classList.remove("pressed");
  },100);
}