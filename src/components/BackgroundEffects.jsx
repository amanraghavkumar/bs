import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function BackgroundEffects() {
  const canvasRef = useRef(null);
  const [clickHearts, setClickHearts] = useState([]);
  const [particlesEnabled, setParticlesEnabled] = useState(true);

  // Canvas floating petals & sparkles
  useEffect(() => {
    if (!particlesEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle types: Petals, Sparkles, and Soft Bokeh
    const particleCount = window.innerWidth < 768 ? 28 : 55;
    const particles = [];

    const colors = [
      'rgba(251, 113, 133, 0.45)', // Rose
      'rgba(244, 114, 182, 0.40)', // Pink
      'rgba(244, 63, 94, 0.35)',  // Rose 500
      'rgba(192, 132, 252, 0.30)', // Lavender
      'rgba(254, 240, 138, 0.50)', // Golden sparkle
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 9 + 4,
        speedY: Math.random() * 0.7 + 0.3,
        speedX: Math.random() * 0.4 - 0.2,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.01,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: i % 4 === 0 ? 'sparkle' : i % 5 === 0 ? 'bokeh' : 'petal',
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.swayPhase += p.swaySpeed;
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.swayPhase) * 0.6;
        p.rotation += p.rotationSpeed;

        // Gentle mouse avoidance breeze
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          p.x += (dx / dist) * force * 2;
          p.y += (dy / dist) * force * 2;
        }

        // Wrap around boundaries
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'petal') {
          // Romantic curved flower petal
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.moveTo(0, -p.size);
          ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.5, p.size * 0.8, p.size * 0.5, 0, p.size);
          ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.5, -p.size * 0.8, -p.size * 0.5, 0, -p.size);
          ctx.fill();
        } else if (p.type === 'sparkle') {
          // 4-point golden star sparkle
          ctx.fillStyle = p.color;
          const s = p.size * 0.6;
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.quadraticCurveTo(0, 0, s, 0);
          ctx.quadraticCurveTo(0, 0, 0, s);
          ctx.quadraticCurveTo(0, 0, -s, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s);
          ctx.fill();
        } else {
          // Soft glowing bokeh orb
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.arc(0, 0, p.size * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [particlesEnabled]);

  // Click hearts spawn effect
  useEffect(() => {
    const handleClick = (e) => {
      // Don't spawn if clicking controls or inputs
      if (e.target.closest('button, input, a, [role="button"]')) return;

      const newHeart = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 12 + 16,
        rotation: (Math.random() - 0.5) * 40,
        color: ['#fb7185', '#f472b6', '#e879f9', '#fbcfe8', '#f43f5e'][Math.floor(Math.random() * 5)],
      };

      setClickHearts((prev) => [...prev.slice(-12), newHeart]);

      setTimeout(() => {
        setClickHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {/* Background radial ambient glow orbs */}
      <div 
        aria-hidden="true" 
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: '-10%',
            left: '20%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(244,114,182,0.12) 0%, rgba(0,0,0,0) 70%)',
            filter: 'blur(60px)',
          }} 
        />
        <div 
          style={{
            position: 'absolute',
            top: '40%',
            right: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(192,132,252,0.10) 0%, rgba(0,0,0,0) 70%)',
            filter: 'blur(80px)',
          }} 
        />
        <div 
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '-5%',
            width: '550px',
            height: '550px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(251,113,133,0.12) 0%, rgba(0,0,0,0) 70%)',
            filter: 'blur(70px)',
          }} 
        />
      </div>

      {/* Canvas for floating petals */}
      {particlesEnabled && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1,
            width: '100%',
            height: '100%',
          }}
        />
      )}

      {/* Floating Click Hearts */}
      {clickHearts.map((heart) => (
        <div
          key={heart.id}
          aria-hidden="true"
          style={{
            position: 'fixed',
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            transform: `translate(-50%, -50%) rotate(${heart.rotation}deg)`,
            pointerEvents: 'none',
            zIndex: 9999,
            animation: 'heartFloatFade 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
          }}
        >
          <svg width={heart.size} height={heart.size} viewBox="0 0 24 24" fill={heart.color}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}

      <style>{`
        @keyframes heartFloatFade {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.6);
          }
          50% {
            opacity: 0.95;
            transform: translate(-50%, -80px) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -130px) scale(0.9);
          }
        }
      `}</style>
    </>
  );
}
