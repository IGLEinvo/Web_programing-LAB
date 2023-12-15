const editForm = document.getElementById("edit_form");

editForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = document.getElementById("edit_name_input");
    const descriptionInput = document.getElementById("edit_description_input");
    const priceInput = document.getElementById("edit_price_input");

    const name = nameInput.value.trim();
    const description = descriptionInput.value.trim();
    const price = priceInput.value.trim();

    if (!name || !description || !price) {
        alert("Please fill in all fields.");
        return;
    }

    const treasureIndex = localStorage.getItem("editForm");

    let treasures = JSON.parse(localStorage.getItem("treasures"));

    for (let i = 0; i < treasures.length; i++) {
        if (i == treasureIndex) {
            const treasureId = i;
            treasures[i] = {
                name,
                description,
                price,
                treasureId,
            };
            localStorage.setItem("treasures", JSON.stringify(treasures));
        }
    }

    nameInput.value = "";
    descriptionInput.value = "";
    priceInput.value = "";
});
