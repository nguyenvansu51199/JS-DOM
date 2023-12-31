function createTodoElement(todo) {
  if (!todo) return null;
  const liElement = document.createElement('li');
  liElement.textContent = todo.title;
  liElement.dataset.id = todo.id;

  return liElement;
}

function renderTodoList(todoList, ulElementId) {
  if (!Array.isArray(todoList) || todoList.length === 0) return;
  const ulElement = document.getElementById(ulElementId);
  if (!ulElement) return;

  // find ul element
  // loop through todoList
  // each todo -> create li element -> append to ul
  for (const todo of todoList) {
    const liElement = createTodoElement(todo);
    ulElement.appendChild(liElement);
  }
}

// main
(() => {
  console.log('work');
  const todoList1 = [
    { id: 1, title: 'Learn Javascript' },
    { id: 2, title: 'Learn NextJS' },
    { id: 3, title: 'Learn ReactJS' },
  ];

  renderTodoList(todoList1, 'todoList1');

  const todoList2 = [
    { id: 1, title: 'Learn Javascript' },
    { id: 2, title: 'Learn NextJS' },
    { id: 3, title: 'Learn ReactJS' },
    { id: 4, title: 'Learn Git' },
  ];

  renderTodoList(todoList2, 'todoList2');
  // do something else
})();
