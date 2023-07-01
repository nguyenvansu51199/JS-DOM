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
    const alertClass = todo.status === 'completed' ? 'alert-success' : 'alert-secondary';
    divElement.classList.remove();
    divElement.classList.add(alertClass);
  }

  // update content and needed
  const titleElement = liElement.querySelector('.todo__title');
  if (titleElement) titleElement.textContent = todo.title;

  //TODO
  // attach click event for button mark-as-done
  const markAsDoneButton = liElement.querySelector('button.mark-as-done');
  if (markAsDoneButton) {
    // render color for Finish button
    const currentColorBt = todo.status === 'pending' ? 'btn-dark' : 'btn-success';
    markAsDoneButton.classList.remove('btn-success');
    markAsDoneButton.classList.add(currentColorBt);

    // render text Content for Finish button
    const alertText = todo.status === 'pending' ? 'Finish' : 'Reset';
    markAsDoneButton.textContent = alertText;

    // Event
    markAsDoneButton.addEventListener('click', () => {
      console.log('click mark as done');
      const currentStatus = liElement.dataset.status;
      liElement.dataset.status = currentStatus === 'pending' ? 'completed' : 'pending';

      const newClassStatus = currentStatus === 'pending' ? 'alert-success' : 'alert-secondary';
      divElement.classList.remove('alert-success', 'alert-secondary');
      divElement.classList.add(newClassStatus);

      // attack click event color for Finish button
      const colorFinishButoon = currentStatus === 'pending' ? 'btn-success' : 'btn-dark';
      markAsDoneButton.classList.remove('btn-success', 'btn-dark');
      markAsDoneButton.classList.add(colorFinishButoon);

      // attack click event textContent for Finish button
      const newContent = currentStatus === 'pending' ? 'Reset' : 'Finish';
      markAsDoneButton.textContent = newContent;
    });
  }

  const removeButton = liElement.querySelector('button.remove');
  if (removeButton) {
    removeButton.addEventListener('click', () => {
      console.log('click remove');
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

function getTodoList() {
  try {
    return JSON.parse(localStorage.getItem('todo_list'));
  } catch {
    return [];
  }
}

(() => {
  // const todoList = [
  //   { id: 1, title: 'Learn Javascript', status: 'pending' },
  //   { id: 2, title: 'Learn NextJS', status: 'completed' },
  //   { id: 3, title: 'Learn ReactJS', status: 'pending' },
  // ];
  const todoList = getTodoList();
  renderTodoList(todoList, 'todoList');
})();
