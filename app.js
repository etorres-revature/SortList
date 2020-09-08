//drag and drop API
//https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

//global vars for dom elements
const draggableListEl = document.querySelector("#draggable-list");
const checkBtn = document.querySelector("#check-btn");

const richPeeps = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffet",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];

//store list items
const listItems = [];

let dragStartIndex;

createList();

//insert list items into HTML and display on DOM
function createList() {
  [...richPeeps]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      //   console.log(person);

      const listItem = document.createElement("li");

      listItem.setAttribute("data-index", index);

      listItem.innerHTML = `
    <span class="number">${index + 1}</span>
    <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
    </div>
    `;

      listItems.push(listItem);

      draggableListEl.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  //   console.log("event: ", "dragstart");
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}
function dragEnter() {
  //   console.log("event: ", "dragenter");
  this.classList.add("over");
}
function dragLeave() {
  //   console.log("event: ", "dragLeave");
  this.classList.remove("over");
}
function dragOver(e) {
  //   console.log("event: ", "dragover");
  e.preventDefault();
}
function dragDrop() {
  //   console.log("event: ", "dragdrop");
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

//swap list items from drag/drop
function swapItems(fromIndex, toIndex) {
  // console.log("123");
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  // console.log("Item one", itemOne);
  // console.log("Item two", itemTwo);

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

//check the order of the list
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();

    if (personName !== richPeeps[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

function addEventListeners() {
  const draggableEl = document.querySelectorAll(".draggable");
  const dragListItemsEl = document.querySelectorAll(".draggable-list li");

  draggableEl.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItemsEl.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

checkBtn.addEventListener("click", checkOrder);
