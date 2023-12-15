const createForm = document.getElementById("create_form");
let treasureId = 0;

createForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nameInput = document.getElementById("name_input");
    const descriptionInput = document.getElementById("description_input");
    const priceInput = document.getElementById("price_input");

    const name = nameInput.value.trim();
    const description = descriptionInput.value.trim();
    const price = priceInput.value.trim();

    if (!name || !description || !price) {
        alert("Please fill in all fields.");
        return;
    }


    nameInput.value = "";
    descriptionInput.value = "";
    priceInput.value = "";

    const treasures = JSON.parse(localStorage.getItem("treasures")) || [];

    const newTreasure = {
        name,
        description,
        price,
        treasureId,
    };
    treasures.push(newTreasure);
    treasureId++;

    localStorage.setItem("treasures", JSON.stringify(treasures));
});
