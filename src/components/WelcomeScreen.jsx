import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { celebrateWithHearts } from '../utils/confetti';
import { audioManager } from '../utils/audioManager';

export default function WelcomeScreen({ config, onOpenWorld }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    // Trigger celebratory heart bursts
    celebrateWithHearts();
    // Play warm welcome chime and start ambient melody
    audioManager.playChime();
    audioManager.play();

    // Trigger parent after cinematic animation
    setTimeout(() => {
      onOpenWorld();
    }, 750);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: 'radial-gradient(ellipse at center, #2e0e3c 0%, #170720 60%, #0c0211 100%)',
        opacity: isOpening ? 0 : 1,
        transform: isOpening ? 'scale(1.08)' : 'scale(1)',
        filter: isOpening ? 'blur(8px)' : 'none',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isOpening ? 'none' : 'auto',
      }}
    >
      {/* Decorative floating aura */}
      <div
        style={{
          position: 'absolute',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.22) 0%, rgba(244, 63, 94, 0.05) 60%, transparent 80%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          animation: 'softPulse 4s ease-in-out infinite',
        }}
      />

      <div
        className="glass-panel"
        style={{
          position: 'relative',
          maxWidth: '560px',
          width: '100%',
          padding: '48px 36px',
          borderRadius: '28px',
          textAlign: 'center',
          border: '1px solid rgba(244, 114, 182, 0.3)',
          boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(244, 114, 182, 0.2)',
        }}
      >
        {/* Soft glowing heart emblem */}
        <div
          className="animate-soft-pulse"
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.25), rgba(192, 132, 252, 0.25))',
            border: '1px solid rgba(244, 114, 182, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 28px',
            boxShadow: '0 0 25px rgba(244, 114, 182, 0.35)',
          }}
        >
          <Heart size={34} color="#f472b6" fill="#f472b6" />
        </div>

        {/* Welcome Greeting */}
        <h1
          className="font-serif-romantic text-glow"
          style={{
            fontSize: 'clamp(2.4rem, 6vw, 3.4rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #ffffff 30%, #fbcfe8 70%, #fda4af 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {config?.greeting || "Hey, Beautiful! ♡"}
        </h1>

        {/* Sub-Greeting */}
        <p
          className="font-handwriting"
          style={{
            fontSize: 'clamp(1.25rem, 3.5vw, 1.6rem)',
            color: '#f472b6',
            marginBottom: '20px',
            letterSpacing: '0.5px',
          }}
        >
          {config?.subGreeting || "Today is not just another day..."}
        </p>

        {/* Message */}
        <p
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
            color: '#fce7f3',
            lineHeight: 1.7,
            opacity: 0.9,
            marginBottom: '36px',
            maxWidth: '440px',
            marginInline: 'auto',
          }}
        >
          {config?.message || "Someone truly extraordinary and deeply loved was born today."}
        </p>

        {/* Main CTA Glowing Button */}
        <button
          onClick={handleOpen}
          className="btn-magical"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '16px 36px',
            borderRadius: '9999px',
            fontSize: '1.1rem',
            fontWeight: 600,
            cursor: 'pointer',
            border: 'none',
            letterSpacing: '0.5px',
          }}
        >
          <span>{config?.buttonText || "Open Your Little World ✨"}</span>
          <Sparkles size={18} />
        </button>

        {/* Subtle Hint */}
        {config?.hintText && (
          <p
            style={{
              marginTop: '24px',
              fontSize: '0.85rem',
              color: '#d8b4fe',
              opacity: 0.75,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            {config.hintText}
          </p>
        )}
      </div>
    </div>
  );
}
