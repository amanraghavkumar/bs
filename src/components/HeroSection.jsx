import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Sun, Shield, MessageCircleHeart, ZoomIn } from 'lucide-react';

const iconMap = {
  sparkles: Sparkles,
  sun: Sun,
  shield: Shield,
  heart: Heart,
};

export default function HeroSection({ heroData, recipient, onOpenPhoto }) {
  // Typewriter effect state
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const phrases = heroData?.typedPhrases || [
    "You make the world softer just by being in it.",
    "Your smile is my favorite part of any day.",
    "Wishing you 365 days of laughter and pure joy.",
  ];

  useEffect(() => {
    const targetPhrase = phrases[phraseIndex % phrases.length];
    const typingSpeed = isDeleting ? 30 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < targetPhrase.length) {
          setCurrentText(targetPhrase.slice(0, currentText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2400);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(targetPhrase.slice(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex, phrases]);

  // Combine main photo and floating photos for lightbox index
  const allHeroPhotos = [
    heroData.mainPhoto,
    ...(heroData.floatingPhotos || []),
  ];

  return (
    <section
      id="hero-story"
      style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '80px 24px 60px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center',
        }}
      >
        {/* ===================================================================
            LEFT COLUMN: Her Personal Photo Gallery & Scrapbook Frame
            =================================================================== */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 10px',
          }}
        >
          {/* Decorative halo around gallery */}
          <div
            style={{
              position: 'absolute',
              width: '110%',
              height: '110%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(244,114,182,0.18) 0%, rgba(192,132,252,0.08) 50%, transparent 75%)',
              filter: 'blur(50px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Sparkle decorative icons */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-15px',
              right: '25px',
              color: '#fde047',
              animation: 'softPulse 2.5s ease-in-out infinite',
              zIndex: 3,
            }}
          >
            <Sparkles size={28} />
          </div>
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '15px',
              color: '#f472b6',
              animation: 'softPulse 3.2s ease-in-out infinite',
              zIndex: 3,
            }}
          >
            <Heart size={24} fill="#f472b6" />
          </div>

          {/* MAIN PROMINENT PHOTO CARD */}
          <div
            className="polaroid-card animate-soft-float"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '380px',
              borderRadius: '16px',
              zIndex: 2,
              cursor: 'pointer',
              border: '1px solid rgba(244, 114, 182, 0.25)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 35px rgba(244, 114, 182, 0.2)',
            }}
            onClick={() => onOpenPhoto(allHeroPhotos, 0)}
          >
            {/* Washi Tape Accent */}
            <div className="washi-tape" />

            {/* Photo Image Frame */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4/5',
                overflow: 'hidden',
                borderRadius: '10px',
                backgroundColor: '#1f0927',
              }}
            >
              <img
                src={heroData.mainPhoto.src}
                alt={heroData.mainPhoto.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />

              {/* Zoom hint overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.25s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
              >
                <div
                  style={{
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    background: 'rgba(0,0,0,0.65)',
                    backdropFilter: 'blur(4px)',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <ZoomIn size={14} /> View Fullscreen
                </div>
              </div>

              {/* Birthday Star Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  background: 'linear-gradient(135deg, #f43f5e, #ec4899)',
                  color: '#ffffff',
                  boxShadow: '0 4px 12px rgba(244, 63, 94, 0.4)',
                }}
              >
                {heroData.mainPhoto.badge || "Birthday Girl ✨"}
              </div>
            </div>

            {/* Handwritten Caption */}
            <div style={{ marginTop: '14px', textAlign: 'center' }}>
              <p
                className="font-handwriting"
                style={{
                  fontSize: '1.45rem',
                  color: '#2e0e3c',
                  lineHeight: 1.3,
                  fontWeight: 600,
                }}
              >
                {heroData.mainPhoto.caption}
              </p>
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '11px',
                  color: '#9d174d',
                  marginTop: '4px',
                  opacity: 0.85,
                  fontWeight: 600,
                }}
              >
                ✦ Click to view in gallery ✦
              </span>
            </div>
          </div>

          {/* FLOATING POLAROID CAROUSEL / MINI POLAROIDS */}
          <div
            style={{
              display: 'flex',
              gap: '14px',
              marginTop: '24px',
              width: '100%',
              maxWidth: '420px',
              justifyContent: 'center',
              zIndex: 3,
            }}
          >
            {heroData.floatingPhotos?.map((photo, idx) => (
              <div
                key={photo.id || idx}
                className="polaroid-card"
                onClick={() => onOpenPhoto(allHeroPhotos, idx + 1)}
                style={{
                  flex: '1',
                  maxWidth: '120px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transform: `rotate(${photo.rotation || '0deg'})`,
                  padding: '6px 6px 14px 6px',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '1/1',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    backgroundColor: '#1f0927',
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>
                <p
                  className="font-handwriting"
                  style={{
                    fontSize: '0.85rem',
                    color: '#3b1407',
                    textAlign: 'center',
                    marginTop: '6px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {photo.caption}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================================
            RIGHT COLUMN: Birthday Wishes & Personal Messages
            =================================================================== */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {/* Subtle Tag / Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              className="glass-pill"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 16px',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#f472b6',
              }}
            >
              <Sparkles size={14} />
              {heroData.badge || "Today is all about you ✨"}
            </span>
            <span
              style={{
                fontSize: '13px',
                color: '#fda4af',
                fontWeight: 500,
              }}
            >
              • {recipient.birthDate || "Special Day"}
            </span>
          </div>

          {/* Heading */}
          <h1
            className="font-serif-romantic text-glow"
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
              fontWeight: 700,
              lineHeight: 1.18,
              background: 'linear-gradient(135deg, #ffffff 40%, #fbcfe8 75%, #f472b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {heroData.heading.replace("My Favourite Person", recipient.name || recipient.nickname || "My Favourite Person")}
          </h1>

          {/* Dynamic Typewriter Line */}
          <div
            style={{
              minHeight: '36px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span
              className="font-handwriting"
              style={{
                fontSize: 'clamp(1.3rem, 3vw, 1.65rem)',
                color: '#fb7185',
                letterSpacing: '0.5px',
              }}
            >
              "{currentText}"
            </span>
            <span
              style={{
                display: 'inline-block',
                width: '2px',
                height: '24px',
                backgroundColor: '#fb7185',
                animation: 'softPulse 0.8s infinite',
              }}
            />
          </div>

          {/* Heartfelt Narrative Box */}
          <div
            className="glass-panel"
            style={{
              padding: '24px 28px',
              borderRadius: '20px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Subtle quotation mark decorative watermark */}
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '-10px',
                right: '15px',
                fontSize: '90px',
                fontFamily: 'serif',
                color: 'rgba(244, 114, 182, 0.08)',
                pointerEvents: 'none',
                lineHeight: 1,
              }}
            >
              “
            </span>

            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.8,
                color: '#fdf2f8',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {heroData.narrative}
            </p>
          </div>

          {/* Interactive Compliments Mini-Cards */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '12px',
              }}
            >
              <MessageCircleHeart size={16} color="#f472b6" />
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#fbcfe8', letterSpacing: '0.5px' }}>
                REASONS WHY YOU ARE SO SPECIAL (TAP TO REVEAL)
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '12px',
              }}
            >
              {heroData.interactiveCards?.map((card) => {
                const IconComponent = iconMap[card.icon] || Heart;
                const isSelected = selectedCardId === card.id;

                return (
                  <div
                    key={card.id}
                    onClick={() => setSelectedCardId(isSelected ? null : card.id)}
                    className="glass-panel glass-panel-hover"
                    style={{
                      padding: '14px',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      border: isSelected
                        ? '1px solid rgba(244, 114, 182, 0.7)'
                        : '1px solid rgba(244, 114, 182, 0.18)',
                      backgroundColor: isSelected ? 'rgba(56, 18, 68, 0.85)' : 'rgba(35, 14, 45, 0.65)',
                      transform: isSelected ? 'scale(1.02)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '8px',
                          background: 'rgba(244, 114, 182, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#f472b6',
                        }}
                      >
                        <IconComponent size={15} />
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>
                        {card.label}
                      </span>
                    </div>

                    <p
                      style={{
                        fontSize: '12px',
                        lineHeight: 1.45,
                        color: isSelected ? '#fed7aa' : '#fce7f3',
                        opacity: isSelected ? 1 : 0.8,
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {card.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
