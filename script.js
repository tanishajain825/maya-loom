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
        name: "Mountain view",
        category: "mountains",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9-JISE3cjciF5deKUry9fNxTUmha-dyO5qlaSwY-vug&s=10"
    },
    {
        name: "Mountain view",
        category: "mountains",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1fx1nh6PqZRY1j1bJwz-9wdd8PhCENRxPDvi8ikuP4A&s"
    },
    {
        name: "Mountain view",
        category: "mountains",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0ZxQOv6Fjebu3VkeEtdKaBS4hkUozRdcMO1V-RuvxXg&s=10"
    },
    {
        name: "Mountain view",
        category: "mountains",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd6GB52axN3V0j3pX-q1j1be3HV2caAQ6oRj0dH7gc-w&s=10"
    },
    {
        name: "Mountain view",
        category: "mountains",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf95GKxp-bYuHnEyd_3sSR21oAbE_l0AjFwxKGYQ0EUA&s=10"
    },
    {
        name: "Mountain view",
        category: "mountains",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeUsHf186xeFNmE73AMLcqgV5xFGGCsEQgIYU5xHuBkQ&s=10"
    },
    {
        name: "Mountain view",
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
    {
        name: "Ocean Dreams",
        category: "beach",
        image: "https://t4.ftcdn.net/jpg/10/09/70/43/360_F_1009704358_uqNIVY8XZMPMm50Lb1sS6vG3ofN8IVYI.jpg"
    },
    {
        name: "Ocean Dreams",
        category: "beach",
        image: "https://i.pinimg.com/736x/ff/b2/30/ffb230039e3f78b9dc3552299333092d.jpg"
    },
    {
        name: "Ocean Dreams",
        category: "beach",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvqHqxWZFCw3s88md__iXwGxcYTpfKRch__K-JLJf4uuqo_r0dm6I2FPo&s=10"
    },
    {
        name: "Ocean Dreams",
        category: "beach",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLOQXEUd27sNllBQrVGUrJfaIfB3Ff_R-GSoLPUhSMm6J6q6rJ39PUW3s&s=10"
    },
    {
        name: "Ocean Dreams",
        category: "beach",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
    },
    {
        name: "Ocean Dreams",
        category: "beach",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR10a5uvBByZ_fXllMKrc_8KPbWV6MIOmJ3wJFYB8EOAm-rFOUNfxIUZ9A&s=10"
    },
    {
        name: "Ocean Dreams",
        category: "beach",
        image: "https://cdn.pixabay.com/photo/2022/09/06/14/40/beach-7436794_640.jpg"
    },
    {
        name: "Ocean Dreams",
        category: "beach",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMHKZinbW6ukDKuPUhmLKlZFcYP9Z8d0u6WQX3cijmmob_NIWeW6PvWigp&s=10"
    },
    {
        name: "Ocean Dreams",
        category: "beach",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8AmLH0-WDaItF8CYxVZaE4bbHVDXKStEcPKdaXXyiXHRH59MvgBLpDU0&s=10"
    },
    {
        name: "Golden Sunset",
        category: "sunset",
        image: "https://images.pexels.com/photos/29833846/pexels-photo-29833846/free-photo-of-golden-sunset-over-serene-beach-landscape.jpeg?auto=compress&w=1260&h=750&dpr=1"
    },
    {
        name: "Golden Sunset",
        category: "sunset",
        image: "https://thumbs.dreamstime.com/b/sun-sets-over-field-daisies-sun-low-sky-casting-warm-golden-light-over-vast-field-filled-blooming-314113229.jpg"
    },
    {
        name: "Golden Sunset",
        category: "sunset",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEi1TcJ4GzLKS4tEJc8RyDHMC-1qX_Xa0NFku1bsI8he6JC2gn-pyzx13&s=10"
    },
    {
        name: "Golden Sunset",
        category: "sunset",
        image: "https://img.magnific.com/free-photo/fiery-sunset-mountain-peaks_23-2152014204.jpg?semt=ais_hybrid&w=740&q=80"
    }, 
    {
        name: "Golden Sunset",
        category: "sunset",
        image: "https://static.vecteezy.com/system/resources/thumbnails/039/072/739/small/sunset-sky-on-the-lake-photo.jpg"
    },
    {
        name: "Golden Sunset",
        category: "sunset",
        image: "https://png.pngtree.com/thumb_back/fh260/background/20251103/pngtree-a-breathtaking-golden-sunset-casting-warm-glow-over-endless-rows-of-image_20219189.webp"
    },
    {
        name: "Golden Sunset",
        category: "sunset",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRio_0pP6dGKpvXxkChbksF53BKXQN5vIg9rFketAcGv4S-bJMsGghkDG_s&s=10"
    },
    {
        name: "Golden Sunset",
        category: "sunset",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtSyR9vd93zIa9d5Ymwy_gPb4W5XBf4-Ukww0E6JwNZzMWY-6OOppxh7Ca&s=10"
    },
    {
        name: "Deep Blue Ocean",
        category: "ocean",
        image: "https://media.istockphoto.com/id/1179138818/photo/spinner-dolphins-underwater-in-blue-ocean.jpg?s=612x612&w=0&k=20&c=H9nPBihOfU2RZ59RTb3A-iQHlpXBcwgqlv-OsNhDr_w="
    },
    {
        name: "Deep Blue Ocean",
        category: "ocean",
        image: "https://www.pixelstalk.net/wp-content/uploads/image11/Deep-blue-sea-desktop-4K-wallpaper.jpg"
    },
    {
        name: "Deep Blue Ocean",
        category: "ocean",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTduj3thy7tXMtAG4xfstJagGT6_16rmOYkvDCEZTlP0FmzjmQlQRf6-vw&s=10"
    },
    {
        name: "Deep Blue Ocean",
        category: "ocean",
        image: "https://media.gettyimages.com/id/641983292/video/spotted-jellyfish.jpg?s=640x640&k=20&c=krnjqHHUwUQyeKiLFCa3X5_tnFwR5uLq0ZAaLqx6XUk="
    }, 
    {
        name: "Deep Blue Ocean",
        category: "ocean",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpVinUGTB5aaBOwTg8P6C-UEFihvMUgZ5JlCo8oceBE5qLvgYJ2NkQ3XNJ&s=10"
    },
    {
        name: "Deep Blue Ocean",
        category: "ocean",
        image: "https://i.pinimg.com/736x/af/d3/cf/afd3cfd14bbe4bad45bb64325e9c0fea.jpg"
    },
    {
        name: "Deep Blue Ocean",
        category: "ocean",
        image: "https://4kwallpapers.com/images/walls/thumbs_2t/9638.jpg"
    },
    {
        name: "Deep Blue Ocean",
        category: "ocean",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPZrBHLg4PpRILV6pvQjsGphF29Ys3BG9AQrqTuC8MkmIAlC5lZls92w4&s=10"
    },
    {
        name: "Deep Blue Ocean",
        category: "ocean",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi_gGIlm9xEYq9nhw5IxPUDz-ZptnwCMMkR17BYW4-UhTELpB3MkxAE7w&s=10"
    },
    {
        name: "Aesthetic Rainfall",
        category: "rain",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTPBWJJXCrEu5TJYBtsLGrEth_TPThr82qu4SAlOt7ABxgOOGIQhcAxwI&s=10"
    },
    {
        name: "Aesthetic Rainfall",
        category: "rain",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk5IcQtZPX4bMsMkFnyeZlgXetvPEb3qcAzHt11lPLeLR9q0A6n00poO0N&s=10"
    },
    {
        name: "Aesthetic Rainfall",
        category: "rain",
        image: "https://wallpaperaccess.com/full/134828.jpg"
    },
    {
        name: "Aesthetic Rainfall",
        category: "rain",
        image: "https://t4.ftcdn.net/jpg/08/39/31/27/360_F_839312720_5nyVKmkpovvGxA4r9oTl4D6zeLOFurWF.jpg"
    },
    {
        name: "Aesthetic Rainfall",
        category: "rain",
        image: "https://t3.ftcdn.net/jpg/07/68/44/46/360_F_768444677_UcbjPoC6HS5yEXyZjx0DwiJ2tAwL2flo.jpg"
    },
    {
        name: "Aesthetic Rainfall",
        category: "rain",
        image: "https://images7.alphacoders.com/345/345392.jpg"
    },
    {
        name: "Aesthetic Rainfall",
        category: "rain",
        image: "https://wallpaperaccess.com/full/2950467.jpg"
    },
    {
        name: "Aesthetic Rainfall",
        category: "rain",
        image: "https://i.pinimg.com/736x/c3/e2/00/c3e200c5dcd3ab8d07e93d24662fe1c6.jpg"
    },
    {
        name: "Aesthetic Rainfall",
        category: "rain",
        image: "https://png.pngtree.com/thumb_back/fh260/background/20240715/pngtree-a-rainy-day-with-flowers-and-an-umbrella-hard-image_15997921.jpg"
    },
    {
        name: "Aesthetic Rainfall",
        category: "rain",
        image: "https://t4.ftcdn.net/jpg/14/03/48/49/360_F_1403484970_QLsf1twjO6XHMUmxpk2guOQKb0Qec3DG.jpg"
    },
];



