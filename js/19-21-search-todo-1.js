function isMatch(liElement, searchTerm) {
  if (!liElement) return false;
  if (searchTerm === '') return false;
  const titleElement = liElement.querySelector('p.todo__title');
  if (!titleElement) return false;
  return titleElement.textContent.toLowerCase().includes(searchTerm.toLowerCase());
}

function searchTodo(searchTerm) {
  const todoElementList = document.querySelectorAll('ul#todoList > li');
  for (const todoElement of todoElementList) {
    const needToShow = isMatch(todoElement, searchTerm);

    todoElement.hidden = !needToShow;
  }
}

function initSearchInput() {
  const searchInput = document.getElementById('searchTerm');
  searchInput.addEventListener('input', () => {
    console.log(searchInput.value);
    searchTodo(searchInput.value);
  });
}

(() => {
  initSearchInput();
})();
