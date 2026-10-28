/* ============================================
   MAYA LOOM - script.js
   ============================================ */


// ============================================
// WALLPAPER DATA (loaded from Unsplash)
// ============================================

// Photos currently shown on screen.
let wallpapers = [];

// Every photo we have seen or remembered.
// renderer.js (collections) looks photos up in this list.
const knownPhotos = [];

const COLLECTION_PHOTOS_KEY = "mayaLoom.collectionPhotos.v1";

// Maps each category button to an Unsplash search term.
const CATEGORY_QUERIES = {
    all: "",
    space: "space",
    moon: "moon",
    nature: "nature",
    mountains: "mountains",
    flower: "flower",
    beach: "beach",
    sunset: "golden sunset",
    ocean: "deep ocean",
    rain: "rainfall"
};

// Add a photo to knownPhotos if it is not already there.
function addKnown(photo) {
    const key = getWallpaperKey(photo);

    if (!knownPhotos.some((p) => getWallpaperKey(p) === key)) {
        knownPhotos.push(photo);
    }
}

// Store the full photo data when it is added to a collection.
// Collections only save IDs, and search results change often,
// so without this the photo would disappear from the collection.
function rememberPhoto(photo) {
    try {
        const list = JSON.parse(
            localStorage.getItem(COLLECTION_PHOTOS_KEY) || "[]"
        );
        const key = getWallpaperKey(photo);

        if (!list.some((p) => getWallpaperKey(p) === key)) {
            list.push(photo);
            localStorage.setItem(COLLECTION_PHOTOS_KEY, JSON.stringify(list));
        }
    } catch (error) {
        console.error("Could not remember photo:", error);
    }

    addKnown(photo);
}

// Load remembered collection photos when the app starts.
function loadRememberedPhotos() {
    try {
        const list = JSON.parse(
            localStorage.getItem(COLLECTION_PHOTOS_KEY) || "[]"
        );

        if (Array.isArray(list)) {
            list.forEach(addKnown);
        }
    } catch (error) {
        console.error("Could not load remembered photos:", error);
    }
}


// ============================================
// SAVED WALLPAPERS
// ============================================

const SAVED_STORAGE_KEY = "mayaLoom.savedWallpapers.v1";

let savedWallpapers = loadSavedWallpapers();

function loadSavedWallpapers() {
    try {
        const saved = localStorage.getItem(SAVED_STORAGE_KEY);
        const parsed = saved ? JSON.parse(saved) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error("Could not load saved wallpapers:", error);
        return [];
    }
}

function persistSavedWallpapers() {
    try {
        localStorage.setItem(
            SAVED_STORAGE_KEY,
            JSON.stringify(savedWallpapers)
        );
    } catch (error) {
        console.error("Could not save wallpapers:", error);
    }
}


// ============================================
// DOM ELEMENTS
// ============================================

const wallpaperContainer = document.getElementById("wallpaperContainer");
const searchInput = document.getElementById("searchInput");
const heading = document.getElementById("heading");
const intro = document.getElementById("intro");


// ============================================
// IDENTIFY WALLPAPERS
// ============================================

// Unsplash photo IDs are the best unique key.
// The fallbacks keep older saved data working.
function getWallpaperKey(wallpaper) {
    return (
        wallpaper.id ||
        wallpaper.image ||
        wallpaper.url ||
        wallpaper.src ||
        wallpaper.name
    );
}


// ============================================
// WALLPAPER DISPLAY
// ============================================