// ============================================
// SAVED WALLPAPERS
// ============================================

const SAVED_STORAGE_KEY = "mayaLoom.savedWallpapers.v1";

let savedWallpapers = loadSavedWallpapers();

function loadSavedWallpapers() {
    try {
        const saved = localStorage.getItem(SAVED_STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error("Could not load saved wallpapers:", error);
        return [];
    }
}

function persistSavedWallpapers() {
    localStorage.setItem(
        SAVED_STORAGE_KEY,
        JSON.stringify(savedWallpapers)
    );
}


// ============================================
// DOM ELEMENTS
// ============================================

const wallpaperContainer =
    document.getElementById("wallpaperContainer");

const searchInput =
    document.getElementById("searchInput");

const heading =
    document.getElementById("heading");

const intro =
    document.getElementById("intro");


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

card.addEventListener("click", () => {
    document.querySelectorAll(".wallpaper-card").forEach((item) => {
        item.style.border = "";
    });

    card.style.border = "3px solid violet";

    window.selectedWallpaper = wallpaper;
});

        const image = document.createElement("img");

        // Support common property names used for image URLs.
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

        const title = document.createElement("h3");
        title.textContent = wallpaper.name || "Untitled Wallpaper";

        const saveButton = document.createElement("button");

        const alreadySaved = savedWallpapers.some(
            (saved) => getWallpaperKey(saved) === getWallpaperKey(wallpaper)
        );

        saveButton.textContent = alreadySaved
            ? "♥ Saved"
            : "♡ Save";

        saveButton.addEventListener("click", () => {
            saveWallpaper(wallpaper);
        });
        const collectionButton = document.createElement("button");

        collectionButton.textContent = "+ Add to Collection";

        collectionButton.addEventListener("click", (event) => {
            event.stopPropagation();
            addWallpaperToCollection(wallpaper);
        });

        const applyButton = document.createElement("button");
        applyButton.textContent = "Apply to Desktop";

        applyButton.addEventListener("click", async (event) => {
            event.stopPropagation();

            try {
                showWallpaperToast("Applying your wallpaper...", "loading");

                const imagePath = wallpaper.image || wallpaper.url || wallpaper.src;

                if (!imagePath) {
                    showWallpaperToast("Wallpaper image not found.", "error");
                    return;
                }

                const result = await window.mayaAPI.applyWallpaper(imagePath);

                console.log("Wallpaper API result:", result);

                if (result && result.success === false) {
                    showWallpaperToast("Could not apply wallpaper.", "error");
                } else {
                    showWallpaperToast("Wallpaper applied successfully!", "success");
                }
            } catch (error) {
                console.error("Wallpaper error:", error);
                showWallpaperToast("Failed to apply wallpaper.", "error");
            }
        });

        card.appendChild(image);
        card.appendChild(title);

        const buttonContainer = document.createElement("div");
        buttonContainer.style.display = "flex";
        buttonContainer.style.gap = "8px";
        buttonContainer.style.marginTop = "10px";

        buttonContainer.appendChild(saveButton);
        buttonContainer.appendChild(collectionButton);
        buttonContainer.appendChild(applyButton);

        card.appendChild(buttonContainer);

        wallpaperContainer.appendChild(card);
    });
}


