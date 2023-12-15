const editForm = document.getElementById('edit_form');
const editNameInput = document.getElementById('edit_name_input');
const editDescriptionInput = document.getElementById('edit_description_input');
const editPriceInput = document.getElementById('edit_price_input');
const editButton = document.getElementById('edit_button');

// Отримання ідентифікатора скарбу з параметрів URL
const treasureId = new URLSearchParams(window.location.search).get('id');

editForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = editNameInput.value.trim();
    const description = editDescriptionInput.value.trim();
    const price = editPriceInput.value.trim();

    if (!name || !description || !price) {
        alert('Будь ласка, заповніть всі поля.');
        return;
    }

    const editedTreasure = {
        name: name,
        description: description,
        price: price
    };

    // Використовуйте ідентифікатор treasureId для оновлення відповідного скарбу
    fetch(`/treasures/${treasureId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedTreasure)
    })
    .then(response => {
        if (response.ok) {
            alert('Скарб відредаговано.');
            window.location.href = 'index.html'; 
        } else {
            alert('Помилка під час редагування скарбу.');
        }
    });
});

// Заповнення форми редагування з даними скарбу
const treasures = JSON.parse(localStorage.getItem('treasures'));
const treasureToEdit = treasures.find((treasure) => treasure.treasureId === parseInt(treasureId));

if (treasureToEdit) {
    editNameInput.value = treasureToEdit.name;
    editDescriptionInput.value = treasureToEdit.description;
    editPriceInput.value = treasureToEdit.price;
}
