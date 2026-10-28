# ✨ Maya Loom

### Weaving Wallpapers Into Your Desktop Reality

Maya Loom is a Windows desktop wallpaper application built with Electron and JavaScript. It allows users to explore wallpapers, search for images, save their favourites, organise wallpapers into collections, and apply wallpapers directly to their desktop.

## 🌌 About the Project

Maya Loom brings wallpaper discovery and personalisation together in one desktop application. Inspired by the idea of exploring different visual realities, it provides a simple interface for browsing beautiful images and creating a personalised desktop experience.

## 🚀 Features

- **Wallpaper Discovery:** Explore wallpapers from Unsplash.
- **Search Wallpapers:** Find wallpapers using search queries.
- **Category Browsing:** Explore wallpapers by categories such as space, nature, mountains, flowers, beaches, sunsets, and oceans.
- **Load More:** Load additional wallpapers when browsing.
- **Save Favourites:** Save and unsave wallpapers for quick access.
- **Custom Collections:** Create named collections and organise wallpapers.
- **Apply to Desktop:** Apply a selected wallpaper to the Windows desktop.
- **Photographer Credits:** Display image attribution for Unsplash photographers.

## 🛠️ Tech Stack

- **Electron** – Desktop application framework
- **HTML5** – Application structure
- **CSS3** – Styling and layout
- **JavaScript** – Application logic and interactivity
- **Unsplash API** – Wallpaper search and image data
- **Git and GitHub** – Version control and team collaboration
- **Node.js and npm** – Development environment and package management

## 💻 Getting Started

### Prerequisites

Install the following before running the project:

- Node.js and npm
- Git
- A Windows computer

### Installation

1. Clone the repository:

   ```bash
   git clone <YOUR_GITHUB_REPOSITORY_URL>
   ```

2. Open the project directory:

   ```bash
   cd <YOUR_PROJECT_FOLDER>
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Configure the Unsplash API credentials as required by the project.

5. Start the application:

   ```bash
   npm start
   ```

## 📁 Project Structure

The project contains the Electron main process, preload bridge, renderer-side interface, styling, and wallpaper collection functionality.

Typical files include:

- `main.js` – Electron main process and desktop integration
- `preload.js` – Secure communication bridge between the renderer and main process
- `index.html` – Application interface structure
- `script.js` – Wallpaper display, search, saving, and browsing logic
- `collections.js` – Collection creation and management
- `package.json` – Project metadata, dependencies, and scripts

*The exact file structure may vary depending on the latest project changes.*

## 👥 Team MayaLoom

Maya Loom is a collaborative project developed by a team of three members.

- **Member 1:** Wallpaper interface and visual design
- **Member 2:** Electron integration, desktop wallpaper functionality, and feature integration
- **Member 3:** Wallpaper collections and related functionality

## 🔮 Future Improvements

Potential improvements include:

- Scheduled wallpaper changes
- Additional wallpaper sources and categories
- Improved collection management
- Enhanced desktop personalisation
- Additional user interface animations and customisation options

## 🎯 Project Goal

Our goal is to create a simple, visually engaging desktop application that makes wallpaper discovery, organisation, and personalisation convenient for Windows users.

---

**Built with creativity by Team MayaLoom 💜**
