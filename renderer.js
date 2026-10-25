const STORAGE_KEY = "mayaLoom.collections.v1";

const existingCollectionsSection = document.getElementById("existing-collections");
const showCreateCollectionButton = document.getElementById("show-create-collection");
const createCollectionForm = document.getElementById("create-collection-form");
const newCollectionNameInput = document.getElementById("new-collection-name");
const createAndAddButton = document.getElementById("create-and-add-wallpaper");
const collectionForm = document.getElementById("collection-form");
const collectionNameInput = document.getElementById("collection-name");
const collectionGrid = document.getElementById("collection-grid");
const collectionCount = document.getElementById("collection-count");
const statusMessage = document.getElementById("status-message");

const collectionDetails = document.getElementById("collection-details");
const selectedCollectionName = document.getElementById("selected-collection-name");
const selectedCollectionCount = document.getElementById("selected-collection-count");
const collectionWallpapers = document.getElementById("collection-wallpapers");
const closeCollectionButton = document.getElementById("close-collection");

let collections = loadCollections();
let selectedCollectionId = null;

// Elements for the Add to Collection popup.
const collectionModal = document.getElementById("collection-modal");
const collectionSelect = document.getElementById("collection-select");
const confirmAddButton = document.getElementById("confirm-add-collection");
const cancelAddButton = document.getElementById("cancel-add-collection");
const modalMessage = document.getElementById("collection-modal-message");
const collectionsListSection = document.getElementById("collections-list-section");

let wallpaperToAdd = null;


// Open the popup when the user clicks Add to Collection.

function addWallpaperToCollection(wallpaper) {
    wallpaperToAdd = wallpaper;

    collectionSelect.replaceChildren();

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Choose a collection";

    collectionSelect.appendChild(placeholder);

    collections.forEach(collection => {
        const option = document.createElement("option");

        option.value = collection.id;
        option.textContent = collection.name;

        collectionSelect.appendChild(option);
    });

    // Reset the modal every time it opens.
    existingCollectionsSection.hidden = collections.length === 0;
    confirmAddButton.hidden = collections.length === 0;

    confirmAddButton.disabled = false;
    collectionSelect.disabled = false;
    collectionSelect.value = "";

    createCollectionForm.hidden = true;
    createAndAddButton.hidden = false;
    showCreateCollectionButton.hidden = false;

    newCollectionNameInput.value = "";

    modalMessage.textContent = "";
    modalMessage.classList.remove("success", "error");

    showCreateCollectionButton.textContent = "+ Create New Collection";

    modalMessage.textContent = collections.length === 0
        ? "You haven't created any collections yet. Create one below!"
        : "";

    collectionModal.hidden = false;
}

window.addWallpaperToCollection = addWallpaperToCollection;

showCreateCollectionButton.addEventListener("click", () => {
    createCollectionForm.hidden = false;
    showCreateCollectionButton.hidden = true;


    newCollectionNameInput.focus();


});



// Add a wallpaper to an existing collection.
confirmAddButton.addEventListener("click", () => {
    if (!wallpaperToAdd) {
        modalMessage.textContent = "No wallpaper selected.";
        modalMessage.classList.remove("success");
        modalMessage.classList.add("error");
        return;
    }

    const collectionId = collectionSelect.value;

    if (!collectionId) {
        modalMessage.textContent = "Please choose a collection first.";
        modalMessage.classList.remove("success");
        modalMessage.classList.add("error");
        return;
    }

    const collection = collections.find(
        item => item.id === collectionId
    );

    if (!collection) {
        modalMessage.textContent = "Collection not found.";
        modalMessage.classList.remove("success");
        modalMessage.classList.add("error");
        return;
    }

    const wallpaperId = window.getWallpaperKey(wallpaperToAdd);

    // Prevent adding the same wallpaper twice.
    if (collection.wallpaperIds.includes(wallpaperId)) {
        modalMessage.textContent =
            `This wallpaper is already in "${collection.name}".`;

        modalMessage.classList.remove("error");
        modalMessage.classList.add("success");
        return;
    }

    collection.wallpaperIds.push(wallpaperId);

    if (!saveCollections()) {
        collection.wallpaperIds.pop();

        modalMessage.textContent =
            "Could not save the wallpaper. Please try again.";

        modalMessage.classList.remove("success");
        modalMessage.classList.add("error");
        return;
    }

    renderCollections();

    modalMessage.textContent =
        `✓ Wallpaper added successfully to "${collection.name}"!`;

    modalMessage.classList.remove("error");
    modalMessage.classList.add("success");

    // Prevent accidental repeated additions.
    confirmAddButton.disabled = true;
    collectionSelect.disabled = true;
});

