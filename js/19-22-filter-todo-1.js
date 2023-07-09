function getAllTodoElements() {
  return document.querySelectorAll('#todoList > li');
}

function isMatch(liElement, searchTerm) {
  if (!liElement) return false;
  if (searchTerm === '') return true;

  const titleElement = liElement.querySelector('p.todo__title');
  if (!titleElement) return false;

  return titleElement.textContent.toLowerCase().includes(searchTerm.toLowerCase());
}

function searchTodo(searchTerm) {
  const todoElementList = getAllTodoElements();

  for (const todoElement of todoElementList) {
    console.log(todoElement);
    const needToShow = isMatch(todoElement, searchTerm);

    todoElement.hidden = !needToShow;
  }
  // searchTerm === empty --> show all
  // searchTerm != empty --> filter todo
}

function initSearchInput() {
  // find search term input
  const searchInput = document.getElementById('searchTerm');
  if (!searchInput) return;
  // attach change event

  searchInput.addEventListener('input', () => {
    console.log('change', searchInput.value);
    searchTodo(searchInput.value);
  });
}

function filterTodo(filterStatus) {
  const todoElementList = getAllTodoElements();

  for (const todoElement of todoElementList) {
    console.log(todoElement);
    const needToShow = todoElement === 'all' || todoElement.dataset.status === filterStatus;

    todoElement.hidden = !needToShow;
  }
}

function initFilterStatus() {
  const filterStatusSelect = document.getElementById('filterStatus');
  if (!filterStatusSelect) return;

  filterStatusSelect.addEventListener('change', () => {
    console.log(filterStatusSelect.value);
    filterTodo(filterStatusSelect.value);
  });
}

// MAIN
(() => {
  initSearchInput();
  initFilterStatus();
})();
