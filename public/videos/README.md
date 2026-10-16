# 🎬 How to add an optional birthday video

1. If you have recorded a short birthday video message for her, drop it here as `birthday-video.mp4` (or any web-compatible video format).
2. Open `src/config/birthdayData.js`.
3. Set:
   ```javascript
   gift: {
     ...
     videoUrl: "/videos/birthday-video.mp4",
   }
   ```
4. If no video is supplied (`videoUrl: ""`), the website automatically shows the elegant golden keepsake voucher with perks and sweet appreciation!
