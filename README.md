<p align="center">
    <img 
    alt="Material New Tab Logo"
    height="128" 
    src="docs/images/logo.svg" 
    width="128" 
    />
</p>

<h1 align="center">Material New Tab</h1>

A modern, fluid, and highly customizable New Tab extension crafted strictly around the latest **Material Design guidelines (MD3E)**. It brings expressive typography, dynamic color generation, and smooth transitions directly into your daily browsing flow.

---

## Features

- **Dynamic Monet Theming:** Automatically extracts prominent color hexes from your background wallpapers using a fast average color canvas technique to dynamically tint the entire theme seamlessly.
- **M3 Expressive (MD3E):** Built completely upon the latest Material Design guidelines (MD3E), utilizing the full power of expressive motion tokens, container shapes, and responsive layout standards.
- **Variable Typography:** Native implementation of _[Google Sans Flex](https://fonts.google.com/specimen/Google+Sans+Flex/about)_ utilizing axis configuration controls (like width `"wdth"` and weight `"wght"`) for hyper-polished text scaling.
- **Dynamic Wallpapers:** Features an intelligent background system enabling daily random images sourced from [Lorem Picsum](https://picsum.photos/) with configurable refresh rates.
- **Custom Widgets & Navigation:**
    - **Scallop Clock:** A 12-sided abstract geometric clock reflecting fluid hour, minute, and second mechanics.
    - **Weather Widget:** Live geolocation-driven forecast integration powered by Open-Meteo.
    - **Google Apps Container:** A clean drawer component housing custom monochrome iconography representing all the Google apps.

---

## Download

<p>
    <a href="https://github.com/k4ustu3h/mnt/releases/latest">
        <img src="docs/images/badge-github.png" alt="Get it on GitHub" height="60" />
    </a>
     <a href="https://chromewebstore.google.com/detail/material-new-tab/oenppeijibmgkmefjjmpifpgokkdmann">
        <img src="docs/images/badge-chrome-webstore.png" alt="Get it on GitHub" height="60" />
    </a>
</p>

### Pre-release version with recent updates

[nightly.link](https://nightly.link/k4ustu3h/mnt/workflows/build_nightly/main/dist-nightly-artifact) • [GitHub](https://github.com/k4ustu3h/mnt/releases/tag/nightly)

---

## Manual installation

### Method 1: Install from GitHub Releases (Recommended)

The easiest way to install Material New Tab is by downloading the pre-compiled version directly from our releases page:

1. Download the latest `.zip` release file from the links provided in the **[Download](#download)** section above.
2. Extract the downloaded `.zip` file into a dedicated folder on your computer.
3. Open Google Chrome and type `chrome://extensions/` directly into the URL bar.
4. Toggle the **Developer mode** slider switch situated in the top-right corner of the interface.
5. Click the **Load unpacked** button located in the top left.
6. Select the folder where you extracted the extension files.

### Method 2: Build Locally

If you prefer to compile the extension from source, follow these steps to build and run it locally in developer mode:

1. **Clone the repository:**

```bash
git clone https://github.com/k4ustu3h/mnt.git

```

2. **Navigate into the project folder:**

```bash
cd mnt

```

3. **Install the required dependencies:**

```bash
npm i

```

4. **Compile the production application package:**

```bash
npm run build

```

5. **Load the Unpacked Extension into Google Chrome:**

- Open Google Chrome and type `chrome://extensions/` directly into the URL bar.
- Toggle the **Developer mode** slider switch situated in the top-right corner of the interface.
- Click the **Load unpacked** button located in the top left.
- Select the compiled `dist` folder located in the root directory of this project.

---

## Configuration & Architecture

This project is built using a modern decoupled component architecture:

- **`/src/components`**: Modular design sections split neatly into UI containers, weather trackers, clock faces, and settings toggles.
- **`/src/hooks`**: Custom state handling optimizations utilizing optimized browser local storage hooks to protect against layout re-render thrashing.
- **`manifest.json`**: Engineered safely to comply completely with Google Chrome Manifest V3 specifications (including Content Security Policy-friendly global keyframe animations).

---

## Credits

This project would not have been possible without the following incredible frameworks, tools, and visual asset repositories:

- **[M3E React](https://matraic.github.io/m3e)** - Beautiful and expressive Material Design 3 React framework implementations.
- **[Google Fonts Icons](https://fonts.google.com/icons)** - Exceptionally sharp, stateful Material Symbols icons.
- **[Simple Icons](https://simpleicons.org)** - Extensive index of clean, scalable SVG configurations for web and technology brands.
