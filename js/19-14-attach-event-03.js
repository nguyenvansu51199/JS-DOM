function createTodoElement(todo) {
  if (!todo) return null;
  // find template
  const todoTemplate = document.getElementById('todoTemplate');
  if (!todoTemplate) return null;

  // clone li element
  const liElement = todoTemplate.content.firstElementChild.cloneNode(true);
  liElement.dataset.id = todo.id;
  liElement.dataset.status = todo.status;

  // render todo status
  const divElement = liElement.querySelector('div.todo');
  if (divElement) {
    const alertClass = todo.status === 'pending' ? 'alert-secondary' : 'alert-success';

    divElement.classList.remove('alert-secondary');
    divElement.classList.add(alertClass);
  }
  // update content and needed
  const titleElement = liElement.querySelector('.todo__title');
  if (titleElement) titleElement.textContent = todo.title;

  // TODO:
  // attach click event for buttons mark-as-done;
  const markAsDoneButton = liElement.querySelector('button.mark-as-done');
  if (markAsDoneButton) {
    markAsDoneButton.addEventListener('click', () => {
      console.log('click mark-as-done');
      const currentStatus = liElement.dataset.status;
      liElement.dataset.status = currentStatus === 'pending' ? 'completed' : 'pending';

      const newAlertClass = currentStatus === 'pending' ? 'alert-success' : 'alert-secondary';
      divElement.classList.remove('alert-success', 'alert-secondary');
      divElement.classList.add(newAlertClass);
    });
  }
  // attach click event for buttons remove
  const removeButton = liElement.querySelector('button.remove');
  if (removeButton) {
    removeButton.addEventListener('click', () => {
      console.log('remove button');
      liElement.remove();
    });
  }

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
    { id: 1, title: 'Learn Javascript', status: 'pending' },
    { id: 2, title: 'Learn NextJS', status: 'completed' },
    { id: 3, title: 'Learn ReactJS', status: 'pending' },
  ];

  renderTodoList(todoList, 'todoList');
})();
