import React, { useState } from 'react';
import { Cake, Sparkles, Wind, RotateCcw, Heart } from 'lucide-react';
import { celebrateCandles } from '../utils/confetti';
import { audioManager } from '../utils/audioManager';

export default function CakeSurprise({ cakeData, recipient }) {
  // 3 candles state: true = lit, false = blown out
  const [candles, setCandles] = useState([true, true, true]);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  const allBlownOut = candles.every((c) => !c);

  const extinguishCandle = (index) => {
    if (!candles[index]) return;
    const nextCandles = [...candles];
    nextCandles[index] = false;
    setCandles(nextCandles);
    audioManager.playChime();

    if (nextCandles.every((c) => !c) && !hasCelebrated) {
      triggerCelebration();
    }
  };

  const blowAllCandles = () => {
    if (allBlownOut) return;
    setCandles([false, false, false]);
    triggerCelebration();
  };

  const triggerCelebration = () => {
    setHasCelebrated(true);
    audioManager.playBlowCandles();
    celebrateCandles();
  };

  const relightCandles = () => {
    setCandles([true, true, true]);
    setHasCelebrated(false);
    audioManager.playChime();
  };

  return (
    <section
      id="birthday-cake"
      style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '880px',
        margin: '90px auto',
        padding: '0 24px',
        textAlign: 'center',
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: '36px' }}>
        <span
          className="glass-pill"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#f43f5e',
            marginBottom: '12px',
          }}
        >
          <Cake size={14} />
          Surprise Three 🎂
        </span>
        <h2
          className="font-serif-romantic text-glow"
          style={{
            fontSize: 'clamp(2.1rem, 4.5vw, 3rem)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.2,
          }}
        >
          {cakeData.title.replace("Birthday Girl", recipient.name || "Birthday Girl")}
        </h2>
        <p
          style={{
            color: '#fbcfe8',
            fontSize: '1rem',
            maxWidth: '560px',
            margin: '12px auto 0',
            lineHeight: 1.6,
            opacity: 0.85,
          }}
        >
          {cakeData.subtitle}
        </p>
      </div>

      {/* Interactive Birthday Cake Container */}
      <div
        className="glass-panel"
        style={{
          borderRadius: '32px',
          padding: '48px 24px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 35px rgba(244, 114, 182, 0.15)',
        }}
      >
        {/* Soft Radial Ambient Glow */}
        <div
          style={{
            position: 'absolute',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: allBlownOut
              ? 'radial-gradient(circle, rgba(192, 132, 252, 0.25) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(254, 240, 138, 0.3) 0%, rgba(244, 63, 94, 0.15) 50%, transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
            transition: 'background 0.8s ease',
          }}
        />

        {/* ===================================================================
            SVG ILLUSTRATED 3-TIER CAKE & INTERACTIVE CANDLES
            =================================================================== */}
        <div
          style={{
            position: 'relative',
            width: '320px',
            height: '290px',
            margin: '0 auto 24px',
          }}
        >
          <svg
            viewBox="0 0 320 290"
            width="100%"
            height="100%"
            style={{ overflow: 'visible' }}
          >
            {/* Cake Stand Base */}
            <ellipse cx="160" cy="275" rx="140" ry="12" fill="#2d0a33" opacity="0.6" />
            <path d="M70,270 L250,270 L230,285 L90,285 Z" fill="#ffd1dc" opacity="0.4" />
            <rect x="140" y="270" width="40" height="15" fill="#fbcfe8" rx="4" opacity="0.8" />
            <ellipse cx="160" cy="270" rx="130" ry="12" fill="#fff1f2" />

            {/* Bottom Tier */}
            <rect x="50" y="195" width="220" height="75" rx="14" fill="#be185d" />
            {/* Frosting drips bottom tier */}
            <path
              d="M50,195 Q70,225 90,195 Q110,220 130,195 Q150,225 170,195 Q190,220 210,195 Q230,225 250,195 Q260,210 270,195 L270,185 L50,185 Z"
              fill="#f472b6"
            />
            {/* Decorative pearls bottom tier */}
            <circle cx="80" cy="245" r="4" fill="#fde047" />
            <circle cx="120" cy="245" r="4" fill="#fde047" />
            <circle cx="160" cy="245" r="4" fill="#fde047" />
            <circle cx="200" cy="245" r="4" fill="#fde047" />
            <circle cx="240" cy="245" r="4" fill="#fde047" />

            {/* Middle Tier */}
            <rect x="80" y="130" width="160" height="65" rx="12" fill="#db2777" />
            {/* Frosting drips middle tier */}
            <path
              d="M80,130 Q100,155 120,130 Q140,150 160,130 Q180,155 200,130 Q220,150 240,130 L240,122 L80,122 Z"
              fill="#fbcfe8"
            />
            {/* Heart stamps on middle tier */}
            <path d="M120,165 C116,160 110,160 110,166 C110,172 120,178 120,178 C120,178 130,172 130,166 C130,160 124,160 120,165 Z" fill="#fff1f2" opacity="0.8" />
            <path d="M160,165 C156,160 150,160 150,166 C150,172 160,178 160,178 C160,178 170,172 170,166 C170,160 164,160 160,165 Z" fill="#fff1f2" opacity="0.8" />
            <path d="M200,165 C196,160 190,160 190,166 C190,172 200,178 200,178 C200,178 210,172 210,166 C210,160 204,160 200,165 Z" fill="#fff1f2" opacity="0.8" />

            {/* Top Tier */}
            <rect x="110" y="80" width="100" height="50" rx="10" fill="#f43f5e" />
            {/* Top frosting cap */}
            <ellipse cx="160" cy="80" rx="50" ry="12" fill="#fff5f7" />
            {/* Gold stars on top tier */}
            <circle cx="135" cy="105" r="3" fill="#fde047" />
            <circle cx="160" cy="108" r="3.5" fill="#fde047" />
            <circle cx="185" cy="105" r="3" fill="#fde047" />

            {/* CANDLE 1 (Left: x=135) */}
            <g style={{ cursor: 'pointer' }} onClick={() => extinguishCandle(0)}>
              <rect x="131" y="45" width="8" height="35" rx="3" fill="#fef08a" stroke="#fbbf24" strokeWidth="1" />
              {/* Wick */}
              <line x1="135" y1="45" x2="135" y2="38" stroke="#451a03" strokeWidth="2" />
              {candles[0] ? (
                /* Flame */
                <g className="animate-flame" style={{ transformOrigin: '135px 38px' }}>
                  <path
                    d="M135,16 C131,24 127,28 127,33 C127,38 131,41 135,41 C139,41 143,38 143,33 C143,28 139,24 135,16 Z"
                    fill="url(#flameGrad)"
                  />
                  <ellipse cx="135" cy="35" rx="3" ry="4" fill="#ffffff" />
                </g>
              ) : (
                /* Smoke puff */
                <path d="M135,38 Q130,28 136,20 T132,10" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.6" />
              )}
            </g>

            {/* CANDLE 2 (Center: x=160) */}
            <g style={{ cursor: 'pointer' }} onClick={() => extinguishCandle(1)}>
              <rect x="156" y="40" width="8" height="40" rx="3" fill="#fed7aa" stroke="#f97316" strokeWidth="1" />
              <line x1="160" y1="40" x2="160" y2="32" stroke="#451a03" strokeWidth="2" />
              {candles[1] ? (
                <g className="animate-flame" style={{ transformOrigin: '160px 32px' }}>
                  <path
                    d="M160,10 C156,18 152,22 152,27 C152,32 156,35 160,35 C164,32 168,32 168,27 C168,22 164,18 160,10 Z"
                    fill="url(#flameGrad)"
                  />
                  <ellipse cx="160" cy="29" rx="3" ry="4" fill="#ffffff" />
                </g>
              ) : (
                <path d="M160,32 Q166,24 160,16 T164,8" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.6" />
              )}
            </g>

            {/* CANDLE 3 (Right: x=185) */}
            <g style={{ cursor: 'pointer' }} onClick={() => extinguishCandle(2)}>
              <rect x="181" y="45" width="8" height="35" rx="3" fill="#fbcfe8" stroke="#f43f5e" strokeWidth="1" />
              <line x1="185" y1="45" x2="185" y2="38" stroke="#451a03" strokeWidth="2" />
              {candles[2] ? (
                <g className="animate-flame" style={{ transformOrigin: '185px 38px' }}>
                  <path
                    d="M185,16 C181,24 177,28 177,33 C177,38 181,41 185,41 C189,41 193,38 193,33 C193,28 189,24 185,16 Z"
                    fill="url(#flameGrad)"
                  />
                  <ellipse cx="185" cy="35" rx="3" ry="4" fill="#ffffff" />
                </g>
              ) : (
                <path d="M185,38 Q180,28 186,20 T182,10" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.6" />
              )}
            </g>

            {/* Gradients */}
            <defs>
              <linearGradient id="flameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="25%" stopColor="#fef08a" />
                <stop offset="65%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* ===================================================================
            INTERACTIVE BUTTON CONTROLS & WISH REVEAL
            =================================================================== */}
        {!allBlownOut ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={blowAllCandles}
              className="btn-magical"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 32px',
                borderRadius: '9999px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
              }}
            >
              <Wind size={18} />
              <span>Blow Out the Candles 🕯️💨</span>
            </button>
            <span style={{ fontSize: '13px', color: '#fda4af', opacity: 0.9 }}>
              (Or tap individual candle flames directly!)
            </span>
          </div>
        ) : (
          /* ===================================================================
              ALL BLOWN OUT: CELEBRATION MESSAGE & REVEAL
              =================================================================== */
          <div
            style={{
              animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              maxWidth: '560px',
              width: '100%',
              padding: '24px 20px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(67, 18, 77, 0.9), rgba(42, 12, 54, 0.9))',
              border: '1px solid rgba(254, 240, 138, 0.4)',
              boxShadow: '0 0 35px rgba(254, 240, 138, 0.25)',
            }}
          >
            <div
              className="font-serif-romantic text-glow-gold"
              style={{
                fontSize: 'clamp(1.4rem, 3.5vw, 1.85rem)',
                fontWeight: 700,
                color: '#fef08a',
                marginBottom: '10px',
              }}
            >
              {cakeData.blownMessage || "✨ Your wish has been sent to the stars! ✨"}
            </div>

            <p
              className="font-handwriting"
              style={{
                fontSize: 'clamp(1.2rem, 3vw, 1.45rem)',
                color: '#ffffff',
                lineHeight: 1.6,
                marginBottom: '20px',
              }}
            >
              "{cakeData.wishNote}"
            </p>

            <button
              onClick={relightCandles}
              className="btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={15} />
              Make Another Wish ✨
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
