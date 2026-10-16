/**
 * =========================================================================
 * 🎂 BIRTHDAY SURPRISE WEBSITE - CENTRAL CONFIGURATION FILE
 * =========================================================================
 * Easily personalize everything on this website by modifying the values below!
 * 
 * 📸 HOW TO ADD HER REAL PHOTOS:
 * 1. Place her photos in the `public/images/` folder (e.g. `portrait.jpg`, `photo1.jpg`, etc.)
 * 2. Update the paths below (e.g. change '/images/portrait-main.svg' to '/images/portrait.jpg')
 * 
 * 🌧️ PHOTO RAIN (तस्वीरों की बारिश):
 * A collection of photos falls gently like rain from top to bottom.
 * You can add as many photos as you want to `photoRain.photos`!
 * 
 * 🎵 HOW TO ADD CUSTOM MUSIC:
 * 1. Place her favorite song (mp3 file) in `public/music/` (e.g. `song.mp3`)
 * 2. Set `music.audioSrc: '/music/song.mp3'`
 * (If left empty, a beautiful romantic ambient piano synthesizer plays automatically!)
 * 
 * 🎬 HOW TO ADD A VIDEO (OPTIONAL):
 * 1. Place your video in `public/videos/birthday-video.mp4` or provide a video link
 * 2. Set `gift.videoUrl` to the path or leave empty for the golden keepsake card!
 * =========================================================================
 */