// ============================================
// IDENTIFY WALLPAPERS
// ============================================

// Use the image URL as the identifier where possible.
// This prevents wallpapers with the same name from
// being treated as the same wallpaper.

function getWallpaperKey(wallpaper) {
    return (
        wallpaper.image ||
        wallpaper.url ||
        wallpaper.src ||
        wallpaper.name
    );
}


// ============================================
// SAVE / UNSAVE WALLPAPERS
// ============================================

function saveWallpaper(wallpaperOrName) {
    // Support both saveWallpaper(wallpaperObject)
    // and the older saveWallpaper("Wallpaper Name") call.

    let wallpaper;

    if (typeof wallpaperOrName === "object") {
        wallpaper = wallpaperOrName;
    } else {
        wallpaper = wallpapers.find(
            (item) => item.name === wallpaperOrName
        );
    }

    if (!wallpaper) {
        console.error("Wallpaper not found:", wallpaperOrName);
        return;
    }

    const key = getWallpaperKey(wallpaper);

    const existingIndex = savedWallpapers.findIndex(
        (saved) => getWallpaperKey(saved) === key
    );

    if (existingIndex !== -1) {
        savedWallpapers.splice(existingIndex, 1);
    } else {
        savedWallpapers.push(wallpaper);
    }

    persistSavedWallpapers();

    // Refresh whichever wallpaper view is currently visible.
    if (currentView === "saved") {
        displayWallpapers(savedWallpapers);
    } else {
        displayWallpapers(getFilteredWallpapers());
    }
}


