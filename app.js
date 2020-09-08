//drag and drop API
//https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

//global vars for dom elements
const draggableListEl = document.querySelector("#draggable-list");
const checkBtn = document.querySelector("check-btn");

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
      console.log(person);

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
}
