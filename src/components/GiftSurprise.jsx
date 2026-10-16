import React, { useState } from 'react';
import { Gift, Sparkles, Check, Heart, Play, Film, RotateCcw } from 'lucide-react';
import { celebrateGift } from '../utils/confetti';
import { audioManager } from '../utils/audioManager';

export default function GiftSurprise({ giftData, recipient }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    if (!isOpen) {
      audioManager.playGiftOpen();
      celebrateGift();
      setIsOpen(true);
    }
  };

  const handleRewrap = () => {
    setIsOpen(false);
  };

  return (
    <section
      id="hidden-gift"
      style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '920px',
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
            color: '#fde047',
            marginBottom: '12px',
          }}
        >
          <Gift size={14} />
          Surprise Five 🎁
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
          {giftData.title || "Wait... there's one more thing for you 🎁"}
        </h2>
        <p
          style={{
            color: '#fbcfe8',
            fontSize: '1rem',
            maxWidth: '540px',
            margin: '12px auto 0',
            lineHeight: 1.6,
            opacity: 0.85,
          }}
        >
          {!isOpen ? (giftData.boxPrompt || "Tap the glowing present to unwrap it") : "Unwrapped especially for you ♡"}
        </p>
      </div>

      {/* Main Container */}
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
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(244, 114, 182, 0.2)',
        }}
      >
        {!isOpen ? (
          /* ===================================================================
              CLOSED GLOWING GIFT BOX
              =================================================================== */
          <div
            onClick={handleOpenGift}
            className="animate-soft-float"
            style={{
              position: 'relative',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
            }}
          >
            {/* Golden radial aura */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '240px',
                height: '240px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(254, 240, 138, 0.3) 0%, rgba(244, 63, 94, 0.15) 50%, transparent 70%)',
                filter: 'blur(35px)',
                pointerEvents: 'none',
              }}
            />

            {/* Stylized Illustrated Gift Box */}
            <svg
              width="220"
              height="220"
              viewBox="0 0 200 200"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <linearGradient id="boxBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#db2777" />
                  <stop offset="50%" stopColor="#be185d" />
                  <stop offset="100%" stopColor="#831843" />
                </linearGradient>
                <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="60%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>

              {/* Shadow */}
              <ellipse cx="100" cy="180" rx="75" ry="14" fill="#1b0821" opacity="0.6" />

              {/* Box Body */}
              <rect x="35" y="80" width="130" height="95" rx="14" fill="url(#boxBodyGrad)" stroke="#f472b6" strokeWidth="1.5" />

              {/* Vertical Ribbon */}
              <rect x="88" y="80" width="24" height="95" fill="url(#goldRibbon)" />

              {/* Box Lid */}
              <rect x="25" y="58" width="150" height="30" rx="8" fill="#f43f5e" stroke="#fb7185" strokeWidth="1.5" />
              <rect x="88" y="58" width="24" height="30" fill="url(#goldRibbon)" />

              {/* Golden Bow loops */}
              <path
                d="M100,58 C80,30 50,35 68,54 C78,62 94,58 100,58 Z"
                fill="url(#goldRibbon)"
                stroke="#d97706"
                strokeWidth="1"
              />
              <path
                d="M100,58 C120,30 150,35 132,54 C122,62 106,58 100,58 Z"
                fill="url(#goldRibbon)"
                stroke="#d97706"
                strokeWidth="1"
              />
              {/* Bow Center Knot */}
              <circle cx="100" cy="58" r="9" fill="#fef08a" stroke="#d97706" strokeWidth="1.5" />
            </svg>

            {/* Tap instruction */}
            <div
              className="btn-magical"
              style={{
                marginTop: '16px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 28px',
                borderRadius: '9999px',
                fontSize: '15px',
                fontWeight: 600,
              }}
            >
              <Sparkles size={16} />
              <span>Tap to Open Surprise ✨</span>
            </div>
          </div>
        ) : (
          /* ===================================================================
              UNWRAPPED GIFT REVEAL
              =================================================================== */
          <div
            style={{
              width: '100%',
              maxWidth: '680px',
              animation: 'revealScale 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              textAlign: 'center',
            }}
          >
            {/* Golden Header */}
            <div
              className="font-serif-romantic text-glow-gold"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                fontWeight: 700,
                color: '#fef08a',
                marginBottom: '12px',
              }}
            >
              {giftData.unwrappedTitle || "A Token of Endless Appreciation ✨"}
            </div>

            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.7,
                color: '#fce7f3',
                marginBottom: '28px',
              }}
            >
              {giftData.unwrappedMessage}
            </p>

            {/* Optional Personal Video if provided */}
            {giftData.videoUrl ? (
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#000000',
                  marginBottom: '28px',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
                }}
              >
                <video
                  src={giftData.videoUrl}
                  controls
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
            ) : null}

            {/* The Golden Keepsake Card / VIP Birthday Pass */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(254, 240, 138, 0.15) 0%, rgba(244, 114, 182, 0.12) 100%)',
                border: '2px solid rgba(254, 240, 138, 0.45)',
                borderRadius: '24px',
                padding: '28px 24px',
                boxShadow: '0 0 35px rgba(254, 240, 138, 0.18)',
                textAlign: 'left',
                marginBottom: '32px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                  borderBottom: '1px dashed rgba(254, 240, 138, 0.3)',
                  paddingBottom: '12px',
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    color: '#fef08a',
                    textTransform: 'uppercase',
                  }}
                >
                  ✦ LIFETIME VIP BIRTHDAY PASS ✦
                </span>
                <span style={{ fontSize: '12px', color: '#fda4af', fontWeight: 600 }}>
                  ISSUED TO: {recipient.name || "THE BIRTHDAY STAR"}
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '14px',
                }}
              >
                {giftData.perks?.map((perk, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '10px 14px',
                      borderRadius: '12px',
                    }}
                  >
                    <span style={{ fontSize: '14px', color: '#fef08a' }}>✔</span>
                    <span style={{ fontSize: '13px', color: '#ffffff', fontWeight: 500 }}>
                      {perk}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rewrap Button */}
            <button
              onClick={handleRewrap}
              className="btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={14} />
              Rewrap Gift Box
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes revealScale {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