// ============================================
// SEARCH WALLPAPERS
// ============================================

let selectedCategory = "all";
let currentView = "home";

function getFilteredWallpapers() {
    const query = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

    return wallpapers.filter((wallpaper) => {
        const matchesSearch =
            (wallpaper.name || "").toLowerCase().includes(query);

        const category =
            (wallpaper.category || "").toLowerCase();

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        return matchesSearch && matchesCategory;
    });
}

function searchWallpapers() {
    currentView = "home";
    displayWallpapers(getFilteredWallpapers());
}

if (searchInput) {
    searchInput.addEventListener("input", searchWallpapers);
}


// ============================================
// CATEGORY FILTERS
// ============================================

function filterCategory(category) {
    selectedCategory = (category || "all").toLowerCase();
    currentView = "home";

    // Update the active category button.
    document.querySelectorAll(".seg").forEach((button) => {
        const buttonCategory = (
            button.dataset.category ||
            button.dataset.filter ||
            button.textContent
        ).trim().toLowerCase();

        button.classList.toggle(
            "active",
            buttonCategory === selectedCategory ||
            (
                selectedCategory === "all" &&
                buttonCategory === "all"
            )
        );
    });

    displayWallpapers(getFilteredWallpapers());
}


// Make these functions available to inline HTML onclick handlers.
window.filterCategory = filterCategory;
window.searchWallpapers = searchWallpapers;
window.saveWallpaper = saveWallpaper;
window.wallpapers = wallpapers;
window.getWallpaperKey = getWallpaperKey;

// Connect category buttons without requiring inline onclick.
document.querySelectorAll(".seg").forEach((button) => {
    button.addEventListener("click", () => {
        // The inline onclick handler already calls filterCategory().
        // Do not call it a second time using the button's display text.
    });
});

// ============================================
// HOME AND SAVED WALLPAPERS
// ============================================

function showHome() {
    currentView = "home";

    if (heading) {
        heading.textContent = "Explore Wallpapers";
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

    const collectionsPage = document.getElementById("collections-page");
    const homePage = document.getElementById("home-page");
    const wallpaperPage = document.getElementById("wallpaper-page");

    if (collectionsPage) {
        collectionsPage.hidden = true;
    }

    if (homePage) {
        homePage.hidden = false;
    }

    if (wallpaperPage) {
        wallpaperPage.hidden = false;
    }

    displayWallpapers(savedWallpapers);
}


// Make navigation functions available to HTML.
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

// These elements may not exist in every version of the HTML.
// Check for them before attaching event listeners.

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

console.log("Beach wallpapers:",
    wallpapers.filter(w => w.category === "beach")
);

console.log("Rainfall wallpapers:",
    wallpapers.filter(w => w.category === "rain")
);

console.log("Ocean wallpapers:",
    wallpapers.filter(w => w.category === "ocean")
);

console.log("Sunset wallpapers:",
    wallpapers.filter(w => w.category === "sunset")
);
// ============================================
// INITIALIZE THE GALLERY
// ============================================

// Display wallpapers when the page loads.
// This assumes your original wallpapers array is defined above.

if (typeof wallpapers !== "undefined") {
    displayWallpapers(getFilteredWallpapers());
}
// ============================================
// MAYA LOOM WALLPAPER NOTIFICATION
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

    if (type !== "loading") {
        window.wallpaperToastTimer = setTimeout(() => {
            toast.classList.remove("show", "success", "error");
            icon.classList.remove("loading");
        }, 3000);
    }
}