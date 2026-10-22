
document.getElementById("message").textContent =
  window.mayaAPI.getMessage();

document.getElementById("applyButton").addEventListener("click", async () => {
  const status = document.getElementById("status");
  status.textContent = "Applying wallpaper...";

  try {
    const result = await window.mayaAPI.applyWallpaper(
      "D:\\MayaLoom\\sample-wallpaper.jpeg"
    );

    status.textContent = result.message;
  } catch (error) {
    status.textContent = "Failed: " + error.message;
  }
});

