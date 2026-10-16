# 📸 How to replace photos with her actual pictures

1. Drop her real pictures into this folder (`public/images/`):
   - `portrait-main.jpg` (or `.png`): Main portrait used in the hero frame.
   - `photo-1.jpg`: Sunset / adventure photo.
   - `photo-2.jpg`: Cozy coffee / cafe photo.
   - `photo-3.jpg`: Starry night / celebration photo.
   - `photo-4.jpg`: Joyful flower / outdoor photo.
   - `photo-5.jpg`: Laughing candid photo.
   - `photo-6.jpg`: Seaside / vacation photo.

2. Open `src/config/birthdayData.js` and update the paths:
   ```javascript
   mainPhoto: {
     src: "/images/portrait-main.jpg",
     caption: "Her real caption here",
     ...
   }
   ```
   Or simply keep the filenames the same as specified in `src/config/birthdayData.js`!
