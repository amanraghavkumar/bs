import React, { useState, useEffect, useRef } from 'react';
import { Camera, Sparkles } from 'lucide-react';

export default function PhotoRain({ config, onOpenPhoto, isEnabled, onToggle }) {
  const [fallingItems, setFallingItems] = useState([]);
  const photos = config?.photos || [];
  const containerRef = useRef(null);

  // Initialize pool of falling photos
  useEffect(() => {
    if (!isEnabled || !photos.length) {
      setFallingItems([]);
      return;
    }

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    // Number of concurrent falling photos (lighter on mobile for battery and smoothness)
    const count = isMobile ? 7 : 14;

    const initial = [];
    for (let i = 0; i < count; i++) {
      const photo = photos[i % photos.length];
      const leftPercent = Math.random() * 88 + 6; // 6% to 94%
      const delay = -(Math.random() * 16); 
      const duration = Math.random() * 8 + (isMobile ? 14 : 12); // Slightly slower on mobile for easier tapping
      const size = Math.random() * 18 + (isMobile ? 54 : 76); // 54px-72px on mobile, 76px-94px on desktop
      const rotate = (Math.random() - 0.5) * 22;
      const swayAmount = isMobile ? Math.random() * 20 + 10 : Math.random() * 40 + 20;

      initial.push({
        id: `rain-${i}-${Date.now()}`,
        photoIndex: i % photos.length,
        photo,
        leftPercent,
        delay,
        duration,
        size,
        rotate,
        swayAmount,
        depth: Math.random() > 0.6 ? 'front' : 'back',
      });
    }

    setFallingItems(initial);
  }, [isEnabled, photos]);

  // Handle click or touch on a falling photo to view fullscreen
  const handleClickPhoto = (e, photoIndex) => {
    e.stopPropagation();
    if (onOpenPhoto) {
      onOpenPhoto(photos, photoIndex);
    }
  };

  // Add extra burst of falling photos on trigger
  const handleBurst = (e) => {
    e.stopPropagation();
    const burstCount = window.innerWidth < 768 ? 4 : 6;
    const newItems = [];
    for (let i = 0; i < burstCount; i++) {
      const pIdx = Math.floor(Math.random() * photos.length);
      const photo = photos[pIdx];
      const leftPercent = Math.random() * 82 + 9;
      const duration = Math.random() * 6 + 11;
      const size = Math.random() * 16 + (window.innerWidth < 768 ? 58 : 80);
      newItems.push({
        id: `burst-${Date.now()}-${i}`,
        photoIndex: pIdx,
        photo,
        leftPercent,
        delay: i * 0.35,
        duration,
        size,
        rotate: (Math.random() - 0.5) * 18,
        swayAmount: 20,
        depth: 'front',
      });
    }
    setFallingItems((prev) => [...prev, ...newItems]);
  };

  return (
    <>
      {/* Floating Toggle Controls on screen */}
      <div
        className="top-controls-left"
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <button
          onClick={onToggle}
          className="glass-pill photo-rain-btn"
          aria-label="Toggle Photo Rain effect"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 600,
            color: isEnabled ? '#fbcfe8' : '#9ca3af',
            cursor: 'pointer',
            border: isEnabled ? '1px solid rgba(244, 114, 182, 0.45)' : '1px solid rgba(255, 255, 255, 0.1)',
            background: isEnabled ? 'rgba(56, 17, 70, 0.85)' : 'rgba(25, 10, 32, 0.7)',
            boxShadow: isEnabled ? '0 0 15px rgba(244, 114, 182, 0.3)' : 'none',
            transition: 'all 0.3s ease',
          }}
          title={isEnabled ? "Click to pause Photo Rain" : "Click to start Photo Rain"}
        >
          <Camera size={14} color={isEnabled ? "#f472b6" : "#9ca3af"} />
          <span className="photo-rain-text">{isEnabled ? "Photo Rain: ON 🌧️" : "Photo Rain: OFF"}</span>
          <span className="photo-rain-short-text">{isEnabled ? "Rain 🌧️" : "Rain OFF"}</span>
        </button>

        {isEnabled && (
          <button
            onClick={handleBurst}
            className="glass-pill shower-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '8px 12px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#fef08a',
              cursor: 'pointer',
              border: '1px solid rgba(254, 240, 138, 0.35)',
              background: 'rgba(60, 20, 75, 0.8)',
              transition: 'all 0.25s ease',
            }}
            title="Drop more photos from above!"
          >
            <Sparkles size={13} color="#fde047" />
            <span className="shower-text">+Shower</span>
          </button>
        )}
      </div>

      {/* Falling Photos Layer */}
      {isEnabled && (
        <div
          ref={containerRef}
          aria-hidden="false"
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 15,
            overflow: 'hidden',
          }}
        >
          {fallingItems.map((item) => (
            <div
              key={item.id}
              onClick={(e) => handleClickPhoto(e, item.photoIndex)}
              className="falling-polaroid"
              style={{
                position: 'absolute',
                top: '-130px',
                left: `${item.leftPercent}%`,
                width: `${item.size}px`,
                pointerEvents: 'auto',
                cursor: 'pointer',
                animation: `photoFall ${item.duration}s linear infinite`,
                animationDelay: `${item.delay}s`,
                '--sway': `${item.swayAmount}px`,
                '--rot': `${item.rotate}deg`,
                opacity: item.depth === 'front' ? 0.95 : 0.75,
                zIndex: item.depth === 'front' ? 16 : 14,
                filter: item.depth === 'front' ? 'drop-shadow(0 6px 14px rgba(0,0,0,0.5))' : 'drop-shadow(0 3px 8px rgba(0,0,0,0.35))',
                touchAction: 'manipulation',
              }}
            >
              {/* Polaroid frame */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  padding: '4px 4px 12px 4px',
                  borderRadius: '6px',
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
                  border: '1px solid rgba(244, 114, 182, 0.3)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.2) rotate(0deg)';
                  e.currentTarget.style.zIndex = '50';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(244, 114, 182, 0.5), 0 0 15px rgba(254, 240, 138, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) rotate(var(--rot))';
                  e.currentTarget.style.zIndex = '1';
                  e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
                }}
              >
                {/* Mini tape/pin sticker */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-5px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '24px',
                    height: '8px',
                    background: 'rgba(251, 113, 133, 0.75)',
                    borderRadius: '2px',
                    zIndex: 2,
                  }}
                />

                {/* Photo image */}
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '1/1',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    backgroundColor: '#1f0927',
                  }}
                >
                  <img
                    src={item.photo.src}
                    alt={item.photo.title || "Falling memory"}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>

                {/* Mini caption */}
                <p
                  style={{
                    fontSize: '8px',
                    fontFamily: 'var(--font-handwriting)',
                    color: '#4c0519',
                    textAlign: 'center',
                    marginTop: '3px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: 1.1,
                  }}
                >
                  {item.photo.title || "♡"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .photo-rain-short-text {
          display: none;
        }

        @keyframes photoFall {
          0% {
            transform: translate3d(0, -140px, 0) rotate(var(--rot));
          }
          25% {
            transform: translate3d(var(--sway), calc(25vh), 0) rotate(calc(var(--rot) + 4deg));
          }
          50% {
            transform: translate3d(calc(var(--sway) * -0.5), calc(50vh), 0) rotate(calc(var(--rot) - 5deg));
          }
          75% {
            transform: translate3d(var(--sway), calc(75vh), 0) rotate(calc(var(--rot) + 3deg));
          }
          100% {
            transform: translate3d(0, calc(100vh + 150px), 0) rotate(var(--rot));
          }
        }

        .falling-polaroid:hover {
          animation-play-state: paused !important;
        }

        @media (max-width: 640px) {
          .photo-rain-text {
            display: none !important;
          }
          .photo-rain-short-text {
            display: inline !important;
          }
          .top-controls-left {
            top: 14px !important;
            left: 12px !important;
            gap: 6px !important;
          }
          .top-controls-left button {
            padding: 6px 10px !important;
            font-size: 11px !important;
          }
          .shower-text {
            display: inline !important;
            font-size: 10px !important;
          }
        }
      `}</style>
    </>
  );
}
