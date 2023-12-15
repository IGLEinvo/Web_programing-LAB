const itemsContainer = document.getElementById("items_container");
const sortButton = document.getElementById("sort_button");
const countButton = document.getElementById("button_count");
const spanCount = document.getElementById("span_count");
const findButton = document.getElementById("find_button");
const cancelButton = document.getElementById("cancel_find_button");
const findInput = document.getElementById("find_input");
const clearStorageButton = document.getElementById("clear_storage_button");

let cloneForms = [];
let counter = 0;
let treasures = [];

function loadTreasuresFromLocalStorage() {
    const storedTreasures = JSON.parse(localStorage.getItem("treasures")) || [];
    treasures = storedTreasures;
    treasures.forEach((treasure) => {
        renderTreasure(treasure);
    });
}

loadTreasuresFromLocalStorage();

function renderTreasure(treasure) {
    const treasureForm = document.createElement("div");
    treasureForm.className = "treasure-form";
    treasureForm.innerHTML = `
        <li id=${treasure.treasureId} class="card mb-3 item-card" draggable="true">
            <img src="./images/rubin.png" class="item-container__image card-img-top" alt="card">
            <div class="card-body">
                <p>Назва: ${treasure.name}</p>
                <p>Опис: ${treasure.description}</p>
                <p>Ціна: ${treasure.price} грн</p>
                <button type="button" class="btn btn-info" id="edit-button">Edit</button>
            </div>
        </li>
    `;

    itemsContainer.appendChild(treasureForm);
}

sortButton.addEventListener("click", () => {
    counter++;
    while (itemsContainer.firstChild) {
        itemsContainer.removeChild(itemsContainer.firstChild);
    }
    if (counter % 2 === 1) {
        cloneForms = treasures.map((treasure) => ({ ...treasure }));
        const sortedTreasures = cloneForms.sort((a, b) => b.price - a.price);

        sortedTreasures.forEach((treasure) => {
            renderTreasure(treasure);
        });

        countTreasures(sortedTreasures);
    } else {
        treasures.forEach((treasure) => {
            renderTreasure(treasure);
        });
        countTreasures(treasures);
    }
});

countButton.addEventListener("click", () => {
    countTreasures(treasures);
});

function countTreasures(treasures) {
    const treasureCount = treasures.length;
    spanCount.textContent = treasureCount;
}

findButton.addEventListener("click", () => {
    while (itemsContainer.firstChild) {
        itemsContainer.removeChild(itemsContainer.firstChild);
    }
    cloneForms = treasures.map((treasure) => ({ ...treasure }));
    const searchTerm = findInput.value.toLowerCase();
    const filteredTreasures = cloneForms.filter((treasure) =>
        treasure.name.toLowerCase().includes(searchTerm)
    );
    filteredTreasures.forEach((treasure) => {
        renderTreasure(treasure);
    });
    countTreasures(filteredTreasures);
});

cancelButton.addEventListener("click", () => {
    while (itemsContainer.firstChild) {
        itemsContainer.removeChild(itemsContainer.firstChild);
    }
    treasures.forEach((treasure) => {
        renderTreasure(treasure);
    });
    countTreasures(treasures);
    findInput.value = "";
});

clearStorageButton.addEventListener("click", () => {
    clearLocalStorage();
    alert("Local Storage has been cleared.");
    location.reload(); // Перезавантаження сторінки після очищення Local Storage
});

itemsContainer.addEventListener("click", (event) => {
    if (event.target.id === "edit-button") {
        const editButton = event.target;
        const parentListItem = editButton.closest("li");
        if (parentListItem) {
            const treasureId = parentListItem.id;
            localStorage["editForm"] = treasureId;
            window.location.href = "edit.html";
        }
    }
});

function clearLocalStorage() {
    localStorage.removeItem("treasures");
}