// Create a new collection and add the current wallpaper.
createAndAddButton.addEventListener("click", () => {
    if (!wallpaperToAdd) {
        modalMessage.textContent = "No wallpaper selected.";
        modalMessage.classList.remove("success");
        modalMessage.classList.add("error");
        return;
    }

    const name = newCollectionNameInput.value.trim();

    if (!name) {
        modalMessage.textContent = "Please enter a collection name.";
        modalMessage.classList.remove("success");
        modalMessage.classList.add("error");
        return;
    }

    const alreadyExists = collections.some(
        collection =>
            collection.name.toLowerCase() === name.toLowerCase()
    );

    if (alreadyExists) {
        modalMessage.textContent =
            "A collection with this name already exists.";

        modalMessage.classList.remove("success");
        modalMessage.classList.add("error");
        return;
    }

    const newCollection = {
        id: crypto.randomUUID(),
        name: name,
        wallpaperIds: [
            window.getWallpaperKey(wallpaperToAdd)
        ]
    };

    collections.push(newCollection);

    if (!saveCollections()) {
        collections.pop();

        modalMessage.textContent =
            "Could not save the collection. Please try again.";

        modalMessage.classList.remove("success");
        modalMessage.classList.add("error");
        return;
    }

    renderCollections();

    // Hide the creation controls after successful creation.
    createCollectionForm.hidden = true;
    showCreateCollectionButton.hidden = true;
    existingCollectionsSection.hidden = true;
    confirmAddButton.hidden = true;

    newCollectionNameInput.value = "";

    // Keep the modal open so the success message is visible.
    modalMessage.textContent =
        `✓ "${name}" was created, and the wallpaper was added successfully!`;

    modalMessage.classList.remove("error");
    modalMessage.classList.add("success");

    wallpaperToAdd = null;
});


// Close the popup without saving.
cancelAddButton.addEventListener("click", () => {
    collectionModal.hidden = true;
    wallpaperToAdd = null;

    cancelAddButton.addEventListener("click", () => {
        collectionModal.hidden = true;
        wallpaperToAdd = null;


        createCollectionForm.hidden = true;
        showCreateCollectionButton.hidden = false;
        createAndAddButton.hidden = false;

        newCollectionNameInput.value = "";

        modalMessage.textContent = "";
        modalMessage.classList.remove("success", "error");


    });

    modalMessage.textContent = "";
});


// Load saved collections from localStorage.
function loadCollections() {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);

        if (savedData === null) {
            return [];
        }

        const parsedData = JSON.parse(savedData);

        if (!Array.isArray(parsedData)) {
            return [];
        }

        // Accept only records with the structure we expect.
        return parsedData.filter(collection =>
            collection !== null &&
            typeof collection.id === "string" &&
            typeof collection.name === "string" &&
            Array.isArray(collection.wallpaperIds) &&
            collection.wallpaperIds.every(id => typeof id === "string")
        );

    } catch (error) {
        console.error("Could not load collections:", error);
        return [];
    }
}


// Save the current collection data.
function saveCollections() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(collections));
        return true;

    } catch (error) {
        console.error("Could not save collections:", error);
        showMessage("Could not save your collections.", true);
        return false;
    }
}


// Display a message below the creation form.
function showMessage(message, isError = false) {
    statusMessage.textContent = message;

    statusMessage.classList.toggle("error", isError);
}


