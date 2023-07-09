function isMatch(liElement, searchTerm) {
  if (liElement === '') return false;
  if (!searchTerm) return false;

  return liElement.textContent.toLowerCase().includes(searchTerm.toLowerCase());
}

function searchTodo(searchTerm) {
  const liElementList = document.querySelectorAll('ul#todoList > li');
  for (const liElement of liElementList) {
    const needToShow = isMatch(liElement, searchTerm);
    liElement.hidden = !needToShow;
  }
}

function initSearchInput() {
  const searchInput = document.getElementById('searchTerm');
  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    console.log(searchInput.value);
    searchTodo(searchInput.value);
  });
}

(() => {
  initSearchInput();
})();
