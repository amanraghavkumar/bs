import confetti from 'canvas-confetti';

// Customized romantic palette
const ROMANTIC_COLORS = ['#fb7185', '#f472b6', '#e879f9', '#fbcfe8', '#fed7aa', '#f43f5e', '#fef08a'];

export const celebrateWithHearts = () => {
  try {
    // Left burst
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ROMANTIC_COLORS,
      shapes: ['circle'],
      scalar: 1.2,
    });

    // Right burst
    confetti({
      particleCount: 40,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ROMANTIC_COLORS,
      shapes: ['circle'],
      scalar: 1.2,
    });
  } catch (e) {
    console.log('Confetti burst', e);
  }
};

export const celebrateCandles = () => {
  try {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#fef08a', '#fbbf24', '#f472b6', '#fda4af', '#e879f9', '#ffffff'],
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  } catch (e) {
    console.log(e);
  }
};

export const celebrateGift = () => {
  try {
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ROMANTIC_COLORS,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ROMANTIC_COLORS,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } catch (e) {
    console.log(e);
  }
};
