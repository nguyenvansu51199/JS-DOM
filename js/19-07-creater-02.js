function createTodoElement(todo) {
  const liElement = document.createElement('li');
  liElement.textContent = todo.title;
  liElement.dataset.id = todo.id;
  return liElement;
}

function renderTodoList(todoList, ulElementId) {
  if (!Array.isArray(todoList) || todoList.length === 0) return;

  const ulElement = document.getElementById(ulElementId);
  if (!ulElement) return;

  for (const todo of todoList) {
    const liElement = createTodoElement(todo);
    ulElement.appendChild(liElement);
  }
}

// main
(() => {
  console.log('worksss');

  const todoList = [
    { id: 1, title: 'Learn Javascript' },
    { id: 2, title: 'Learn NextJS' },
    { id: 3, title: 'Learn ReactJS' },
  ];

  renderTodoList(todoList, 'todoList');
})();
