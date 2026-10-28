const categories = ["all", "nature", "space", "city", "abstract", "dark"];
const state = { query: "", category: "all", page: 1 };

const SAVED_KEY = "mayaLoom.savedPhotos.v1";

const grid = document.getElementById("grid");
const statusEl = document.getElementById("status");
const moreBtn = document.getElementById("more");
const searchInput = document.getElementById("search");
const catsEl = document.getElementById("cats");

// ---------- Collections ke liye zaroori cheezein ----------
// Har photo ki unique ID
window.getWallpaperKey = (wallpaper) => wallpaper.id;

// Collection mein add ki gayi photos ka data save rehta hai
function loadSavedPhotos() {
  try {
    const data = JSON.parse(localStorage.getItem(SAVED_KEY) || "{}");
    return data && typeof data === "object" ? data : {};
  } catch {
    return {};
  }
}

function savePhoto(photo) {
  try {
    const saved = loadSavedPhotos();
    saved[photo.id] = photo;
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  } catch (err) {
    console.error("Could not save photo:", err);
  }
}

// collections.js isi list se photos dhundta hai
window.wallpapers = Object.values(loadSavedPhotos());

function mergeWallpapers(photos) {
  photos.forEach((p) => {
    if (!window.wallpapers.some((w) => w.id === p.id)) window.wallpapers.push(p);
  });
}

// ---------- Category buttons ----------
categories.forEach((cat) => {
  const btn = document.createElement("button");
  btn.className = "cat" + (cat === state.category ? " active" : "");
  btn.textContent = cat;
  btn.addEventListener("click", () => {
    state.category = cat;
    state.query = cat === "all" ? searchInput.value.trim() : cat;
    document.querySelectorAll(".cat").forEach((b) => b.classList.toggle("active", b === btn));
    loadPhotos(true);
  });
  catsEl.appendChild(btn);
});

// ---------- Search ----------
function doSearch() {
  state.query = searchInput.value.trim();
  state.category = "all";
  document.querySelectorAll(".cat").forEach((b) => b.classList.toggle("active", b.textContent === "all"));
  loadPhotos(true);
}
document.getElementById("searchBtn").addEventListener("click", doSearch);
searchInput.addEventListener("keydown", (e) => e.key === "Enter" && doSearch());

moreBtn.addEventListener("click", () => {
  state.page += 1;
  loadPhotos(false);
});

// ---------- Photos load karna ----------
async function loadPhotos(reset) {
  if (reset) {
    state.page = 1;
    grid.innerHTML = "";
  }
  statusEl.textContent = "Loading...";
  moreBtn.hidden = true;

  try {
    const photos = await window.api.unsplashSearch({
      query: state.query,
      category: state.category,
      page: state.page,
    });

    mergeWallpapers(photos);
    photos.forEach((photo) => grid.appendChild(createCard(photo)));
    statusEl.textContent = photos.length ? "" : "No photos found.";
    moreBtn.hidden = photos.length === 0;
  } catch (err) {
    statusEl.textContent = err.message;
  }
}

// ---------- Ek card banana ----------
function createCard(photo) {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = photo.image;
  img.alt = photo.name;
  img.loading = "lazy";

  const info = document.createElement("div");
  info.className = "info";

  const title = document.createElement("div");
  title.textContent = photo.name;

  const credit = document.createElement("div");
  credit.append("Photo by ");
  const link = document.createElement("a");
  link.href = photo.photographerUrl;
  link.target = "_blank";
  link.textContent = photo.photographer;
  credit.append(link, " on Unsplash");

  const applyBtn = document.createElement("button");
  applyBtn.textContent = "Apply to Desktop";
  applyBtn.addEventListener("click", () => applyToDesktop(photo, applyBtn));

  const collectBtn = document.createElement("button");
  collectBtn.className = "cat";
  collectBtn.textContent = "Add to Collection";
  collectBtn.addEventListener("click", () => {
    savePhoto(photo);                     // photo ka data save karo
    window.addWallpaperToCollection(photo); // collections.js ka popup kholo
  });

  info.append(title, credit, applyBtn, collectBtn);
  card.append(img, info);
  return card;
}

// ---------- Wallpaper lagana ----------
async function applyToDesktop(photo, btn) {
  btn.disabled = true;
  btn.textContent = "Applying...";
  try {
    await window.api.applyWallpaper(photo.full);
    window.api.unsplashTrackDownload(photo.downloadLocation);
    btn.textContent = "Applied!";
  } catch (err) {
    statusEl.textContent = err.message;
  } finally {
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = "Apply to Desktop";
    }, 2000);
  }
}

loadPhotos(true);