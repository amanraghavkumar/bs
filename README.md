# 🎂 Extraordinary Interactive Birthday Surprise Website

> A romantic, premium-quality digital birthday experience built with React, Vite, Canvas particles, Web Audio procedural ambient synthesis, and interactive surprises.

---

## ✨ Features Included

1. **Full-Screen Magical Welcome Curtain**:
   - Emotional greeting: *"Hey, Beautiful! ♡"*
   - Soft pulsing emblem, glowing CTA button: *"Open Your Little World ✨"*
   - Cinematic opening transition with bursting heart & rose petal confetti and audio chimes.

2. **🌧️ Magical Photo Rain (तस्वीरों की बारिश)**:
   - Photos continuously drift and fall gently from top to bottom across the screen like a dreamy, floating shower of memories.
   - Each falling picture is framed in a mini white Polaroid with washi tape and handwritten titles.
   - **Interactive:** Hovering over any falling photo pauses its fall and enlarges it with a rose-gold glow. Clicking any falling photo opens it in fullscreen in the Lightbox viewer!
   - **Controls:** Includes a toggle button in the top-left (`Photo Rain: ON 🌧️` / `OFF`) and a `+Shower Photos` button to shower extra photos anytime!

3. **📸 Main Birthday Layout (Photos & Her Story)**:
   - **Left Column**: Prominent animated photo frame in an elegant Polaroid/scrapbook design with gentle floating physics, zoom hover, status badges, secondary floating Polaroids, and click-to-view fullscreen gallery lightbox.
   - **Right Column**: Emotional typography, dynamic typewriter rotating sweet compliments, heartfelt narrative tribute, and interactive reason cards that reveal deeper compliments on click.

4. **💌 Surprise One — Personal Birthday Letter**:
   - 3D-styled animated envelope with a deep crimson wax seal and heart emblem.
   - Flap unfold animation revealing an authentic parchment letter with serif typography, date badge, and handwritten signature.
   - Includes a "Fold Letter" replay button.

5. **✨ Surprise Two — "Little Things That Make You, YOU ♡"**:
   - 6 interactive glassmorphic compliment cards with smooth reveal states.
   - Plus a **Secret Locked Card** that unlocks a special heartfelt tribute upon tap.

6. **🎂 Surprise Three — The Interactive Birthday Cake**:
   - Multi-tier illustrated birthday cake with flickering candle flames.
   - Extinguish candles individually by tapping their flames, or blow them all out using the interactive *"Blow Out the Candles 🕯️💨"* button.
   - Extinguishing triggers celebratory confetti bursts, celebratory chimes, and reveals a heartwarming star wish. Includes a *"Make Another Wish ✨"* relight button.

7. **📸 Surprise Four — Her Photo Memories Gallery**:
   - Curated Polaroid memory grid with washi tape, authentic rotations, and tags (*Adventure*, *Memories*, *Joy*, etc.).
   - Fullscreen lightbox viewer with keyboard arrows (← / →), close button, and an interactive heart counter for each picture.

8. **🎁 Surprise Five — The Hidden Gift**:
   - Glowing isometric gift box wrapped in magenta velvet with golden ribbon and bow.
   - Unties ribbon and lifts lid upon tap, triggering a golden firework confetti burst.
   - Reveals a personalized *"Lifetime VIP Birthday Pass"* voucher with redeemable perks (coffee, venting hotline, favorite comfort food, hugs) and optional personal video player.

9. **🌸 Surprise Six — "If I Could Wish One Thing for You..."**:
   - 4 sincere, affectionate pillars of wishes: *Unshakable Confidence*, *Gentle Peace of Mind*, *People Who Protect Your Energy*, and *Adventures That Take Your Breath Away*.

10. **🎵 Interactive Audio System**:
   - Built-in zero-dependency procedural romantic ambient piano & chime synthesizer (Web Audio API) that plays soothing melodies right out of the box.
   - Supports custom MP3 background music (`public/music/`).
   - Floating music pill with Play/Pause, Mute/Unmute, and live animated soundwave equalizer.
   - Subtle interactive sound effects for opening the letter, blowing candles, and unwrapping gifts.

11. **🍃 Delicate Atmospheric Effects**:
    - Floating rose petals, golden sparkles, and soft bokeh drifting across the screen with gentle cursor wind sway.
    - Click particle effect: spawns floating hearts at any tap/click position.

---

## 🎨 How to Personalize Photo Rain & Photos

In **`src/config/birthdayData.js`**:

```javascript
photoRain: {
  enabled: true,
  photos: [
    { id: "pr-1", src: "/images/portrait-main.jpg", title: "Birthday Star", caption: "Her radiant smile ✨" },
    { id: "pr-2", src: "/images/photo-1.jpg", title: "Sunset Glow", caption: "Golden hour horizon" },
    // Add as many pictures as you want here!
  ]
}
```
All photos will fall from top to bottom in a continuous, romantic cascade.
