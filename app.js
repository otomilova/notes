const inputElement = document.getElementById("title");
const btnCreate = document.getElementById("create");
const listElement = document.getElementById("list");


const notes = [
];

function render() {
  listElement.innerHTML = "";
  if (notes.length === 0) {
    listElement.innerHTML = '<p>Нет элементов</p>'
  }
  for (let [index, note] of notes.entries()) {
    listElement.insertAdjacentHTML("beforeend", createLi(note, index));
  }
}

render();

btnCreate.onclick = function () {
  if (!inputElement.value) {
    return;
  }
  const newNote = {
    title: inputElement.value,
    completed: false,
  };
  if (notes.length === 0) {
    listElement.innerHTML = ''
  }
  notes.push(newNote);
  listElement.insertAdjacentHTML(
    "beforeend",
    createLi(newNote, notes.length - 1)
  );
  inputElement.value = "";
};

listElement.onclick = function (event) {
  console.log(event.target.dataset);
  if (event.target.dataset.index) {
    const index = Number(event.target.dataset.index);
    const type = event.target.dataset.type;

    if (type === "toggle") {
      notes[index].completed = !notes[index].completed;
    } else if (type === "remove") {
      notes.splice(index, 1);
    }
    render();
  }
};

function createLi(note, index) {
  return `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span class="${note.completed ? "text-decoration-line-through" : ""}">${
    note.title
  }</span>
      <span>
        <span class="btn btn-small btn-${
          note.completed ? "warning" : "success"
        }" data-index="${index}" data-type="toggle">&check;</span>
        <span class="btn btn-small btn-danger" data-index="${index}" data-type="remove">&times;</span>
      </span>
    </li>
    `;
}
