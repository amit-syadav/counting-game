let submit = document.getElementById("submit");
let game = document.querySelector(".game");
const numbers = [];
numberContainer = document.querySelector(".number-container");
down = document.getElementById("down");
input = document.querySelector(".input");

tryAgain = document.getElementById("try-again");

tryAgain.addEventListener("click", function () {
  position = input.offsetTop;
  scrollTo(0, position);
});

down.addEventListener("click", function () {
  position = input.offsetTop;
  scrollTo(0, position);
});

submit.addEventListener("click", function (e) {
  //   e.preventDefault();
  let garbage = document.querySelectorAll(".number-div");
  let result = document.querySelector(".result");
  result.innerText = "";
  garbage.forEach((item) => {
    item.remove();
  });
  const maxNumber = document.getElementById("maxNumber").value;

  generateRandomRange(maxNumber);
  generateElements();
  generateEventListener();
  game.classList.add("show-game");
  position = game.offsetTop;
  scrollTo(0, position);
});

function generateRandomRange(n) {
  while (numbers.length != n) {
    let r = Math.floor(Math.random() * n) + 1;
    if (numbers.indexOf(r) === -1) numbers.push(r);
  }
}

function generateElements() {
  numberDiv = numbers.map(function (item) {
    divEle = document.createElement("div");
    divEle.setAttribute("id", item);
    divEle.setAttribute("class", "number-div");
    divEle.innerHTML = item;
    numberContainer.appendChild(divEle);
    prevValue = 0;
    thisValue = 0;
    return divEle;
  });
}

var thisValue = 0;
var prevValue = 0;
const correct = ["Good", "Fabulous", "Outstanding", "Correct", "Super!"];
const incorrect = ["Oops its wrong", "Try again", "Its incorrect, keep trying"];

function generateEventListener() {
  allNumberDiv = document.querySelectorAll(".number-div");
  //   console.log(allNumberDiv);
  allNumberDiv.forEach(function (item) {
    item.addEventListener("click", function () {
      thisValue = parseInt(item.innerText);
      // console.log(maxNumber);

      if (thisValue == prevValue + 1) {
        res = correct[Math.floor(Math.random() * correct.length)];
        prevValue = parseInt(thisValue);
        item.classList.add("done");
        if (thisValue != maxNumber.value) {
          var audio = new Audio("assets/correct.wav");
          audio.play();
        } else if (thisValue == maxNumber.value) {
          var audio = new Audio("assets/applause.mp3");
          audio.play();
          res = "You did it...You so good";
        }
      } else {
        res = incorrect[Math.floor(Math.random() * incorrect.length)];
        var audio = new Audio("assets/incorrect.mp3");
        audio.play();
      }
      console.log(thisValue, maxNumber.value);
      result = document.querySelector(".result");
      result.innerText = res;
    });
  });
}
