// v1
// (() => {
//   console.log('works');

//   const ulElement = document.getElementById('todoList');
//   if (!ulElement) return;

//   const todoList = [
//     { id: 1, title: 'Learn Javascript' },
//     { id: 2, title: 'Learn ReactJS' },
//     { id: 3, title: 'Learn NextJS' },
//   ];

//   for (const todo of todoList) {
//     const liElement = document.createElement('li');
//     liElement.textContent = todo.title;
//     liElement.dataset.id = todo.id;
//     ulElement.appendChild(liElement);
//   }
// })();

//
function createElement(todo) {
  if (!todo) return null;
  const liElement = document.createElement('li');
  liElement.textContent = todo.title;
  liElement.dataset.id = todo.id;
  return liElement;
}

function renderTodoList(ulElementId) {
  const ulElement = document.getElementById(ulElementId);
  if (!ulElement) return;

  const todoList = [
    { id: 1, title: 'Learn Javascript' },
    { id: 2, title: 'Learn ReactJS' },
    { id: 3, title: 'Learn NextJS' },
  ];

  for (const todo of todoList) {
    const liElement = createElement(todo);
    ulElement.appendChild(liElement);
  }
}

// main
(() => {
  console.log('worksss');

  renderTodoList('todoList');
})();
