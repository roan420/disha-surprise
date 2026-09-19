# A Special Plan for Disha ✨

A mobile-first, interactive 3D surprise invitation website designed for **Disha**. 

Combining a cinematic romantic atmosphere (dark rose-gold glassmorphism, floating 3D canvas particles, glowing orbs) with playful family/sibling banter, this experience walks Disha through a delightful date planning questionnaire that leads to an unforgettable reveal!

---

## 🌟 Features

* **3D Canvas Interactive Hero**: Shimmering stardust, floating romantic hearts, and an interactive 3D glass crystal orb that reacts smoothly to touch and mouse movement.
* **Playful Evasive "NO" Button**: When Disha tries to tap or hover over "NO 😏", it dodges with spring physics and displays hilarious quips (*"Nice try 😏"*, *"Hmm… that button seems shy 🙈"*, *"Running away won't help! 🏃‍♀️💨"*). On the 6th attempt, it happily surrenders into *"Fine, YES! 🥰"*.
* **Custom 3D Vector Fruit Cards**: Interactive 3D tilt cards for Strawberry, Mango, Watermelon, Apple, Orange, and Grapes with zero external asset dependencies.
* **Cinematic Destination Selector**: Sunset Beach, Botanical Nature Reserve, Wonderland Theme Park, Artisan Glasshouse Cafe, VIP Cinema Lounge, and Skyline Rooftop Evening.
* **Custom Calendar & Quick Presets**: Pick *"This Saturday"*, *"This Sunday"*, *"Next Saturday"*, or select any upcoming date on the custom glass calendar (includes native date picker fallback).
* **Atmospheric Time Slots**: Morning Breeze (10 AM), Sunny Lunch (1 PM), Golden Hour Glow (4 PM), and Starlit Evening (7 PM).
* **Grand Congratulations Modal**: Confetti fireworks, floating hearts, and a golden VIP itinerary ticket detailing her exact choices.
* **The Grand Bhaiya Reveal**: Playful prank reveal (*"YOU JUST ACCEPTED A DATE PLAN WITH MY BHAIYA 😂❤️"*), *"Mission accomplished 🎯"*, and a 1-tap **"Send Plan to Bhaiya on WhatsApp 💬"** button.
* **Zero External Dependencies Procedural Audio Engine**: Web Audio API synthesized chimes, pops, and fanfares with an explicit mute/unmute toggle.
* **Mobile-First & Ultra-Responsive**: Designed specifically for sharing via WhatsApp; zero horizontal scrolling, fast 60fps animations, 100dvh mobile safe area padding.

---

## 🚀 Getting Started

### 1. Installation

Clone or download the repository, then install dependencies:

```bash
npm install
```

### 2. Run Locally in Development

Start the local Vite development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production

Compile the optimized static bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🚢 Deploying to Vercel

The application is completely static and client-side (no backend, database, or API keys required), making it 100% Vercel-ready.

### Method A: Deploy via GitHub (Recommended)

1. **Initialize Git repository (if not already done)**:
   ```bash
   git init
   git add .
   git commit -m "feat: A Special Plan for Disha interactive surprise website"
   ```

2. **Push to GitHub**:
   - Create a new repository on [GitHub](https://github.com/new).
   - Link and push your branch:
     ```bash
     git remote add origin https://github.com/<your-username>/<your-repo-name>.git
     git branch -M main
     git push -u origin main
     ```

3. **Deploy on Vercel**:
   - Go to [Vercel](https://vercel.com) and log in.
   - Click **"Add New..."** → **"Project"**.
   - Select your GitHub repository and click **Import**.
   - Framework Preset: **Vite** (detected automatically).
   - Build Command: `npm run build`.
   - Output Directory: `dist`.
   - Click **Deploy**.

Within 30 seconds, Vercel will generate your live HTTPS URL (e.g., `https://special-plan-disha.vercel.app`), ready to share on WhatsApp!

---

### Method B: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the simple CLI prompts to deploy directly from your terminal.

---

## 📱 WhatsApp Sharing

When shared via WhatsApp, the URL will display:
* **Title**: A Special Plan for Disha ✨
* **Description**: You have received an exclusive secret invitation... Tap to open ❤️

Disha can tap the link, enjoy the interactive surprises, and at the end, tap the **"Send Plan to Bhaiya on WhatsApp 💬"** button to reply with her confirmed date plan!
