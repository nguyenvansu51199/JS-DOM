function createTodoElement(todo) {
  if (!todo) return null;
  // find template
  const todoTemplate = document.getElementById('todoTemplate');
  if (!todoTemplate) return null;

  // clone li element
  const todoElement = todoTemplate.content.firstElementChild.cloneNode(true);
  todoElement.dataset.id = todo.id;
  todoElement.dataset.status = todo.status;

  // render todo status
  const divElement = todoElement.querySelector('div.todo');
  if (divElement) {
    const alertClass = todo.status === 'completed' ? 'alert-success' : 'alert-secondary';
    divElement.classList.remove('alert-secondary');
    divElement.classList.add(alertClass);
  }

  // update content and needed
  const titleElement = todoElement.querySelector('.todo__title');
  if (titleElement) titleElement.textContent = todo.title;

  // TODO: attach event for buttons
  // add click event  for mark-as-done button
  const markAsDoneButton = todoElement.querySelector('button.mark-as-done');
  if (markAsDoneButton) {
    markAsDoneButton.addEventListener('click', () => {
      const currentStatus = todoElement.dataset.status;
      const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';

      // get current todo list
      // update status of current todo
      // save to local storage
      const todoList = getTodoList();
      const index = todoList.findIndex((x) => x.id === todo.id);

      if (index >= 0) {
        todoList[index].status = newStatus;
        localStorage.setItem('todo_list', JSON.stringify(todoList));
      }
      // update data-status on li element
      todoElement.dataset.status = newStatus;

      // update alert class accordingly
      const newAlertClass = currentStatus === 'pending' ? 'alert-success' : 'alert-secondary';
      divElement.classList.remove('alert-success', 'alert-secondary');
      divElement.classList.add(newAlertClass);
    });
  }

  // add click event for remove button
  const removeButton = todoElement.querySelector('button.remove');
  if (removeButton) {
    removeButton.addEventListener('click', () => {
      // save local storage
      const todoList = getTodoList();
      console.log({ todoList, removeId: todo.id });
      const newTodoList = todoList.filter((x) => x.id !== todo.id);
      localStorage.setItem('todo_list', JSON.stringify(newTodoList));

      // remove from dom
      todoElement.remove();
    });
  }

  // add click event for edit button
  const editButton = todoElement.querySelector('button.edit');
  if (editButton) {
    editButton.addEventListener('click', () => {
      // populate data to todo form
      populateTodoForm(todo);
    });
  }

  return todoElement;
}

function populateTodoForm(todo) {
  // query todo form
  // dataset.id = todo.id
  const todoForm = document.getElementById('todoFormId');
  if (!todoForm) return;

  todoForm.dataset.id = todo.id;

  // set values for form controls
  // set todoText input
  const todoInput = document.getElementById('todoText');
  if (!todoInput) return;
  todoInput.value = todo.title;
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

function handleTodoFormSubmit(event) {
  event.preventDefault();
  console.log('form submit');

  // get form values
  // validate form values
  const todoInput = document.getElementById('todoText');
  if (!todoInput) {
    alert('Todo Input Not Found');
    return;
  }

  const todoText = todoInput.value;
  const newTodo = {
    id: Date.now(),
    title: todoText,
    status: 'pending',
  };

  // save
  const todoList = getTodoList();
  todoList.push(newTodo);
  localStorage.setItem('todo_list', JSON.stringify(todoList));

  // apply DOM changes
  const newLiElement = createTodoElement(newTodo);
  const ulElement = document.getElementById('todoList');
  if (!ulElement) return;
  ulElement.appendChild(newLiElement);

  // reset form
  const todoForm = document.getElementById('todoFormId');
  if (todoForm) todoForm.reset();
}

(() => {
  // const todoList = [
  //   { id: 1, title: 'Learn Javascript', status: 'pending' },
  //   { id: 2, title: 'Learn NextJS', status: 'completed' },
  //   { id: 3, title: 'Learn ReactJS', status: 'pending' },
  // ];

  const todoList = getTodoList();
  renderTodoList(todoList, 'todoList');

  // register submit event for todo form
  const todoForm = document.getElementById('todoFormId');
  if (todoForm) {
    todoForm.addEventListener('submit', handleTodoFormSubmit);
  }
})();
