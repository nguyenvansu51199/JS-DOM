function createTodoElement(todo) {
  if (!todo) return null;
  // find template
  const todoTemplate = document.getElementById('todoTemplate');
  if (!todoTemplate) return null;

  // clone li element
  const liElement = todoTemplate.content.firstElementChild.cloneNode(true);
  liElement.dataset.id = todo.id;

  // update
  const paragramElement = liElement.querySelector('.todo__title');
  paragramElement.textContent = todo.title;
  return liElement;
}

function renderTodoList(todoList, ulElementId) {
  if (!Array.isArray(todoList) || todoList.length === 0) return;

  const ulElement = document.getElementById(ulElementId);

  // find ul element
  // loop through todoList
  // each todo -> create li element -> append to ul
  for (const todo of todoList) {
    const liElement = createTodoElement(todo);
    ulElement.appendChild(liElement);
  }
}

(() => {
  console.log('works');
  const todoList = [
    { id: 1, title: 'Learn Javascript' },
    { id: 2, title: 'Learn NextJS' },
    { id: 3, title: 'Learn ReactJS' },
  ];

  renderTodoList(todoList, 'todoList');
})();

const clickMeButton = document.getElementById('clickMeButton');
if (clickMeButton) {
  clickMeButton.onclick = function () {
    alert('thank you! :P');
  };
}
