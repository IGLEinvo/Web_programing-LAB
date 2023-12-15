const createForm = document.getElementById('create_form');
const nameInput = document.getElementById('name_input');
const descriptionInput = document.getElementById('description_input');
const priceInput = document.getElementById('price_input');

createForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const description = descriptionInput.value.trim();
    const price = priceInput.value.trim();

    if (!name || !description || !price) {
        alert('Please fill in all fields.');
        return;
    }

    const newTreasure = {
        name,
        description,
        price
    };

    fetch('/treasures', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTreasure)
    })
    .then(response => response.json())
    .then(data => {
        location.reload();
    });

    nameInput.value = '';
    descriptionInput.value = '';
    priceInput.value = '';
});
