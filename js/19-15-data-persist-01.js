function createTodoElement(todo) {
  if (!todo) return null;
  // find template
  const todoTemplate = document.getElementById('todoTemplate');
  if (!todoTemplate) return null;

  // clone li element
  const liElement = todoTemplate.content.firstElementChild.cloneNode(true);
  liElement.dataset.id = todo.id;
  liElement.dataset.status = todo.status;

  // update content and needed
  const titleElement = liElement.querySelector('.todo__title');
  if (titleElement) titleElement.textContent = todo.title;
  const divElement = liElement.querySelector('div.todo');
  const alertClass = todo.status === 'pending' ? 'alert-secondary' : 'alert-success';
  divElement.classList.remove('alert-secondary');
  divElement.classList.add(alertClass);

  // TODO
  // event click for mark as done button
  const markAsDoneButton = liElement.querySelector('button.mark-as-done');
  markAsDoneButton.addEventListener('click', () => {
    const currentStatus = liElement.dataset.status;
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    const todoList = getTodoList();
    const index = todoList.findIndex((x) => x.id === todo.id);
    if (index >= 0) {
      todoList[index].status = newStatus;
      localStorage.setItem('todo_list', JSON.stringify(todoList));
    }

    // event click status liElement
    liElement.dataset.status = currentStatus === 'pending' ? 'completed' : 'pending';

    // event click class divElement
    const newClassStatus = currentStatus === 'pending' ? 'alert-success' : 'alert-secondary';
    divElement.classList.remove('alert-secondary', 'alert-success');
    divElement.classList.add(newClassStatus);
  });

  const removeButton = liElement.querySelector('button.remove');
  removeButton.addEventListener('click', () => {
    const todoList = getTodoList();
    const newTodoList = todoList.filter((x) => x.id !== todo.id);
    localStorage.setItem('todo_list', JSON.stringify(newTodoList));
    liElement.remove();
  });
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

function getTodoList() {
  try {
    return JSON.parse(localStorage.getItem('todo_list'));
  } catch {
    return [];
  }
}

(() => {
  // console.log('works');
  // const todoList = [
  //   { id: 1, title: 'Learn Javascript', status: 'pending' },
  //   { id: 2, title: 'Learn NextJS', status: 'completed' },
  //   { id: 3, title: 'Learn ReactJS', status: 'pending' },
  // ];
  const todoList = getTodoList();
  renderTodoList(todoList, 'todoList');
})();
