/* Step 1: Wallpaper data */

let wallpapers = [
    {
        name: "Cosmic Beauty",
        category: "space",
        image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=600&q=80"
    },
    {
        name: "Cosmic Beauty",
        category: "space",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM3nGmVTzxpO2c-E3u9rh1_0WFT2-Rw6qCdOc-qd7wVw&s=10"
    },
    {
        name: "Cosmic Beauty",
        category: "space",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7dTSPX9SOrZvQ7IDHervZfTb9jPPXKu8YL-IoArGapg&s=10"
    },
    {
        name: "Cosmic Beauty",
        category: "space",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9zl1_NqfGOgVhPMY54FxMMADhDDdSBcHDOlgB4jq35Q&s=10"
    },
    {
        name: "Cosmic Beauty",
        category: "space",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXTP0_zKx5M9InXYuVNvZXwSK8MAHWNbx4gY9m5bMfPg&s=10"
    },
    {
        name: "Cosmic Beauty",
        category: "space",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwyJmh2qZGYE6qnSmK-KrbwLaH10RlzM1gEwzKQoEeTCgeyY8rYrFKfiY&s=10"
    },
    {
        name: "Cosmic Beauty",
        category: "space",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7dTSPX9SOrZvQ7IDHervZfTb9jPPXKu8YL-IoArGapg&s=10"
    },
    {
        name: "Cosmic Beauty",
        category: "space",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVY4s2d17Sz8nwTemzCcFriHSLJsncf37VzVOqot6sBw&s=10"
    },
    {
        name: " Nature is bliss",
        category: "nature",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
    },
    {
        name: " Nature is bliss",
        category: "nature",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXm7IBS8ceoXrttgPYm-8nN4kR-WinkfgT8BBj_cTqNA&s=10"
    },
    {
        name: " Nature is bliss",
        category: "nature",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgguETy_9kZhPPuEmDUtgbKDjY4QRkVUQEALhuxJNOkA&s=10"
    },
    {
        name: " Nature is bliss",
        category: "nature",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1DmzeXGV27AZHRF5hEbtEa5AWwiGbhw1FFKcDSRHgUw&s=10"
    },
    {
        name: " Nature is bliss",
        category: "nature",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_HqQtGKE_Anx8D4ZazL3NyCaIqxUd5vwflmx5NHExNw&s=10"
    },
    {
        name: " Nature is bliss",
        category: "nature",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_pfuAcF5HWDKgHgeDvC8MBcpUg5N1Cz1GAAGZZH5inQ&s=10"
    },
    {
        name: " Nature is bliss",
        category: "nature",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHTeR6giIiFLtNSwda0ayseuN0b0MBQ1URpw0jgAkjZw&s=10"
    },
    {
        name: " Nature is bliss",
        category: "nature",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTejA9qrBkMwYnf5zYEGWmKkQSgH4iKSeTU8sXNzZiwGw&s=10"
    },
    {
        name: "mountain view",
        category: "mountains",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9-JISE3cjciF5deKUry9fNxTUmha-dyO5qlaSwY-vug&s=10"
    },
    {
        name: "mountain view",
        category: "mountains",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1fx1nh6PqZRY1j1bJwz-9wdd8PhCENRxPDvi8ikuP4A&s"
    },
    {
        name: "mountain view",
        category: "mountains",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0ZxQOv6Fjebu3VkeEtdKaBS4hkUozRdcMO1V-RuvxXg&s=10"
    },
    {
        name: "mountain view",
        category: "mountains",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd6GB52axN3V0j3pX-q1j1be3HV2caAQ6oRj0dH7gc-w&s=10"
    },
    { 
        name: "mountain view",
        category: "mountains",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf95GKxp-bYuHnEyd_3sSR21oAbE_l0AjFwxKGYQ0EUA&s=10"
    },
    {
          name: "mountain view",
        category: "mountains",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeUsHf186xeFNmE73AMLcqgV5xFGGCsEQgIYU5xHuBkQ&s=10"
    },
    {
        name: "mountain view",
        category: "mountains",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEw-7JxS1qsrkgdfDJe-RCUYQmGsolcDS4XBuNhSFhLg&s=10"
    },
    {
        name: "Moon and stars",
        category: "moon",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRB5w5qp4uUOXDVS4NgomPc_7fbniazs99r7G2nrdsCw&s=10"
    },
     {
        name: "Moon and stars",
        category: "moon",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUgKfu0pKX0LGvusWCg-z3zyk7stSjkteuTerEtnRKvA&s=10"
    },
    {
        name: "Moon and stars",
        category: "moon",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZK9JhzpJPjg4Hx41oaHR7oOehMKNrm5w48pRmnF0csw&s=10"
    },
    {
        name: "Moon and stars",
        category: "moon",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkrhf1dlTvCfLpCaqFrJnnl5TrqQqU_QX9fi1y570zdA&s=10"
    },
    {
        name: "Moon and stars",
        category: "moon",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAThwXFxqAGGyMNUSev8y6uHLP5Z1HnHRxnrkiMbhUdw&s=10"
    },
    {
        name: "Moon and stars",
        category: "moon",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ49SIBTcT6CH-k8vg8CHpp1q1lrBOw4FldXmS_8luV8w&s=10"
    },
    {
        name: "Moon and stars",
        category: "moon",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVpqJ3ZXV4fYRHQdwL-iju9D8JLNJEGFKnVUYdeSeOHg&s=10"
    },
    {
        name: "Moon and stars",
        category: "moon",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnhZhhjcIgqodeypkUsFRDWUE4AhiykkrE3mQsunU1Ow&s=10"
    },
    {
        name: "Flowers in bloom",
        category: "flower",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA2-DLihuj29d6AfybOogATDohmx1JKFhsol6boswIxw&s=10"
    },
    {
        name: "Flowers in bloom",
        category: "flower",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR52J711PoIgM8XOKX3oUllAVsTl-4CK69QfCO1wbo1lQ&s=10"
    },
    {
        name: "Flowers in bloom",
        category: "flower",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2RcO--eLwqcTMquJu6HQGkjx8IPZIJ3IOw4MTEl_uHw&s=10"
    },
    {
        name: "Flowers in bloom",
        category: "flower",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv0Z1McDbnPRj9Mhp6w5_2UwsZIGnDQq_tqil6i-g8yw&s=10"
    },
    {
        name: "Flowers in bloom",
        category: "flower",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqqAgctX4iPmf7jSPnTZD0exaITNGZdU8dLxMUMic1Tg&s=10"
    },
    {
        name: "Flowers in bloom",
        category: "flower",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLaVl3-CGRLP5KehF1jq3dcs16Oc7YAC6nmFj8aMzIvQ&s=10"
    },
    {
        name: "Flowers in bloom",
        category: "flower",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1_vOp0iv9D_QmyBp95_52gekamWBK4zdSKxRPjBUkiA&s=10"
    },
    {
        name: "Flowers in bloom",
        category: "flower",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ2vgibZs5mbzYaKv2Yzs-mI14DvmegoSZpiP0rL8HQA&s=10"
    },
];

