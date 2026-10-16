import React, { useState } from 'react';
import { Smile, Sparkles, Heart, Star, Shield, Feather, Lock, Unlock, Check } from 'lucide-react';
import { audioManager } from '../utils/audioManager';

const iconMap = {
  smile: Smile,
  sparkles: Sparkles,
  heart: Heart,
  star: Star,
  shield: Shield,
  feather: Feather,
};

export default function SpecialThingsSurprise({ specialThingsData }) {
  const [flippedCards, setFlippedCards] = useState({});
  const [secretUnlocked, setSecretUnlocked] = useState(false);

  const toggleCard = (id) => {
    audioManager.playChime();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleUnlockSecret = () => {
    audioManager.playGiftOpen();
    setSecretUnlocked(true);
  };

  return (
    <section
      id="special-things"
      style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1200px',
        margin: '80px auto',
        padding: '0 24px',
        textAlign: 'center',
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: '48px' }}>
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
            color: '#c084fc',
            marginBottom: '12px',
          }}
        >
          <Sparkles size={14} />
          Surprise Two ✨
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
          {specialThingsData.title || "Little Things That Make You, YOU ♡"}
        </h2>
        <p
          style={{
            color: '#fbcfe8',
            fontSize: '1rem',
            maxWidth: '600px',
            margin: '12px auto 0',
            lineHeight: 1.6,
            opacity: 0.85,
          }}
        >
          {specialThingsData.subtitle || "A few of the countless reasons why having you around is a blessing. Tap each card to reveal."}
        </p>
      </div>

      {/* Grid of 6 interactive cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '36px',
        }}
      >
        {specialThingsData.cards?.map((card) => {
          const Icon = iconMap[card.icon] || Heart;
          const isFlipped = !!flippedCards[card.id];

          return (
            <div
              key={card.id}
              onClick={() => toggleCard(card.id)}
              className="glass-panel glass-panel-hover"
              style={{
                borderRadius: '20px',
                padding: '28px 24px',
                textAlign: 'left',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                border: isFlipped
                  ? '1px solid rgba(244, 114, 182, 0.65)'
                  : '1px solid rgba(244, 114, 182, 0.2)',
                backgroundColor: isFlipped ? 'rgba(55, 17, 68, 0.85)' : 'rgba(32, 11, 40, 0.65)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                minHeight: '210px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Subtle gradient background shimmer */}
              <div
                style={{
                  position: 'absolute',
                  top: '-40%',
                  right: '-20%',
                  width: '180px',
                  height: '180px',
                  borderRadius: '50%',
                  background: isFlipped
                    ? 'radial-gradient(circle, rgba(244,114,182,0.2) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(192,132,252,0.12) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Top row: Icon + Tag badge */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.3), rgba(192, 132, 252, 0.2))',
                      border: '1px solid rgba(244, 114, 182, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#f472b6',
                    }}
                  >
                    <Icon size={20} />
                  </div>

                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#fbcfe8',
                    }}
                  >
                    {card.tag}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-serif-romantic"
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 600,
                    color: '#ffffff',
                    marginBottom: '10px',
                  }}
                >
                  {card.title}
                </h3>

                {/* Content: Preview vs Revealed detail */}
                <p
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    color: isFlipped ? '#fdf2f8' : '#e2d5de',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {isFlipped ? card.detail : card.preview}
                </p>
              </div>

              {/* Bottom tap prompt */}
              <div
                style={{
                  marginTop: '16px',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                  color: isFlipped ? '#f472b6' : '#fda4af',
                  fontWeight: 600,
                }}
              >
                <span>{isFlipped ? 'Tap to close' : 'Tap to read more ♡'}</span>
                <Sparkles size={13} />
              </div>
            </div>
          );
        })}
      </div>

      {/* FINAL HIDDEN / SECRET CARD */}
      {specialThingsData.secretCard && (
        <div
          onClick={handleUnlockSecret}
          className="glass-panel"
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            borderRadius: '24px',
            padding: '32px 28px',
            cursor: secretUnlocked ? 'default' : 'pointer',
            border: secretUnlocked
              ? '2px solid rgba(254, 240, 138, 0.6)'
              : '1px dashed rgba(244, 114, 182, 0.4)',
            boxShadow: secretUnlocked
              ? '0 0 35px rgba(254, 240, 138, 0.25), 0 20px 40px rgba(0,0,0,0.5)'
              : 'none',
            background: secretUnlocked
              ? 'linear-gradient(135deg, rgba(62, 22, 75, 0.9), rgba(41, 12, 52, 0.9))'
              : 'rgba(28, 9, 36, 0.5)',
            transition: 'all 0.4s ease',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '14px',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: secretUnlocked ? 'rgba(254, 240, 138, 0.2)' : 'rgba(244, 114, 182, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: secretUnlocked ? '#fde047' : '#f472b6',
              }}
            >
              {secretUnlocked ? <Unlock size={18} /> : <Lock size={18} />}
            </div>

            <h3
              className="font-serif-romantic"
              style={{
                fontSize: '1.4rem',
                fontWeight: 600,
                color: secretUnlocked ? '#fef08a' : '#ffffff',
              }}
            >
              {specialThingsData.secretCard.title}
            </h3>
          </div>

          <p
            className={secretUnlocked ? "font-handwriting" : ""}
            style={{
              fontSize: secretUnlocked ? '1.5rem' : '1rem',
              color: secretUnlocked ? '#ffffff' : '#d8b4fe',
              lineHeight: 1.6,
              maxWidth: '520px',
              margin: '0 auto',
            }}
          >
            {secretUnlocked
              ? `"${specialThingsData.secretCard.unlockedText}"`
              : specialThingsData.secretCard.lockedText}
          </p>

          {!secretUnlocked && (
            <span
              style={{
                display: 'inline-block',
                marginTop: '12px',
                fontSize: '12px',
                color: '#f472b6',
                fontWeight: 600,
                letterSpacing: '0.5px',
              }}
            >
              ✦ Tap to unlock secret message ✦
            </span>
          )}
        </div>
      )}
    </section>
  );
}
