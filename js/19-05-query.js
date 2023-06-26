console.log('Hello 19-05');

(() => {
  console.log('Hello');
  const h1Element = document.getElementById('title');
  console.log('h1', h1Element);

  const liElementList = document.querySelectorAll('#todoList > li');
  if (liElementList) {
    for (const liElement of liElementList) {
      console.log(liElement);
    }
  }
})();