function displayWallpapers(list) {
    if (!wallpaperContainer) return;

    wallpaperContainer.innerHTML = "";

    if (!list || list.length === 0) {
        wallpaperContainer.innerHTML = `
            <p class="empty-message">
                No wallpapers found. Try another search!
            </p>
        `;
        return;
    }

    list.forEach((wallpaper) => {
        const card = document.createElement("div");
        card.className = "wallpaper-card";
        card.style.display = "flex";
        card.style.flexDirection = "column";
        card.style.cursor = "pointer";

        // Clicking a card highlights it and marks it as selected.
        card.addEventListener("click", () => {
            document.querySelectorAll(".wallpaper-card").forEach((item) => {
                item.style.border = "";
            });

            card.style.border = "3px solid violet";
            window.selectedWallpaper = wallpaper;
        });

        // ----- Image -----
        const image = document.createElement("img");

        image.src =
            wallpaper.image ||
            wallpaper.url ||
            wallpaper.src ||
            "";

        image.alt = wallpaper.name || "Wallpaper";
        image.loading = "lazy";
        image.addEventListener("error", () => {
            console.error("Failed to load wallpaper:", image.src);
        });

        // ----- Title -----
        const title = document.createElement("h3");
        title.textContent = wallpaper.name || "Untitled Wallpaper";

        // ----- Photographer credit (required by Unsplash) -----
        let credit = null;

        if (wallpaper.photographer) {
            credit = document.createElement("p");
            credit.className = "photo-credit";
            credit.append("Photo by ");

            const creditLink = document.createElement("a");
            creditLink.href = wallpaper.photographerUrl || "#";
            creditLink.target = "_blank";
            creditLink.rel = "noopener noreferrer";
            creditLink.textContent = wallpaper.photographer;
            creditLink.addEventListener("click", (event) => {
                event.stopPropagation();
            });

            credit.append(creditLink, " on Unsplash");
        }

        // ----- Save button -----
        const saveButton = document.createElement("button");

        const alreadySaved = savedWallpapers.some(
            (saved) => getWallpaperKey(saved) === getWallpaperKey(wallpaper)
        );

        saveButton.textContent = alreadySaved ? "♥ Saved" : "♡ Save";

        saveButton.addEventListener("click", (event) => {
            event.stopPropagation();
            saveWallpaper(wallpaper);
        });

        // ----- Add to Collection button -----
        const collectionButton = document.createElement("button");
        collectionButton.textContent = "+ Add to Collection";

        collectionButton.addEventListener("click", (event) => {
            event.stopPropagation();
            rememberPhoto(wallpaper);
            window.addWallpaperToCollection(wallpaper);
        });

        // ----- Apply to Desktop button -----
        const applyButton = document.createElement("button");
        applyButton.textContent = "Apply to Desktop";

        applyButton.addEventListener("click", async (event) => {
            event.stopPropagation();

            try {
                if (!window.api) {
                    showWallpaperToast("App bridge not found (check preload.js).", "error");
                    return;
                }

                // Use the full-size image when available.
                const imagePath = wallpaper.full || wallpaper.image;

                if (!imagePath) {
                    showWallpaperToast("Wallpaper image not found.", "error");
                    return;
                }

                showWallpaperToast("Applying your wallpaper...", "loading");

                const result = await window.api.applyWallpaper(imagePath);

                if (result && result.success === false) {
                    showWallpaperToast("Could not apply wallpaper.", "error");
                    return;
                }

                showWallpaperToast("Wallpaper applied successfully!", "success");

                // Unsplash asks apps to report when a photo is used.
                if (wallpaper.downloadLocation) {
                    window.api.unsplashTrackDownload(wallpaper.downloadLocation);
                }
            } catch (error) {
                console.error("Wallpaper error:", error);
                showWallpaperToast(
                    error.message || "Failed to apply wallpaper.",
                    "error"
                );
            }
        });

        // ----- Build the card -----
        const buttonContainer = document.createElement("div");
        buttonContainer.style.display = "flex";
        buttonContainer.style.gap = "8px";
        buttonContainer.style.marginTop = "10px";
        buttonContainer.append(saveButton, collectionButton, applyButton);

        card.appendChild(image);
        card.appendChild(title);
        if (credit) card.appendChild(credit);
        card.appendChild(buttonContainer);

        wallpaperContainer.appendChild(card);
    });
}


// ============================================
// SAVE / UNSAVE WALLPAPERS
// ============================================

function saveWallpaper(wallpaperOrName) {
    // Supports both saveWallpaper(wallpaperObject)
    // and the older saveWallpaper("Wallpaper Name") call.
    let wallpaper;

    if (typeof wallpaperOrName === "object") {
        wallpaper = wallpaperOrName;
    } else {
        wallpaper = wallpapers.find((item) => item.name === wallpaperOrName);
    }

    if (!wallpaper) {
        console.error("Wallpaper not found:", wallpaperOrName);
        return;
    }

    const key = getWallpaperKey(wallpaper);

    const existingIndex = savedWallpapers.findIndex(
        (saved) => getWallpaperKey(saved) === key
    );

    // Toggle: remove if already saved, otherwise add.
    if (existingIndex !== -1) {
        savedWallpapers.splice(existingIndex, 1);
    } else {
        savedWallpapers.push(wallpaper);
        addKnown(wallpaper);
    }

    persistSavedWallpapers();

    // Refresh whichever view is currently visible.
    if (currentView === "saved") {
        displayWallpapers(savedWallpapers);
    } else {
        displayWallpapers(getFilteredWallpapers());
    }
}


// ============================================
// SEARCH + CATEGORY (Unsplash)
// ============================================

let selectedCategory = "all";
let currentView = "home";
let latestRequestId = 0; // used to ignore outdated responses
let currentPage = 1;
let isLoadingMore = false;

// The API already filters the results, so just return them as they are.
function getFilteredWallpapers() {
    return wallpapers;
}

