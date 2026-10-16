# 🎂 Extraordinary Interactive Birthday Surprise Website

> A romantic, premium-quality digital birthday experience built with React, Vite, Canvas particles, Web Audio procedural ambient synthesis, and interactive surprises.

---

## ✨ Features Included

1. **Full-Screen Magical Welcome Curtain**:
   - Emotional greeting: *"Hey, Beautiful! ♡"*
   - Soft pulsing emblem, glowing CTA button: *"Open Your Little World ✨"*
   - Cinematic opening transition with bursting heart & rose petal confetti and audio chimes.

2. **Main Birthday Layout (Photos & Her Story)**:
   - **Left Column**: Prominent animated photo frame in an elegant Polaroid/scrapbook design with gentle floating physics, zoom hover, status badges, secondary floating Polaroids, and click-to-view fullscreen gallery lightbox.
   - **Right Column**: Emotional typography, dynamic typewriter rotating sweet compliments, heartfelt narrative tribute, and interactive reason cards that reveal deeper compliments on click.

3. **Surprise One — Personal Birthday Letter 💌**:
   - 3D-styled animated envelope with a deep crimson wax seal and heart emblem.
   - Flap unfold animation revealing an authentic parchment letter with serif typography, date badge, and handwritten signature.
   - Includes a "Fold Letter" replay button.

4. **Surprise Two — "Little Things That Make You, YOU ♡" ✨**:
   - 6 interactive glassmorphic compliment cards with smooth reveal states.
   - Plus a **Secret Locked Card** that unlocks a special heartfelt tribute upon tap.

5. **Surprise Three — The Interactive Birthday Cake 🎂**:
   - Multi-tier illustrated birthday cake with flickering candle flames.
   - Extinguish candles individually by tapping their flames, or blow them all out using the interactive *"Blow Out the Candles 🕯️💨"* button.
   - Extinguishing triggers celebratory confetti bursts, celebratory chimes, and reveals a heartwarming star wish. Includes a *"Make Another Wish ✨"* relight button.

6. **Surprise Four — Her Photo Memories Gallery 📸**:
   - Curated Polaroid memory grid with washi tape, authentic rotations, and tags (*Adventure*, *Memories*, *Joy*, etc.).
   - Fullscreen lightbox viewer with keyboard arrows (← / →), close button, and an interactive heart counter for each picture.

7. **Surprise Five — The Hidden Gift 🎁**:
   - Glowing isometric gift box wrapped in magenta velvet with golden ribbon and bow.
   - Unties ribbon and lifts lid upon tap, triggering a golden firework confetti burst.
   - Reveals a personalized *"Lifetime VIP Birthday Pass"* voucher with redeemable perks (coffee, venting hotline, favorite comfort food, hugs) and optional personal video player.

8. **Surprise Six — "If I Could Wish One Thing for You..." ✨**:
   - 4 sincere, affectionate pillars of wishes: *Unshakable Confidence*, *Gentle Peace of Mind*, *People Who Protect Your Energy*, and *Adventures That Take Your Breath Away*.

9. **Interactive Audio System 🎵**:
   - Built-in zero-dependency procedural romantic ambient piano & chime synthesizer (Web Audio API) that plays soothing melodies right out of the box.
   - Supports custom MP3 background music (`public/music/`).
   - Floating music pill with Play/Pause, Mute/Unmute, and live animated soundwave equalizer.
   - Subtle interactive sound effects for opening the letter, blowing candles, and unwrapping gifts.

10. **Delicate Atmospheric Effects 🌸**:
    - Floating rose petals, golden sparkles, and soft bokeh drifting across the screen with gentle cursor wind sway.
    - Click particle effect: spawns floating hearts at any tap/click position.

---

## 🚀 How to Run Locally

### 1. Install dependencies
```bash
cd birthday-surprise
npm install --legacy-peer-deps
```

### 2. Start the local development server
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser.

---

## 🎨 How to Personalize Everything (In 3 Minutes!)

All text, names, dates, photos, and settings are centralized in:
📂 **`src/config/birthdayData.js`**

### 1. Edit Her Name & Birthday Details
Open `src/config/birthdayData.js` and change:
```javascript
recipient: {
  name: "Sophia",           // Her real name
  nickname: "Soph ♡",       // Her cute nickname
  relationship: "My Favourite Person",
  birthDate: "October 24",  // Her birthday
}
```

### 2. Add Her Real Photos
1. Put her pictures in `public/images/`:
   - `portrait-main.jpg` for the main hero frame.
   - `photo-1.jpg` to `photo-6.jpg` for the memories gallery.
2. In `src/config/birthdayData.js`, update the image paths:
```javascript
mainPhoto: {
  src: "/images/portrait-main.jpg",
  caption: "Her favorite smile ✨",
  ...
}
```

### 3. Add Her Favorite Song
1. Put an MP3 file into `public/music/` (e.g. `favorite-song.mp3`).
2. In `src/config/birthdayData.js`, set:
```javascript
music: {
  audioSrc: "/music/favorite-song.mp3",
  title: "Song Title",
  artist: "Artist Name"
}
```
*(If you leave `audioSrc: ""`, the site automatically plays the relaxing built-in ambient piano!)*

### 4. Edit The Letter & Wishes
Modify the paragraphs in `birthdayData.letter.paragraphs` with your own heartfelt words.

---

## 🌐 How to Deploy and Send the Link to Her

You can deploy this website for free in under 2 minutes:

### Option A: Deploy on Vercel (Easiest)
1. Push the project to GitHub (or install Vercel CLI: `npm i -g vercel`).
2. Run:
   ```bash
   npx vercel
   ```
3. Follow the quick prompts to get a live URL (e.g. `https://happy-birthday-sophia.vercel.app`).
4. Send her the link on her birthday!

### Option B: Deploy on Netlify
1. Run `npm run build`.
2. Drag and drop the `dist/` folder into [app.netlify.com/drop](https://app.netlify.com/drop).
3. Get an instant live shareable link!

### Option C: GitHub Pages
1. In `vite.config.js`, set `base: '/<repo-name>/'`.
2. Run `npm run build` and publish the `dist/` branch with `gh-pages`.
