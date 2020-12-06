const toDoform = document.querySelector(".js-toDoForm"),
  toDoInput = toDoform.querySelector("input"),
  toDolist = document.querySelector(".js-toDoList");

const TODOS_LS = "toDOs";
let toDos = [];

// filter : true인 아이템만을 가지고 array를 만드는 함수

// function filterFn(toDo) {
//   return toDo.id === 1;
// }

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDolist.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    // console.log(toDo.id, li.id);
    return toDo.id !== parseInt(li.id);
  });
  //  id 같은 li를 삭제 후 filter 함수로 나머지 element들을 가지고 array만든후 저장
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  //   TODOS_LS라는 KEY에 , toDos라는 array를 value에 저장
}

function paintToDo(text) {
  //   console.log(text);
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDolist.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDOs() {
  const loadedtoDos = localStorage.getItem(TODOS_LS);
  if (loadedtoDos !== null) {
    // console.log(loadedtoDos);
    const parsedToDos = JSON.parse(loadedtoDos);
    // console.log(parsedToDos);
    parsedToDos.forEach(function (toDo) {
      //   console.log(toDo.text);
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDOs();
  toDoform.addEventListener("submit", handleSubmit);
}

init();
