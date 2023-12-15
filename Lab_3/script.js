const items = [];

function addItem(title, description, price, image) {
    const newItem = {
        id: Date.now(),
        title,
        description,
        price,
        image,
    };

    items.push(newItem);
    displayItems();
    calculateTotalPrice();
}

function displayItems(filteredItems = items) {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';

    filteredItems.forEach((item) => {
        const itemElement = document.createElement('li');
        itemElement.classList.add('item');

        const titleElement = document.createElement('h3');
        titleElement.textContent = item.title;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = item.description;

        const priceElement = document.createElement('p');
        priceElement.textContent = `Ціна: ${item.price} грн`;

        const imageElement = document.createElement('img');
        imageElement.src = URL.createObjectURL(item.image);

        const editButton = document.createElement('button');
        editButton.textContent = 'Редагувати';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => editItem(item.id));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Видалити';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => deleteItem(item.id));

        itemElement.appendChild(titleElement);
        itemElement.appendChild(descriptionElement);
        itemElement.appendChild(priceElement);
        itemElement.appendChild(imageElement);

        itemElement.appendChild(editButton);
        itemElement.appendChild(deleteButton);

        itemList.appendChild(itemElement);
    });
}

function deleteItem(itemId) {
    const index = items.findIndex((item) => item.id === itemId);
    if (index !== -1) {
        items.splice(index, 1);
        displayItems();
        calculateTotalPrice();
    }
}

function editItem(itemId) {
    const itemToEdit = items.find((item) => item.id === itemId);
    if (itemToEdit) {
        const newTitle = prompt('Введіть новий заголовок:', itemToEdit.title);
        const newDescription = prompt('Введіть новий опис:', itemToEdit.description);
        const newPrice = parseFloat(prompt('Введіть нову ціну:', itemToEdit.price));

        if (newTitle !== null && newDescription !== null && !isNaN(newPrice) && newPrice >= 0) {
            itemToEdit.title = newTitle;
            itemToEdit.description = newDescription;
            itemToEdit.price = newPrice;
            displayItems();
            calculateTotalPrice();
        }
    }
}

function searchItems(query, minPrice, maxPrice) {
    const filteredItems = items.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) &&
        (!minPrice || item.price >= minPrice) &&
        (!maxPrice || item.price <= maxPrice)
    );
    displayItems(filteredItems);
}

function calculateTotalPrice() {
    const totalPriceElement = document.getElementById('totalPrice');
    const total = items.reduce((sum, item) => sum + item.price, 0);
    totalPriceElement.textContent = `Загальна ціна: ${total} грн`;
}

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');
const cancelButton = document.getElementById('cancelButton');
const addForm = document.getElementById('addForm');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
    searchItems(query, minPrice, maxPrice);
});

cancelButton.addEventListener('click', () => {
    searchInput.value = '';
    minPriceInput.value = '';
    maxPriceInput.value = '';
    displayItems();
});

addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;
    const price = parseFloat(e.target.price.value);
    const image = e.target.image.files[0];

    if (title && description && !isNaN(price) && price >= 0 && image) {
        addItem(title, description, price, image);
        addForm.reset();
    } else {
        alert('Будь ласка, заповніть всі поля коректно');
    }
});

displayItems();
