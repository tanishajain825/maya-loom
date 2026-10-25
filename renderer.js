const STORAGE_KEY = "mayaLoom.collections.v1";

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
function openCollection(collectionId) {
    const collection = collections.find(item => item.id === collectionId);

    if (!collection) {
        selectedCollectionId = null;
        collectionDetails.hidden = true;
        return;
    }

    selectedCollectionId = collectionId;

    collectionDetails.hidden = false;
    selectedCollectionName.textContent = collection.name;

    const count = collection.wallpaperIds.length;

    selectedCollectionCount.textContent =
        `${count} ${count === 1 ? "wallpaper" : "wallpapers"} in this collection`;

    collectionWallpapers.replaceChildren();

    const emptyState = document.createElement("p");
    emptyState.className = "empty-state";
    emptyState.textContent =
        "This collection is empty. Wallpaper integration is coming next.";

    collectionWallpapers.appendChild(emptyState);
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