async function loadWallpapers() {
    if (!wallpaperContainer) return;

    const typed = searchInput ? searchInput.value.trim() : "";
    const query = typed || CATEGORY_QUERIES[selectedCategory] || "";

    currentView = "home";
    currentPage = 1;

    if (heading) {
        heading.textContent = typed
            ? `Results for "${typed}"`
            : selectedCategory === "all"
                ? "Top Wallpapers"
                : "Explore Wallpapers";
    }

    wallpaperContainer.innerHTML =
        '<p class="empty-message">Loading wallpapers...</p>';

    if (!window.api) {
        wallpaperContainer.innerHTML = "";
        showWallpaperToast(
            "App bridge not found (check preload.js).",
            "error"
        );
        return;
    }

    const requestId = ++latestRequestId;

    try {
        const photos = await window.api.unsplashSearch({
            query,
            category: selectedCategory,
            page: currentPage
        });

        if (requestId !== latestRequestId) return;

        wallpapers = Array.isArray(photos) ? photos : [];
        wallpapers.forEach(addKnown);

        displayWallpapers(wallpapers);
        addLoadMoreButton();
    } catch (error) {
        if (requestId !== latestRequestId) return;

        console.error("Unsplash error:", error);
        wallpaperContainer.innerHTML = "";

        showWallpaperToast(
            error.message || "Could not load wallpapers.",
            "error"
        );
    }
}
function addLoadMoreButton() {
    const oldButton = document.getElementById("loadMoreWallpapers");

    if (oldButton) oldButton.remove();

    const button = document.createElement("button");

    button.id = "loadMoreWallpapers";
    button.textContent = "✦ Load More Wallpapers";
    button.className = "load-more-button";

    button.style.display = "block";
    button.style.margin = "25px auto";
    button.style.padding = "12px 24px";
    button.style.cursor = "pointer";

    button.addEventListener("click", loadMoreWallpapers);

    wallpaperContainer.after(button);
}

async function loadMoreWallpapers() {
    if (isLoadingMore || !window.api) return;

    const button = document.getElementById("loadMoreWallpapers");

    isLoadingMore = true;

    if (button) {
        button.disabled = true;
        button.textContent = "Loading wallpapers...";
    }

    const requestId = latestRequestId;
    const nextPage = currentPage + 1;

    try {
        const typed = searchInput ? searchInput.value.trim() : "";
        const query = typed || CATEGORY_QUERIES[selectedCategory] || "";

        const photos = await window.api.unsplashSearch({
            query,
            category: selectedCategory,
            page: nextPage
        });

        if (requestId !== latestRequestId) return;

        if (!Array.isArray(photos) || photos.length === 0) {
            if (button) {
                button.textContent = "No More Wallpapers";
                button.disabled = true;
            }
            return;
        }

        const existingKeys = new Set(
            wallpapers.map(getWallpaperKey)
        );

        const newPhotos = photos.filter(
            photo => !existingKeys.has(getWallpaperKey(photo))
        );

        wallpapers = [...wallpapers, ...newPhotos];
        currentPage = nextPage;

        wallpapers.forEach(addKnown);
        if (currentView === "saved") {
    displayWallpapers(savedWallpapers);
} else {
    displayWallpapers(wallpapers);
}

        if (newPhotos.length === 0) {
            if (button) {
                button.textContent = "No New Wallpapers Found";
                button.disabled = true;
            }
        } else {
            addLoadMoreButton();
        }
    } catch (error) {
        console.error("Could not load more wallpapers:", error);

        if (button) {
            button.disabled = false;
            button.textContent = "Try Loading Again";
        }

        showWallpaperToast(
            error.message || "Could not load more wallpapers.",
            "error"
        );
    } finally {
        isLoadingMore = false;
    }
}
// Highlight the active category button.
function setActiveCategory() {
    document.querySelectorAll(".seg").forEach((button) => {
        // Read the key from the inline onclick, e.g. filterCategory('sunset'),
        // because labels like "Golden Sunset" differ from the key.
        const onclickMatch = (button.getAttribute("onclick") || "")
            .match(/filterCategory\('(.+?)'\)/);

        const fallback = (
            button.dataset.category ||
            button.dataset.filter ||
            button.textContent
        ).trim().toLowerCase();

        const key = onclickMatch ? onclickMatch[1] : fallback;

        button.classList.toggle("active", key === selectedCategory);
    });
}

// Search runs only on Enter or the Search button,
// not on every keystroke, to save Unsplash requests.
function searchWallpapers() {
    selectedCategory = "all";
    setActiveCategory();
    loadWallpapers();
}

function filterCategory(category) {
    selectedCategory = (category || "all").toLowerCase();

    if (searchInput) searchInput.value = "";

    setActiveCategory();
    loadWallpapers();
}

if (searchInput) {
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") searchWallpapers();
    });
}

// Make these available to inline HTML onclick handlers and renderer.js.
window.filterCategory = filterCategory;
window.searchWallpapers = searchWallpapers;
window.saveWallpaper = saveWallpaper;
window.wallpapers = knownPhotos;
window.getWallpaperKey = getWallpaperKey;


