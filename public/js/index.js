const treasureForm = document.getElementById('add_form');
const treasureList = document.getElementById('items_container');
const sortButton = document.getElementById('sort_button');
const buttonCount = document.getElementById('button_count');
const countTreasures = document.getElementById('count_treasures');
const spanCount = document.getElementById('span_count');
const findInput = document.getElementById('find_input');
const findButton = document.getElementById('find_button');
const cancelFindButton = document.getElementById('cancel_find_button');
const clearStorageButton = document.getElementById('clear_storage_button');
const deleteButton = document.getElementById('delete_button')

// Відображення скарбів
function loadTreasures() {
  fetch('/treasures')
    .then(response => response.json())
    .then(data => {
      treasureList.innerHTML = '';

      data.forEach(treasure => {
        const treasureItem = document.createElement('li');
        treasureItem.innerHTML = `
          <h3>${treasure.name}</h3>
          <p>${treasure.description}</p>
          <p>Ціна: $${treasure.price}</p>
          <button onclick="editTreasure({treasureId})">Редагувати</button>
          <button onclick="delete_button({treasureId})">Видалити</button>
        `;
        treasureList.appendChild(treasureItem);
      });
    });
}

function editTreasure(treasureId) {
  window.location.href = `/edit.html?id=${treasureId}`;
}


// Оновлення лічильника кількості скарбів
function updateTreasureCount() {
  fetch('/treasures')
    .then(response => response.json())
    .then(data => {
      spanCount.textContent = data.length;
    });
}

// Очистка поля вводу для пошуку
function clearFindInput() {
  findInput.value = '';
}

sortButton.addEventListener('click', () => {
  fetch('/treasures?sortBy=price')
    .then(response => response.json())
    .then(data => {
      //В порядку зростання
      data.sort((a, b) => a.price - b.price);

      treasureList.innerHTML = '';

      data.forEach(treasure => {
        const treasureItem = document.createElement('li');
        treasureItem.innerHTML = `
          <h3>${treasure.name}</h3>
          <p>${treasure.description}</p>
          <p>Ціна: $${treasure.price}</p>
        `;
        treasureList.appendChild(treasureItem);
      });
    });
});

buttonCount.addEventListener('click', () => {
  updateTreasureCount();
});

// Пошук за назвою
findButton.addEventListener('click', () => {
  const searchText = findInput.value;

  fetch(`/treasures?search=${searchText}`) 
    .then(response => response.json())
    .then(data => {
      treasureList.innerHTML = '';

      data.forEach(treasure => {
        const treasureItem = document.createElement('li');
        treasureItem.innerHTML = `
          <h3>${treasure.name}</h3>
          <p>${treasure.description}</p>
          <p>Ціна: $${treasure.price}</p>
        `;
        treasureList.appendChild(treasureItem);
      });

      clearFindInput();
      updateTreasureCount();
    });
});


cancelFindButton.addEventListener('click', () => {
  clearFindInput();
  loadTreasures();
  updateTreasureCount();
});

clearStorageButton.addEventListener('click', () => {
  localStorage.clear();
  loadTreasures();
  updateTreasureCount();
});

function deleteTreasure(treasureId) {
  if (confirm('Ви впевнені, що хочете видалити цей скарб?')) {
    fetch(`/treasures/${treasureId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        alert('Скарб видалено.');
        window.location.href = 'index.html';
      } else {
        alert('Помилка під час видалення скарбу.');
      }
    });
  }
}

deleteButton.addEventListener('click', function () {
  const treasureId = new URLSearchParams(window.location.search).get('id');
  
  deleteTreasure(treasureId);
});


loadTreasures();