# 🎵 How to add custom background music

1. Place an audio file (e.g. `song.mp3`, `acoustic.mp3`) in this folder (`public/music/`).
2. Open `src/config/birthdayData.js`.
3. Set:
   ```javascript
   music: {
     audioSrc: "/music/song.mp3",
     title: "Her Favorite Song",
     artist: "Artist Name"
   }
   ```
4. If `audioSrc` is left blank, the website automatically plays a gentle, romantic built-in harmonic ambient chime & piano synthesized directly in the browser!
