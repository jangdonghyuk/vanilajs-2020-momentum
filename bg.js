const body = document.querySelector("body");
const IMG_number = 6;
// 로딩 중 나올 text
function handleLImgLoad() {
  console.log("finished loading");
}

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `/img/${imgNumber + 1}.jpg`;
  image.addEventListener("loadend", handleLImgLoad);
  image.classList.add("bgImage");
  body.prepend(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_number);
  console.log(number);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
