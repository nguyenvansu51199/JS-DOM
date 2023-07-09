function isMatch(liElement, searchTerm) {
  if (!liElement) return false;
  if (searchTerm === '') return false;
  const titleElement = liElement.querySelector('p.todo__title');
  return titleElement.textContent.toLowerCase().includes(searchTerm.toLowerCase());
}

function getAllTodoElements(searchTerm) {
  const liElementList = document.querySelectorAll('ul#todoList > li');

  for (let liElement of liElementList) {
    const needToShow = isMatch(liElement, searchTerm);

    liElement.hidden = !needToShow;
  }
}

function initSearchInput() {
  const searchInput = document.getElementById('searchTerm');
  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    console.log(searchInput.value);
    getAllTodoElements(searchInput.value);
  });
}

function filterTodo(filterStatusSelect) {
  const liElementList = document.querySelectorAll('ul#todoList > li');

  for (let liElement of liElementList) {
    const needToShow =
      filterStatusSelect === 'all' || liElement.dataset.status === filterStatusSelect;

    liElement.hidden = !needToShow;
  }
}

function initFilterStatus() {
  const filterStatus = document.getElementById('filterStatus');
  if (!filterStatus) return;

  filterStatus.addEventListener('change', () => {
    console.log(filterStatus.value);
    filterTodo(filterStatus.value);
  });
}

(() => {
  initSearchInput();
  initFilterStatus();
})();
