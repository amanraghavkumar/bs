import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

export default function PhotoLightbox({ photos, currentIndex, onClose, onNavigate }) {
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, photos]);

  if (currentIndex === null || !photos || !photos[currentIndex]) return null;

  const currentPhoto = photos[currentIndex];
  const photoId = currentPhoto.id || currentIndex;

  const handlePrev = (e) => {
    e?.stopPropagation();
    const nextIdx = (currentIndex - 1 + photos.length) % photos.length;
    onNavigate(nextIdx);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    const nextIdx = (currentIndex + 1) % photos.length;
    onNavigate(nextIdx);
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    setLikes((prev) => ({
      ...prev,
      [photoId]: (prev[photoId] || 0) + 1,
    }));
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: 'rgba(15, 4, 20, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.25s ease-out',
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close fullscreen photo viewer"
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 210,
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(244, 114, 182, 0.3)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
      >
        <X size={22} />
      </button>

      {/* Prev Button */}
      {photos.length > 1 && (
        <button
          onClick={handlePrev}
          aria-label="Previous photo"
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 210,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(244, 114, 182, 0.4)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)')}
        >
          <ChevronLeft size={26} />
        </button>
      )}

      {/* Next Button */}
      {photos.length > 1 && (
        <button
          onClick={handleNext}
          aria-label="Next photo"
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 210,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(244, 114, 182, 0.4)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)')}
        >
          <ChevronRight size={26} />
        </button>
      )}

      {/* Main Content Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '850px',
          maxHeight: '90vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'rgba(30, 10, 38, 0.95)',
          borderRadius: '24px',
          border: '1px solid rgba(244, 114, 182, 0.25)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(244, 114, 182, 0.2)',
          overflow: 'hidden',
        }}
      >
        {/* Photo Canvas */}
        <div
          style={{
            width: '100%',
            maxHeight: '62vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a020d',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <img
            src={currentPhoto.src}
            alt={currentPhoto.alt || currentPhoto.title || 'Memory photo'}
            style={{
              maxWidth: '100%',
              maxHeight: '62vh',
              objectFit: 'contain',
              display: 'block',
            }}
          />

          {/* Tag badge */}
          {currentPhoto.tag && (
            <span
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 600,
                background: 'rgba(244, 114, 182, 0.85)',
                color: '#ffffff',
                letterSpacing: '0.5px',
              }}
            >
              {currentPhoto.tag}
            </span>
          )}
        </div>

        {/* Caption & Controls Area */}
        <div
          style={{
            width: '100%',
            padding: '24px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <h3
                className="font-serif-romantic"
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  marginBottom: '4px',
                }}
              >
                {currentPhoto.title || currentPhoto.badge || "A Cherished Moment"}
              </h3>
              {currentPhoto.date && (
                <span style={{ fontSize: '0.85rem', color: '#f472b6' }}>
                  {currentPhoto.date}
                </span>
              )}
            </div>

            {/* Like Heart Button */}
            <button
              onClick={toggleLike}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '9999px',
                background: 'rgba(244, 63, 94, 0.15)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                color: '#fb7185',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(244, 63, 94, 0.3)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(244, 63, 94, 0.15)')}
            >
              <Heart size={16} fill="#fb7185" />
              <span>{likes[photoId] ? `${likes[photoId]} Hearts ♡` : 'Send a Heart ♡'}</span>
            </button>
          </div>

          {/* Caption text */}
          <p
            className="font-handwriting"
            style={{
              fontSize: '1.2rem',
              color: '#fbcfe8',
              lineHeight: 1.5,
              marginTop: '4px',
            }}
          >
            "{currentPhoto.caption}"
          </p>

          {/* Indicator dots */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              marginTop: '8px',
            }}
          >
            {photos.map((_, idx) => (
              <span
                key={idx}
                onClick={() => onNavigate(idx)}
                style={{
                  width: idx === currentIndex ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '9999px',
                  background: idx === currentIndex ? '#f472b6' : 'rgba(255, 255, 255, 0.25)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