// ============================================
// HOME AND SAVED WALLPAPERS
// ============================================

function showHome() {
    currentView = "home";

    if (heading) {
        heading.textContent =
            selectedCategory === "all" && !(searchInput && searchInput.value.trim())
                ? "Top Wallpapers"
                : "Explore Wallpapers";
    }

    const homePage = document.getElementById("home-page");
    const wallpaperPage = document.getElementById("wallpaper-page");
    const collectionsPage = document.getElementById("collections-page");

    if (collectionsPage) {
        collectionsPage.hidden = true;
        collectionsPage.classList.add("hidden");
    }

    if (homePage) {
        homePage.hidden = false;
        homePage.classList.remove("hidden");
    }

    if (wallpaperPage) {
        wallpaperPage.hidden = false;
        wallpaperPage.classList.remove("hidden");
    }

    displayWallpapers(getFilteredWallpapers());
}

function showSaved() {
    currentView = "saved";

    if (heading) {
        heading.textContent = "Saved Wallpapers";
    }

    const homePage = document.getElementById("home-page");
    const wallpaperPage = document.getElementById("wallpaper-page");
    const collectionsPage = document.getElementById("collections-page");

    if (collectionsPage) {
        collectionsPage.hidden = true;
        collectionsPage.classList.add("hidden");
    }

    if (homePage) {
        homePage.hidden = false;
        homePage.classList.remove("hidden");
    }

    if (wallpaperPage) {
        wallpaperPage.hidden = false;
        wallpaperPage.classList.remove("hidden");
    }

    displayWallpapers(savedWallpapers);
}

window.showHome = showHome;
window.showSaved = showSaved;


// ============================================
// COLLECTIONS PAGE NAVIGATION
// ============================================

function showCollections() {
    const homePage = document.getElementById("home-page");
    const wallpaperPage = document.getElementById("wallpaper-page");
    const collectionsPage = document.getElementById("collections-page");

    if (homePage) {
        homePage.hidden = true;
        homePage.classList.add("hidden");
    }

    if (wallpaperPage) {
        wallpaperPage.hidden = true;
        wallpaperPage.classList.add("hidden");
    }

    if (collectionsPage) {
        collectionsPage.hidden = false;
        collectionsPage.classList.remove("hidden");
    }
}

window.showCollections = showCollections;


// ============================================
// INTRO ANIMATION
// ============================================

let introDone = false;

function closeIntro() {
    if (introDone || !intro) return;

    introDone = true;
    intro.classList.add("leave");

    setTimeout(() => {
        if (intro && intro.parentNode) {
            intro.remove();
        }
    }, 1000);
}

if (intro) {
    setTimeout(closeIntro, 11000);
    intro.addEventListener("click", closeIntro);
}


// ============================================
// RIPPLE EFFECT
// ============================================

document.addEventListener("click", (event) => {
    const target = event.target.closest("button");

    if (!target) return;

    const ripple = document.createElement("span");
    ripple.className = "ripple";

    const rect = target.getBoundingClientRect();

    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;

    target.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
});


// ============================================
// OPTIONAL SLIDING TABS
// ============================================

// This element may not exist in every version of the HTML,
// so check for it before attaching listeners.
const mainTabs = document.getElementById("mainTabs");

if (mainTabs) {
    mainTabs.querySelectorAll(".seg").forEach((button) => {
        button.addEventListener("click", () => {
            mainTabs.querySelectorAll(".seg").forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");
        });
    });
}


// ============================================
// WALLPAPER NOTIFICATION (TOAST)
// ============================================

function showWallpaperToast(message, type = "success") {
    const toast = document.getElementById("applyStatus");
    const icon = document.getElementById("toastIcon");
    const text = document.getElementById("toastMessage");

    if (!toast || !icon || !text) {
        console.error("Wallpaper notification elements not found.");
        return;
    }

    clearTimeout(window.wallpaperToastTimer);

    toast.classList.remove("show", "success", "error");
    icon.classList.remove("loading");

    text.textContent = message;

    if (type === "success") {
        icon.textContent = "✓";
        toast.classList.add("success");
    } else if (type === "error") {
        icon.textContent = "✕";
        toast.classList.add("error");
    } else {
        icon.textContent = "✦";
        icon.classList.add("loading");
    }

    toast.classList.add("show");

    // Loading messages stay until replaced; others hide after 3 seconds.
    if (type !== "loading") {
        window.wallpaperToastTimer = setTimeout(() => {
            toast.classList.remove("show", "success", "error");
            icon.classList.remove("loading");
        }, 3000);
    }
}


// ============================================
// START
// ============================================

loadRememberedPhotos();               // photos used in collections
savedWallpapers.forEach(addKnown);    // saved photos
loadWallpapers();                     // fetch the first batch from Unsplash