/* Step 2: Saved wallpapers ki list */

let savedWallpapers = [];

/*slider view*/
document.querySelectorAll(".category-slider button")
    .forEach(button => {
        button.addEventListener("click", function () {
            document.querySelectorAll(".category-slider button")
                .forEach(btn => btn.classList.remove("active"));

            this.classList.add("active");
        });
    });


/* Step 3: Wallpapers screen par dikhana */

function displayWallpapers(list) {
    let container = document.getElementById("wallpaperContainer");

    // Purane cards remove karna
    container.innerHTML = "";

    // Har wallpaper ka card banana
    for (let i = 0; i < list.length; i++) {
        let wallpaper = list[i];

        container.innerHTML += `
            <div class="wallpaper-card">
                <img src="${wallpaper.image}" alt="${wallpaper.name}">
                <h3>${wallpaper.name}</h3>
                <button onclick="saveWallpaper('${wallpaper.name}')">
                    Save
                </button>
            </div>
        `;
    }

    if (list.length === 0) {
        container.innerHTML = "<p>No wallpapers found!</p>";
    }
}

/* Step 4: Wallpaper search karna */

function searchWallpapers() {
    let searchText = document
        .getElementById("searchInput")
        .value.toLowerCase();

    let result = wallpapers.filter(function(wallpaper) {
        return wallpaper.name.toLowerCase().includes(searchText);
    });

    displayWallpapers(result);
}

/* Step 5: Category ke according filter karna */

function filterCategory(category) {
    if (category === "all") {
        displayWallpapers(wallpapers);
    } else {
        let result = wallpapers.filter(function(wallpaper) {
            return wallpaper.category === category;
        });

        displayWallpapers(result);
    }
}

/* Step 6: Wallpaper save karna */

function saveWallpaper(name) {
    let wallpaper = wallpapers.find(function(item) {
        return item.name === name;
    });

    if (!wallpaper) {
        return;
    }

    let alreadySaved = savedWallpapers.some(function(item) {
        return item.name === name;
    });

    if (!alreadySaved) {
        savedWallpapers.push(wallpaper);
        alert("Wallpaper saved successfully!");
    } else {
        alert("Wallpaper is already saved!");
    }
}

/* Step 7: Saved wallpapers dikhana */

function showSaved() {
    document.getElementById("heading").innerText =
        "Saved Wallpapers";

    displayWallpapers(savedWallpapers);
}

/* Step 8: Home page par wapas jaana */

function showHome() {
    document.getElementById("heading").innerText =
        "Top Wallpapers";

    displayWallpapers(wallpapers);
}

/* Step 9: Page open hote hi wallpapers show karna */

displayWallpapers(wallpapers);
// ===== 2. INTRO: 6 second baad ya click par band =====
let introDone = false;

function closeIntro() {
  if (introDone) return;
  introDone = true;
  intro.classList.add('leave');
  setTimeout(() => intro.remove(), 1000);
}

setTimeout(closeIntro, 6000);
intro.addEventListener('click', closeIntro);

// ===== 3. RIPPLE: button par click karo to lehar niklegi =====
document.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);

  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.width = size + 'px';
  ripple.style.height = size + 'px';
  ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
  ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
});

// ===== 4. SLIDING SWITCH banana =====
function setupSliding(container, onChange) {
  const options = container.querySelectorAll('.seg');

  container.style.setProperty('--count', options.length);

  function select(index) {
    options.forEach((opt, i) => {
      opt.classList.toggle('active', i === index);
    });
    container.style.setProperty('--index', index);
  }

  options.forEach((opt, i) => {
    opt.addEventListener('click', () => {
      select(i);
      if (onChange) onChange(opt, i);
    });
  });

  select(0);
}

// Home / Saved Wallpapers
setupSliding(mainTabs, (opt, index) => {
  if (index === 0) {
    homeSection.classList.remove('hidden');
    savedSection.classList.add('hidden');
  } else {
    savedSection.classList.remove('hidden');
    homeSection.classList.add('hidden');
    showVaultImages();
  }
});
// B3: Computer se images chunna
ipcMain.handle('pick-local-images', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
    filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'webp', 'bmp'] }],
  });
  return result.canceled ? [] : result.filePaths;
});