// Create a new collection.
function createCollection(name) {
    const trimmedName = name.trim();

    if (trimmedName.length === 0) {
        showMessage("Please enter a collection name.", true);
        return;
    }

    // Prevent duplicate names, ignoring capitalization.
    const alreadyExists = collections.some(collection =>
        collection.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (alreadyExists) {
        showMessage("A collection with this name already exists.", true);
        return;
    }

    const newCollection = {
        id: crypto.randomUUID(),
        name: trimmedName,
        wallpaperIds: []
    };

    collections.push(newCollection);

    // Roll back the in-memory change if saving fails.
    if (!saveCollections()) {
        collections.pop();
        return;
    }

    renderCollections();

    collectionForm.reset();
    collectionNameInput.focus();

    showMessage(`"${trimmedName}" was created successfully.`);
}


// Display all collection cards.
function renderCollections() {
    collectionGrid.replaceChildren();

    collectionCount.textContent =
        `${collections.length} ${collections.length === 1 ? "collection" : "collections"}`;

    if (collections.length === 0) {
        const emptyState = document.createElement("div");

        emptyState.className = "empty-state";
        emptyState.textContent =
            "No collections yet. Create your first collection above!";

        collectionGrid.appendChild(emptyState);

        closeCollection();
        return;
    }

    collections.forEach(collection => {
        const card = document.createElement("article");
        card.className = "collection-card";

        const icon = document.createElement("div");
        icon.className = "collection-icon";
        icon.textContent = "📁";

        const title = document.createElement("h4");
        title.textContent = collection.name;

        const description = document.createElement("p");
        const count = collection.wallpaperIds.length;

        description.textContent =
            `${count} ${count === 1 ? "wallpaper" : "wallpapers"}`;

        const actions = document.createElement("div");
        actions.className = "card-actions";

        const openButton = document.createElement("button");
        openButton.type = "button";
        openButton.className = "secondary-button";
        openButton.textContent = "Open";

        openButton.addEventListener("click", () => {
            openCollection(collection.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            deleteCollection(collection.id);
        });

        actions.append(openButton, deleteButton);
        card.append(icon, title, description, actions);

        collectionGrid.appendChild(card);
    });

    if (selectedCollectionId !== null) {
        openCollection(selectedCollectionId);
    }
}


// Open a collection.
// Open a collection and display its wallpapers.
function openCollection(collectionId) {
    const collection = collections.find(
        item => item.id === collectionId
    );

    if (!collection) {
        selectedCollectionId = null;
        collectionDetails.hidden = true;
        collectionsListSection.hidden = false;
        return;
    }

    selectedCollectionId = collectionId;

    // Hide the collection cards and show the selected collection.
    // Hide the collections list and show the selected collection page.
    collectionsListSection.hidden = true;
    collectionDetails.hidden = false;

    selectedCollectionName.textContent = collection.name;

    const count = collection.wallpaperIds.length;

    selectedCollectionCount.textContent =
        `${count} ${count === 1 ? "wallpaper" : "wallpapers"} in this collection`;

    collectionWallpapers.replaceChildren();

    // Retrieve the actual wallpaper objects from the gallery.
    const wallpapersInCollection = collection.wallpaperIds
        .map(id =>
            window.wallpapers.find(
                wallpaper => window.getWallpaperKey(wallpaper) === id
            )
        )
        .filter(Boolean);

    if (wallpapersInCollection.length === 0) {
        const emptyState = document.createElement("p");

        emptyState.className = "empty-state";
        emptyState.textContent =
            "This collection is empty. Add wallpapers from the gallery!";

        collectionWallpapers.appendChild(emptyState);
        return;
    }

    // Display each wallpaper.
    wallpapersInCollection.forEach(wallpaper => {
        const card = document.createElement("article");
        card.className = "wallpaper-card";

        const image = document.createElement("img");

        image.src =
            wallpaper.image ||
            wallpaper.url ||
            wallpaper.src ||
            "";

        image.alt = wallpaper.name || "Wallpaper";
        image.loading = "lazy";

        const title = document.createElement("h3");
        title.textContent = wallpaper.name || "Untitled Wallpaper";

        const removeButton = document.createElement("button");

        removeButton.type = "button";
        removeButton.textContent = "Remove from Collection";

        removeButton.addEventListener("click", () => {
            removeWallpaperFromCollection(
                collection.id,
                window.getWallpaperKey(wallpaper)
            );
        });

        card.append(image, title, removeButton);

        collectionWallpapers.appendChild(card);
    });
}


function removeWallpaperFromCollection(collectionId, wallpaperId) {
    const collection = collections.find(
        item => item.id === collectionId
    );

    if (!collection) {
        return;
    }

    const index = collection.wallpaperIds.indexOf(wallpaperId);

    if (index === -1) {
        return;
    }

    const removedId = collection.wallpaperIds.splice(index, 1)[0];

    if (!saveCollections()) {
        collection.wallpaperIds.splice(index, 0, removedId);
        return;
    }

    renderCollections();

    showMessage("Wallpaper removed from collection.");
}


// Delete a collection.
function deleteCollection(collectionId) {
    const index = collections.findIndex(item => item.id === collectionId);

    if (index === -1) {
        return;
    }

    const deletedCollection = collections[index];

    const confirmed = window.confirm(
        `Delete the collection "${deletedCollection.name}"?`
    );

    if (!confirmed) {
        return;
    }

    collections.splice(index, 1);

    if (!saveCollections()) {
        collections.splice(index, 0, deletedCollection);
        return;
    }

    if (selectedCollectionId === collectionId) {
        closeCollection();
    }

    renderCollections();

    showMessage(`"${deletedCollection.name}" was deleted.`);
}


// Close the collection details panel.
function closeCollection() {
    selectedCollectionId = null;
    collectionDetails.hidden = true;
    collectionsListSection.hidden = false;
}


// Listen for form submissions.
collectionForm.addEventListener("submit", event => {
    event.preventDefault();

    createCollection(collectionNameInput.value);
});


// Listen for the close button.
closeCollectionButton.addEventListener("click", closeCollection);


// Render saved collections when the app starts.
renderCollections();
