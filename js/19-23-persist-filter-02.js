function getAllTodoElements() {
  return document.querySelectorAll('#todoList > li');
}

function isMatchStatus(liElement, filterStatus) {
  return filterStatus === 'all' || liElement.dataset.status === filterStatus;
}

function isMatchSearch(liElement, searchTerm) {
  if (!liElement) return false;
  if (searchTerm === '') return true;

  const titleElement = liElement.querySelector('p.todo__title');
  if (!titleElement) return false;

  return titleElement.textContent.toLowerCase().includes(searchTerm.toLowerCase());
}

function isMatch(liElement, params) {
  return (
    isMatchSearch(liElement, params.get('searchTerm')) &&
    isMatchStatus(liElement, params.get('status'))
  );
}

// function searchTodo(searchTerm) {
//   const todoElementList = getAllTodoElements();

//   for (const todoElement of todoElementList) {
//     console.log(todoElement);
//     const needToShow = isMatch(todoElement, searchTerm);

//     todoElement.hidden = !needToShow;
//   }
//   // searchTerm === empty --> show all
//   // searchTerm != empty --> filter todo
// }

function initSearchInput(params) {
  // find search term input
  const searchInput = document.getElementById('searchTerm');
  if (!searchInput) return;
  // attach change event

  if (params.get('searchTerm')) {
    searchInput.value = params.get('searchTerm');
  }

  searchInput.addEventListener('input', () => {
    // console.log('change', searchInput.value);
    // searchTodo(searchInput.value);
    handleFilterChange('searchTerm', searchInput.value);
  });
}

// function filterTodo(filterStatus) {
//   const todoElementList = getAllTodoElements();

//   for (const todoElement of todoElementList) {
//     console.log(todoElement);
//     const needToShow = filterStatus === 'all' || todoElement.dataset.status === filterStatus;

//     todoElement.hidden = !needToShow;
//   }
//   // searchTerm === empty --> show all
//   // searchTerm != empty --> filter todo
// }

function initFilterStatus(params) {
  // find select
  const filterStatusSelect = document.getElementById('filterStatus');
  if (!filterStatusSelect) return;

  if (params.get('status')) {
    filterStatusSelect.value = params.get('status');
  }
  // attach change event
  filterStatusSelect.addEventListener('change', () => {
    // console.log(filterStatusSelect.value);
    // filterTodo(filterStatusSelect.value);
    handleFilterChange('status', filterStatusSelect.value);
  });
}

function handleFilterChange(filterName, filterValue) {
  const url = new URL(window.location);
  url.searchParams.set(filterName, filterValue);
  history.pushState({}, '', url);

  const todoElementList = getAllTodoElements();

  for (const todoElement of todoElementList) {
    console.log(todoElement);
    const needToShow = isMatch(todoElement, url.searchParams);

    todoElement.hidden = !needToShow;
  }
}

// MAIN
(() => {
  const params = new URLSearchParams(window.location.search);

  initSearchInput(params);
  initFilterStatus(params);
})();