export const birthdayData = {
  // ── Personal Details ────────────────────────────────────────────────────
  recipient: {
    name: "Sophia",
    nickname: "Soph ♡",
    relationship: "My Favourite Person",
    birthDate: "Today",
    yearText: "Another Year More Wonderful",
  },

  // ── 1. Magical Welcome Screen ──────────────────────────────────────────
  welcome: {
    greeting: "Hey, Beautiful! ♡",
    subGreeting: "Today is not just another day...",
    message: "Someone truly extraordinary and deeply loved was born today.",
    buttonText: "Open Your Little World ✨",
    hintText: "Put on your headphones for the best experience 🎧",
  },

  // ── 2. Main Hero: Her Photos & Her Story ───────────────────────────────
  hero: {
    badge: "Happy Birthday ✨",
    heading: "Happy Birthday, My Favourite Person ♡",
    subheading: "To the girl who turns simple moments into golden memories and brings sunshine everywhere she goes.",
    
    // Rotating typewriter text under the title
    typedPhrases: [
      "You make the world softer just by being in it.",
      "Your smile is my favorite part of any day.",
      "Wishing you 365 days of laughter and pure joy.",
      "The most genuine, kind-hearted soul I know.",
    ],

    // Heartfelt narrative message
    narrative: `
      On this special day, I wanted to create a small corner of the internet that exists solely to celebrate you. 
      You carry an effortless grace, a kindness that touches everyone around you, and a smile that can instantly brighten even the gloomiest day.
      Today is a celebration of your laughter, your gentle strength, your quirky wonders, and every single thing that makes you so irreplaceably YOU.
    `,

    // Interactive mini compliment cards
    interactiveCards: [
      {
        id: "laugh",
        icon: "sparkles",
        label: "Your Laugh",
        detail: "It's contagious, warm, and easily the sweetest sound in the room.",
      },
      {
        id: "warmth",
        icon: "sun",
        label: "Your Warmth",
        detail: "You have an innate gift for making people feel comfortable and truly valued.",
      },
      {
        id: "strength",
        icon: "shield",
        label: "Your Grace",
        detail: "The quiet resilience and kindness you carry through everything you do.",
      },
      {
        id: "magic",
        icon: "heart",
        label: "Your Presence",
        detail: "Even just sitting in silence with you feels complete and peaceful.",
      },
    ],

    // Gallery Photos for the left column
    mainPhoto: {
      src: "/images/portrait-main.svg",
      alt: "Her beautiful portrait",
      caption: "That smile that brightens the whole world ✨",
      badge: "Birthday Star",
    },
    floatingPhotos: [
      {
        id: "fp-1",
        src: "/images/memory-1.svg",
        alt: "Golden moments",
        caption: "Golden hour glow",
        rotation: "-6deg",
      },
      {
        id: "fp-2",
        src: "/images/memory-2.svg",
        alt: "Cozy vibes",
        caption: "Cozy conversations",
        rotation: "5deg",
      },
      {
        id: "fp-3",
        src: "/images/memory-5.svg",
        alt: "Pure happiness",
        caption: "Unfiltered laughter",
        rotation: "-3deg",
      },
    ],
  },

  // ── 3. Photo Rain Collection (तस्वीरों की बारिश) 🌧️📸 ──────────────────
  photoRain: {
    enabled: true,
    density: "medium", // 'gentle', 'medium', 'abundant'
    photos: [
      {
        id: "pr-1",
        src: "/images/portrait-main.svg",
        title: "Birthday Star",
        caption: "Her radiant smile ✨",
      },
      {
        id: "pr-2",
        src: "/images/memory-1.svg",
        title: "Sunset Glow",
        caption: "Golden hour horizon with you",
      },
      {
        id: "pr-3",
        src: "/images/memory-2.svg",
        title: "Cozy Cafe",
        caption: "Hours flying by like minutes",
      },
      {
        id: "pr-4",
        src: "/images/memory-3.svg",
        title: "Starry Sky",
        caption: "The brightest star walks right beside me",
      },
      {
        id: "pr-5",
        src: "/images/memory-4.svg",
        title: "Wildflowers",
        caption: "Blooming with natural grace",
      },
      {
        id: "pr-6",
        src: "/images/memory-5.svg",
        title: "Sweet Laughter",
        caption: "Laughter that cures everything",
      },
      {
        id: "pr-7",
        src: "/images/memory-6.svg",
        title: "Ocean Breeze",
        caption: "Endless horizons and dreams",
      },
      {
        id: "pr-8",
        src: "/images/rain-1.svg",
        title: "Golden Smiles",
        caption: "Sparkles wherever you go ♡",
      },
      {
        id: "pr-9",
        src: "/images/rain-2.svg",
        title: "Pure Magic",
        caption: "Dreamy clouds & softest heart",
      },
      {
        id: "pr-10",
        src: "/images/rain-3.svg",
        title: "Blooming Joy",
        caption: "Gentle strength & blooming wonder",
      },
      {
        id: "pr-11",
        src: "/images/rain-4.svg",
        title: "Moonlight",
        caption: "Calm nights and warm thoughts",
      },
      {
        id: "pr-12",
        src: "/images/rain-5.svg",
        title: "Heart Balloons",
        caption: "Celebrating every bit of who you are",
      },
      {
        id: "pr-13",
        src: "/images/rain-6.svg",
        title: "Forever Cherished",
        caption: "Today and all days to come 💖",
      },
    ],
  },

  // ── 4. Surprise One: Personal Birthday Letter 💌 ──────────────────────
  letter: {
    sectionTitle: "Surprise One: A Personal Letter 💌",
    envelopePrompt: "There's something I wanted to tell you...",
    clickInstruction: "Click the wax seal to unfold your letter",
    date: "On Your Special Day",
    salutation: "Dear Sophia,",
    paragraphs: [
      "Sometimes life gets busy, and in the rush of everyday routines, we forget to pause and say the things that matter most. Today, on your birthday, I wanted to make sure you hear them loud and clear.",
      "Thank you for being someone so genuinely good at heart. You bring a warmth into ordinary conversations that is rare to find. Whether it's your spontaneous laugh, your thoughtful questions, or the way you light up when you talk about things you love—you make the world a better, more beautiful place just by existing in it.",
      "As you step into this new year of your life, I hope you never doubt your worth, your capabilities, or how deeply cherished you are. I hope this year surprises you with sweet opportunities, peaceful mornings, genuine friendships, and dreams falling gently into place.",
      "Celebrate yourself today without holding back. You deserve all the love, all the cake, and all the magic life has to offer.",
    ],
    closing: "With all my fondness, warmth, and deepest wishes,",
    signature: "Yours Always ♡",
  },

  // ── 5. Surprise Two: Things That Make You Special ✨ ───────────────────
  specialThings: {
    title: "Little Things That Make You, YOU ♡",
    subtitle: "A few of the countless reasons why having you around is a blessing. Tap each card to reveal.",
    cards: [
      {
        id: 1,
        title: "Your Radiant Smile",
        tag: "Pure Light",
        preview: "The way it lights up your entire face...",
        detail: "It is genuine, warm, and instantly lights up the whole room. It has this quiet power to turn anyone's difficult day around in a second.",
        icon: "smile",
        color: "from-pink-500/20 to-rose-500/20",
      },
      {
        id: 2,
        title: "Making Ordinary Days Special",
        tag: "Magic",
        preview: "A simple stroll or casual chat becomes a core memory...",
        detail: "You have a natural gift for infusing everyday routines with fun, depth, and laughter. With you, even waiting in a car or drinking a simple cup of coffee feels special.",
        icon: "sparkles",
        color: "from-purple-500/20 to-pink-500/20",
      },
      {
        id: 3,
        title: "Your Genuine Kindness",
        tag: "Golden Heart",
        preview: "How deeply and sincerely you care...",
        detail: "You listen with your whole heart and notice the little things that others miss. Your empathy and warmth are true superpowers.",
        icon: "heart",
        color: "from-rose-500/20 to-amber-500/20",
      },
      {
        id: 4,
        title: "Your Unapologetic Authenticity",
        tag: "One of a Kind",
        preview: "Never having to pretend around you...",
        detail: "You stay true to yourself, your values, and your quirky sense of humor. You give everyone around you permission to be their honest, comfortable selves too.",
        icon: "star",
        color: "from-fuchsia-500/20 to-purple-500/20",
      },
      {
        id: 5,
        title: "Your Quiet Resilience",
        tag: "Inner Strength",
        preview: "The graceful way you weather every storm...",
        detail: "Even when things are challenging, you handle life with poise, determination, and optimism. You are so much stronger than you ever give yourself credit for.",
        icon: "shield",
        color: "from-indigo-500/20 to-pink-500/20",
      },
      {
        id: 6,
        title: "The Comfort of Your Presence",
        tag: "Peace",
        preview: "A feeling of home no matter where we are...",
        detail: "There is an unspoken peace that comes with your company. You are a safe harbor, a trusted friend, and a steady, calming presence.",
        icon: "feather",
        color: "from-violet-500/20 to-rose-500/20",
      },
    ],
    // The Secret Card
    secretCard: {
      title: "A Secret Thought 🔒",
      tag: "Hidden Truth",
      lockedText: "Tap to unlock a little secret...",
      unlockedText: "Out of 8 billion people on this planet, there is truly no one with your specific combination of wit, kindness, and wonder. You are once in a lifetime.",
    },
  },

  // ── 6. Surprise Three: The Birthday Cake 🎂 ───────────────────────────
  cake: {
    title: "Make a Wish, Birthday Girl! 🎂",
    subtitle: "Every birthday needs a wish. Close your eyes, think of something you truly desire, and blow out the candles!",
    instructions: "Click individual flames or press the 'Blow Out Candles' button!",
    blownMessage: "✨ Your wish has been sent to the stars! ✨",
    wishNote: "May every heartfelt prayer and secret wish you whispered today find its quiet way to reality this year. Happy Birthday!",
  },

  // ── 7. Surprise Four: Her Photo Memories 📸 ───────────────────────────
  memories: {
    title: "Every Picture Has Its Own Little Story ♡",
    subtitle: "A visual timeline of sweet moments, quiet smiles, and beautiful chapters.",
    instruction: "Click any Polaroid to view in fullscreen gallery",
    photos: [
      {
        id: "mem-1",
        src: "/images/memory-1.svg",
        title: "Chasing Sunsets",
        date: "Golden Hour",
        caption: "When the sky matches the warmth in your eyes. Here's to chasing a thousand more horizons.",
        tag: "Adventure",
        rotation: "-2deg",
      },
      {
        id: "mem-2",
        src: "/images/memory-2.svg",
        title: "Cozy Coffee & Long Talks",
        date: "Sweet Moments",
        caption: "Warm cups, steam rising, and hours flying by like minutes because conversation with you never runs dry.",
        tag: "Memories",
        rotation: "3deg",
      },
      {
        id: "mem-3",
        src: "/images/memory-3.svg",
        title: "Under The Same Sky",
        date: "Starry Nights",
        caption: "Looking at the stars and knowing that the brightest one is right here walking the earth.",
        tag: "Magic",
        rotation: "-4deg",
      },
      {
        id: "mem-4",
        src: "/images/memory-4.svg",
        title: "Wildflower Joy",
        date: "Spring Days",
        caption: "A reminder that beauty blooms naturally and effortlessly—just like your sweet spirit.",
        tag: "Joy",
        rotation: "2deg",
      },
      {
        id: "mem-5",
        src: "/images/memory-5.svg",
        title: "The Laugh You Can Hear",
        date: "Pure Happiness",
        caption: "One of those photos where you can practically hear the joyful laughter bursting out of the frame.",
        tag: "Laughter",
        rotation: "-3deg",
      },
      {
        id: "mem-6",
        src: "/images/memory-6.svg",
        title: "Endless Horizons",
        date: "New Chapter",
        caption: "Standing by the sea, ready for all the wonderful adventures waiting in your brand-new year.",
        tag: "Future",
        rotation: "4deg",
      },
    ],
  },

  // ── 8. Surprise Five: The Hidden Gift 🎁 ──────────────────────────────
  gift: {
    title: "Wait... there's one more thing for you 🎁",
    subtitle: "A surprise wrapped with all my care. Untie the ribbon and see what's inside!",
    boxPrompt: "Tap the glowing present to unwrap it",
    unwrappedTitle: "A Token of Endless Appreciation ✨",
    unwrappedMessage: `
      You deserve the very best this world can offer. Along with this website, 
      here is your personal "Voucher of Infinite Good Vibes" redeemable whenever you need a cheer-up, 
      a warm coffee, an attentive ear, or a celebratory meal!
    `,
    perks: [
      "🎟️ Free coffee or bubble tea on demand (Anytime)",
      "🎧 Emergency venting session with zero judgment",
      "🍕 Your favorite comfort food delivered to your door",
      "🌟 A guaranteed reminder of how amazing you are whenever you forget",
    ],
    videoUrl: "", 
  },

  // ── 9. Surprise Six: A Personal Wish Just for Her ──────────────────────
  wishForYou: {
    enabled: true,
    title: "If I Could Wish One Thing for You...",
    subtitle: "A quiet prayer for the year ahead.",
    wishes: [
      {
        icon: "sun",
        heading: "Unshakable Confidence",
        text: "May you always remember how talented, smart, and capable you are, especially in moments of self-doubt.",
      },
      {
        icon: "heart",
        heading: "Gentle Peace of Mind",
        text: "May your heart find rest, your mind stay unburdened, and your days be filled with calm, serene mornings.",
      },
      {
        icon: "sparkles",
        heading: "People Who Protect Your Energy",
        text: "May you be surrounded only by souls who cherish your kindness, match your loyalty, and lift you higher.",
      },
      {
        icon: "compass",
        heading: "Adventures That Take Your Breath Away",
        text: "May this year guide you to new places, delicious foods, exciting milestones, and breathtaking views.",
      },
    ],
    closingMessage: "May the next 365 days be your most radiant and happiest chapter yet.",
  },

  // ── 10. Background Music Settings ─────────────────────────────────────
  music: {
    audioSrc: "",
    title: "A Soft Melody for You ♡",
    artist: "Romantic Ambient Lofi",
  },
};
